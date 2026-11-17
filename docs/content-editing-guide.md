# Content editing guide

All text and settings of the agency website live in `site/content/`. Edit
the file, save, and the pages that use it update. No page component needs to
change for any task below.

| To change | Edit |
|---|---|
| Agency name, slogan, description, navigation, hero text, footer call to action, copyright line | `site/content/site.ts` |
| WhatsApp, email, X, Telegram, TikTok | `site/content/contact.ts` |
| Portfolio projects | `site/content/projects.ts` |
| Gallery categories, projects per page | `site/content/categories.ts` |
| Services | `site/content/services.ts` |
| Our approach | `site/content/approach.ts` |
| Testimonials | `site/content/testimonials.ts` |
| FAQ | `site/content/faqs.ts` |
| Founder | `site/content/founder.ts` |
| About page text | `site/content/about.ts` |

## Portfolio projects

One entry in `site/content/projects.ts` drives the project's card on the
home page, its card in the gallery and its own page at `/work/<slug>`.

### Add a project

1. Put the original images (JPG or PNG) in `site/media/projects/<slug>/`:
   a cover (it is cropped to 4:3 on cards) and any further images for the
   project page.
2. Run `npm run images` in `site/`. It writes web-sized WebP copies into
   `site/public/projects/<slug>/`.
3. Add an entry to the `projects` list. Image paths are written **without a
   file extension**:

```ts
{
  id: "harbour-books",
  title: "Harbour Books",
  slug: "harbour-books",                 // page address: /work/harbour-books/
  description: "Online shop for an independent bookseller.",
  category: "web-development",           // an id from categories.ts
  sourceType: "image-reconstruction",    // internal note only, never shown
  coverImage: { src: "/projects/harbour-books/cover", alt: "Harbour Books home page", width: 2160, height: 1620 },
  galleryImages: [
    { src: "/projects/harbour-books/view-1", alt: "Harbour Books product page", width: 2160, height: 1620 },
  ],
  featured: false,
  published: true,
  year: "2026",
  services: ["Web Design", "Web Development"],
  technologies: ["Next.js", "React", "TypeScript"],
  projectDetails: {
    overview: "What the project is.",
    challenge: "Optional. The problem.",
    solution: "Optional. What we did about it.",
  },
  demoPath: "/demos/harbour-books/",     // its working demo on this site; leave out if there is none
  // liveUrl: "https://…",              // only if a real live site exists
  // coverPosition: "center",           // keep the middle of the cover on cards (default: the top)
  metadata: { Type: "Client project" },  // optional extra facts
}
```

`width` and `height` are the original image's pixel size.

The order of the list is the order projects appear in.

A logo or other work with no website to open simply has no `demoPath`; its
card and page then show no "View website" link.

### Where "View website" goes

- If `liveUrl` is set, the link opens that address.
- Otherwise it opens the demo on this site, at `demoPath`
  (`/demos/<slug>/`).
- Either way it opens in a new tab, so the portfolio stays open behind it.
- With neither, no link is shown.

Only set `liveUrl` for a site that really exists at that address.

### Feature, unpublish, remove

- **Show on the home page:** `featured: true`. Keep this to a handful; the
  home page shows every featured project.
- **Hide everywhere:** `published: false`. The card, the project page and the
  sitemap entry all disappear; the entry stays in the file for later.
- **Remove for good:** delete the entry and its folder in
  `site/public/projects/`.

### Change a project's images

Replace the originals in `site/media/projects/<slug>/` (keep the names), or
add new ones and point `coverImage` / `galleryImages` at them, updating
`width` and `height`. Then run `npm run images`.

### Order, home page and search

- The order of the `projects` list is the order of the gallery. The first
  entries are the home-page set, so they lead the gallery too.
- The home page shows every project with `featured: true`, in list order.
  Currently: Le Cercle, Rapporta, Kravio, Joseph Alexander, Substrata,
  Merydian.
- The search box on `/work/` looks in each project's title, description,
  category, services and technologies. Nothing needs setting up for a new
  project to be found.

### Categories

`site/content/categories.ts` lists the filters shown on `/work`. Each has an
`id` (used in the address, e.g. `/work?category=dashboards`) and a `label`.
Add, rename, reorder or remove entries there. A project's `category` must be
one of the ids. A category with no published projects still appears and shows
an empty state. `PROJECTS_PER_PAGE` in the same file sets the page size.

## Services

`site/content/services.ts`. Each service has a title, a one-line
`description` (home and about lists), a longer `summary` and an `includes`
list (the `/services` page). `drawing` is the line illustration; leave it as
it is unless you are redrawing it. `id` is the anchor used by links such as
`/services#web-design`.

## Our approach

`site/content/approach.ts`: a list of steps, each with a title and a
description. Add, remove or reorder freely; numbering is automatic.

## Testimonials

`site/content/testimonials.ts`. Only entries with `published: true` appear on
the live site. The two entries in the file are placeholders: they show, marked
as placeholders, only while developing (`npm run dev`) and never in a
production build. With no published testimonial the section is left out and
the remaining sections renumber themselves.

To add a real testimonial, with the client's permission:

```ts
{ name: "Ada Obi", company: "Obi Studio", text: "…", avatar: "/testimonials/ada.jpg", projectSlug: "harbour-books", published: true }
```

`avatar` and `projectSlug` are optional.

## FAQ

`site/content/faqs.ts`: a list of `{ question, answer }`. The answers
currently avoid specific prices, timelines and policies; add those once they
are decided.

## Founder

`site/content/founder.ts`: `name`, `role`, `bio` (a list of paragraphs),
`stack` (technologies, written in full), `portfolioUrl` and its label, and
`heading` (for example "The Mind Behind Khariz Digital"). To change the
photo, replace `site/media/founder/simon-ogbu.jpg` and run `npm run images`.

## Contact details

`site/content/contact.ts` is the only place they are written.

- WhatsApp number: `WHATSAPP_NUMBER` (digits only, with country code) and the
  `display` text.
- Prefilled WhatsApp message: `WHATSAPP_MESSAGE`. It is URL-encoded
  automatically.
- Email: `display` and `href`.
- Social links: the `socialLinks` list.
- Address: the `address` block (street, city, country and the one-line
  `full` version used in the footer).

The footer button, the contact form, the footer columns and the contact page
all read from this file.

### Two ways to get in touch

The site speaks to two kinds of visitor, and each has its own words and its
own opening WhatsApp message, set in the `enquiries` block:

- `project` — clients. "Start a project" is the main button in the footer
  and on the About page, and the default choice on the contact form.
- `collaboration` — developers, designers and creators who want to team up.
  It is the smaller "Collaborate with us" link under the footer button and
  the second choice on the contact form.

Change a `label`, `message` or `placeholder` there. The footer's button text
and the "Developer or creator?" line are in `site/content/site.ts`
(`collaboration`).

## Logo and colours

- Logo files: `site/public/brand/`. The header uses `khariz-mark-black.png`
  beside the name set in type. The browser tab icon is `site/app/icon.png`.
- Colours, including the orange accent (`--brand`): `site/app/globals.css`.
  See `docs/design-tokens.md`.

## Demo websites

Each demo's content is edited in `site/demos/`:

- Template-based demos: `site/demos/templates/<slug>/<Name>Template.tsx`
  holds the copy and image paths; `theme.css` beside it holds colours and
  fonts.
- Picture-based demos: `site/demos/showcase/<slug>/data/` holds content;
  `components/` and `styles/` hold the rest.

Every demo folder has a short `README.md`. The "Khariz Digital" back link
shown on every demo is `site/demos/components/DemoBar.tsx`.

After changing a demo's look, refresh its preview images in
`site/media/projects/<slug>/` and run `npm run images`.

## Publishing changes

After any edit, run `npm run package` in `site/` and upload the new files
(see `../DEPLOY-CPANEL.md`).
