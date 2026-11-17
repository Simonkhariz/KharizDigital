# Denarius

Concept landing page and web application for a fictional personal-finance app. Mist-grey and white, a light
high-contrast display serif (Fraunces) for headlines and every amount, Inter Tight for text, Geist Mono for labels
and pill buttons, a graphite and champagne bank card, black product widgets and classical marble.

- Landing page: `/demos/denarius/` (`app/(showcase-denarius)/demos/denarius/page.tsx`)
- Web application: `/demos/denarius/app/` (`app/(showcase-denarius)/demos/denarius/app/page.tsx`), listed in the
  portfolio as its own project
- Components: `demos/showcase/denarius/components/` (the app lives in `components/app/`)
- Content and demonstration data: `demos/showcase/denarius/data/` (`content.ts` for the site, `bank.ts` for the app)
- Tokens and reset: `demos/showcase/denarius/styles/base.css` (scoped to `html[data-showcase="denarius"]`)
- Styles: `components/Site.css` (`dn-` prefix) and `components/app/App.css` (`dna-` prefix), plain CSS

## Run

From `site/`: `npm run dev`, then open `http://localhost:3000/demos/denarius/`.

## Landing page

- Hero: announcement pill, headline, two pill buttons, five invented partner wordmarks, the metallic card and a
  matched pair of seated marble philosophers facing each other from the bottom corners.
- Payments: six currency tiles convert the balance on the card stack.
- Security: three cards with product widgets drawn in CSS and SVG over darkened temple pictures; "Learn more"
  expands each card.
- Platform: the numbered list switches the data on the statistics phone; the bars select a month and the period
  menu rescales the figures.
- Stories: five role-attributed quotes with marble portrait busts.
- Beyond the reference: a questions section, a sign-up band with a validated form, and the footer links.
- "Start Planning", "Log In", "Get started" and "Open the web app" lead to the web application.

## Web application

- Overview: total balance, money in and out, a seven-month spending chart, the card with freeze and quick actions,
  accounts, upcoming payments, a spending ring, recent activity and budgets.
- Accounts: three accounts with details, month totals, a savings goal and activity (the travel pot shows the empty state).
- Transactions: search, direction, account and category filters, running totals, day groups and expandable rows.
- Budgets: summary with daily allowance, seven editable limits (stepper or typed), over-limit state, reset.
- Cards: two cards with freeze, three controls, a monthly limit and a "show details" step with a loading state.
- Send money: a three-step dialog (details, review, confirmation) to a saved payee, a new payee or another of your
  own accounts, with validation and a sending state.
- State is one reducer in `components/app/state.ts`. A payment lowers the source balance and appears in the
  transactions, the chart, the ring and the budgets; a move between own accounts changes both balances and leaves
  the totals alone. Everything resets on reload.

## Imagery

Sources and licences are listed in `docs/image-credits/denarius.md`.

- The two statues are photographs of the companion statues of Socrates and Plato in Athens, cut out and mapped to
  one marble gradient so they match in tone.
- The colonnade scene behind the phone and in the footer is a composite built for this project from a
  public-domain cloud study and CC0 photographs of temple columns.
- The portrait busts are CC0 museum photographs, cut out, regraded the same way and set in a champagne niche.
- The bank card, flags, partner wordmarks, logo and the typed character texture are drawn in code.

## Limitations and differences from the reference

- All balances, payees, rates, card numbers and prices are demonstration data. Nothing is sent or stored.
- The reference statues are rendered figures in profile with an open hand towards the card; the rebuild uses two
  real sculptures seen from slightly below, so the poses differ.
- The reference backdrop behind the phone and in the footer is a single illustration; the rebuild's composite has
  the same layout (columns left and right, clouds, a small temple) but a painted sky and photographic columns.
- Member stories are illustrative and attributed to roles, not to named people. Where the reference shows a
  photograph of a person, the rebuild shows a marble bust, so no real person is attached to an invented quote.
- Amounts use US formatting (`$ 45,281.09`); the reference card uses a mixed format (`$ 45.281,09`).
