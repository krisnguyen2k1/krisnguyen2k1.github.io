# Phase 7 - Handover

## Status

Phase 7 is complete. The website source, project records, verification evidence, maintenance guide, backlog and missing-input register are stored in the GitHub repository.

The rebuild remains on review branch `codex/ld-portfolio-rebuild` in draft pull request #3. It has not been merged into `main` or deployed to production.

## Handover deliverables

| Deliverable | Repository location |
|---|---|
| Operating README | `README.md` |
| Prioritised backlog | `BACKLOG.md` |
| Evidence and publication input register | `NEEDS-CONFIRMATION.md` |
| Phase 0 to Phase 7 records | `docs/project-phases/` |
| Machine-readable static verification | `docs/verification/static-qa-results.json` |
| Automated verification script | `scripts/verify-static-export.mjs` |
| GitHub Pages deployment workflow | `.github/workflows/deploy.yml` |
| Editable site content | `lib/`, `content/` and `app/` |

## README coverage

The root README now explains:

- Current release and evidence-gate status.
- Local development and the complete check sequence.
- The exact file used for every major content type.
- How to add and publish a case study.
- How to add a digital project card.
- How to update the reading archive.
- How to add a public CV.
- How to add a redacted case artifact.
- Route and indexing status.
- GitHub Pages deployment and rollback.
- Publication and confidentiality rules.

## Prioritised backlog

The root `BACKLOG.md` separates work into four levels:

- `P0`: real-browser checks required before merge.
- `P1`: evidence, case-study and CV work with the highest portfolio value.
- `P2`: credibility improvements after launch.
- `P3`: optional expansion.

It also records features that are deliberately not recommended, including a public upload form, more decorative animation, dark mode and placeholder outcomes.

## Evidence-input handover

The root `NEEDS-CONFIRMATION.md` now requests the exact facts, artifacts, permissions and measurement evidence required for:

- The L&D operating manual.
- Role-based learning paths.
- Marriott Culture Week and Obstacle Challenge.
- Certified Departmental Trainer.
- The public CV and professional profile.
- Writing.
- A possible Vietnamese version.

Each request is specific enough to answer without redesigning the information architecture.

## Release state

### Ready

- Next.js static-export source.
- Responsive component structure.
- Design tokens and typography.
- Public Home, Work, Digital work, About and Reading routes.
- Three gated MDX case routes.
- Eight digital-project records.
- Reading archive with 325 books and 81 films.
- Preserved `/am-bang-tu/` and `/ban-do-chien-luoc/` routes.
- Metadata, Open Graph, Person schema, robots and sitemap.
- GitHub Pages workflow.
- 100-check static verification.
- Full project documentation in the repository.

### Intentionally withheld

- Public CV download.
- Workplace photographs.
- Internal Obstacle Challenge HTML.
- Unredacted manual or role-mapping files.
- Search indexing and public links for the three depth cases.
- Search indexing for Writing.

### Required before merge

- Real-browser desktop and mobile review.
- Real keyboard navigation execution.
- Measured Lighthouse runs.
- Pixel-level coral coverage check.
- Grayscale visual review.
- Confirmation that GitHub Pages uses GitHub Actions.

## Recommended operating ownership

| Responsibility | Owner |
|---|---|
| Approve facts, metrics and contribution boundaries | Kris Nguyen |
| Approve confidential Marriott material | Kris plus the appropriate property or company approver |
| Approve identifiable photographs | Kris, the photographer or source, every identifiable person and the relevant brand approver |
| Maintain public copy and content records | Kris or the assigned site editor |
| Review code and deployment changes | Repository maintainer |
| Run static checks | GitHub Actions and repository maintainer |
| Run visual and keyboard checks | Repository maintainer using real browsers |

## Final release checklist

- [ ] Complete all `P0` items in `BACKLOG.md`.
- [ ] Confirm no sensitive or unapproved file is in the pull request.
- [ ] Run `npm ci`.
- [ ] Run `npm run check:copy`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm run verify:static` and confirm 100 of 100 checks pass.
- [ ] Record browser and Lighthouse evidence in `docs/verification/`.
- [ ] Mark draft pull request #3 ready for review.
- [ ] Merge only after review approval.
- [ ] Watch the GitHub Pages workflow until both jobs pass.
- [ ] Verify public and preserved routes in production.
- [ ] Revert the merge commit if production verification fails.

## Assumption register

| ID | Assumption or unresolved fact | Final treatment |
|---|---|---|
| A01 | The target is an L&D Specialist role in a large multinational or enterprise organisation. | Positioning and CTAs use this target without a senior-title claim. |
| A02 | Territory 1 remains approved. | Systems, decisions and handover lead the site. |
| A03 | British English remains approved. | Used throughout new copy. |
| A04 | The site remains English-first. | No Vietnamese route was built. |
| A05 | Workplace photograph publication rights are unresolved. | Photographs remain excluded. |
| A06 | The manual contains 150 pages. | Labelled candidate-reported. |
| A07 | The manual consolidates six sources. | Labelled candidate-reported. |
| A08 | The manual covers standards, templates and recurring workflows. | Used as supplied context. |
| A09 | Manual authorship boundary is unknown. | No sole-author claim. |
| A10 | Manual adoption and effect are unknown. | No adoption or effect claim. |
| A11 | The role-mapping scope may be 19 associates. | Figure remains withheld. |
| A12 | The associates had changed positions. | Used as reported context only. |
| A13 | Mapping used function-based Digital Learning Zone paths. | Used as supplied context. |
| A14 | Ambiguous cases were escalated rather than guessed. | Retained as a decision principle; example still required. |
| A15 | The number of ambiguous cases is unknown. | No number shown. |
| A16 | Mapping adoption and system effect are unknown. | No completion or capability claim. |
| A17 | Obstacle Challenge is Kris's original work. | Treated as the supplied working artifact. |
| A18 | The artifact contains ten clues, four teams and a 20-second timer. | Used as verified artifact evidence. |
| A19 | The artifact includes Hope Star and hidden-keyword mechanics. | Used as verified artifact evidence. |
| A20 | Artifact event details may not match live delivery. | Dates and venue remain withheld. |
| A21 | Culture Week may have run for five days. | Five-day claim remains withheld. |
| A22 | Kris created scripts, activities, certificates and digital content. | Contribution boundary remains unresolved. |
| A23 | The game was used live. | No live-use claim. |
| A24 | Participant count and department mix are unknown. | No participant figure. |
| A25 | No Culture Week knowledge or behaviour measure was supplied. | No learning-effect claim. |
| A26 | CDT completion occurred on 26 June 2026. | Supporting work only until confirmed. |
| A27 | CDT facilitation ownership remains unconfirmed. | Not promoted to a full case. |
| A28 | The LinkedIn screenshot is the current chronology source. | Used for the timeline. |
| A29 | An exact six-week promotion remains unconfirmed. | Not used. |
| A30 | Education status remains unresolved. | Not used in public copy. |
| A31 | Tri Thuc Books remains active. | Oreka link retained. |
| A32 | Email and phone are authorised for publication. | Contact copy retained. |
| A33 | Facebook is not primary enterprise evidence. | Excluded from the main site. |
| A34 | Kris has not managed a team, owned a budget or led an enterprise LMS implementation. | No copy implies these responsibilities. |
| A35 | Current scope is property-level L&D within Marriott International. | Stated precisely. |
| A36 | Digital-project contribution boundaries remain unresolved. | Cards describe artifacts and capabilities, not outcomes. |
| A37 | A verified writing chronology remains unavailable. | Undated traceable projects remain. |
| A38 | The uploaded CV is not publication-ready. | No CV file or link. |
| A39 | Current city and relocation wording remain unresolved. | Location remains omitted. |
| A40 | Public artifact upload controls are excluded. | Repository-managed publication retained. |
| A41 | Company and participant information may require removal from Obstacle Challenge. | Artifact remains private. |
| A42 | Proposed manual and role-map structures may differ from real artifacts. | Evidence gates remain. |
| A43 | Self-critique describes future iterations. | Future-facing wording retained. |
| A44 | No reliable adoption or effect measure exists for the three cases. | Evidence separation retained. |
| A45 | Culture Week has the strongest supplied artifact. | It remains the most specific but gated case. |
| A46 | The public root remains `https://krisnguyen2k1.github.io`. | Metadata and deployment target retained. |
| A47 | GitHub Pages will use GitHub Actions. | Workflow is prepared; repository setting still needs confirmation. |
| A48 | The existing portrait may remain public. | Used in About content. |
| A49 | The eight current project URLs remain valid targets. | Retained; live availability must be checked before merge. |
| A50 | Two nested project paths must remain. | Static verification confirms both output files. |
| A51 | Writing stays outside primary navigation until confirmed. | Route remains `noindex`. |
| A52 | Case source can exist before publication approval. | Routes remain unlinked and outside the sitemap. |
| A53 | Repository review is the artifact publishing control. | No upload feature. |
| A54 | Phase 5 did not authorise production deployment. | No deployment occurred. |
| A55 | Static review cannot prove visual perception. | Unproven visual criteria remain release blockers. |
| A56 | Chromium exit 133 is a sandbox restriction. | No browser pass was claimed. |
| A57 | GitHub Actions Node 22 should avoid the Work Mode Node 24 memory defect. | Normal build remains in CI; first workflow run must confirm it. |
| A58 | All project outputs should live in the GitHub repository. | Phase 0 to Phase 7 records are under `docs/`. |
| A59 | Phase 6 did not authorise merge before visual checks. | Pull request remains draft. |
| A60 | Legacy subprojects are preserved but not fully audited. | Separate audit remains in the backlog. |
| A61 | A public artifact workflow should be simple enough for a non-developer to follow. | README provides numbered file and review steps. |
| A62 | Evidence closure is more valuable than adding decorative features. | Backlog prioritises proof, permissions and CV work. |
| A63 | Handover does not itself authorise production release. | Phase 7 records readiness and blockers without merging. |
| A64 | The repository maintainer will use pull requests for future public changes. | README and backlog assume reviewed branch-based updates. |

The seven-phase portfolio workflow concludes with this handover.
