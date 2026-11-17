# Courierly

Concept landing page for a fictional email-sending platform with a REST API. White page with a faint grid,
one cobalt-blue accent, stippled blue panels, compact grotesk headings (Manrope), square icon tiles and
white cards on pale trays.

- Route: `/demos/courierly/` (`app/(showcase-courierly)/demos/courierly/`)
- Components: `demos/showcase/courierly/components/`
- Content and demonstration data: `demos/showcase/courierly/data/content.ts`
- Tokens and reset: `demos/showcase/courierly/styles/base.css` (scoped to `html[data-showcase="courierly"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/courierly/`.

## Notes

- The stippled artwork in the hero and behind the pricing cards is a real photograph of two hands holding a star,
  converted to a two-blue noise stipple and saved as lossless WebP (`StippleArt` in `components/Art.tsx`, files in
  `public/showcase/courierly/`, source in `docs/image-credits/courierly.md`). The flat grain panels (`Grain`) are
  inline SVG with `feTurbulence`.
- Navigation dropdowns, the hero slider, the segment chips and the API request/response tabs are interactive.
- Every call to action opens one shared `<dialog>` (`Dialogs.tsx`) through a `data-co-open` attribute: sign in,
  sign up (with the plan preselected), contact, an Enterprise price estimate and a three-step product demo.
- Styles are plain CSS with `co-` prefixed class names, because this app's CSS pipeline does not support
  CSS Modules.

## Limitations

- All content, prices (in naira) and figures are demonstration data. Forms validate and confirm, but nothing
  is sent and no account is created. The API host and keys are placeholders.
- The stippled photograph (hands holding one large star) is a different picture from the reference's hands and
  stars, so the shapes behind the hero slider and the pricing cards do not line up with the reference exactly.
- The hero slider shows illustrative notes attributed to roles instead of named customer testimonials.
- An "API" section was added between the tools and the steps; it is not in the reference.
