# Swiftlet

Concept landing page and demo application for a fictional keyboard-first workspace for mail, docs and
agents. Off-white sheet inside a purple and pink gradient frame, tight two-tone grotesk headlines (Geist),
key-cap chips, pill buttons and a mail-client mock on a vivid violet panel.

- Landing page: `/demos/swiftlet` (`app/(showcase-swiftlet)/demos/swiftlet/page.tsx`)
- Mail application: `/demos/swiftlet/app` (`app/(showcase-swiftlet)/demos/swiftlet/app/page.tsx`)
- Components: `demos/showcase/swiftlet/components/` (the application lives in `components/app/`)
- Content and demonstration data: `demos/showcase/swiftlet/data/` (`content.ts` for the landing page,
  `mailbox.ts` for messages, folders and shortcuts; both pages read the same messages)
- Tokens and reset: `demos/showcase/swiftlet/styles/base.css` (scoped to `html[data-showcase="swiftlet"]`)

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/swiftlet` (or the port the dev server
reports).

## Landing page

- The hero mock is live HTML: Mail, Agents and Docs tabs, folder list, search, Focus / Waiting / Later
  views, a draft card that can be edited and sent, and J / K / E shortcuts while the window has focus.
  The key caps in the hero drive the same actions.
- Feature cards, the docs showcase, the shortcut board, the pricing switch, blog entries and the FAQ are
  all interactive. "Start free" opens the mail application; other calls to action open one shared dialog
  (`Dialogs.tsx`) through a `data-sw-open` attribute.

## Mail application

- Folders (Inbox, Starred, Waiting, Later, Sent, Archive), message list with search and an unread filter,
  reading pane, compose and reply with validation and a demo "sent" state, archive, star, mark read or
  unread, move to Later, and undo.
- Keyboard: J / K, E, S, U, H, Z, C, R, `/`, `?`, Esc, and G followed by a folder letter. The common keys
  stay visible under the list and `?` opens the full panel.
- Phone layout shows one pane at a time, with folders in a drawer and a floating compose button.

## Limitations

- All messages, people, companies, prices and figures are demonstration data. State is kept in memory and
  resets on reload. Nothing is sent, stored or fetched.
- Sender avatars are initials; the reference used a portrait photograph.
- Company names in the logo row are invented.
