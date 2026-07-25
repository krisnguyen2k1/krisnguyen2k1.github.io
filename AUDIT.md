# AUDIT.md — improvement pass v2

Audit only. Nothing in `index.html` has been changed yet. All numbers below are measured,
not estimated, except where marked "could not test."

Method: full manual read of `index.html` (2,080 lines), binary inspection of every asset,
WCAG relative-luminance contrast computed from the shipped hex values, external links
checked live, current production page checked against the W3C Nu validator and (partially)
Google PageSpeed. See §7 for what a sandboxed shell in this session could not do.

---

## 1. Real numbers

| Metric | Value |
|---|---|
| `index.html` total | 2,080 lines / 108,157 bytes |
| `<style>` block | 846 lines / 42,397 bytes, unminified |
| `<script>` block | 687 lines / 33,853 bytes, unminified (~406 of those lines are the reading-list data arrays) |
| `:root` blocks | **3**, at lines 48, 594, 879 — see §2 |
| `@media` rules | 28, across 20 distinct breakpoints (400/520/560/620/640/660/700/760/820/860/900/960/1000/1180px, several repeated) |
| `og-image.png` | confirmed **1200×630** px (PNG header), 47,654 bytes — matches the meta tags exactly |
| `apple-touch-icon.png` | confirmed **180×180** px, 2,358 bytes — correct Apple spec |
| `portrait.webp` | confirmed **620×766** px, 12,186 bytes — matches the CSS `aspect-ratio:620/766` exactly, not oversized for its clamp(300px,29vw,540px) display width |
| `favicon.svg` | 441 bytes |
| Reading list entries | FICTION **115**, NONFICTION **210**, FILMS **81** — counted directly from the arrays; matches both the hero's "325 books" and the `<noscript>` fallback text exactly |
| `<img>` elements in the page | **0** — every image is a CSS `background-image` or inline `<svg>`; see §5 |
| Duplicate `id` attributes | none found |
| Broken internal anchors | none — every `.navlinks` and skip-link href matches a real section `id` |

---

## 2. CSS health

**Three stacked `:root` blocks, not one.** The file was built in visible layers and none of
the earlier layers were removed when the later ones landed:

- **Line 48** — the original "Reading Room" palette (ink/brass/jade/oxblood, e.g.
  `--brass:#C9954A`, `--jade:#3E8474`). Every color property this block sets is fully
  overridden below.
- **Line 594** — the "MONOCHROME" pass. Redeclares all 16 color custom properties from the
  first block (`--ink`, `--brass`, `--jade`, `--paper`, `--on-paper`, etc.) with new values.
  Because it comes later in the cascade at equal specificity, it wins outright — the first
  block's ~16 color declarations are **100% dead**, never painted in any browser.
- **Line 879** — a third, one-line override just for `--on-ink-mute` and `--on-paper-mute`,
  bumping them to `#9A9A96` / `#585855` for contrast. This is the value that actually ships
  (confirmed in §3).

Net effect: to know what color a variable actually resolves to, you have to read to the
bottom of the file. Nothing is visually broken by this — the cascade resolves correctly —
but it's real dead weight and a real maintenance trap (edit block 1 expecting a color change,
see nothing happen). **Proposed in Phase 3, not fixed now:** delete the dead lines from
blocks 1 and 2, keep one `:root`.

**Hardcoded color literals instead of tokens.** `#nav` and `#nav.stuck` set
`background:rgba(12,20,23,0)` / `rgba(12,20,23,.86)` directly (line 146, 150) — not
`var(--ink)`. A later rule at line 685 overrides `.stuck` again with
`rgba(10,10,10,.88)` to match the monochrome palette, so the original literal is also
dead. Same category of issue as the `:root` stacking, smaller scope. Two spots.

**No duplicated *rule bodies*** were found — the repetition is in `:root` and in the
media-query breakpoint count, not in copy-pasted blocks of properties.

**28 media queries across 20 breakpoint values**, all component-scoped (e.g. `.practice`
collapses at 900px/560px, `.kit` at 1000px/660px, `.cards` at 960px/520px). None of them
target the same selector at conflicting widths — I checked each one — so nothing overrides
itself unpredictably. But there's no shared breakpoint system; four different values
(520/620/640/660) do roughly the same "go to one column" job in different components. Not
broken, just not consolidated. P2 candidate.

---

## 3. Contrast — computed, not assumed

Relative luminance and contrast ratio computed directly from the shipped hex values (WCAG
2.1 formula), against the values that actually win the cascade (§2):

| Pair | Ratio | AA (4.5:1) |
|---|---|---|
| `--on-ink` `#F2F2F0` on `--ink` `#0A0A0A` | 17.66 | pass |
| `--on-ink-mute` `#9A9A96` on `--ink` `#0A0A0A` | 7.01 | pass |
| `--on-paper` `#0A0A0A` on `--paper` `#F4F4F2` | 17.98 | pass |
| `--on-paper-mute` `#585855` on `--paper` `#F4F4F2` | 6.48 | pass |
| `--on-paper-mute` on `--paper-2` `#E8E8E5` (practice/evidence cards) | 5.81 | pass |
| `--on-paper-mute` on `--paper-3` `#D9D9D5` (cmp-row hover/legend bg) | 5.04 | pass |
| `--brass-lo` `#3A3A38` on `--paper` (s-shelf badge, mark labels, tl-when) | 10.35 | pass |
| `--jade-lo` `#111111` on `--paper-2` (evidence `ev-k` label) | 15.38 | pass |
| `--on-ink-mute` on `--ink-3` `#1E1E1E` (trajectory "here" card) | 5.90 | pass |
| `--paper` text on `--on-paper-mute` bg (`.c-state.next` chip) | 5.64 | pass |
| `--on-ink` on `--ink-2` `#131313` (quote card) | 16.58 | pass |

Every pair I could identify in the component CSS clears AA, most clear AAA (7:1) as well.
`CLAUDE.md`'s claim about `#9A9A96` / `#585855` is correct — **confirmed**, not just trusted.

**Capability map and Toolkit markers checked specifically**, per the brief's instruction not
to trust the "no meaning by color alone" claim:

- Capability map: the "now" bar is a solid fill, the "target" mark is a dashed vertical
  line, the gap is a diagonal hatch pattern — three different *textures*, not three colors
  (the palette is monochrome, so there's only one ink color available regardless). Each row
  also carries a text level (`Foundation` / `Practising` / `Strong`) next to the bar. This
  is genuinely not color-dependent. No issue found.
- Toolkit: the legend states the three levels in text (`Fluent`, `Working`, `Scoped`) and
  each *category* is fine. But **individual chips are not** — a chip like "Claude" is
  visually distinguished as lv3 only by border weight, fill, and font-weight; there is no
  per-chip text or `aria-label` carrying "Fluent" down to that specific chip. A sighted user
  reading the legend once can infer it across ~50 chips; a screen reader landing on a single
  chip mid-page gets only the tool name, not its level. **Real finding, P1** — see §6.

---

## 4. The bilingual system — confirmed fully dead

Grepped the entire file for `class="..vi.."` and for anything that adds `lang-vi` /
`lang-en` to `<html>`:

- **Zero elements** in the document body carry the `.vi` class. Not one Vietnamese string
  exists anywhere in the rendered page.
- **No toggle exists.** No button, no JS, nothing sets `html.lang-vi` or `html.lang-en`.
  The `<html class="lang-both">` attribute (line 2) is itself dead — no CSS rule ever
  selects `.lang-both`.
- The CSS that exists *for* this system is substantial: the base `.vi`/`.pair` rules
  (~10 lines), plus a dedicated "REFINEMENT PASS" block and a "Vietnamese-only mode" block
  totalling **roughly 140 lines** of selectors across the file, all currently unreachable.
- **It also costs real bytes over the wire.** The Google Fonts request pulls Be Vietnam Pro
  in 9 weight/style combinations (`ital,wght@0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600`).
  The CSS only ever *uses* two of those — italic 300 and italic 500 — and since no `.vi`
  element exists, **none of them render anything today.** The entire Be Vietnam Pro family
  is downloaded, parsed, and never painted.

This matches what `CLAUDE.md` §"Known open items" already suspected. It's now confirmed
with numbers. Per the brief, I have **not** wired it up or stripped it — that decision is
in `NEEDS-CONFIRMATION.md`.

---

## 5. Accessibility

- **Heading order is correct end to end**: exactly one `<h1>` (hero), then every section
  head is `<h2 class="s-title">`, then card/row titles are `<h3>`. No level is skipped
  anywhere in the 47 headings I found. Confirmed, not assumed.
- **There are no `<img>` tags at all** (§1) — so "explicit width/height on every image" and
  "lazy-load below the fold" (brief §5 Phase 2) are moot; there's nothing to add them to.
  The one real photographic asset (`portrait.webp`) is a `position:fixed` CSS
  background on `#ata`, already has explicit sizing via `aspect-ratio`, is already marked
  `aria-hidden="true"`, and is already hidden below 1180px. No layout-shift risk from it.
- **Six decorative icons are missing `aria-hidden="true"`.** The `.p-ico` SVGs in the
  Practice section (Program design, Onboarding, Recruitment, Learning data, AI systems,
  Facilitation — lines 980, 985, 990, 995, 1000, 1005) have no `aria-hidden`, `role`, or
  `<title>`. Every *other* inline SVG in the file (the contact icons, the quote-button icon)
  correctly carries `aria-hidden="true"`. This looks like an oversight, not a decision —
  real, fixable, P1.
- **Toolkit chips lack a per-item text equivalent** for their fluency level — see §3. P1.
- **Quote dialog**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus moves to
  the close button on open, focus returns to the trigger on close, `Escape` closes it, `Tab`
  is trapped between the two buttons inside the card. Read through the logic line by line
  (lines 1947–1992) — it's correct. I could not exercise it in a live browser this session
  (§7), so this is a code-level confirmation, not a click-tested one.
- **Skip link** goes to `#thesis` (section I), not to the `<main id="content">` landmark
  itself, which technically exists but is never linked to. In practice this doesn't skip
  past any interactive content (the hero has none), so it's not a functional bug — flagging
  it only because the brief asked me to verify, not assume. Not proposing a change; harmless
  as-is.

---

## 6. SEO / metadata gaps (confirmed missing, not assumed)

- `robots.txt` — does not exist in the repo root.
- `sitemap.xml` — does not exist.
- `404.html` — does not exist; GitHub Pages will serve its own generic 404.
- `Person` JSON-LD — does not exist anywhere in `<head>`. The Open Graph and Twitter tags
  are thorough (verified all present and correctly filled), but there is no structured data.
- **Font loading is already correct.** `CLAUDE.md`/brief both ask to "add preconnect and
  font-display:swap if not present" — both are already present (`rel="preconnect"` on both
  Google Fonts hosts, `&display=swap` on the stylesheet URL). No action needed here; noting
  it so it isn't redone.
- `site.webmanifest` uses **absolute** icon paths (`/assets/apple-touch-icon.png`,
  `start_url: "/"`) — this violates the project's own relative-path rule in `CLAUDE.md`
  ("Assets are relative paths … never absolute, so the site works locally and on Pages
  alike"). It works fine on GitHub Pages (root-hosted) but breaks if the manifest is ever
  tested by opening `index.html` directly via `file://`, per the README's own documented
  local-preview method. Small, real, P1 fix.

---

## 7. What I could not test, and why

This session's shell has **no `node`, `npm`, `npx`, or real `python`** (the `python`/`python3`
on PATH are Microsoft Store execution-alias stubs, not interpreters) — so I could not:

- Run `python3 -m http.server` as the README instructs, or serve the file any other way.
- Run a local Lighthouse CLI.
- Run a local HTML validator.

**Chrome browser tools are installed but not enabled for this session** (`/chrome` to turn
them on), so I could not open the page in a real browser to:

- Confirm the console is actually clean at runtime (I read every script block line by line
  and found nothing that would throw — all `getElementById` targets exist, no obvious
  reference errors — but this is static review, not a runtime guarantee).
- Physically test 320/390/768/1024/1440/1920px for horizontal overflow.
- Click through the quote dialog and reading-list filters live.
- Do a real keyboard-only pass.

**Lighthouse "before" numbers**: I tried the public PageSpeed Insights API against the live
production URL (no local tooling required) and it returned **HTTP 429 (rate-limited)**
twice, unauthenticated. I do not have an API key to retry with. So I have no Lighthouse
numbers, before or after, from this session.

**What I could and did verify externally, against production:**
- The live site (`https://krisnguyen2k1.github.io/`) loads and its `<title>` matches source.
- Run through the **W3C Nu HTML Validator** against the live production page:
  **0 errors, 0 warnings.** This is the current, unmodified `main` — a real "before" baseline
  for HTML validity. I have no way to run the same check against the branch's modified HTML
  until it's hosted somewhere public; I'll rely on careful manual diffing instead and flag
  this gap again after Phase 2.
- **LinkedIn** (`linkedin.com/in/krisnguyen2k1`): returned HTTP 999, LinkedIn's standard
  anti-bot response to automated fetches — not evidence of a broken link, just inconclusive.
  I could not confirm it directly.
- **Facebook** (`facebook.com/kris.nguyen2k1/`): redirects to `web.facebook.com/...`, which
  **loaded successfully** and displayed the name "Nguyễn Trung Kiên" — confirmed live and
  correct.

I'd like to re-run the Chrome-based checks and, if possible, Lighthouse, once browser tools
are enabled or once the branch is pushed — happy to do that before the PR is finalized
rather than skip it silently.

---

## 8. A factual inconsistency, not a design issue — flagging, not fixing

Section VII (Study), the **BA Psychology** card at HUTECH shows dates **08/2024 — 09/2026**
with state **`Completed`**. Today's date is 2026-07-26 — the listed end date is roughly two
months in the future. Either the end date or the "Completed" state looks off; it might also
be intentional (e.g., "completed all coursework, degree conferral pending"). Per the "never
invent facts" rule I have not touched this — flagging it here and in
`NEEDS-CONFIRMATION.md` for you to confirm the correct date/state.

---

## 9. Problem list — P0 / P1 / P2

**P0 — do in Phase 2**
1. Add `robots.txt`.
2. Add `sitemap.xml`.
3. Add `404.html`.
4. Add `Person` JSON-LD structured data (name, job title, employer, city-level address only,
   `sameAs` → LinkedIn + Facebook).

**P1 — do in Phase 2**
5. Add `aria-hidden="true"` to the six `.p-ico` SVGs in the Practice section.
6. Give Toolkit chips a text-discoverable fluency level (not just border/weight/dot) —
   likely a visually-hidden suffix or `aria-label` per chip; exact approach proposed before
   I touch 50+ chip elements.
7. Fix `site.webmanifest`'s absolute paths (`/assets/...`, `start_url:"/"`) to relative, per
   `CLAUDE.md`'s own rule.

**Already satisfied — no action, noted so it isn't redone**
- Font `preconnect` + `display=swap`: already present.
- Explicit image dimensions / lazy-loading: not applicable, zero `<img>` tags; the one real
  image asset already has explicit CSS sizing and no layout-shift exposure.

**P2 — propose only, per the brief; not doing without your sign-off**
8. Consolidate the three stacked `:root` blocks into one; delete the ~16 dead color
   declarations from the original "Reading Room" palette.
9. Consolidate the two hardcoded `#nav` background literals into the existing `--ink` token.
10. Rationalize the 28 media queries down from 20 ad hoc breakpoints toward a shared set,
    if you want the churn — real but purely cosmetic/maintainability, no user-facing effect.
11. The bilingual system: wire it up or strip it. Costed in §4 — this is
    `NEEDS-CONFIRMATION.md` item 3, your call.
12. Reading-list no-JS fallback: currently a single sentence with accurate totals
    (115/210/81, verified matching the live data). My read: this is a reasonable trade-off
    already — a fully static fallback would mean duplicating ~400 entries into the HTML,
    which cuts against the "one file, no build" constraint for very little practical benefit
    (JS-disabled visitors are a vanishingly small share of recruiter traffic). Recommend
    leaving as-is; flagged in `NEEDS-CONFIRMATION.md` in case you disagree.
13. Font self-hosting instead of Google Fonts: brief says propose, don't do. Trade-off — self
    hosting removes the third-party request entirely (privacy + one less DNS/TLS handshake)
    but means committing binary font files and hand-maintaining `@font-face` blocks, which
    cuts against "no build step, everything simple." Given the fonts already have
    `preconnect` + `swap` and aren't render-blocking in a way that hurts, I'd leave this
    unless you specifically want the third-party request gone.

---

## Next step

Per the brief: stopping here. Waiting for sign-off before touching any code (Phase 2 P0/P1
fixes above). `NEEDS-CONFIRMATION.md` (with all six §7 items from the brief, plus item 8 of
this audit) is ready to write alongside it — let me know if you want it now or after you've
reviewed this.
