# Indigen

Concept landing page for a fictional automation consultancy that builds and operates agents inside a
company's existing systems. White sheet over a painted blue and green backdrop, condensed serif headlines
(Instrument Serif), small tight sans body (Inter), dark rounded-square buttons, hairline rules and an amber
textured stage that holds two product cards.

- Route: `/demos/indigen/` (`app/(showcase-indigen)/demos/indigen/`)
- Components: `demos/showcase/indigen/components/`
- Content and demonstration data: `demos/showcase/indigen/data/`
- Tokens and reset: `demos/showcase/indigen/styles/base.css` (scoped to `html[data-showcase="indigen"]`)
- Artwork: `public/showcase/indigen/painted-backdrop.webp` and `amber-sand.webp` (sources and licences in
  `docs/image-credits/indigen.md`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/indigen/`.

## Notes

- The two cards on the amber stage are HTML and CSS. The workflow timeline replays when it scrolls into
  view (and from its replay button), the conversation follows it, and the command box answers a small set
  of scripted questions.
- The bar graphic in the hero is an SVG drawn from a seeded generator, so it is identical on every render.
- The backdrop combines photographs of two abstract paintings (blue and green brushwork). The amber stage
  is a photograph of rippled sand, graded darker towards the bottom. Neither is the artwork used in the
  reference; they were chosen for similar colour and texture.
- Case studies are keyboard-accessible tabs; questions use native `details` elements.
- Styles are plain CSS files with `ig-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All content, client names, figures and case studies are demonstration data.
- The booking form validates and confirms, but nothing is sent and no call is booked.
- The agent conversation is scripted; it does not call any service.
