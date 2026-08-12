# Phase 6 - Verification

## Verdict

Phase 6 is complete as an audit, but the release gate is not fully passed.

- Attachment A acceptance criteria: `3 Pass`, `3 Fail`.
- Static-export verification: `100/100 Pass`.
- Copy policy: `Pass`.
- TypeScript: `Pass`.
- Production static generation: `Pass`, 13 generated routes.
- Browser runtime, pixel sampling, real keyboard execution and Lighthouse: `Fail - not executed` because the Work Mode sandbox terminated Chromium with exit code 133.

In this report, `Fail` means the criterion was not proven to the required standard. It does not automatically mean the implementation is defective.

## Verification commands

```bash
npm run check:copy
npm run lint
npm run build:sandbox
npm run verify:static
git diff --check
```

The normal deployment uses `npm run build`. The `build:sandbox` command only replaces Node's unavailable process-memory reading inside this Work Mode runtime.

Machine-readable evidence: [`../verification/static-qa-results.json`](../verification/static-qa-results.json).

## Attachment A acceptance criteria

| Criterion | Result | Evidence |
|---|---|---|
| Coral occupies under 10% of every viewport at every breakpoint. | **Fail - not proven** | Source review confirms there is no coral `main` or `section` surface. Coral is limited to buttons, links, pills, focus states, monogram and small rules. Pixel sampling at every breakpoint requires a working browser, which the sandbox blocked. |
| Body copy never exceeds 72 characters per line. | **Pass** | `maxWidth.prose` is `68ch`; case paragraphs use `max-width: 68ch`; all long leads were changed to `max-w-prose`; cards and grid copy sit in narrower columns. |
| Every interactive element has a visible, AA-compliant focus state. | **Pass at implementation level** | Global `a`, `button`, `input` and `select` focus rules use a 2px outline and 2px offset. Canvas and surface use `--accent-press`; inverse sections use `--manilla`. Contrast is 5.65:1, 5.12:1 and 12.20:1 respectively. Interactive borders use `--text-secondary`. |
| No gradients, blur or resting drop shadows. | **Pass** | Static check finds no gradient or blur declaration. The only shadow declaration is inside `.card:hover`, with a mobile reset to `none`. |
| The site reads as credible on a laptop in 90 seconds and remains fully legible on a phone. | **Fail - not proven** | The information hierarchy is implemented, but this is a visual and comprehension test. No real desktop or mobile browser session could be completed in the sandbox. |
| Removing all colour leaves the site well-designed. | **Fail - not proven** | Hierarchy is carried by type, spacing, borders and layout in source. A grayscale screenshot review was not possible without browser rendering. |

## Changes made during verification

Phase 6 found and corrected four implementation risks:

1. Long lead paragraphs were changed from width utilities up to `max-w-3xl` to the explicit `68ch` prose measure.
2. Search, filter, mobile-menu and secondary-button boundaries now use `--text-secondary` rather than low-contrast decorative border tokens.
3. Focus indicators on inverse sections now use `--manilla`, because `--accent-press` against the inverse surface measured only 2.80:1.
4. The primary coral button now has an `--accent-press` border. The coral fill is 2.96:1 against the canvas, while the outer interactive boundary now exceeds 3:1.

The mobile navigation also gained Escape-key handling and returns focus to the menu button after closing.

## Contrast table

Every foreground and background token pair used by the new portfolio is listed below. Decorative pairs are recorded but do not carry semantic text or required control boundaries.

| Foreground | Background | Ratio | Use | Result |
|---|---|---:|---|---|
| `#141413` primary | `#FAF9F5` canvas | 17.50:1 | Text | Pass |
| `#141413` primary | `#F0EEE6` surface | 15.87:1 | Text | Pass |
| `#141413` primary | `#D97757` accent | 5.90:1 | Filled-button text | Pass |
| `#56534D` secondary | `#FAF9F5` canvas | 7.27:1 | Text and interactive border | Pass |
| `#56534D` secondary | `#F0EEE6` surface | 6.60:1 | Text | Pass |
| `#56534D` secondary | `#F7E3DA` accent tint | 6.19:1 | Pill text | Pass |
| `#A6462A` accent press | `#FAF9F5` canvas | 5.65:1 | Link text, focus and button border | Pass |
| `#A6462A` accent press | `#F0EEE6` surface | 5.12:1 | Link text and focus | Pass |
| `#A6462A` accent press | `#F7E3DA` accent tint | 4.80:1 | Monogram text | Pass |
| `#F5F4EF` inverse text | `#1F1E1D` inverse | 15.11:1 | Footer and CTA text | Pass |
| `#EBDBBC` manilla | `#1F1E1D` inverse | 12.20:1 | Supporting text and inverse focus | Pass |
| `#F5F4EF` inverse text | `#A6462A` accent press | 5.40:1 | Primary-button hover text | Pass |
| `#C15F3C` accent hover | `#FAF9F5` canvas | 4.01:1 | Hover underline | Pass at 3:1 non-text threshold |
| `#C15F3C` accent hover | `#F0EEE6` surface | 3.64:1 | Hover underline | Pass at 3:1 non-text threshold |
| `#D97757` accent | `#FAF9F5` canvas | 2.96:1 | Button fill and decorative metric rule | Decorative fill; button uses a 5.65:1 outer border |
| `#D97757` accent | `#1F1E1D` inverse | 5.33:1 | Button fill boundary | Pass |
| `#E3DED2` subtle border | `#FAF9F5` canvas | 1.27:1 | Decorative hairline | Decorative |
| `#E3DED2` subtle border | `#F0EEE6` surface | 1.16:1 | Decorative hairline | Decorative |
| `#CFC9BA` strong border | `#FAF9F5` canvas | 1.57:1 | Decorative card-hover line | Decorative |
| `#CFC9BA` strong border | `#F0EEE6` surface | 1.42:1 | Decorative divider | Decorative |
| `#F7E3DA` accent tint | `#FAF9F5` canvas | 1.18:1 | Decorative pill fill | Decorative; pill text provides meaning |
| `#FAF9F5` canvas | `#F0EEE6` surface | 1.10:1 | Section surface separation | Decorative; hierarchy also uses spacing and headings |

## Keyboard navigation walkthrough

### Desktop home route

Expected tab order from the rendered DOM:

1. `Skip to main content` appears on focus. Enter should move the viewport to `#main-content`.
2. `Kris Nguyen` home link.
3. Primary navigation: Work, Digital work, About, Reading.
4. Hero CTA: View case studies, then About my practice.
5. Work overview link. Gated case cards contain no hidden or dead links.
6. Three external selected-project links, then Browse all digital work.
7. About profile link.
8. Writing index link and three published writing links.
9. Contact email CTA.
10. Footer links: Email, LinkedIn, Writing.

### Mobile navigation

Expected sequence:

1. Skip link.
2. Home wordmark.
3. Menu button.
4. Enter or Space opens the menu and changes `aria-expanded` to `true`.
5. Work, Digital work, About and Reading enter the tab order.
6. Escape closes the menu and returns focus to the Menu button.

### Reading archive

Expected sequence:

1. Search input.
2. Fiction filter.
3. Non-fiction filter.
4. Films filter.

The filters expose `aria-pressed`; result counts use `aria-live="polite"`; no result depends on colour alone.

### Case routes

Expected sequence:

1. Skip link and global navigation.
2. Back to work.
3. Footer links.

The artifact gate is informational and does not create a fake upload control or dead link.

### Keyboard result

**Fail - runtime walkthrough not executed.** Source order, accessible names, focus CSS, Escape handling and ARIA states were inspected. A real Tab, Enter, Space and Escape pass must still be run in Chrome, Edge, Firefox or Safari before deployment approval.

## Expected Lighthouse assessment

These are estimates, not measured scores.

| Category | Expected range | Supporting evidence | Specific risks |
|---|---:|---|---|
| Performance | `95-100` on primary routes; `92-97` on Reading | Static export; no third-party scripts; 12KB portrait; 38KB OG image; no hero media; largest JS chunks gzip to about 72KB, 45KB and 39KB. | The Reading route hydrates 406 archive records and produces a 74KB HTML document. Variable-font subsets and Next hydration may affect slower mobile devices. GitHub Pages cache headers were not measured. |
| Accessibility | `96-100` | One `h1` and one `main` per primary page; skip link; image alt text; global focus rules; AA text pairs; semantic controls; reduced-motion fallback. | Real keyboard execution and computed contrast were not run in a browser. Legacy subprojects were preserved but are outside this audit. |
| Best practices | `100` | No third-party trackers, gradients, unsafe embeds or public internal artifacts. External links use `noreferrer`. | Browser console and runtime security warnings were not captured. External project sites have their own implementations. |
| SEO | `100` for public portfolio routes | Per-page metadata, Open Graph data, Person JSON-LD, sitemap and robots output. | Writing and three case routes are deliberately `noindex`. Auditing those URLs directly will lower their SEO score by design. |

## Exact GitHub Pages deployment steps

1. Push the review branch:

   ```bash
   git push -u origin agent/rebuild-ld-portfolio
   ```

2. Open a draft pull request from `agent/rebuild-ld-portfolio` to `main`.
3. Review the generated file list and confirm that no CV, workplace photograph or internal Obstacle Challenge file is present.
4. Run the repository checks locally or in CI:

   ```bash
   npm ci
   npm run check:copy
   npm run lint
   npm run build
   npm run verify:static
   ```

5. In GitHub, open `Settings` -> `Pages`.
6. Under `Build and deployment`, set `Source` to `GitHub Actions`.
7. Merge the pull request into `main` only after the browser checks in this report are completed.
8. The workflow `.github/workflows/deploy.yml` will install Node 22 dependencies, check copy, check TypeScript, build, verify the static export, upload `out/` and deploy it.
9. Open `Actions` -> `Deploy portfolio to GitHub Pages` and wait for both `build` and `deploy` to pass.
10. Verify these production routes:
    - `/`
    - `/work/`
    - `/digital-work/`
    - `/about/`
    - `/notes/reading/`
    - `/am-bang-tu/`
    - `/ban-do-chien-luoc/`
11. Confirm that the three gated case routes and Writing remain absent from the sitemap and public navigation.
12. If production fails, revert the merge commit with `git revert <merge-commit-sha>` and push the revert to `main`.

## Prioritised verification backlog

1. Run desktop and mobile Chrome screenshots at 390px, 768px, 1024px and 1440px.
2. Measure coral pixel share at the top and at every full-viewport scroll position.
3. Run the full keyboard walkthrough above.
4. Run Lighthouse on Home, Work, About, Digital work and Reading.
5. Run a grayscale screenshot review.
6. Verify the two preserved legacy subprojects separately.
7. Verify all eight external digital-work URLs immediately before deployment.

## Assumption register

| ID | Assumption or unresolved fact | Phase 6 treatment |
|---|---|---|
| A01 | The target is an L&D Specialist role in a large multinational or enterprise organisation. | Positioning remains unchanged. |
| A02 | Territory 1 remains approved. | Systems, decisions and handover continue to lead. |
| A03 | British English remains approved. | Retained throughout public copy. |
| A04 | The site remains English-first. | No Vietnamese route was tested or built. |
| A05 | Workplace photograph publication rights are unresolved. | Photographs remain excluded. |
| A06 | The manual contains 150 pages. | Still labelled candidate-reported. |
| A07 | The manual consolidates six sources. | Still labelled candidate-reported. |
| A08 | The manual covers standards, templates and recurring workflows. | Retained as supplied context. |
| A09 | Manual authorship boundary is unknown. | No sole-author claim. |
| A10 | Manual adoption and effect are unknown. | No adoption or effect claim. |
| A11 | The role-mapping scope may be 19 associates. | Figure remains withheld. |
| A12 | The associates had changed positions. | Used as reported context only. |
| A13 | Mapping used function-based Digital Learning Zone paths. | Used as supplied context. |
| A14 | Ambiguous mapping cases were escalated rather than guessed. | Retained as a decision principle; example still required. |
| A15 | The number of ambiguous cases is unknown. | No figure shown. |
| A16 | Mapping adoption and system effect are unknown. | No completion or capability claim. |
| A17 | Obstacle Challenge is Kris's original work. | Treated as the supplied working artifact. |
| A18 | The artifact contains ten clues, four teams and a 20-second timer. | Retained as verified artifact evidence. |
| A19 | The artifact includes Hope Star and hidden-keyword mechanics. | Retained as verified artifact evidence. |
| A20 | Artifact event details may not match live delivery. | Dates and venue remain withheld. |
| A21 | Culture Week may have run for five days. | Five-day claim remains withheld. |
| A22 | Kris created scripts, activities, certificates and digital content. | Contribution boundary remains unresolved. |
| A23 | The game was used live. | No live-use claim. |
| A24 | Participant count and department mix are unknown. | No participant figure. |
| A25 | No Culture Week knowledge or behaviour measure was supplied. | No learning-effect claim. |
| A26 | CDT certificate completion occurred on 26 June 2026. | Supporting work only. |
| A27 | CDT facilitation ownership remains unconfirmed. | Not promoted to a full case. |
| A28 | The LinkedIn screenshot is the current chronology source. | Timeline retained. |
| A29 | An exact six-week promotion remains unconfirmed. | Not used. |
| A30 | Education status remains unresolved. | Not used in public copy. |
| A31 | Tri Thuc Books remains active. | Oreka link retained. |
| A32 | Email and phone are authorised for publication. | Contact copy retained. |
| A33 | Facebook is not primary enterprise evidence. | Excluded from the main site. |
| A34 | Kris has not managed a team, owned a budget or led an enterprise LMS implementation. | No copy implies these responsibilities. |
| A35 | Current scope is property-level L&D within Marriott International. | Stated precisely. |
| A36 | Digital-project contribution boundaries remain unresolved. | Cards describe artifacts and capabilities, not workplace outcomes. |
| A37 | A verified writing chronology remains unavailable. | Undated traceable projects remain. |
| A38 | The uploaded CV is not publication-ready. | No CV file or link. |
| A39 | Current city and relocation wording remain unresolved. | Location remains omitted. |
| A40 | Public artifact upload controls are excluded. | Repository-managed process retained. |
| A41 | Company and participant information may require removal from Obstacle Challenge. | Artifact remains private. |
| A42 | Proposed manual and role-map structures may differ from the real artifacts. | Gates remain visible in source. |
| A43 | Self-critique describes a future iteration. | Future-facing wording retained. |
| A44 | No reliable adoption or effect measure exists for the three cases. | Evidence separation retained. |
| A45 | Culture Week has the strongest supplied artifact. | It remains the most specific but still gated case. |
| A46 | The public root remains `https://krisnguyen2k1.github.io`. | Metadata and deployment target retained. |
| A47 | GitHub Pages will use GitHub Actions. | Workflow now also runs static verification. |
| A48 | The existing portrait may remain public. | Used in About content. |
| A49 | The eight current project URLs remain valid targets. | Retained; current availability must be checked before deployment. |
| A50 | Two nested project paths must remain. | Static verifier confirms both output files exist. |
| A51 | Writing remains outside primary navigation until confirmed. | Route remains `noindex`. |
| A52 | Case source can exist before public approval. | Routes remain unlinked, blocked and outside sitemap. |
| A53 | Repository review is the artifact publishing control. | No upload feature. |
| A54 | Phase 5 did not authorise production deployment. | No deployment occurred. |
| A55 | A source-level audit can prove structure, tokens and generated output but not visual perception. | Visual criteria are marked Fail rather than inferred. |
| A56 | Chromium exit 133 is a sandbox restriction rather than a portfolio runtime error. | Recorded as an environment blocker; no browser pass claimed. |
| A57 | GitHub Actions Node 22 will not reproduce the Work Mode Node 24 memory-reading defect. | Normal build remains in CI; this must be confirmed by the first workflow run. |
| A58 | The user wants all generated project outputs stored in the GitHub repository. | Phase 0 to Phase 6 records now live under `docs/`. |
| A59 | Phase 6 does not authorise merging to production before the failed visual checks are closed. | Deployment instructions stop at a review gate. |
| A60 | Legacy subprojects are preserved but not redesigned or fully audited in this phase. | Listed as a separate verification backlog item. |

Phase 6 ends here. Phase 7 begins only after approval.
