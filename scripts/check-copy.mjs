import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import process from "node:process";

const roots = ["app", "components", "content", "lib"];
const extensions = new Set([".ts", ".tsx", ".md", ".mdx"]);
const excluded = new Set(["lib/reading-data.ts"]);
const banned = [
  "leverage",
  "seamless",
  "unlock",
  "empower",
  "passionate",
  "synergy",
  "journey",
  "game-changer",
  "cutting-edge",
  "robust",
  "holistic",
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    if (entry.isFile() && extensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

const problems = [];
for (const root of roots) {
  for (const file of await walk(root)) {
    const name = relative(process.cwd(), file).replaceAll("\\", "/");
    if (excluded.has(name)) continue;
    const content = await readFile(file, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, index) => {
      if (/[\u2013\u2014]/u.test(line)) problems.push(`${name}:${index + 1} contains a unicode dash`);
      for (const word of banned) {
        if (new RegExp(`\\b${word.replace("-", "[- ]")}\\b`, "i").test(line)) {
          problems.push(`${name}:${index + 1} contains banned copy: ${word}`);
        }
      }
    });
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Copy check passed.");
