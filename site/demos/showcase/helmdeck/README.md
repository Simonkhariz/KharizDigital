# Helmdeck

Concept landing page for a fictional desktop "command center" for engineering teams. Off-white page,
left-aligned grotesk headlines (Space Grotesk), square black buttons, boxed sections and dithered landscape
artwork behind the product mock, the integration panels and the pricing cards.

- Route: `/demos/helmdeck` (`app/(showcase-helmdeck)/demos/helmdeck/`)
- Components: `demos/showcase/helmdeck/components/`
- Content and demonstration data: `demos/showcase/helmdeck/data/`
- Tokens and reset: `demos/showcase/helmdeck/styles/base.css` (scoped to `html[data-showcase="helmdeck"]`)
- Artwork: `public/showcase/helmdeck/dither-a.png` and `dither-b.png`

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/helmdeck` (or the port the dev server reports).

## Notes

- The editor in the hero is built in HTML and CSS and is interactive: sidebar views, file tree and tabs,
  autocomplete, panel tabs, and an assistant whose suggestion can be applied or discarded.
- The dithered artwork is original: it was generated procedurally (noise, an ordered dither and a limited
  palette) and is displayed with `image-rendering: pixelated`.
- Every call to action opens one shared dialog (`Dialogs.tsx`) through a `data-hd-open` attribute.
- Styles are plain CSS files with `hd-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All content, prices and figures are demonstration data. Forms validate and confirm, but nothing is sent,
  no account is created and no file is downloaded.
- The two panels under "Connect your Stack" show integration details and a release note in place of
  customer quotes.
- Client names in the logo strip are invented.
