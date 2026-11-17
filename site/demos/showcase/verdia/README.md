# Verdia

Concept landing page for a fictional health-insights app that reads routine blood tests. Pale lime canvas
around a white sheet, a motion-blurred green runner hero, white pill buttons, small glossy face icons set
inside the headline, and rounded grey cards that hold phone mock-ups.

- Route: `/demos/verdia/` (`app/(showcase-verdia)/demos/verdia/`)
- Components: `demos/showcase/verdia/components/`
- Content and demonstration data: `demos/showcase/verdia/data/content.ts`
- Tokens and reset: `demos/showcase/verdia/styles/base.css` (scoped to `html[data-showcase="verdia"]`)
- Assets: `public/showcase/verdia/hero-runner-motion.webp` and `hills.webp`

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/verdia/`.

## Notes

- Phone screens, score rings, the trend chart and the dial are HTML, CSS and SVG (`Mocks.tsx`).
- Working parts: the language menu, the sample-file upload card in step 1, the marker explorer, the
  biological-age estimator and the "send me the link" form. Download buttons scroll to that form and
  preselect the platform.
- `hero-runner-motion.webp` is a real panning photograph of a trail runner (Unsplash, see
  `docs/image-credits/verdia.md`). It was mirrored and its background given extra motion blur and darkened
  while the runner stays sharp; the olive wash and the darker copy side are CSS. The same file supplies the
  streaked green texture behind the upload step, the age result and the download band. `hills.webp` is a
  stock photograph from the shared folder.
- Styles are plain CSS files with `vd-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All scores, markers, ranges, ratings and review counts are demonstration data. Nothing here is medical
  advice, and the age estimator is a simple illustration, not the method an app like this would use.
- No file is uploaded and no email is sent.
- The reference hero shows a runner facing the camera in a lime jacket. The photograph here shows a runner
  in a lime top from behind, so no one is identifiable. Store buttons use generic labels, not store badges.
