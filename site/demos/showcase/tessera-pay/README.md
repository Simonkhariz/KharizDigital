# Tessera Pay

Concept landing page for a fictional payments company that accepts card and crypto payments. Pale blue grid
with soft colour glows, a bold grotesk headline with italic serif words (Inter Tight and Instrument Serif),
glossy dark buttons, floating tiles and three phone mock-ups.

- Route: `/demos/tessera-pay/` (`app/(showcase-tessera-pay)/demos/tessera-pay/`)
- Components: `demos/showcase/tessera-pay/components/`
- Content and demonstration data: `demos/showcase/tessera-pay/data/content.ts`
- Tokens and reset: `demos/showcase/tessera-pay/styles/base.css` (scoped to `html[data-showcase="tessera-pay"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/tessera-pay/`.

## Notes

- The phones are HTML and CSS. The side phones filter their transactions; the centre phone's action buttons
  change the hint below the balance.
- The floating tiles are CSS (stacked shadows for depth) with generic icons, not real coin or network marks.
- Below the hero, the page adds a feature grid, a three-step section with a working checkout mock, use-case
  tabs, pricing with a fee calculator, an FAQ and a closing call to action.
- Calls to action open one shared `<dialog>` through a `data-tp-open` attribute (log in, sign up, talk with us).
- Styles are plain CSS with `tp-` prefixed class names, because this app's CSS pipeline does not support
  CSS Modules.

## Limitations

- Only the hero and the logo strip come from the reference; everything below was designed to match.
- Rates, coverage, balances and company names are demonstration content. No payment can be made, and forms
  send nothing.
- The reference's certification badge and card-network logos were replaced with an invented announcement pill
  and invented names set in type.
