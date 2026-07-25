# CLAUDE.md — working rules for this repository

Personal portfolio site for Kris Nguyen (Nguyễn Trung Kiên), L&D at Marriott International.
Its audience is recruiters and hiring managers. Every decision serves that.

Read this before touching anything.

---

## Hard rules — never break these

1. **Never publish the full residential address.** Location is city-level only:
   `Da Nang · Ho Chi Minh City, Viet Nam`. Do not restore a street address, house number or
   ward, in visible copy, in a `maps.google.com` link, in metadata, in a comment, or in
   structured data. If asked to add "my address", confirm the person means city-level.
2. **Never commit credentials.** No tokens, keys, `.env` files, cookies or passwords. Check
   `git status` before every commit. `.gitignore` already covers the common cases.
3. **Never invent facts.** Job titles, dates, GPAs, metrics, certificates, book counts,
   testimonials and contact details are real. If information is missing, leave the existing
   content alone or use an obvious placeholder like `[TBC]`. Ask rather than guess.
4. **Never quote a source you have not verified.** The quote dialog holds ten lines, each
   tied to a named work, speech or letter. Two famous lines were deliberately excluded as
   misattributions — "culture eats strategy for breakfast" and "what gets measured gets
   managed" are not Drucker's. Any new quote needs a real citation before it ships.

---

## Design language

The site is a monochrome, print-influenced document. Restraint is the whole aesthetic.

- **Colour: monochrome only.** Near-black `#0A0A0A`, off-white `#F4F4F2`, and greys between.
  The palette variables live at the top of the `<style>` block. Do not add brand colours,
  gradients, coloured buttons, or accent hues. Contrast does all the work.
- **Alternating bands.** Sections alternate `.on-ink` (dark) and `.on-paper` (light). Keep
  the rhythm; do not put two identical bands next to each other.
- **Type.** Inter for English (upright), Be Vietnam Pro for Vietnamese (always italic),
  IBM Plex Mono for labels, numbers and metadata. That English-upright / Vietnamese-italic
  rule is deliberate and load-bearing — keep it.
- **No decoration.** No stock illustration, no emoji, no icon sets beyond the small inline
  contact SVGs, no marketing slogans, no animated flourishes. Motion is limited to the
  existing subtle reveal-on-scroll, and it respects `prefers-reduced-motion`.
- **Section numbering** is Roman numerals I–X in the `.s-shelf` badge. If you add a section,
  renumber the sequence and update the nav.

## Copy

- English: natural, concise, professional. Plain words over corporate register. Contractions
  are fine. No exclamation marks.
- Vietnamese, where present: contextually accurate, not literal machine translation. Match
  the register of the English.
- Kris is a non-native English speaker improving deliberately — if you spot an error in
  copy he wrote, fix it and say what changed and why.

---

## Technical constraints

- **One file, no build.** All CSS in the single `<style>` block, all JS in the single
  `<script>` block. Do not introduce a framework, bundler, package manager, CSS
  preprocessor or CI pipeline. There is no `node_modules` and there should not be one.
- **Vanilla ES5-style JavaScript**, wrapped in an IIFE, no dependencies.
- **No browser storage.** No `localStorage` or `sessionStorage`.
- **Assets are relative paths** (`assets/...`), never absolute, so the site works locally
  and on Pages alike.
- `.nojekyll` must stay, or GitHub Pages may mangle paths.

## Accessibility — verify after any structural or visual change

- Colour contrast at least WCAG AA (4.5:1 body text). Current muted tones are `#9A9A96` on
  ink and `#585855` on paper; both pass. Do not darken them.
- The skip link, `<main>` landmark and heading order (one `h1`, then `h2` → `h3`) stay intact.
- The quote dialog must keep its focus trap, `Escape` handling and focus restoration.
- Everything reachable by keyboard; visible focus rings preserved.
- Any new image needs real `alt` text, or `aria-hidden="true"` if purely decorative.

## Responsiveness

Test at **390px, 768px and 1440px** after layout work. Check specifically for horizontal
overflow (`document.documentElement.scrollWidth > window.innerWidth` must be false). The
background portrait is hidden below 1180px by design — keep it that way.

---

## Before committing

1. Open the page and confirm it renders.
2. Check the browser console is clean.
3. Test the three viewport widths above.
4. Confirm no street address and no secrets: `git diff --staged`.
5. Review the full diff. Do not commit unrelated changes together.

## Commits

Conventional style, imperative mood, one concern per commit:

```
feat: add Vietnamese language toggle
fix: prevent horizontal overflow on the toolkit grid at 390px
style: reduce hero name size on mobile
docs: update README deployment steps
content: update work experience with new role
a11y: raise muted text contrast to AA
```

Push to `main`; GitHub Pages deploys automatically in under two minutes.

## Keep the docs true

If the file structure or deployment process changes, update `README.md` in the same commit.
If a design or content rule changes, update this file.

---

## Known open items

Raised in review, not yet actioned — Kris decides these, do not act unilaterally:

- No photograph of Kris on the site.
- The Evidence section describes six projects but carries no metrics.
- No downloadable CV.
- The bilingual CSS system (`html.lang-vi`, `.vi` rules) is fully built but has no toggle
  and no Vietnamese content — either wire it up or strip it.
- The Study section lists a UEH HRM master's; confirm against the programme actually chosen.
- The background portrait is a political figure; flagged as a judgement call for an
  international audience.
