# Kris Nguyen L&D portfolio

An evidence-led portfolio for Kris Nguyen, a Learning and Development Coordinator working across learning operations, documentation, programme coordination and digital interaction.

Live site: https://krisnguyen2k1.github.io/

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS with project design tokens
- MDX case study drafts
- Static export for GitHub Pages
- Self-hosted Fraunces, Inter and JetBrains Mono fonts

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check:copy
npm run lint
npm run build
npm run verify:static
```

When verifying inside a restricted container that does not expose Node process memory data, use `npm run build:sandbox`. The deployment workflow uses the normal build command.

The copy check blocks the agreed banned terms and unicode dash characters in public source copy. The reading archive data is excluded because published titles must remain unchanged.

Project research, positioning, copy, case-study and verification outputs are stored in [`docs/project-phases`](docs/project-phases). They travel with the repository and do not require a separate file store.

## Content structure

- `/` presents the positioning, selected work and digital proof.
- `/work/` introduces three L&D workstreams and supporting operations.
- `/digital-work/` indexes eight live web products.
- `/about/` presents the professional practice and verified timeline.
- `/notes/reading/` preserves the searchable reading and film archive.
- `/writing/` is implemented but excluded from primary navigation and search indexing until a confirmed source list is available.

The three case study routes are built as complete editorial shells. They remain excluded from public navigation and search indexing until the evidence requirements in `NEEDS-CONFIRMATION.md` are met.

## Deployment

The GitHub Actions workflow builds the static export and deploys `out/` to GitHub Pages. In the repository settings, Pages must use GitHub Actions as its source.

The legacy `/am-bang-tu/` and `/ban-do-chien-luoc/` paths are copied through `public/` so existing URLs remain available.

## Publication rules

- Do not invent outcomes, participant numbers, dates or testimonials.
- Report output, adoption and effect as separate evidence states.
- Redact company, associate and participant information before publication.
- Do not publish workplace photographs until the people and brand usage rights are confirmed.
- Keep L&D Specialist as the target role and L&D Coordinator as the current role.
