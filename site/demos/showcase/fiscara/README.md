# Fiscara

Concept one-page website for fictional finance-management software, rebuilt from one reference screenshot
(`IMG_2520.JPG.jpeg`). Beige hero with a circuit-trace pattern, a tight two-tone grotesk headline, square maroon
and white buttons, a hand holding a small sage-green device with a lit edge, two dark brown finance widgets, a
dark brown "About us" band with three figures, and a gold band that opens the rest of the page.

- Route: `/demos/fiscara/` (`app/(showcase-fiscara)/demos/fiscara/`)
- Components: `demos/showcase/fiscara/components/`
- Content and demonstration figures: `demos/showcase/fiscara/data/content.ts`
- Styles: `demos/showcase/fiscara/styles/` (`base.css` holds the tokens and reset, scoped to
  `html[data-showcase="fiscara"]`; `site.css`, `hero.css` and `sections.css` hold the components; classes are
  prefixed `fs-`)
- Fonts: Inter Tight (text), Manrope (the product widgets), JetBrains Mono (labels and figures)
- One raster asset, `public/showcase/fiscara/hand.webp`. Credits: `docs/image-credits/fiscara.md`.

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/fiscara/`.

## How the hero object is made

`HandDevice.tsx` is one SVG. The bottom layer is a photograph of a raised hand, cut out from its backdrop. The
device, its lit seam, the light it throws on the skin, its shadow on the palm and the knitted teal cuff are drawn
in SVG in the same coordinate system, so they stay registered at every size. The device covers the object the
hand held in the original photograph.

## What follows the reference and what was designed

- Follows the reference: header, hero (copy, buttons, circuit, hand and device, info statement, two widgets),
  the About band with the inline icon chips and three figures, and the top of the gold band.
- Designed in the same language, because the reference stops there: the product window inside the gold band,
  the five feature panels, the estimate, pricing, questions, the demo request and the footer.

## Working parts

- Hero widgets: donut or bar view, total or average, and hover on a slice or a legend row. The category amounts
  add up to the totals shown.
- Menu button beside the logo: opens the site navigation at every screen size.
- Gold band: three views that advance on their own until one is chosen. "Resolve" on a row clears it and
  updates the open count; the small chart shows a value under the pointer.
- Features: an approval route that can be approved step by step, a thirteen-week forecast with a cash floor,
  and an audit log whose "Export CSV" button builds a five-line demonstration file in the browser.
- Estimate: three sliders that recalculate hours, yearly value and days to close.
- Pricing: monthly or annual billing. Questions: accordion.
- Log in, sign up and the demo request validate and end in a demonstration confirmation.

## Limitations

- The hand is a different photograph from the reference: an open hand that pinches the device, not a fist
  wrapped round it, so no fingers cross the front of the device and the wrist is slimmer.
- The device is drawn, not photographed. It is close in shape, colour and lighting, but it is not a 3D render.
- The reference credit line named a real accelerator; it was replaced with "Built for finance teams".
- The typeface in the reference is a commercial grotesk; Inter Tight is the closest free match.
- All figures are demonstration data. Nothing typed into a form is sent or stored.
