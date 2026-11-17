# Agentway

Concept landing page styled as a field guide to building software that AI agents use. A one-colour system:
electric blue on white inside a blue gradient frame, light grotesk headlines (Hanken Grotesk), mono
uppercase labels (DM Mono), a hairline grid and a large isometric town drawn in SVG.

- Route: `/demos/agentway` (`app/(showcase-agentway)/demos/agentway/`)
- Components: `demos/showcase/agentway/components/`
- Content and demonstration data: `demos/showcase/agentway/data/content.ts`
- Tokens and reset: `demos/showcase/agentway/styles/base.css` (scoped to `html[data-showcase="agentway"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/agentway`.

## Notes

- `City.tsx` generates the isometric illustration from a 5 x 5 plan of block types, so the town can be
  rearranged by editing the `plan` array. The same block components are reused as the small sketches
  beside each idea.
- The platform section is a keyboard-accessible tab list (`PlatformTabs` in `Interactive.tsx`).
- Calls to action open one shared dialog through a `data-aw-open` attribute; the contact form validates
  and confirms in place.
- Styles are plain CSS with `aw-` prefixed class names.

## Limitations

- All content, prices and figures are demonstration data. Forms validate and confirm, but nothing is sent.
- The illustration is an original redraw in the spirit of the reference, not a copy of it; the buildings
  and their positions differ.
- Documentation, full blog articles and legal pages do not exist; those links open a short notice.
- Company names in the logo cells are invented.
