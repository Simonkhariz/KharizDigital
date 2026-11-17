# Stowbox Pricing

Concept pricing site for a fictional cloud-storage product. Near-white background, neutral sans (Inter),
three plan cards with grey header tabs and dashed outlines, a highlighted middle card in black with a
shadow, and black pill buttons.

- Route: `/demos/stowbox-pricing/` (`app/(showcase-stowbox-pricing)/demos/stowbox-pricing/`)
- Components: `demos/showcase/stowbox-pricing/components/Interactive.tsx`
- Plans, prices, comparison rows and questions: `demos/showcase/stowbox-pricing/data/content.ts`
- Tokens and reset: `demos/showcase/stowbox-pricing/styles/base.css` (scoped to `html[data-showcase="stowbox-pricing"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/stowbox-pricing/`.

## Notes

- The pricing section is the centrepiece and follows the reference. Around it are a short hero with a
  storage guide (drag to an amount, get a suggested plan), three reasons, a comparison table, an FAQ and a
  sign-up form.
- The billing period and the chosen plan are shared through one React context (`SelectionProvider`), so the
  monthly/yearly switch updates the cards, the table and the form summary together, and each plan button
  preselects that plan in the form.
- Yearly prices are the monthly price less 50%, as the reference's discount chip states.
- Styles are plain CSS with `sb-` prefixed class names, because this app's CSS pipeline does not support
  CSS Modules.

## Limitations

- Plans, prices and the trial are demonstration content. The form validates and confirms, but nothing is
  sent, no account is created and no card is charged.
- A one-line billing note was added under each price; it is not in the reference.
- The comparison table scrolls sideways inside its frame on narrow screens.
