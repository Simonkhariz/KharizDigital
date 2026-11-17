# Petalform

Concept landing page for a fictional SEO content generator. White page, a saturated sky-blue hero with
poppies photographed against the sky, tight geometric headlines (Manrope), Inter body text, and white or translucent
pill buttons.

- Route: `/demos/petalform` (`app/(showcase-petalform)/demos/petalform/`)
- Components: `demos/showcase/petalform/components/`
- Content and demonstration data: `demos/showcase/petalform/data/`
- Tokens and reset: `demos/showcase/petalform/styles/base.css` (scoped to `html[data-showcase="petalform"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/petalform` (or the port the dev server reports).

## Notes

- The hero, the closing call to action and the four content-type cards use photographs stored in
  `public/showcase/petalform/` (sources and licences in `docs/image-credits/petalform.md`). The hero photo was
  lightened slightly so its sky sits closer to the page blue.
- Interactive: mobile menu, sign-in dialog, outline generator, billing switch, FAQ accordion and the sign-up
  form, which picks up the plan chosen in the pricing section.
- Styles are plain CSS with `pf-` prefixed class names, because this app's CSS pipeline does not support
  CSS Modules.

## Limitations

- The reference uses staged, surreal flower photography (a traffic light filled with flowers, a runner and a
  cyclist with bouquets). No free equivalent exists, so ordinary flower photographs with a similar palette
  stand in: the hero has no traffic light, and the cards show a bouquet portrait, a bicycle basket, a
  mailbox and a window box.
- All content, prices and figures are demonstration data. The generator output is canned and derived from
  the text you type; forms validate and confirm, but nothing is sent.
- The product is presented as an SEO content tool throughout (the reference mixed SEO and ad-creative copy).
