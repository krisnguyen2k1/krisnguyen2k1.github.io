# CLAUDE.md — working rules for this repository

This repository contains the personal portfolio of Kris Nguyen (Nguyen Trung Kien), currently a Learning and Development Coordinator at The Westin Resort & Spa Cam Ranh.

The primary audience is recruiters, hiring managers and L&D leaders. Every change should make the current evidence, professional point of view and future direction easier to understand.

The current source on `main` is authoritative. This file must be updated whenever the architecture, design system or deployment workflow changes.

## Hard rules

1. **Keep the title truthful.** The current role is `Learning and Development Coordinator`. `L&D Manager`, `L&D Specialist` and enterprise leadership may appear only where the copy clearly presents them as targets or future direction.
2. **Never publish a residential address.** Location must remain city-level only: `Da Nang · Ho Chi Minh City, Viet Nam`. Do not add a street address, house number or ward to visible copy, links, metadata, comments, artifacts or structured data.
3. **Never commit credentials.** Do not add secrets, tokens, API keys, cookies, passwords, `.env` files or private account data.
4. **Never invent facts.** Do not create or silently alter job titles, dates, degrees, GPAs, metrics, certificates, testimonials, contact details or confidential business results. Ask for verified source data when it is missing.
5. **Never publish an unverified quote.** Every quotation requires a traceable citation to a named work, speech, letter or other primary source. Do not attribute the historically excluded lines “culture eats strategy for breakfast” or “what gets measured gets managed” to Peter Drucker.
6. **Protect employer confidentiality.** Programme-level scope may be shown. Do not add guest data, associate identities, internal financial data, restricted Marriott material or unapproved workplace photographs.

## Brand position and copy

The site presents Kris as an early-career professional with a credible trajectory:

- **Now:** Learning and Development Coordinator with operating evidence.
- **Next:** specialist capability in needs analysis, instructional design and measurement.
- **Direction:** L&D management and, over time, enterprise learning leadership.

The three brand pillars are human-centred learning, AI-enabled systems and business-minded growth. Do not turn aspiration into an inflated present-tense claim.

- Write concise, natural and professional English.
- Prefer evidence, scope and contribution over self-congratulation.
- Use plain language over corporate jargon.
- Do not use exclamation marks or emoji.
- Keep completed, in-progress and planned education clearly distinct.
- Keep the portfolio focused enough for a recruiter to scan in one visit.

## Current architecture

The portfolio is a statically exported Next.js application, not a single-file site.

- **Framework:** Next.js 16 App Router, React 19 and TypeScript.
- **Styling:** Tailwind CSS plus shared rules and CSS custom properties in `app/globals.css`.
- **Content:** typed records in `lib/` and case-study narratives in `content/case-studies/`.
- **Routes:** page and metadata files under `app/`.
- **Components:** reusable navigation, cards, layouts and client interactions under `components/`.
- **Public files:** approved assets, documents and preserved static routes under `public/`.
- **Checks:** copy and static-export scripts under `scripts/`.
- **Deployment:** `.github/workflows/deploy.yml` builds and deploys `out/` to GitHub Pages.

There is no root `index.html` for the portfolio. Do not recreate the retired single-file architecture. Preserved legacy routes under `public/` are independent static artifacts; leave them alone unless the request names one.

## Design language

The current design is warm, editorial and evidence-led. It is not monochrome.

### Colour tokens

The source of truth is `:root` in `app/globals.css`:

- paper backgrounds: `--bg-canvas #faf9f5`, `--bg-surface #f0eee6`, `--bg-sunken #e8e5da`;
- inverse background: `--bg-inverse #1f1e1d`;
- text: `--text-primary #141413`, `--text-secondary #56534d`, `--text-muted #86837b`, `--text-inverse #f5f4ef`;
- coral accents: `--accent #d97757`, `--accent-hover #c15f3c`, `--accent-press #a6462a`, `--accent-tint #f7e3da`;
- supporting tones: `--kraft #d4a27f`, `--manilla #ebdbbc`, `--border-subtle #e3ded2`, `--border-strong #cfc9ba`.

Reuse these tokens instead of introducing one-off colours. Any token change requires an explicit contrast report and user approval.

`--accent` is not suitable as small text or as the sole essential 3:1 boundary on the light backgrounds. `--text-muted` is defined but currently unused in rendered source; do not introduce it for normal-sized text without a deliberate contrast decision.

### Typography and layout

- **Display and headings:** Fraunces Variable with Georgia fallback.
- **Body:** Inter Variable with Arial or system sans-serif fallback.
- **Labels and metadata:** JetBrains Mono Variable.
- **Scale:** use the named `display`, `h1`, `h2`, `h3`, `lead`, `body`, `small` and `micro` values in `tailwind.config.ts` or the matching shared classes.
- **Measures:** `70rem` shell and `68ch` prose width.
- **Shape:** 8px cards and 6px buttons.
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` through the `studio` timing token.

The portrait on the home page is an inline responsive `next/image` asset at `public/assets/portrait.webp`. It is not a fixed background image.

Use typography, spacing, restrained borders and alternating canvas, surface and inverse bands as the primary visual language. Do not add gradients, stock illustrations, decorative icon sets or ornamental animation.

## Existing interaction and motion

Current motion is shared across CSS and client components:

- `components/Reveal.tsx` uses `IntersectionObserver` for a one-time opacity and 8px vertical reveal.
- `.reveal` transitions opacity and transform over 260ms.
- cards use a 2px hover lift, border change and restrained shadow over 240ms; the lift is removed below 768px.
- links, buttons, the skip link and the sticky navigation use short colour or transform transitions.
- the navigation changes border and background after 16px of scrolling.
- `html` uses smooth scrolling when motion is allowed.

Under `prefers-reduced-motion: reduce`, smooth scrolling is removed, transitions and animations are effectively disabled, and revealed content is made immediately visible. Reduced-motion treatment must remove movement, never information. Hover, focus and press states must still change appearance instantly.

The current `.reveal` baseline is hidden until client JavaScript marks it visible. Treat no-JavaScript visibility as a known verification risk whenever `Reveal` is changed.

## Accessibility and responsive QA

- Maintain WCAG AA: 4.5:1 for normal text and 3:1 for essential component boundaries, focus indicators and meaningful graphical objects.
- Preserve the skip link, one `h1` per page, each `main` landmark and logical heading order.
- Every link, button and input must remain keyboard-operable with a visible focus state.
- Do not make information available through hover alone. Touch and keyboard users need equivalent feedback.
- Preserve `aria-current` in navigation, `aria-expanded` and Escape handling in the mobile menu, and the `aria-live` results count in the reading archive.
- Test responsive work at 390px, 768px and 1440px.
- At each width, `document.documentElement.scrollWidth > window.innerWidth` must be false.
- Any new image requires accurate `alt` text, or `aria-hidden="true"` when it is purely decorative.

The current reading archive is an inline search and category-filter interface backed by `lib/reading-data.ts`. It has no quote dialog, modal or focus trap. Preserve its category totals, search, favourite markers and reread data; do not alter titles, creators, years or markers without verified source data.

## Branch, review and deployment workflow

Never commit or push directly to `main`.

1. Refresh the latest `main` and create a focused branch named `feat/<slug>`, `fix/<slug>`, `content/<slug>`, `style/<slug>`, `a11y/<slug>` or `docs/<slug>`.
2. Make the smallest possible diff. Do not reformat, reorder or tidy unrelated code.
3. Use conventional, imperative commit messages with one concern per commit.
4. Run the required checks:
   - `npm ci`
   - `npm run check:copy`
   - `npm run lint`
   - `npm run build`
   - `npm run verify:static`
5. Use `npm run build:sandbox` instead of `npm run build` only when the environment is memory-constrained, and disclose the substitution.
6. Open a pull request against `main` and stop. Kris reviews and approves the merge.
7. Do not merge, enable auto-merge, force-push, rewrite history, delete branches or change repository settings unless Kris explicitly asks.
8. Merging to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, checks copy and TypeScript, builds the static export, assembles the preserved Laws of Human Nature route, verifies `out/` and deploys through GitHub Pages.

## Before committing

For every change:

1. Verify the current role and all factual claims remain accurate.
2. Search the diff for a residential address, credentials, secrets and private data.
3. Confirm no unrelated files or stray edits are present.
4. Review the complete diff.

For visual or interactive work, also:

1. Confirm the page renders and the browser console is clean.
2. Test 390px, 768px and 1440px with no horizontal overflow.
3. Walk the keyboard path through everything touched and confirm visible focus.
4. Check reduced-motion behaviour.
5. Recalculate contrast if any colour, text or background changes.
6. Report pre-existing failures without silently fixing them.

## Publication gates

`NEEDS-CONFIRMATION.md` is the source of truth for missing evidence, approvals and public-safe artifacts. Never act on a publication gate unless Kris names it.

## Commit examples

```text
docs: align repository guidance with Next.js
content: add a verified digital project
style: tighten the roadmap layout on mobile
fix: prevent overflow in the contact links
a11y: improve focus visibility
```
