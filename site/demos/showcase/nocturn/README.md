# Nocturn

Concept one-page website for a fictional team workspace assistant that works overnight. Off-white page, a
black hero panel with halftone clouds rising from the bottom, geometric grotesk headlines (Outfit), white and
grey pill buttons and outlined strips of logos and icon tiles.

- Route: `/demos/nocturn/` (`app/(showcase-nocturn)/demos/nocturn/`)
- Components: `demos/showcase/nocturn/components/`
- Content and demonstration data: `demos/showcase/nocturn/data/content.ts`
- Tokens and reset: `demos/showcase/nocturn/styles/base.css` (scoped to `html[data-showcase="nocturn"]`,
  classes prefixed `nc-`)
- Assets: `public/showcase/nocturn/clouds.webp`, a small greyscale cloud photograph that
  `components/Halftone.tsx` samples to draw the halftone on a canvas (credit in `docs/image-credits/nocturn.md`).

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/nocturn/`.

## Notes

- The cloud artwork is a real photograph of cumulus cloud, sampled on a grid and rendered as square dots whose
  size follows the brightness. It drifts slowly, pauses when off screen and stays still when reduced motion is
  requested.
- The two icon-tile strips are tab lists (arrow keys work); choosing a tile explains what Nocturn does there.
- The navigation pill follows the section in view, and the night log can be filtered by kind of work.

## Limitations

- The clouds come from a different photograph than the reference, so their shapes and placement differ.
- Customer names, prices and the night log are demonstration data. The contact form validates and confirms,
  but nothing is sent.
