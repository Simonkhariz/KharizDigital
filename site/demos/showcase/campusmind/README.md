# Campusmind

Concept landing page for a fictional assistant platform for universities. White page, light serif headings
(Newsreader), Inter body, blue pill buttons, a full-width campus picture, an institution marquee and
alternating image and text cards.

- Route: `/demos/campusmind/` (`app/(showcase-campusmind)/demos/campusmind/`)
- Components: `demos/showcase/campusmind/components/`
- Content and demonstration data: `demos/showcase/campusmind/data/content.ts`
- Tokens and reset: `demos/showcase/campusmind/styles/base.css` (scoped to `html[data-showcase="campusmind"]`)
- Assets: four photographs in `public/showcase/campusmind/` (`campus-quad.webp`, `reading-room.webp`,
  `lecture-hall.webp`, `library-desk.webp`), credited in `docs/image-credits/campusmind.md`.

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/campusmind/`.

## Notes

- Navigation has two keyboard-accessible dropdowns and a mobile menu (Escape closes both).
- The platform section has three working tabs: a workbench with selectable assistants, agent switches and
  a step-through automation. The pricing section is a live estimator driven by a slider.
- "Login" and "Book a demo" open one shared dialog (`Dialogs.tsx`) through a `data-cm-open` attribute.
- Styles are plain CSS files with `cm-` prefixed class names, because this app's CSS pipeline does not
  support CSS Modules.

## Limitations

- All institutions, figures, prices and assistant answers are demonstration data.
- Forms validate and confirm, but nothing is sent and no account is checked.
- The reference uses photoreal architectural renders of one invented campus. The rebuild uses four real
  photographs instead (a sandstone university building, a library reading room, a lecture hall and a library
  desk; sources in `docs/image-credits/campusmind.md`), so the hero is not the reference's symmetrical quad and
  the buildings differ from card to card.
