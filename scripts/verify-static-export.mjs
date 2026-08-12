import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";

const primaryPages = [
  "out/index.html",
  "out/work/index.html",
  "out/digital-work/index.html",
  "out/education/index.html",
  "out/about/index.html",
  "out/notes/reading/index.html",
  "out/writing/index.html",
  "out/work/ld-operating-manual/index.html",
  "out/work/role-based-learning-paths/index.html",
  "out/work/marriott-culture-week/index.html",
  "out/404.html",
];

const protectedPages = [
  "out/work/ld-operating-manual/index.html",
  "out/work/role-based-learning-paths/index.html",
  "out/work/marriott-culture-week/index.html",
];

const palette = {
  canvas: "#faf9f5",
  surface: "#f0eee6",
  inverse: "#1f1e1d",
  primary: "#141413",
  secondary: "#56534d",
  inverseText: "#f5f4ef",
  accent: "#d97757",
  accentHover: "#c15f3c",
  accentPress: "#a6462a",
  accentTint: "#f7e3da",
  manilla: "#ebdbbc",
  borderSubtle: "#e3ded2",
  borderStrong: "#cfc9ba",
};

const pairs = [
  ["primary", "canvas", "Text", 4.5],
  ["primary", "surface", "Text", 4.5],
  ["primary", "accent", "Filled button text", 4.5],
  ["secondary", "canvas", "Text and interactive border", 4.5],
  ["secondary", "surface", "Text", 4.5],
  ["secondary", "accentTint", "Pill text", 4.5],
  ["accentPress", "canvas", "Link text and focus", 4.5],
  ["accentPress", "surface", "Link text and focus", 4.5],
  ["accentPress", "accentTint", "Monogram text", 4.5],
  ["inverseText", "inverse", "Footer and CTA text", 4.5],
  ["manilla", "inverse", "Supporting text and inverse focus", 4.5],
  ["inverseText", "accentPress", "Primary button hover text", 4.5],
  ["accentHover", "canvas", "Hover underline", 3],
  ["accentHover", "surface", "Hover underline", 3],
  ["accent", "canvas", "Button fill and decorative metric rule", null],
  ["accent", "inverse", "Button boundary", 3],
  ["borderSubtle", "canvas", "Decorative hairline", null],
  ["borderSubtle", "surface", "Decorative hairline", null],
  ["borderStrong", "canvas", "Decorative card hover line", null],
  ["borderStrong", "surface", "Decorative divider", null],
  ["accentTint", "canvas", "Decorative pill fill", null],
  ["canvas", "surface", "Section surface separation", null],
];

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((value) => Number.parseInt(value, 16) / 255).map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const checks = [];
function record(name, passed, evidence) {
  checks.push({ name, passed, evidence });
}

for (const file of primaryPages) {
  record(`${file} exists`, existsSync(file), file);
  if (!existsSync(file)) continue;
  const html = await readFile(file, "utf8");
  record(`${file} has one h1`, (html.match(/<h1\b/g) ?? []).length === 1, `${(html.match(/<h1\b/g) ?? []).length} h1 elements`);
  record(`${file} has one main`, (html.match(/<main\b/g) ?? []).length === 1, `${(html.match(/<main\b/g) ?? []).length} main elements`);
  record(`${file} has skip link`, html.includes('href="#main-content"'), "Skip link points to #main-content");
  record(`${file} images have alt`, !/<img\b(?![^>]*\balt=)[^>]*>/i.test(html), "No img element is missing alt");
  record(`${file} has title`, /<title>[^<]+<\/title>/.test(html), "Rendered title element");
  record(`${file} has description`, /<meta name="description" content="[^"]+"/.test(html), "Rendered meta description");
}

for (const file of protectedPages) {
  const html = await readFile(file, "utf8");
  record(`${file} is noindex`, html.includes('name="robots" content="noindex, nofollow"'), "noindex, nofollow metadata");
}

const allHtml = await Promise.all(primaryPages.filter(existsSync).map(async (file) => [file, await readFile(file, "utf8")]));
const missingTargets = [];
for (const [file, html] of allHtml) {
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const raw = match[1].split(/[?#]/)[0];
    if (raw.startsWith("/_next/")) continue;
    let target = join("out", raw);
    if (raw.endsWith("/")) target = join(target, "index.html");
    if (!existsSync(target)) missingTargets.push(`${file} -> ${raw}`);
  }
}
record("Internal links and assets resolve", missingTargets.length === 0, missingTargets.length === 0 ? "No missing generated targets" : missingTargets);

for (const file of ["out/am-bang-tu/index.html", "out/ban-do-chien-luoc/index.html", "out/.nojekyll", "out/robots.txt", "out/sitemap.xml"]) {
  record(`${file} is preserved`, existsSync(file), file);
}

const robots = await readFile("out/robots.txt", "utf8");
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of ["/writing/", "/work/ld-operating-manual/", "/work/role-based-learning-paths/", "/work/marriott-culture-week/"]) {
  record(`robots blocks ${route}`, robots.includes(`Disallow: ${route}`), `Disallow: ${route}`);
  record(`sitemap excludes ${route}`, !sitemap.includes(route), "Route absent from sitemap");
}

const css = await readFile("app/globals.css", "utf8");
const tailwind = await readFile("tailwind.config.ts", "utf8");
const layout = await readFile("app/layout.tsx", "utf8");
const sourceFiles = await Promise.all([
  "app/page.tsx",
  "components/Navigation.tsx",
  "components/ReadingArchive.tsx",
  "components/ui.tsx",
].map(async (file) => readFile(file, "utf8")));
const joinedSource = sourceFiles.join("\n");

record("No gradients", !/gradient\s*\(/i.test(css) && !/gradient/i.test(joinedSource), "No gradient declaration in public source");
record("No blur", !/backdrop-filter|filter\s*:\s*blur/i.test(css + joinedSource), "No blur declaration in public source");
record("No resting shadow", (css.match(/box-shadow\s*:/g) ?? []).length === 2 && !/\.card\s*\{[^}]*box-shadow\s*:/s.test(css), "Only .card:hover declares box-shadow, with a mobile reset to none");
record("Reduced motion fallback", css.includes("prefers-reduced-motion: reduce") && css.includes("transition-duration: 0.01ms"), "Reduced motion media query disables transitions and transforms");
record("Visible focus rule", css.includes("outline: 2px solid var(--accent-press)") && css.includes("outline-offset: 2px"), "2px focus outline with 2px offset");
record("Inverse focus override", css.includes("outline-color: var(--manilla)"), "Manilla focus outline on inverse surface");
record("Body measure token", tailwind.includes('prose: "68ch"') && css.includes("max-width: 68ch"), "68ch token and case-copy rule");
record("Minimum control size", css.includes("min-height: 44px") && joinedSource.includes("min-h-11"), "44px buttons and Tailwind min-h-11 controls");
record("Self-hosted fonts", layout.includes("@fontsource-variable/fraunces") && layout.includes("@fontsource-variable/inter") && layout.includes("@fontsource-variable/jetbrains-mono"), "Three @fontsource imports");
record("Person JSON-LD", layout.includes('"@type": "Person"') && layout.includes('type="application/ld+json"'), "Person schema in root layout");
record("No dark-mode toggle", !/dark mode|dark-mode|theme toggle/i.test(joinedSource), "Light-only UI source");
record("Coral is not a section surface", !/<(?:main|section)[^>]*className="[^"]*bg-accent(?!-tint)/.test(joinedSource), "No main or section uses an accent background");

const contrastTable = pairs.map(([foreground, background, use, threshold]) => {
  const ratio = contrast(palette[foreground], palette[background]);
  return {
    foreground,
    foregroundHex: palette[foreground],
    background,
    backgroundHex: palette[background],
    use,
    ratio: Number(ratio.toFixed(2)),
    threshold,
    passed: threshold === null ? null : ratio >= threshold,
  };
});
record("Required contrast pairs pass", contrastTable.filter((pair) => pair.threshold !== null).every((pair) => pair.passed), contrastTable.filter((pair) => pair.threshold !== null && !pair.passed));

const result = {
  generatedAt: new Date().toISOString(),
  summary: {
    total: checks.length,
    passed: checks.filter((check) => check.passed).length,
    failed: checks.filter((check) => !check.passed).length,
  },
  checks,
  contrastTable,
};

const output = "docs/verification/static-qa-results.json";
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`);

console.log(`Static verification: ${result.summary.passed}/${result.summary.total} checks passed.`);
if (result.summary.failed > 0) {
  for (const check of checks.filter((item) => !item.passed)) console.error(`${check.name}: ${JSON.stringify(check.evidence)}`);
  process.exit(1);
}
