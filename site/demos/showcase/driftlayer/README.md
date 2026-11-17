# Driftlayer

Concept landing page for a fictional ambient assistant layer for teams. One page, served at `/demos/driftlayer`.

## Structure

- `app/(showcase-driftlayer)/demos/driftlayer/` holds the root layout (fonts, metadata) and the page.
- `demos/showcase/driftlayer/components/` holds one component and one stylesheet per section, with photographs referenced from `public/showcase/driftlayer/`.
- `demos/showcase/driftlayer/data/content.ts` holds all copy, plans, feed items and journal entries.
- `demos/showcase/driftlayer/styles/base.css` holds the reset and design tokens, scoped to `html[data-showcase="driftlayer"]`.
- `public/showcase/driftlayer/` holds the photographs (hero portrait, three principle cards, three journal covers, early access sky). Sources and licences are listed in `docs/image-credits/driftlayer.md`.

## Run

From `site/`, run `npm run dev` and open `/demos/driftlayer`.

## Interactions

- Floating glass navigation with in-page links; the mobile menu closes on Escape.
- Product feed: approve or dismiss each suggestion, undo, switch on "Run without asking", reset. The minutes counter follows.
- Use case tabs (arrow keys supported), monthly and yearly pricing, journal summaries, FAQ accordion.
- Early access form with validation and a demo confirmation state.

## Limitations

- All content, prices and figures are demonstration data. Nothing is sent or stored.
- The reference uses photoreal 3D renders of a stylised character in a fluffy pink coat. No freely licensed render of that kind was found, so the hero uses a real photograph of a woman in a pale pink jacket against a blue sky with clouds, and the three cards use sky photographs (a single cloud, soap bubbles, dusk clouds) instead of renders of the character, a paper plane and a hammock. The rainbow is a CSS gradient; the soap bubbles of the reference hero are not reproduced.
- The hero wordmark is ten letters instead of five, so each letter is smaller than in the reference.
- Component styles are plain stylesheets with `dl-` class prefixes rather than CSS Modules. In this app the Turbopack `*.css` rule in `next.config.ts` renames `*.module.css` output, so module imports resolve to an empty object.
