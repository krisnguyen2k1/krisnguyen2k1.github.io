# Phase 5 - Design and build

## Status

Phase 5 is complete. The portfolio is implemented as a production static-export Next.js site on the local branch `agent/rebuild-ld-portfolio`.

Local review commit: `e341be6` (`Rebuild portfolio as evidence-led Next.js site`). It has not been pushed or deployed.

Phase 6 has not started. The checks recorded here establish that the build runs; the formal acceptance-criteria audit, contrast matrix, keyboard walkthrough, expected Lighthouse assessment and deployment instructions belong to Phase 6.

## File list

### Framework and tokens

- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `mdx-components.tsx`
- `app/globals.css`

### App shell and routes

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/digital-work/page.tsx`
- `app/work/page.tsx`
- `app/work/ld-operating-manual/page.tsx`
- `app/work/role-based-learning-paths/page.tsx`
- `app/work/marriott-culture-week/page.tsx`
- `app/notes/reading/page.tsx`
- `app/writing/page.tsx`
- `app/not-found.tsx`
- `app/robots.ts`
- `app/sitemap.ts`

### Components

- `components/Navigation.tsx`
- `components/Footer.tsx`
- `components/Reveal.tsx`
- `components/ui.tsx`
- `components/CaseCard.tsx`
- `components/CaseLayout.tsx`
- `components/ProjectCard.tsx`
- `components/ArticleCard.tsx`
- `components/Timeline.tsx`
- `components/ReadingArchive.tsx`

### Editable content

- `lib/site.ts`
- `lib/content.ts`
- `lib/reading-data.ts`
- `content/case-studies/ld-operating-manual.mdx`
- `content/case-studies/role-based-learning-paths.mdx`
- `content/case-studies/marriott-culture-week.mdx`

### Deployment, checks and handover support

- `.github/workflows/deploy.yml`
- `scripts/check-copy.mjs`
- `scripts/node-memory-shim.cjs`
- `README.md`
- `NEEDS-CONFIRMATION.md`
- `public/.nojekyll`
- `public/assets/*`
- `public/am-bang-tu/index.html`
- `public/ban-do-chien-luoc/index.html`

## Build decisions

### Stack

- Next.js App Router with TypeScript.
- Tailwind CSS using the approved named design tokens.
- MDX for the three case study narratives.
- Static export for GitHub Pages.
- Self-hosted Fraunces, Inter and JetBrains Mono.

### Visual system

- Exact warm-neutral, ink, coral and border tokens from Attachment A.
- Fraunces headings, Inter body and JetBrains Mono micro-labels.
- 1120px content shell and 68ch prose measure.
- 72px, 96px and 128px responsive section rhythm.
- No gradients, blur, resting shadows or dark-mode toggle.
- Original `KN` Fraunces monogram in the navigation.
- Coral is limited to controls, links, focus, pills and small rules.

### Home experience

The home route includes:

1. Typography-led hero with no hero image.
2. Evidence strip using only supported or clearly qualified figures.
3. Three L&D work cards.
4. Three selected digital projects.
5. Four-part operating approach.
6. About block with the existing portrait.
7. Three published writing and research links.
8. Contact CTA and inverse footer.

### Evidence controls

- The three depth routes are complete in source.
- All three are `noindex, nofollow` and excluded from the sitemap.
- Work cards do not link to the depth routes while their evidence gates are open.
- Each case reports output, adoption and effect separately.
- Each case includes honest metric blocks and an artifact publication gate.
- Obstacle Challenge is described only through mechanics verified in the supplied HTML.
- The internal HTML file and workplace photographs are not copied into the public build.
- The uploaded CV is not copied into the public build because Phase 4 classified it as not yet publication-ready.
- No public upload form was created. Approved artifacts will be added through repository review.

### Preserved material

- The searchable archive still contains 325 books and 81 films.
- Eight live digital project URLs are retained.
- `/am-bang-tu/` and `/ban-do-chien-luoc/` remain present in the static export.

## Build checks completed

| Check | Result | Evidence |
|---|---|---|
| Copy policy | Pass | `npm run check:copy` completed with no banned terms or unicode dashes in public source copy. |
| TypeScript | Pass | `npm run lint` completed with no type errors. |
| Production compilation | Pass | `npm run build:sandbox` compiled and statically generated 13 pages. |
| Static routes | Pass | Home, About, Digital work, Reading, Writing, Work, three case routes, robots and sitemap were generated. |
| Semantic baseline | Pass | Every primary generated page contains one `h1`, one `main` and a skip link target. |
| Internal targets | Pass | Every generated internal link and asset reference resolves inside `out/`. |
| Search-index gate | Pass | All three case routes are `noindex, nofollow`; Writing is `noindex, follow`. |
| Legacy paths | Pass | The two repository-root subprojects appear in `out/`. |
| Patch hygiene | Pass | `git diff --check` reports no whitespace errors. |

The standard `next build` command encountered `uv_resident_set_memory` because this restricted Work Mode runtime does not expose the process memory data expected by Node 24. The project-specific compilation passed with a local memory shim. GitHub Actions uses Node 22 and the normal `npm run build` command.

## Deliberate deviations from Attachment A

| Requested element | Phase 5 treatment | Reason |
|---|---|---|
| Download CV link in the first viewport | Withheld | Phase 4 marked the uploaded CV as not publication-ready. |
| Whole case card as a link | Withheld while `publicReady` is false | The minimum evidence threshold has not been met. |
| At least one artifact image in each case | Honest artifact gate shown | Redacted artifacts and publication rights are still missing. |
| Public Obstacle Challenge embed | Withheld | The file contains company context that needs a publication review. |
| Three recent article dates | Undated published research links used | No verified article chronology was supplied. |

These are evidence and confidentiality safeguards, not unfinished implementation.

## Assumption register

| ID | Assumption or unresolved fact | Phase 5 treatment |
|---|---|---|
| A01 | The target is an L&D Specialist role in a large multinational or enterprise organisation. | Positioning and CTA copy reflect this target without a senior-title claim. |
| A02 | Territory 1 remains approved. | Systems, decisions and handover lead the experience. |
| A03 | British English remains approved. | Used throughout new public copy. |
| A04 | The site remains English-first. | No Vietnamese route was built. |
| A05 | Workplace photograph publication rights are unresolved. | New workplace photographs remain blocked. |
| A06 | The manual contains 150 pages. | Labelled candidate-reported. |
| A07 | The manual consolidates six sources. | Labelled candidate-reported. |
| A08 | The manual covers standards, templates and recurring workflows. | Used as supplied context. |
| A09 | Manual authorship boundary is unknown. | No sole-author claim. |
| A10 | Manual adoption and effect are unknown. | No adoption or business effect claim. |
| A11 | The role-mapping scope may be 19 associates. | The figure is withheld from public copy until confirmed. |
| A12 | The associates had changed positions. | Described as the reported operating context, not as measured proof. |
| A13 | Mapping used function-based Digital Learning Zone paths. | Used as supplied context. |
| A14 | Ambiguous mapping cases were escalated rather than guessed. | Used as the decision principle; an anonymised example is still required. |
| A15 | The number of ambiguous cases is unknown. | No figure shown. |
| A16 | Mapping adoption and system effect are unknown. | No completion or capability claim. |
| A17 | Obstacle Challenge is Kris's original work. | Treated as the supplied working artifact. |
| A18 | The artifact contains ten clues, four teams and a 20-second timer. | Used as verified artifact evidence. |
| A19 | The artifact includes Hope Star and hidden-keyword mechanics. | Used as verified artifact evidence. |
| A20 | Artifact event details may not match live delivery. | Dates and venue are withheld from public copy. |
| A21 | Culture Week may have run for five days. | Five-day claim is withheld. |
| A22 | Kris created scripts, activities, certificates and digital content. | Personal contribution boundary remains open. |
| A23 | The game was used live. | No live-use claim. |
| A24 | Participant count and department mix are unknown. | No participant figure. |
| A25 | No Culture Week knowledge or behaviour measure was supplied. | Game performance is not treated as learning effect. |
| A26 | CDT certificate completion occurred on 26 June 2026. | Listed as supporting work only. |
| A27 | CDT programme facilitation ownership remains unconfirmed. | Not promoted to a full case. |
| A28 | The LinkedIn screenshot is the current chronology source. | Used for the experience timeline. |
| A29 | An exact six-week promotion remains unconfirmed. | Not used. |
| A30 | Education status remains unresolved. | Not used in public copy. |
| A31 | Tri Thuc Books remains active. | Oreka link included. |
| A32 | Email and phone are authorised for publication. | Used in contact copy. |
| A33 | Facebook is not primary enterprise evidence. | Excluded from the main site. |
| A34 | Kris has not managed a team, owned a budget or led an enterprise LMS implementation. | No copy implies these responsibilities. |
| A35 | Current scope is property-level L&D within Marriott International. | Stated precisely. |
| A36 | Full contribution boundaries for digital projects remain unresolved. | Project cards describe artifacts and capabilities, not workplace outcomes. |
| A37 | A verified writing index remains unavailable. | Three traceable published projects stand in for a dated article list. |
| A38 | The uploaded CV is not publication-ready. | No CV file or link was published. |
| A39 | Current city and relocation wording remain unresolved. | Location is omitted. |
| A40 | Public artifact upload controls are excluded. | Repository-managed publication workflow documented. |
| A41 | Company and participant information may require removal from Obstacle Challenge. | Artifact file remains private. |
| A42 | Proposed manual and role-map structures may differ from the actual artifacts. | Public shells state what must be confirmed. |
| A43 | Self-critique describes the next iteration, not completed work. | Future-facing wording retained. |
| A44 | No reliable adoption or effect measure exists for the three cases. | Each case states the evidence gap. |
| A45 | Culture Week has the strongest supplied artifact. | It receives the most specific verified mechanics but remains gated. |
| A46 | The public root remains `https://krisnguyen2k1.github.io`. | Metadata, sitemap and static export target this root. |
| A47 | GitHub Pages will use GitHub Actions. | A static-export deployment workflow is included. |
| A48 | The existing portrait is Kris's approved portrait and may remain public. | Used only in About content, not the hero. |
| A49 | The eight current project URLs remain valid publication targets. | Preserved as external project links. |
| A50 | The current live repository should retain its two nested project paths. | Both are copied through `public/`. |
| A51 | Writing should remain outside primary navigation until its source list is confirmed. | Route built, `noindex`, footer link only. |
| A52 | Case source can be complete before case publication is approved. | Routes exist but are unlinked, blocked in robots and absent from sitemap. |
| A53 | Repository review is the correct artifact publishing control. | No browser upload feature was built. |
| A54 | Phase 5 does not authorise a production deployment. | Code is built on the local review branch; deployment waits for a later approved step. |

Phase 5 ends here. Phase 6 begins only after approval.
