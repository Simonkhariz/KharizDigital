# Substrata

Concept landing page for a fictional platform that gives agents persistent virtual machines. Black page,
drifting ASCII textures drawn on canvas, a bold white grotesk headline (Inter Tight), white buttons, an
orange mono badge (IBM Plex Mono) and a terminal window.

- Route: `/demos/substrata` (`app/(showcase-substrata)/demos/substrata/`)
- Components: `demos/showcase/substrata/components/`
- Content and demonstration data: `demos/showcase/substrata/data/content.ts`
- Tokens and reset: `demos/showcase/substrata/styles/base.css` (scoped to `html[data-showcase="substrata"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/substrata`.

## Notes

- `Terminal.tsx` types out the boot sequence on load, can be replayed, and then accepts a few commands
  (`help`, `substrata ls`, `substrata snapshot`, `substrata fork`, `substrata sleep`, `clear`).
- `Ascii.tsx` renders the character textures from a value-noise field. It pauses off screen and is static
  when reduced motion is requested.
- The pricing calculator uses the demonstration rates in `data/content.ts`.
- Every call to action opens one shared dialog through a `data-sb-open` attribute.
- Styles are plain CSS with `sb-` prefixed class names.

## Limitations

- All content, prices and figures are demonstration data. Forms validate and confirm, but nothing is sent.
- The terminal is a scripted mock; no machine exists and the URL it prints is not a link.
- The logo row uses simple original glyphs for invented company names.
- Docs, status and legal pages do not exist; those links open a short notice.
