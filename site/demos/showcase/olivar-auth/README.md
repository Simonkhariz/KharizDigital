# Olivar

Concept sign-up flow built as a small working web application. White split layout on a pale grey page: a
serif logo (DM Serif Display), grotesk headings (Space Grotesk), six rounded one-digit inputs, a black pill
button with corner brackets, and a pixel-art landscape on the right.

- Route: `/demos/olivar-auth/` (`app/(showcase-olivar-auth)/demos/olivar-auth/`)
- Components: `demos/showcase/olivar-auth/components/` (`AuthFlow.tsx` holds the steps, `CodeInput.tsx` the code boxes)
- Content and settings: `demos/showcase/olivar-auth/data/content.ts` (demo code, resend delay, onboarding choices)
- Tokens and reset: `demos/showcase/olivar-auth/styles/base.css` (scoped to `html[data-showcase="olivar-auth"]`)
- Artwork: `public/showcase/olivar-auth/landscape.webp`

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/olivar-auth/`.

## The flow

1. **Create your account**: name, email, password (show/hide) and terms, validated on submit.
2. **Confirm your email**: six boxes that advance as you type, step back on Backspace, move with the arrow
   keys and accept a pasted code. The demo code `202692` is shown on screen. "Resend code" unlocks after a
   30-second countdown; a wrong code clears the boxes and explains what to do.
3. **Welcome**: name the workspace and choose what it is for, then a summary screen with "Start again".

## Notes

- The landscape is original: it was generated procedurally (value noise, a ten-colour palette and an ordered
  dither) at 216 by 300 pixels and is enlarged with `image-rendering: pixelated`.
- Styles are plain CSS with `ol-` prefixed class names, because this app's CSS pipeline does not support
  CSS Modules.

## Limitations

- No account is created, no email is sent and nothing is stored: state lives in memory and resets on reload.
- Only the confirmation step exists in the reference; the sign-up, welcome and summary steps, the step
  indicator and the demo-code note were designed to match it.
