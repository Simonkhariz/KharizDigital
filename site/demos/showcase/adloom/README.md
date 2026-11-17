# Adloom

Concept landing page for a fictional ad creative studio for social commerce. One page, served at `/demos/adloom`.

## Structure

- `app/(showcase-adloom)/demos/adloom/` holds the root layout (fonts, metadata) and the page.
- `demos/showcase/adloom/components/` holds one component per section, each with its own stylesheet.
- `demos/showcase/adloom/data/` holds all copy, navigation, pricing and the studio mock data.
- `demos/showcase/adloom/styles/base.css` holds the reset and design tokens, scoped to `html[data-showcase="adloom"]`.
- `public/showcase/adloom/preview/` holds the two preview screenshots.

## Run

From `site/`, run `npm run dev` and open `/demos/adloom`.

## Interactions

- Header dropdown menus, mobile menu and a login dialog (all close on Escape).
- The studio window in the hero: sidebar views, conversation history, an editable brief with mention highlighting, model select, format chips and a simulated generation run.
- Platform tabs (arrow keys supported), monthly and annual pricing, FAQ accordion, workspace request form with validation.

## Limitations

- All content, prices and figures are demonstration data. Forms send nothing.
- Ad concept tiles are SVG illustrations, not photography.
- Component styles are plain stylesheets with `al-<component>-` class prefixes rather than CSS Modules. In this app the Turbopack `*.css` rule in `next.config.ts` renames `*.module.css` output, so module imports resolve to an empty object.
