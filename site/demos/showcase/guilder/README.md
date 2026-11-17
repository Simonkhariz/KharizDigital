# Guilder

Concept landing page for a fictional stablecoin business account. Deep green hero with a halftone
banknote-style portrait, cream body inside a green felt frame, serif headlines (Newsreader) with a gold or
green italic second line, gold pill buttons and four product panels that hold working banking UI.

- Route: `/demos/guilder` (`app/(showcase-guilder)/demos/guilder/`)
- Components: `demos/showcase/guilder/components/`
- Content and demonstration data: `demos/showcase/guilder/data/content.ts`
- Tokens and reset: `demos/showcase/guilder/styles/base.css` (scoped to `html[data-showcase="guilder"]`)
- Artwork: `public/showcase/guilder/halftone-portrait.webp`

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/guilder` (or the port the dev server
reports).

## Notes

- The four panels are interactive: Send recalculates the amount received for each recipient and currency
  and ends in a demo confirmation; Receive switches between USD, EUR and digital-dollar details and copies
  them; Hold switches yield on and off; Spend freezes and unfreezes cards.
- The API examples, the monthly calculator, the journal entries and the FAQ are interactive. Every call to
  action opens one shared dialog (`Dialogs.tsx`) through a `data-gd-open` attribute.
- The halftone portrait is a close crop of a public-domain 19th-century engraved portrait of an unidentified man
  (Rijksmuseum, CC0), redrawn as a dot screen. It is not taken from a banknote; the source is listed in
  `docs/image-credits/guilder.md`.

## Limitations

- Guilder is not a real institution. Balances, rates, fees, licences and account numbers are demonstration
  data, and no money moves. Forms validate and confirm, but nothing is sent.
- Names of real regulators, card networks and stablecoins that appeared in the reference were replaced
  with neutral wording.
