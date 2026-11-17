# Magmashield

Concept landing page for a fictional cybersecurity product. A full-bleed hero on a grey gradient sky, an
uppercase pixel headline (DotGothic16), a pink square button, dark boxed navigation with a hover highlight,
a dark mountain with glowing magenta and orange flows, and a dark logo strip.

- Route: `/demos/magmashield` (`app/(showcase-magmashield)/demos/magmashield/`)
- Components: `demos/showcase/magmashield/components/`
- Content and demonstration data: `demos/showcase/magmashield/data/content.ts`
- Tokens and reset: `demos/showcase/magmashield/styles/base.css` (scoped to `html[data-showcase="magmashield"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/magmashield`.

## Notes

- `Mountain.tsx` shows a real photograph of an eroded ridge (`public/showcase/magmashield/mountain-ridge.webp`),
  pre-processed into a cut-out with a navy and cyan duotone. The glowing flows, the dot matrix and the
  dark foot are CSS layers masked by the same file: gradients with `mask-composite` and the colour-dodge
  and screen blend modes. It is reused in the closing section. Image credits: `docs/image-credits/magmashield.md`.
- The platform console (`ThreatFeed`) streams demonstration incidents, can be paused, and shows details
  for the selected incident. Use cases are a keyboard-accessible tab list. Pricing has a billing switch.
- Calls to action open one shared dialog through a `data-ms-open` attribute.
- Styles are plain CSS with `ms-` prefixed class names.

## Limitations

- Only the hero and logo strip exist in the reference; every section below it was designed to match.
- The reference mountain is a 3D wireframe render. This one is a photograph of a real ridge with the
  glow added in CSS, so the peak has a different shape (a capped rock spire), there are no wireframe
  lines, and the photo is stretched about 1.3 times horizontally in the hero to give a gentler slope.
- All content, prices and figures are demonstration data. Forms validate and confirm, but nothing is sent.
- Company names in the logo strip are invented and set in type; documentation, status and legal links
  open a short notice.
