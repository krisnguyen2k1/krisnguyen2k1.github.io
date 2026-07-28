# CLAUDE.md — working rules for this repository

This repository contains the personal portfolio of Kris Nguyen (Nguyen Trung Kien), currently an L&D Coordinator at The Westin Resort & Spa Cam Ranh.

The primary audience is recruiters, hiring managers and L&D leaders. Every change should make the current evidence, professional point of view and future direction easier to understand.

## Hard rules

1. **Keep the title truthful.** The current title is `L&D Coordinator`. `L&D Manager` and `Enterprise L&D Leader` are future goals shown only in the roadmap.
2. **Never publish a residential address.** Location must remain city-level only: `Da Nang · Ho Chi Minh City, Viet Nam`.
3. **Never commit credentials.** Do not add secrets, tokens, cookies, passwords, `.env` files or private account data.
4. **Never invent facts.** Do not create job titles, dates, degrees, GPAs, metrics, certificates, testimonials or confidential business results.
5. **Protect employer confidentiality.** Program-level scope may be shown. Do not add guest data, associate identities, internal financial data or restricted Marriott material.

## Brand position

The site presents Kris as an early-career professional with a credible trajectory:

- **Now:** L&D Coordinator with real operating evidence.
- **Next:** specialist capability in needs analysis, instructional design and measurement.
- **Direction:** L&D Manager and, over time, enterprise L&D leadership.

The three brand pillars are:

- human-centred learning;
- AI-enabled systems;
- business-minded growth.

Do not turn aspiration into inflated present-tense claims.

## Copy

- English should be concise, natural and professional.
- Prefer evidence, scope and contribution over self-congratulation.
- Use plain language over corporate jargon.
- No exclamation marks or emoji.
- Keep the distinction between completed, in-progress and planned education explicit.
- Keep the total page focused enough for a recruiter to scan in one visit.

## Design language

- Monochrome only: near-black, off-white and accessible greys.
- Inter for display and body; IBM Plex Mono for labels and metadata.
- Alternate dark and light editorial bands.
- Strong typography and spacing do the visual work.
- No stock illustrations, decorative icon sets, coloured gradients or ornamental animation.
- The fixed faded portrait remains a background element on large screens and is hidden below 960px.
- Motion is limited to reveal-on-scroll and must respect `prefers-reduced-motion`.

## Page structure

Keep the six numbered sections in this order:

1. Position
2. Evidence
3. Story
4. Edge
5. Learning
6. Roadmap

Contact is the closing call to action. If the structure changes, update `README.md` in the same work.

The Learning section contains the personal reading and film archive:

- 115 fiction titles;
- 210 non-fiction titles;
- 81 films.

Keep the category totals, search, keyboard-accessible modal, favourite markers and reread counts working. Do not alter a title, author, year or marker without verified source data from Kris.

## Technical constraints

- One static `index.html`; no framework or build system.
- All CSS stays in the page `<style>` block.
- All JavaScript stays in the page `<script>` block.
- Vanilla dependency-free JavaScript.
- No browser storage.
- Assets use relative `assets/...` paths.
- Keep `.nojekyll`.

## Accessibility and responsive QA

- Maintain WCAG AA colour contrast.
- Preserve the skip link, one `h1`, the `main` landmark and logical heading order.
- Every link and button must work with a keyboard and retain a visible focus state.
- Test at 390px, 768px and 1440px.
- Horizontal overflow must remain false at every supported width.
- Reduced-motion users must receive the content without animation.

## Before publishing

1. Confirm the page renders.
2. Confirm JavaScript parses without errors.
3. Verify the current title remains accurate.
4. Search for residential address data and secrets.
5. Check responsive layouts and horizontal overflow.
6. Review the entire diff.

Use conventional, imperative commit messages such as:

```text
content: add a verified L&D case study
style: tighten the roadmap layout on mobile
fix: prevent overflow in the contact links
a11y: improve focus visibility
```
