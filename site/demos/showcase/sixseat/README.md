# Sixseat

Concept landing page for a fictional product that puts agent runs in shared, live sessions. Cool off-white
sheet inside a green felt frame, bookish serif headlines (Source Serif 4) over a plain sans, square-cornered
dark buttons, and isometric cubes with coloured tops and named cursor labels.

- Route: `/demos/sixseat` (`app/(showcase-sixseat)/demos/sixseat/`)
- Components: `demos/showcase/sixseat/components/`
- Content and demonstration data: `demos/showcase/sixseat/data/content.ts`
- Tokens and reset: `demos/showcase/sixseat/styles/base.css` (scoped to `html[data-showcase="sixseat"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/sixseat` (or the port the dev server
reports).

## Notes

- Every cube is one SVG component (`Cube.tsx`) with options for the top colour, a face icon, an empty
  "ghost" seat and a board tile. No raster images are used.
- The "Three layers" section holds a simulated session: steps arrive on a timer, and the visitor can take
  a seat, leave a steering note (validated), pause, take the handoff, hand it back and restart.
- The seat comparison can be replayed, use cases are tabs, blog entries expand, the FAQ is an accordion,
  and every call to action opens one shared dialog (`Dialogs.tsx`) through a `data-sx-open` attribute.

## Limitations

- The session is scripted demonstration data. Nothing is sent anywhere, and forms only confirm.
- Company names in the marquee, people, prices and release notes are invented.
- On small screens the hero cubes sit in a row above the headline and the cursor labels are hidden.
