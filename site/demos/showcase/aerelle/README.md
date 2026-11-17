# Aerelle

Concept website for a fictional skincare brand with a six-product range. One page, served at `/demos/aerelle`.

## Structure

- `app/(showcase-aerelle)/demos/aerelle/` holds the root layout (fonts, metadata) and the page.
- `demos/showcase/aerelle/components/` holds one component and one stylesheet per section, plus the hero scene (`HeroScene.tsx`) and the SVG product artwork (`Bottles.tsx`, `ProductArt.tsx`).
- `demos/showcase/aerelle/data/` holds products, copy, quiz questions and journal entries.
- `demos/showcase/aerelle/styles/base.css` holds the reset and design tokens, scoped to `html[data-showcase="aerelle"]`.
- `public/showcase/aerelle/` holds the photographs (hero clouds, three image cards, About image). Sources are listed in `docs/image-credits/aerelle.md`.

## Run

From `site/`, run `npm run dev` and open `/demos/aerelle`.

## Interactions

- Navigation scrolls to sections; the mobile menu closes on Escape.
- Collection filter by routine step, add-to-routine with a running total and a demo checkout notice.
- Ingredient explorer, three-question formula quiz with a recommended routine, journal accordion.
- Contact form and newsletter sign-up with validation and demo confirmation states.

## Limitations

- All products, prices and figures are demonstration data. Nothing is sent or stored.
- The reference uses 3D product renders. The hero clouds, the three image cards and the About image are real photographs and renders of unbranded products, so their subjects differ from the reference (jars on a ledge, a dropper bottle and a cream jar among spheres rather than bottles on blocks, a tilted bottle and a jar on water). No free set of matching unbranded bottles was found, so the hero bottles and plinths and the six collection products are still drawn with SVG.
- There are no separate product detail pages.
- Component styles are plain stylesheets with `ae-` class prefixes rather than CSS Modules. In this app the Turbopack `*.css` rule in `next.config.ts` renames `*.module.css` output, so module imports resolve to an empty object.
