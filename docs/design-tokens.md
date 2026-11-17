# Design tokens — Khariz Digital agency site

Source of truth: `site/app/(agency)/globals.css`. Tailwind utilities read these values
(for example `bg-background`, `text-muted-foreground`, `border-border`,
`bg-brand`).

## Colour

| Token | Value | Use |
|---|---|---|
| `--background` | `#fafafa` | Page background |
| `--foreground` | `#0a0a0a` | Text, footer background, filled buttons |
| `--secondary` / `--muted` | `#f5f5f5` | Image placeholders, filter pills |
| `--muted-foreground` | `#737373` | Secondary text, labels |
| `--border` | `#e5e5e5` | Hairlines and frames |
| `--brand` | `#f05a3c` | Khariz orange (accent only) |

The orange is the accent defined on https://khariz.vercel.app/ (its theme
token resolves to `#f05a3c`). It is used only for: the line under the current
navigation link, the availability dot in the footer, keyboard focus outlines,
form error messages, the hover line of "View website" links and the
development-only placeholder labels.

A dark palette (`.dark`) exists in the stylesheet but is not switched on.

## Typography

- Sans: Geist. Mono: Geist Mono (labels, numbers, form fields). Both load
  through `next/font`.
- Hero headline: `clamp(2.1rem, 5vw, 4.2rem)`, weight 400, tracking −0.03em,
  line height 1.08.
- Page titles: `clamp(2rem, 4.6vw, 3.6rem)`, weight 500, tracking −0.03em.
- Section titles: 24px / 30px (mobile / desktop), weight 500, tracking
  −0.02em, ending in a full stop, with a two-digit number on the right.
- Statements: 1.4rem / 2.25rem, weight 500, line height 1.3.
- Row titles: 20px / 28px, weight 500.
- Body: 14–18px, relaxed line height.
- Labels: Geist Mono 10–11px, uppercase, tracking 0.04em.

## Layout

- Page gutter `.container-x`: `clamp(1.25rem, 5vw, 6rem)` on each side (20px
  on phones, 72px on a 1440px laptop, up to 96px); content is capped at
  1728px on very wide screens.
- Section spacing: 80px / 112px top and bottom (`py-20 md:py-28`).
- Grids: 12 columns from 768px, 24px gaps. Project grids are two columns from
  768px, one below.
- Breakpoints: 768px (`md`), 1024px (`lg`), 1792px (wide gutter).
- Corners are square (`--radius: 0`). Only buttons, pills and the arrow
  circles are rounded.
- Project covers: 4:3, greyscale, turning to colour on hover over 700ms.

## Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Page open: fade and 12px rise, 0.45s.
- Scroll reveals: fade and 16–30px rise, 0.45–0.6s, once.
- Hero words change every 2.8s.
- Visitors who ask their device for reduced motion get fades without
  movement, no looping CSS animation and no smooth scrolling.

## Shared building blocks (`site/components/`)

`Header`, `Footer`, `Logo`, `Section` (numbered section), `NumberedRows`
(services, approach), `Reveal`, `RotatingWord`, `CircleArrowLink`,
`UnderlineLink`, `WorkCards`, `Gallery`, `Faq`, `ContactForm`, `LineDrawing`,
`ProgressiveBlur`.
