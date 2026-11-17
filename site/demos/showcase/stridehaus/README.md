# Stridehaus

Concept landing page for a fictional training app for athletes and coaches. Blurred stadium photograph, dark
floating pill navigation, lime-green buttons, an orange phone holding a working app preview, grey bento
cards with overlaid interface chips and a giant condensed wordmark (Anton) behind an athlete cut-out.

- Route: `/demos/stridehaus/` (`app/(showcase-stridehaus)/demos/stridehaus/`)
- Components: `demos/showcase/stridehaus/components/`
- Content and demonstration data: `demos/showcase/stridehaus/data/` (`content.ts`, and `app.ts` for the phone)
- Tokens and reset: `demos/showcase/stridehaus/styles/base.css` (scoped to `html[data-showcase="stridehaus"]`)
- Assets: `public/showcase/stridehaus/`

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/stridehaus/`.

## Notes

- The phone is HTML and CSS. Its three tabs work: Today shows load for the week, Log adds a session (and
  the new load appears on Today), Insights compares today with the seven-day average.
- The stride-score section is a live calculator, the coach board filters and sorts, kudos buttons toggle,
  pricing switches between monthly and yearly, and the join form validates and confirms.
- Photography: `hero-stadium-track.webp` (stadium and track, blurred in CSS, also behind the join form),
  `javelin-blue-sky.webp`, `sprinter-start-overhead.webp` and `runner-track-bend.webp` (bento cards),
  `runner-track-infield.webp` (cover of the phone's Today tab) and `runner-back-cutout.webp` (a runner lifted
  from his background as a transparent cut-out for the wordmark band). All are Unsplash photographs; sources
  are listed in `docs/image-credits/stridehaus.md`.
- Styles are plain CSS files with `sh-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All athletes, sessions, scores and prices are demonstration data. Nothing is sent or stored.
- The reference fills the phone with a photograph of a sprinter. Here the phone holds the working app
  preview, with a track photograph as the cover of its Today tab.
- The wordmark band uses a colour cut-out of a runner seen from behind rather than the reference's javelin
  thrower facing the camera: photographs were chosen so that no athlete is identifiable and no kit logo is
  legible.
- Device types are generic labels, not named products.
