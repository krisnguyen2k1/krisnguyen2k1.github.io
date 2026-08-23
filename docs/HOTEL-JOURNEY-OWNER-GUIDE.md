# Hotel Journey website owner guide

## Access model

The public website is intentionally read-only. It has no editor, checkbox, sign-in form or browser-side write function.

Only GitHub users with `write`, `maintain` or `admin` access to the repository can change the published content. Keep the repository collaborator list restricted to your own account if you want sole edit control.

Do not add a password directly to the HTML or JavaScript. A static GitHub Pages website cannot safely hide a password or secret from visitors.

## Add or remove a property

1. Open `public/hotel-journey/hotels.json` in the GitHub repository.
2. Select the pencil icon to edit.
3. Add, update or remove one hotel object while preserving valid JSON syntax.
4. Commit the change to the `main` branch.
5. The existing GitHub Pages workflow will rebuild and publish the website automatically.

Each property uses this structure:

```json
{
  "name": "Hotel name",
  "destination": "Destination",
  "brand": "Brand",
  "group": "International hotel group",
  "tier": "Luxury",
  "setting": "Beach resort"
}
```

## Publication path

The source files live in:

`public/hotel-journey/`

The expected public URL is:

`https://krisnguyen2k1.github.io/hotel-journey/`

## Content note

The initial 18-property collection was transcribed from the checked entries in the six screenshots supplied on 23 August 2026. The chandelier photograph guided the color palette only and is not published on the website.

