# Wexcombe Partners

Concept corporate site for a fictional partner-led executive-search firm. Warm off-white pages, condensed
serif headings (Instrument Serif) with a grey second line, bracketed mono labels (JetBrains Mono), a deep
green accent, white rounded cards, hairline tables and pale green chips.

- Routes: `/demos/wexcombe` (home), `/demos/wexcombe/practices`, `/demos/wexcombe/partners`,
  `/demos/wexcombe/insights` (`app/(showcase-wexcombe)/demos/wexcombe/`)
- Components: `demos/showcase/wexcombe/components/`
- Content and demonstration data: `demos/showcase/wexcombe/data/content.ts`
- Tokens and reset: `demos/showcase/wexcombe/styles/base.css` (scoped to `html[data-showcase="wexcombe"]`)
- Photos: `public/showcase/wexcombe/` (WebP copies of stock images already in this repository)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/wexcombe`.

## Notes

- The header and footer live in the route's root layout, so all four pages share them.
- The sector chips filter the "Recent appointments" table (`Interactive.tsx`); the table can also be expanded.
- "Brief us on a search" leads to the brief form at the foot of the home page. It validates and confirms.
- Styles are plain CSS with `wx-` prefixed class names.

## Limitations

- All people, appointments and remarks are invented. Client remarks are described by role only.
- Nothing is sent by the form. The telephone number and email address are placeholders and are not links.
- Insight articles show an excerpt only; there are no full article pages.
- The portraits are stock photos, so the people differ from those in the reference design.
