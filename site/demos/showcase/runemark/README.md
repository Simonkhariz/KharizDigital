# Runemark

Concept landing page for a fictional control plane for AI agents. Off-white and near-black bands inside an
orange frame, a numbered left gutter, hairline grids, grotesk headings (Geist) with pixel-font accent words
(VT323), mono labels (Geist Mono) and isometric line illustrations drawn in SVG.

- Route: `/demos/runemark` (`app/(showcase-runemark)/demos/runemark/`)
- Components: `demos/showcase/runemark/components/`
- Content and demonstration data: `demos/showcase/runemark/data/content.ts`
- Tokens and reset: `demos/showcase/runemark/styles/base.css` (scoped to `html[data-showcase="runemark"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/runemark`.

## Notes

- The run diagram (`Pipeline.tsx`) is HTML on a 14 x 5 grid; the highlight walks along the stages, pauses on
  hover, and a stage can be selected. The pixel dissolve is generated from a deterministic noise function.
- The isometric cubes, server stack and nested squares are SVG (`Art.tsx`). The footer wordmark is drawn on a
  small canvas and scaled up without smoothing.
- Every call to action opens one shared dialog (`Dialogs.tsx`) through a `data-rm-open` attribute.
- Styles are plain CSS with `rm-` prefixed class names.

## Limitations

- All content, prices and figures are demonstration data. Forms validate and confirm, but nothing is sent.
- The reference design shows a carousel of customer quotes. It is rebuilt as a carousel of use-case cards,
  because a concept site should not attribute quotes to invented people.
- Docs, legal pages and the SDK do not exist; those links open a short notice or scroll to the code section.
- Company names in the logo row are invented.
