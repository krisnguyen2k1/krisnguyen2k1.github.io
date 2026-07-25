# NEEDS-CONFIRMATION.md — improvement pass v2

Items raised in `CLAUDE.md`'s "Known open items" and in `AUDIT.md`, decided or still pending
as of this PR. Per the working rules, none of these were acted on unilaterally — everything
here either reflects a decision you already made in this thread, or is still waiting on you.

---

## Resolved this pass

**1. Bilingual system (`CLAUDE.md` open item)** — **decided: stripped.**
Confirmed in `AUDIT.md` §4 that it was 100% dead (zero live `.vi` elements, no toggle, ~140
lines of unreachable CSS, a fully-downloaded unused Be Vietnam Pro font family). Removed in
its own commit so it can be reverted alone if you change your mind. `CLAUDE.md`'s Type rule
and "Known open items" both updated to match.

**2. Background portrait (`CLAUDE.md` open item)** — **decided: kept.**
Deliberate choice, no code change. `CLAUDE.md` updated to record this as settled rather than
an open judgement call.

---

## Still open — your call

**3. No photograph of Kris on the site.**
Still true; none added, none sourced. If you supply one, my recommendation for placement:
the background-portrait slot (`#ata`) is already built for exactly this kind of fixed,
faded, left-margin treatment and is hidden below 1180px — a real photo could either replace
the Atatürk portrait in that same slot, or sit as a small, deliberately unglamorous headshot
near the hero (not a hero-filling photo — the site's whole language is text-first). I have
not sourced a stock image and will not.

**4. No downloadable CV.**
Still true; none fabricated. If you supply a PDF, the natural place is a new row in the
Contact section's `.links` list (same pattern as LinkedIn/Facebook/Phone/Email — an icon, a
label, a value) — that's a five-minute addition once the file exists. No placeholder link
has been added because a dead link is worse than no link.

**5. The Evidence section has no metrics.**
Still true; none invented. Of the six projects listed, the ones most likely to carry a
defensible number without touching anything confidential:
- **Role-based learning paths** — you already state "nineteen associates" mapped; a
  completion-rate or time-to-map number would strengthen this one most, if you have it.
- **Certified Departmental Trainer workshop** — "three sessions, eleven nominated trainers"
  is already a number; a completion or satisfaction figure would round it out.
- **Marriott Culture Week** — attendance or participation-rate, if you tracked it.

The other three (operating manual, daily stand-up, AI workflow) are harder to put an honest
number on without over-claiming — I'd leave those as qualitative unless you have something
specific. Tell me which numbers you actually have and I'll place them; I won't estimate.

**6. The Study section lists a UEH HRM master's as "Enrolling."**
Confirm this is the programme actually chosen before it ships as anything more definite.

---

## Also flagged this pass, not part of the original six

**7. BA Psychology card status (`AUDIT.md` §8).**
The card showed "Completed" against dates `08/2024 — 09/2026`, with the end date still in
the future relative to today. You confirmed: coursework is done, degree conferral is
pending, and the dates are correct as printed. Proposed wording is in the PR description /
chat — waiting on your go-ahead for the exact label before I change the chip text.

**8. Toolkit chip accessibility pattern.**
You asked for a demo on one chip before I touch the other ~49. Also in the PR
description / chat, waiting on your go-ahead.
