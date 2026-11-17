# Rapporta

Concept landing page for a fictional customer-experience agent platform. All
names, prices, figures and records are demonstration content.

- Route: `/demos/rapporta` (root layout in `app/(showcase-rapporta)/demos/rapporta/`)
- Run: start the app with `npm run dev` in `site/` and open `/demos/rapporta`

## Structure

- `components/` page sections, the interactive control-room mock
  (`Dashboard*.tsx`), dialogs and the shared demo form
- `data/` typed page copy (`site.ts`) and mock dashboard records (`dashboard.ts`)
- `styles/` `base.css` (reset and tokens, scoped to `html[data-showcase="rapporta"]`)
  and one prefixed stylesheet per area (`rpu-`, `rph-`, `rpd-`, `rpp-`)

## Limitations

- Forms validate in the browser and end in a demo confirmation. Nothing is sent
  or stored.
- The language menu changes the label only; copy exists in English.
- The app's bundler configuration processes every stylesheet as a global file,
  so CSS Modules are not available. Class names are prefixed instead and built
  with the `classes()` helper in `styles/classes.ts`.
- Dashboard state resets on reload.
