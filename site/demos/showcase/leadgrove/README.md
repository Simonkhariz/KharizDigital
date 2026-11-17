# Leadgrove

Concept one-page website for a fictional sales-automation platform. Cream page, light serif headlines
(Fraunces), orange pill buttons and icon discs, a green textured insight panel with frosted stat widgets and a
near-black process panel.

- Route: `/demos/leadgrove/` (`app/(showcase-leadgrove)/demos/leadgrove/`)
- Components: `demos/showcase/leadgrove/components/`
- Content and demonstration figures: `demos/showcase/leadgrove/data/content.ts`
- Tokens and reset: `demos/showcase/leadgrove/styles/base.css` (scoped to `html[data-showcase="leadgrove"]`,
  classes prefixed `lg-`)
- Assets: `public/showcase/leadgrove/` (`green-motion.webp` texture and three small avatars; sources and licences in
  `docs/image-credits/leadgrove.md`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/leadgrove/`.

## Notes

- The reference shows only three mid-page sections (insight panel, process panel, statement). The navigation,
  hero, platform cards, pricing, questions, trial form and footer were designed to match.
- The green texture is a motion-blurred photograph of foliage, darkened and rotated. The reference shows a
  sharper aerial-style green texture; this is a close stand-in, not the same picture.
- The widget stack is live: metric tabs (arrow keys work), the benefit timeline and the export button all respond.

## Limitations

- All figures and prices are demonstration data. The trial form validates and confirms, but nothing is sent
  and "Export Data" does not download a file.
