# Arcwright

Concept landing page for a fictional agent-automation vendor. Off-white sheet on a grey ground with two
vertical rails and crop marks, a geometric sans (Plus Jakarta Sans) with an orange second headline line,
orange pill buttons, an isometric line illustration and near-black bands.

- Route: `/demos/arcwright/` (`app/(showcase-arcwright)/demos/arcwright/`)
- Components: `demos/showcase/arcwright/components/`
- Content and demonstration data: `demos/showcase/arcwright/data/content.ts`
- Tokens and reset: `demos/showcase/arcwright/styles/base.css` (scoped to `html[data-showcase="arcwright"]`)
- No raster assets: all artwork is SVG drawn in code.

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/arcwright/`.

## Notes

- The hero illustration is built from a small isometric kit (`components/iso.tsx`): rounded plates, boxes
  and wires are placed in ground coordinates and projected. The three agent bars are buttons; selecting
  one lights its wire and changes the "Agents in action" screen and the caption.
- The hero has two drawings sharing one state. `HeroScene.tsx` holds the wide one, shown from 700 px up.
  Below 700 px it is swapped for `HeroSceneCompact.tsx`, a portrait composition on a canvas about as wide
  as a phone (371 units), so its 13 unit labels render at roughly 12 px or more: the screen stands top
  left, the core top right, the sources feed it from the lower left and the agent bars leave it to the
  lower right. The enterprise building is left out there. Icons, the grid and the agent button wrapper
  live in `sceneParts.tsx`. Only the visible drawing is focusable; the other is `display: none`.
- The dark stack of plates uses the same kit.
- Solutions are keyboard-accessible vertical tabs, pricing has a monthly/yearly switch, questions use
  native `details` elements.
- Styles are plain CSS files with `aw-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All content, customer names, prices and figures are demonstration data.
- The demo form validates and confirms, but nothing is sent.
- The reference shows only the hero and the first dark section; every later section was designed to match.
