# Fieldcards

A small concept site that presents three single-card interfaces, each centred on a full-bleed landscape:
a profile card, an app card and a journal card. Neutral tight sans (Inter Tight), dark pills with white
inset values, large rounded corners and soft blur fades.

- Route: `/demos/fieldcards` (`app/(showcase-fieldcards)/demos/fieldcards/`)
- Components: `demos/showcase/fieldcards/components/` (`ProfileCard`, `AppCard`, `JournalCard`, `Site`)
- Content and demonstration data: `demos/showcase/fieldcards/data/content.ts`
- Tokens and reset: `demos/showcase/fieldcards/styles/base.css` (scoped to `html[data-showcase="fieldcards"]`)
- Photographs: `public/showcase/fieldcards/` (WebP copies of stock images already used elsewhere in this app)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/fieldcards` (or the port the dev server
reports).

## What each card does

- Profile: the status moves from "Connecting" to "Connected" by itself and can be restarted; "Add member"
  toggles to a confirmed state.
- App: "Explore app" opens a detail sheet inside the card (figures, features, a save toggle) and closes it
  again.
- Journal: the date pill and the dots page through three entries; the place opens its details.

## Limitations

- The reference showed a real sportswear brand on the app card. It is replaced by an invented trail club
  with an original mark, and the running photograph by a hiking one.
- The reference photographs were not available, so the backgrounds and card images are different
  photographs of similar subjects. The lettered texture and the hatching over them are drawn in CSS.
- People, places, ratings and figures are invented. Nothing is saved or sent.
