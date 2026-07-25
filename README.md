# krisnguyen2k1.github.io

Personal portfolio site for **Kris Nguyen (Nguyễn Trung Kiên)** — Learning & Development,
Marriott International, Viet Nam.

**Live:** https://krisnguyen2k1.github.io

A single static page. No build step, no framework, no dependencies. One HTML file plus a
handful of assets, which is the point: it will still open and still deploy in five years.

---

## File structure

```
.
├── index.html                  the entire site — markup, styles and scripts in one file
├── assets/
│   ├── portrait.webp           background portrait (Mustafa Kemal Atatürk), left margin
│   ├── og-image.png            1200×630 preview card for LinkedIn / Facebook / Zalo
│   ├── favicon.svg             browser tab icon
│   ├── apple-touch-icon.png    iOS home-screen icon
│   └── site.webmanifest        icon + theme metadata
├── .nojekyll                   tells GitHub Pages to serve files as-is, no Jekyll build
├── .gitignore                  keeps secrets and local scratch out of the repository
├── CLAUDE.md                   working rules for Claude Code sessions — read this first
└── README.md                   this file
```

The page is organised as ten numbered sections (I–X): Position, Practice, Path, Evidence,
Capability, Toolkit, Study, Reading, Trajectory, Reading list — then Contact.

---

## Preview it locally

Open `index.html` in a browser by double-clicking it. That works for almost everything.

For an exact match with the live site — correct absolute paths, correct manifest, no
`file://` quirks — serve it over HTTP instead:

```bash
cd path/to/krisnguyen2k1.github.io
python3 -m http.server 8000
```

Then visit **http://localhost:8000**. Stop the server with `Ctrl+C`.

---

## How it deploys

GitHub Pages serves the `main` branch from the repository root. There is no pipeline and
nothing to configure per change:

1. Commit your change.
2. Push to `main`.
3. Wait roughly 30–90 seconds.
4. Hard-refresh the live URL (`Ctrl+Shift+R`, or `Cmd+Shift+R` on Mac) to defeat the cache.

Deployment status is visible under the repository's **Actions** tab.

---

## Making future edits

The intended workflow is Claude Code, run from inside this folder. Describe the change in
plain English and let it edit, test and commit:

```bash
cd path/to/krisnguyen2k1.github.io
claude
```

Then, for example: *"Make the hero name smaller and commit it."*

`CLAUDE.md` holds the design and content rules; Claude reads it automatically at the start
of every session, so the site's character survives even months later.

To edit by hand instead: `index.html` is plain HTML with all CSS in one `<style>` block and
all JavaScript in one `<script>` block at the bottom. Section markers are commented in caps
(`<!-- ==================== VI · TOOLKIT ==================== -->`) so they are easy to find.

---

## Rolling back a change you don't want

Every commit is a restore point.

```bash
git log --oneline              # find the commit you want to return to
git revert HEAD                # undo the most recent commit, keeping history honest
git push                       # publish the undo
```

`git revert` is the safe option: it adds a new commit that reverses the old one, so nothing
is lost and nothing needs force-pushing. Recover a single file from an earlier commit with:

```bash
git checkout <commit-hash> -- index.html
```

To preview an old version without changing anything, `git checkout <commit-hash>`, look at
it, then `git switch -` to come back.

---

## Privacy

The site deliberately shows **city-level location only** (Da Nang · Ho Chi Minh City).
The full residential address must never be reintroduced — see `CLAUDE.md`. Phone number and
professional email are published intentionally, because the site exists to be contacted.

---

## Credits

Type: Inter, Be Vietnam Pro and IBM Plex Mono, served from Google Fonts.
Everything else is hand-written.
