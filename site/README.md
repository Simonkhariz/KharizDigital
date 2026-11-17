# Khariz Digital — website source

One Next.js app (App Router, React, TypeScript, Tailwind CSS v4, Motion)
holding the agency website and the portfolio demo websites. It is exported as
static files, so it can be hosted anywhere, including shared hosting.

## Commands

```bash
npm install
npm run dev       # work on the site at http://localhost:3000
npm run package   # prepare images, build, and write ../upload and ../khariz-digital-upload.zip
npm run preview   # serve ../upload locally to check the packaged site
npm run images    # (re)make the web-sized images from media/
npm run build     # build only, into out/
npm run lint
```

Deployment steps are in `../DEPLOY-CPANEL.md`.

## Routes

| Route | Page |
|---|---|
| `/` | Home: hero, selected work, studio, services, approach, testimonials, founder, questions, collaboration |
| `/work/` | All published projects, with category filter and pagination (`?category=…&page=…`) |
| `/work/<slug>/` | One project, with a link to its demo when it has one |
| `/services/`, `/about/`, `/contact/` | Agency pages |
| `/demos/<slug>/` | A working demo website |
| `/sitemap.xml`, `/robots.txt`, `/404.html` | Generated |

## Structure

```
app/
  (agency)/            agency pages, their layout and globals.css (design tokens)
  (demo-templates)/    demos/[slug]: layout and page for the template-based demos
  (showcase-<slug>)/   demos/<slug>: layout and pages of one picture-based demo
  global-not-found.tsx the 404 page
content/               all agency text and settings (see ../docs/content-editing-guide.md)
lib/projects.ts        project helpers: published and featured lists, demo links, pagination
components/            agency sections and shared pieces (Picture = pre-sized images)
demos/
  templates/<slug>/    one template-based demo: page, theme.css, README
  showcase/<slug>/     one picture-based demo: components, data, styles, README
  components/          sections and UI shared by the template-based demos; DemoBar (back link)
  hooks/, lib/, styles/
media/                 ORIGINAL agency images (project covers, founder photo). Not published.
public/                everything that is published as-is
  projects/, founder/  web-sized copies made by `npm run images`
  brand/               logo files
  images/, showcase/   media used by the demos
  .htaccess            settings for Apache shared hosting
scripts/               optimize-images.mjs, package-site.mjs
out/                   build output (made by `npm run build`)
```

## Why it is fast

- Every page is pre-built HTML; the server only hands out files.
- Moving between agency pages does not reload the browser, and the gallery
  filters and pages change in place.
- Images are WebP in three sizes; the browser picks the smallest that fits,
  and images below the fold load only when needed.
- Fonts are bundled with the site, not fetched from another server.
- `.htaccess` turns on compression and long-lived caching.

Each part of the app has its own page shell and stylesheet, so a demo's
styles never affect the agency pages or another demo.

Design tokens are documented in `../docs/design-tokens.md`.
