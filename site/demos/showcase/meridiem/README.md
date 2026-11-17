# Meridiem

Concept waitlist landing page for a fictional reasoning-model API. All names,
prices, figures and posts are demonstration content.

- Route: `/demos/meridiem` (root layout in `app/(showcase-meridiem)/demos/meridiem/`)
- Run: start the app with `npm run dev` in `site/` and open `/demos/meridiem`

## Structure

- `components/` header with login dialog, the interactive prompt box, page
  sections, pricing toggle, blog reader and waitlist form
- `data/site.ts` typed copy, prompt presets, code samples, plans, posts, FAQs
- `styles/base.css` reset and tokens scoped to `html[data-showcase="meridiem"]`;
  `styles/site.css` component styles with the `md-` class prefix
- `public/showcase/meridiem/meadow-golden-hour.webp` photograph of wildflowers
  at sunset, colour-graded warmer to suit the page (source and licence in
  `docs/image-credits/meridiem.md`)

## Limitations

- The prompt box plays a scripted reasoning trace. No model or API is called,
  and an attached file is never read or uploaded (only its name is shown).
- Forms validate in the browser and end in a demo confirmation.
- The meadow photograph is a stock image chosen for a similar subject and
  light; it is not the picture used in the reference design. The three post
  thumbnails are crops of the same photograph.
- The app's bundler configuration processes every stylesheet as a global file,
  so CSS Modules are not available; prefixed class names are used instead.
