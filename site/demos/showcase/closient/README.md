# Closient

Concept website and working dashboard for a fictional sales platform whose assistant agents qualify leads,
keep the pipeline current and forecast revenue. Deep maroon hero on cream, light serif headlines (Newsreader),
cream pill buttons and a white, hairline-bordered product UI (Inter).

- Landing page: `/demos/closient/` (`app/(showcase-closient)/demos/closient/page.tsx`)
- Dashboard: `/demos/closient/dashboard/` (`.../closient/dashboard/page.tsx`); `#pipeline`, `#deals`,
  `#contacts`, `#reports` and `#settings` open a specific view
- Components: `demos/showcase/closient/components/landing/` and `components/dashboard/`
- Content: `data/content.ts`; demonstration CRM data and the sums built on it: `data/crm.ts`, `data/metrics.ts`
- Tokens and reset: `styles/base.css` (scoped to `html[data-showcase="closient"]`, classes prefixed `cl-`)
- Assets: `public/showcase/closient/` (one portrait and three small avatars)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/closient/`.

## Notes

- The deals are generated once from a fixed seed and a fixed "today" (14 Nov 2026). Every KPI, chart, table
  total, leaderboard and the figures quoted on the landing page are calculated from that one list, so they
  agree with each other.
- Dashboard state (deals, filters, settings) lives in a reducer in memory. Adding a deal, moving a stage or
  marking a deal won updates the KPIs and charts immediately; a reload restores the original data.
- Charts are hand-written SVG: revenue line with the previous period, pipeline bars by stage and a win-rate
  donut. Each has a text alternative.
- Below 1024 px the Pipeline view is a swipeable board (`Pipeline.tsx`, "Phones and tablets" block in
  `Dashboard.css`): columns scroll sideways with scroll-snap, one stage per screen on a phone and two on a
  tablet, with the next one showing at the edge. A sticky stage switcher (name, deal count, value) jumps to a
  stage and follows the swipe through an `IntersectionObserver`. Each column scrolls on its own, and the card
  arrows are replaced by a "Move" menu (a native select, so it works with touch, keyboard and screen
  readers). From 1024 px up the four-column board and its arrows are unchanged.
- On tablets (768 to 1023 px) the deals table drops the ID and Created columns and the rep table drops Region
  so they fit without sideways scrolling; on phones tables restack into records.
- The dashboard preview in the landing page hero reads the same data and its range select is live.

## Limitations

- All names, companies, amounts and dates are demonstration data. Nothing is saved or sent; "Export CSV"
  only shows a notice.
- The sign-up form validates and ends in a demo confirmation. No account is created.
- Customer names in the logo row are invented.
