# Kris Nguyen L&D portfolio

An evidence-led portfolio for Kris Nguyen, a Learning and Development Coordinator working across learning operations, documentation, programme coordination and digital interaction.

Production URL: https://krisnguyen2k1.github.io/

Original rebuild: pull request #3, merged into `main` on 12 August 2026.

## Current release status

- Pull request #3 introduced the Next.js rebuild and was merged into `main` on 12 August 2026.
- The production site is the statically exported Next.js build deployed from `main` through GitHub Actions.
- The static export verification script currently checks 107 required conditions.
- Three case-study routes remain unlinked and `noindex` until their evidence gates are closed.
- The public CV is linked from the site; the internal Obstacle Challenge file and workplace photographs are not in the public build.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS with named design tokens
- MDX case-study content
- Static export for GitHub Pages
- Self-hosted Fraunces, Inter and JetBrains Mono fonts

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Required checks

Run these before every pull request or deployment:

```bash
npm run check:copy
npm run lint
npm run build
npm run verify:static
```

`check:copy` blocks the agreed filler terms and unicode dash characters in public source copy. Published titles in `lib/reading-data.ts` are excluded so source titles remain unchanged.

Inside a restricted container that does not expose Node process-memory data, use `npm run build:sandbox`. GitHub Actions uses Node 22 and the normal build command.

## Where to edit content

| Content | File |
|---|---|
| Name, contact links, metadata defaults and navigation | `lib/site.ts` |
| Case-card summaries, project cards, articles, timeline and supporting work | `lib/content.ts` |
| Home page sections | `app/page.tsx` |
| Work overview | `app/work/page.tsx` |
| About page | `app/about/page.tsx` |
| Digital-work index | `app/digital-work/page.tsx` |
| Reading and film source records | `lib/reading-data.ts` |
| Manual case narrative | `content/case-studies/ld-operating-manual.mdx` |
| Role-path case narrative | `content/case-studies/role-based-learning-paths.mdx` |
| Culture Week case narrative | `content/case-studies/marriott-culture-week.mdx` |
| Colours, typography, spacing, focus and motion | `app/globals.css` and `tailwind.config.ts` |
| SEO, Open Graph and Person schema | `app/layout.tsx`, page metadata, `app/sitemap.ts` and `app/robots.ts` |
| Publication gates and missing evidence | `NEEDS-CONFIRMATION.md` |
| Prioritised future work | `BACKLOG.md` |

## How to add a case study

1. Add an entry to `caseStudies` in `lib/content.ts` with a unique lowercase slug.
2. Set `publicReady: false` while evidence is being reviewed.
3. Add metric blocks that separate output, adoption and effect. Use `Not measured` where evidence does not exist.
4. Create `content/case-studies/<slug>.mdx` with these required sections:
   - Context
   - Challenge
   - What I designed
   - How I ran it
   - Outcome and evidence
   - What I would do differently
5. Create `app/work/<slug>/page.tsx` and render the MDX through `CaseLayout`.
6. While gated, add `robots: { index: false, follow: false }` to the route metadata, add the route to the disallow list in `app/robots.ts`, and keep it out of `app/sitemap.ts`.
7. Put only approved, redacted artifacts in `public/artifacts/<slug>/`.
8. Add the exact evidence requirements to `NEEDS-CONFIRMATION.md`.
9. Run the complete check sequence.
10. After evidence approval, set `publicReady: true`, remove the route-specific robots block, add it to the sitemap, and verify the card becomes a valid whole-card link.

Never use an unverified number as placeholder copy. Keep `[NEEDS INPUT]` markers in project documentation, not in public-facing text.

## How to add a digital project card

1. Add an object to `projects` in `lib/content.ts`.
2. Supply `title`, `category`, `summary`, `capability` and the canonical `https` URL.
3. Set `selected: true` only when the project belongs in the three-card featured group.
4. Keep exactly three selected projects unless the home grid is intentionally redesigned.
5. Confirm the live URL, project ownership and contribution boundary.
6. Run the complete check sequence and test the external link before merging.

## How to update the reading archive

Edit `fiction`, `nonfiction` or `films` in `lib/reading-data.ts`. Preserve original titles and creators. The search interface derives its counts directly from these arrays.

After editing, confirm the displayed totals and run `npm run build` so the static Reading route is regenerated.

## How to add a CV

1. Prepare a public version with verified dates, education status and approved contact details.
2. Save it as `public/documents/nguyen-trung-kien-ld-cv.pdf`.
3. Set `cvHref` in `lib/site.ts` to `/documents/nguyen-trung-kien-ld-cv.pdf`.
4. Add the CV link only to the approved navigation, home and contact locations.
5. Verify the download filename and PDF contents before merging.

## How to add a case artifact

1. Remove names, associate IDs, internal links, confidential figures and unapproved brand material.
2. Confirm creator ownership and consent for every identifiable person.
3. Place the approved file under `public/artifacts/<case-slug>/`.
4. Replace the matching artifact gate in the case route with a semantic `figure`, a descriptive caption and meaningful alt text.
5. Record the evidence source and approval in the case documentation.

There is deliberately no public upload form. Repository review is the publication control.

## Route map

| Route | Status |
|---|---|
| `/` | Public |
| `/work/` | Public |
| `/digital-work/` | Public |
| `/education/` | Public |
| `/about/` | Public |
| `/notes/reading/` | Public |
| `/writing/` | Built, unlinked from primary navigation, `noindex` |
| `/work/ld-operating-manual/` | Built, unlinked, `noindex, nofollow` |
| `/work/role-based-learning-paths/` | Built, unlinked, `noindex, nofollow` |
| `/work/marriott-culture-week/` | Built, unlinked, `noindex, nofollow` |
| `/am-bang-tu/` | Preserved legacy route |
| `/ban-do-chien-luoc/` | Preserved legacy route |

## Deployment and rollback

GitHub Actions builds and deploys `out/` from `main`. In repository settings, Pages must use GitHub Actions as its source.

Deployment sequence:

1. Review the pull request and verify no sensitive artifact is present.
2. Run the required checks.
3. Complete the browser checks listed in the Phase 6 report.
4. Merge into `main`.
5. Watch `Deploy portfolio to GitHub Pages` in the Actions tab.
6. Verify all public and preserved routes in production.

If a release breaks production, revert the merge commit:

```bash
git revert <merge-commit-sha>
git push origin main
```

## Project records

Research, positioning, copy, case-study, build, verification and handover outputs live in [`docs/project-phases`](docs/project-phases). Machine-readable QA evidence lives in [`docs/verification`](docs/verification). These records travel with the GitHub project.

## Publication rules

- Do not invent outcomes, participant numbers, dates, ownership or testimonials.
- Report output, adoption and effect as separate evidence states.
- Redact company, associate and participant information before publication.
- Do not publish workplace photographs until consent and brand usage rights are confirmed.
- Keep L&D Specialist as the target role and L&D Coordinator as the current role.
- Do not turn a completed artifact into an effectiveness claim.
