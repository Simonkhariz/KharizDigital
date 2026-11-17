# Khariz Digital

Web Development Agency. Crafting Digital Experiences.

## What is in this folder

| Folder / file | What it is | Goes on the server? |
|---|---|---|
| `upload/` | **The finished website.** Made by `npm run package`. | **Yes: its contents go into `public_html`.** |
| `khariz-digital-upload.zip` | The same files as `upload/`, as one archive for the host's File Manager. | Yes (upload, extract, delete). |
| `site/` | The source code of the website: agency pages and all demo websites. Edit here. | No |
| `webild-sites/` | The 23 Webild template websites as their own stand-alone app, for reuse in client projects. See its `README.md`. | No |
| `Dashboard/` | The two dashboard builds you supplied (Kravio, Elera). Kravio is also copied into the site. | No |
| `DEPLOY-CPANEL.md` | Step-by-step guide to putting the site on cPanel shared hosting. | No |
| `docs/` | Guides: content editing, design tokens, inventory, handover. | No |
| `source-material/` | The originals everything was built from: design pictures, the template bundle, logo files, the brief. Keep; do not edit. | No |

## Deploy to shared hosting

```bash
cd site
npm install          # first time only
npm run package      # builds the site into ../upload and ../khariz-digital-upload.zip
```

Then upload the contents of `upload/` (or the zip) into `public_html`.
Full steps, including the site address setting and the https switch, are in
`DEPLOY-CPANEL.md`.

The site is plain files: it needs no Node.js, PHP or database on the server.

## Work on the site

```bash
cd site
npm run dev          # http://localhost:3000, updates as you edit
npm run preview      # serves the packaged site from ../upload at http://localhost:3000
```

## How the pages connect

- `/` shows the featured projects; `/work/` shows all of them, with a search
  box, category filters and pages.
- A project card opens the project page, `/work/<slug>/`.
- "View website" opens the working demo, `/demos/<slug>/` (Elera opens its
  live address in a new tab).
- Every demo has a small "Khariz Digital" link in its bottom-left corner that
  returns to its project page.

## Guides

- `DEPLOY-CPANEL.md` — putting the site online and updating it.
- `docs/content-editing-guide.md` — projects, services, FAQ, founder, contact
  details, testimonials.
- `docs/design-tokens.md` — colours, type, spacing.
- `docs/handover.md` — what exists, what was tested, what is still open.
- `docs/portfolio-inventory.md` — every source picture and template.
