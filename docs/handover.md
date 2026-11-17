# Handover

## What exists

One Next.js app, `site/` (Next.js 16, React 19, TypeScript, Tailwind CSS 4),
exported as static files for shared hosting:

- **Agency pages**: home, work gallery, 65 project pages, services, about,
  contact, plus sitemap, robots file, 404 page and social sharing image.
  Layout, type, spacing and motion follow nasibov.me; the content is Khariz
  Digital's.
- **55 working demo websites** under `/demos/`:
  - 23 rebuilt as readable source from the compiled template bundle
    (`site/demos/templates/`).
  - 32 rebuilt from the design pictures (`site/demos/showcase/`). Three of
    them also contain a full application page that is listed as its own
    project: the Closient sales dashboard, the Denarius finance app and the
    Swiftlet mail client.
- **2 supplied dashboards**: Kravio (its build is hosted inside the site at
  `/demos/kravio/`) and Elera (linked to its live address,
  `https://nazday-elera.vercel.app`, because its build expects to run at the
  root of a domain and breaks inside a sub-folder).
- **8 branding entries** made from logos on nasibov.me's logofolio (six
  single logos and a collection of twelve), used on the owner's statement
  that he has permission and worked on some of them.
- **Documents** (`docs/`).

## Gallery categories

| Category | Projects |
|---|---|
| Web Design | 17 |
| Web Development | 11 |
| Landing Pages | 25 |
| Web Applications | 3 |
| Dashboards | 3 |
| Branding & Logo Design | 8 |

## Architecture

- Projects are defined once, in `site/content/projects.ts`. The home page
  shows published projects marked `featured`; `/work/` shows every published
  project; `/work/<slug>/` is generated per project.
- Each project's "View website" link opens its demo at `demoPath`
  (`/demos/<slug>/`). Work without a website, such as a logo, has no
  `demoPath` and shows no link. Every demo carries a "Khariz Digital" link
  back to its project page.
- The agency pages, the template-based demos and each picture-based demo
  have their own page shell and stylesheet (separate route groups in
  `site/app/`), so their styles and fonts never mix.
- The site is a static export (`output: "export"`): `npm run package` writes
  the finished files to `upload/`. The gallery's filter and pagination run
  in the browser and keep their state in the address.
- Agency images are kept as originals in `site/media/` and published as
  WebP in three sizes by `npm run images`.

The 23 template websites also exist as a stand-alone app in
`webild-sites/` (same code, without the agency site) for reuse in client
work. It is a copy: a change made in one place is not made in the other.

Routes and folders are listed in `site/README.md`; each demo has its own
`README.md`.

## Brand

- Accent orange: `#f05a3c`, taken from khariz.vercel.app. Used only for small
  indicators (see `docs/design-tokens.md`).
- Logo: the star mark from `logos/` beside the name set in type.

## Contact behaviour

- "Start a project" (for clients), "Collaborate with us" (for developers and
  creators) and the contact form open WhatsApp
  (`+234 802 289 9964`) with a prefilled, URL-encoded message.
- Email is the secondary option; X, Telegram and TikTok are in the footer,
  the about page and the contact page.
- Everything is defined once, in `site/content/contact.ts`.

## What was tested

In a real browser (Chrome), on the exported site served as static files:

- Agency pages at 1440, 768 and 390 px: no console errors, broken images or
  sideways scrolling; one `h1` per page; the footer wordmark spans the
  footer exactly at each width.
- Gallery: the search box finds projects by name, type or technology and
  keeps its words in the address; every category has projects; filter and pagination change the
  grid without a reload and survive a refresh; out-of-range pages, unknown
  categories and non-numeric pages are corrected.
- The journey home, gallery, project page, demo and back again, including
  the dashboard's and a template demo's back links.
- The 404 page, mobile menu (open, Escape), FAQ, contact form validation and
  its WhatsApp message.
- Demo pages at 1440 and 390 px: no console errors, failed requests, broken
  images or sideways scrolling. The picture-based demos also had their
  interactions exercised by script when they were built.
- Mobile and tablet: every demo page was reviewed and corrected at phone
  widths, and the template demos at tablet widths. A final automated pass
  loaded every demo page at 360, 390, 768, 1024 and 1440 px (305 page views)
  with no errors, broken images or sideways scrolling.
- Every internal link and image address on the agency pages was checked
  against the packaged files (706 addresses, none missing).
- `npm run build` and `npm run lint` pass.

Not tested: real phones and tablets (checks used a desktop browser set to
phone sizes), a real shared-hosting server (the `.htaccess` rules are standard
but unverified on your host), Safari and Firefox, screen readers, real
phones, and the template demos' carousels, hover states and drag
interactions.

## Remaining items

Needed from the owner before going live:

1. **Site address.** Put `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in
   `site/.env.production` and run `npm run package` again, so the sitemap
   and sharing images use the real address.
2. **Testimonials.** None are published and the section is hidden. Invented
   reviews were not written. Add genuine ones in
   `site/content/testimonials.ts`.
3. **Background films.** The hero film (`site/public/hero-shadows.*`,
   `hero-poster.jpg`) and the about-page film (`about-water-3*`) are the
   reference site's own files, kept at the owner's request. Two of the three
   service line drawings also come from the reference site.
4. **Logo work.** The branding entries use logos from nasibov.me. Keep only
   the ones you are entitled to show.
5. **Copy review.** Service descriptions, approach steps, FAQ answers and
   the founder biography were written without promising prices, timelines or
   policies. Confirm or replace them.

Known limitations:

- **Picture-based demos: imagery.** Eighteen demos use real photographs and
  public-domain paintings sourced online (Unsplash, plus CC0 and public
  domain files); sources are recorded in `docs/image-credits/`. They match
  the references in subject, colour and composition, not picture for
  picture: for example Driftlayer shows a photographed person where the
  reference has a 3D character, and Petalform shows poppies rather than a
  flower-filled traffic light. A few items are still drawn: Aerelle's hero
  bottles and product range, and the line illustrations in Agentway,
  Arcwright and Sixseat (which are illustrations in the references too).
- **Sections beyond the reference were designed, not copied.** Most
  references show only a hero or part of a page; the rest of each site was
  designed in the same style.
- **Fictional names.** The picture-based demos use invented brand names in
  place of the real companies in the screenshots. The names have not been
  trademark-checked.
- **Size.** The upload is about 150 MB, mostly the template demos' stock
  images and video. One video alone is 21 MB
  (`public/images/landscaping-services/about-video.mp4`).
- **Category choices.** Projects were sorted into Web Design, Web
  Development and Landing Pages by judgement; change any project's
  `category` in `site/content/projects.ts`.
- **Template licence.** The 23 template demos derive from a commercial
  template product (Webild); the owner holds the licence.
- **Template demos.** Three differ slightly from the original bundle
  (coffee-shop and boutique-hotel title sizes; the luxury-real-estate film
  advancing with scroll). Their copy, including quotes attributed to
  fictional people, is the templates' own demonstration content. Links with
  no destination scroll to the contact section.
- **Forms.** No form sends data anywhere. The agency form opens WhatsApp;
  demo forms show a confirmation only.
- **Nothing is committed.** The app has only its scaffold commit.
- **Must sit at a domain root.** Links and images use addresses that start
  at `/`, so the site cannot live in a sub-folder.

## Build and deployment

See the root `README.md` and `DEPLOY-CPANEL.md`.
