# Meadowline

Concept landing page for a fictional workflow-automation service. Cream and orange palette, condensed serif
headlines (Instrument Serif) with one italic orange word, Manrope body text, storybook alpine landscapes and
frosted-glass panels.

- Route: `/demos/meadowline` (`app/(showcase-meadowline)/demos/meadowline/`)
- Components: `demos/showcase/meadowline/components/`
- Content and demonstration data: `demos/showcase/meadowline/data/`
- Tokens and reset: `demos/showcase/meadowline/styles/base.css` (scoped to `html[data-showcase="meadowline"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/meadowline` (or the port the dev server reports).

## Notes

- Every landscape is a photograph placed by `components/Scene.tsx`; `data/palettes.ts` maps each mood
  (golden, spring, lake, mist and so on) to a file in `public/showcase/meadowline/`. The pictures were given a
  soft glow and, for the pale card backdrops, a single-colour tint before export. Sources and licences are in
  `docs/image-credits/meadowline.md`. The butterflies are animated SVG.
- Styles are plain CSS files with `ml-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.
- Interactive: mobile menu, goal views, assistant chat, add-task form, team picker, use-case tabs, source
  connector, inbox review, pricing switch, article dialog, FAQ accordion, contact form.

## Limitations

- All content, prices and figures are demonstration data. Forms validate and confirm, but send nothing.
- The reference uses painted, storybook-style alpine scenes. Here they are real alpine photographs with a
  soft glow, so the look is photographic rather than painted, and the compositions differ from the reference.
- Client names in the logo strip are invented and set in type.
