# Verdance

Concept landing page for a fictional developer platform with an in-editor
assistant. All names, prices, figures and code are demonstration content.

- Route: `/demos/verdance` (root layout in `app/(showcase-verdance)/demos/verdance/`)
- Run: start the app with `npm run dev` in `site/` and open `/demos/verdance`

## Structure

- `components/` header with sign-in dialog, the interactive editor mock
  (`EditorMock.tsx`, `AssistantPanel.tsx`), page sections and forms
- `data/editor.ts` tokenised code, completions, output panels and assistant copy;
  `data/site.ts` page copy, plans, endpoints and FAQs
- `styles/base.css` reset and tokens scoped to `html[data-showcase="verdance"]`;
  `styles/site.css` and `styles/editor.css` use the `vd-` class prefix
- `public/showcase/verdance/cosmos-field.webp` photograph of a cosmos field
  (source and licence in `docs/image-credits/verdance.md`)

## Limitations

- The editor and assistant are scripted. No code runs and no model is called.
- Forms validate in the browser and end in a demo confirmation.
- The flower field is a stock photograph with a similar subject and palette.
  The blossoming tree at the top of the reference image is not in it.
- The app's bundler configuration processes every stylesheet as a global file,
  so CSS Modules are not available; prefixed class names are used instead.
