import { ArrowRight, Plus } from "lucide-react";
import { badges, facts, faqs, footerColumns, prices, reserves, steps } from "../data/content";
import { Seal, Wordmark } from "./Logo";
import { HoldPanel, ReceivePanel, SendPanel, SpendPanel } from "./Panels";
import { ApiTabs, Calculator, JournalList } from "./Widgets";

function OpenButton({ label = "Open an account" }: { label?: string }) {
  return (
    <button type="button" className="gd-button" data-gd-open="open">
      {label}
      <span aria-hidden="true">
        <ArrowRight size={16} />
      </span>
    </button>
  );
}

export function Hero() {
  return (
    <section className="gd-hero" aria-labelledby="gd-hero-title">
      <div className="gd-wrap">
        <p className="gd-hero-note">Est. 2026, licensed in the US and EU</p>
        <h1 id="gd-hero-title">
          Stablecoin payments <em>for business worldwide</em>
        </h1>
        <p className="gd-hero-text">
          Pay anyone in 140 countries in seconds.
          <br />
          Every dollar is backed 1:1 by real dollars.
        </p>
        <div className="gd-hero-actions">
          <OpenButton />
          <button type="button" className="gd-button gd-button-ghost" data-gd-open="sales">
            Talk to sales
          </button>
        </div>
        <ul className="gd-badges">
          {badges.map((badge) => (
            <li key={badge.title}>
              <Seal mark={badge.mark} code={badge.code} />
              <p>
                <strong>{badge.title}</strong>
                {badge.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Head({ id, first, second, text }: { id: string; first: string; second: string; text?: string }) {
  return (
    <div className="gd-head">
      <h2 id={id}>
        {first} <em>{second}</em>
      </h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Product() {
  return (
    <section className="gd-section" id="product" aria-labelledby="gd-product-title">
      <div className="gd-wrap">
        <Head id="gd-product-title" first="A bank account" second="that speaks stablecoin" text="Dollars, euros and digital dollars in one place. This is what it looks like inside." />
        <div className="gd-panels">
          <SendPanel />
          <ReceivePanel />
          <HoldPanel />
          <SpendPanel />
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="gd-section" id="how" aria-labelledby="gd-how-title">
      <div className="gd-wrap">
        <Head id="gd-how-title" first="From application" second="to first payout" text="Three steps, and most of the waiting is ours." />
        <ol className="gd-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Developers() {
  return (
    <section className="gd-section" id="developers" aria-labelledby="gd-dev-title">
      <div className="gd-wrap">
        <div className="gd-dev">
          <div>
            <h2 id="gd-dev-title">
              One API <em>for every payout</em>
            </h2>
            <p>Everything in the dashboard is an endpoint. Create recipients, send payouts and reconcile deposits from your own systems.</p>
            <ul>
              <li>Test keys and a full sandbox</li>
              <li>Idempotent requests by default</li>
              <li>Signed webhooks for every state change</li>
            </ul>
            <button type="button" className="gd-button gd-button-ghost" data-gd-open="sales">
              Request API access
            </button>
          </div>
          <ApiTabs />
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="gd-section" id="pricing" aria-labelledby="gd-pricing-title">
      <div className="gd-wrap">
        <Head id="gd-pricing-title" first="Three prices," second="all of them small" text="No tiers and no minimums. You pay for payouts and nothing else." />
        <div className="gd-pricing">
          <ul className="gd-prices">
            {prices.map((price) => (
              <li key={price.title}>
                <h3>{price.title}</h3>
                <p className="gd-price">
                  <strong>{price.price}</strong> {price.unit}
                </p>
                <p>{price.text}</p>
              </li>
            ))}
          </ul>
          <Calculator />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="gd-section" id="about" aria-labelledby="gd-about-title">
      <div className="gd-wrap">
        <Head id="gd-about-title" first="Built like a bank," second="moves like software" text="Guilder was founded in 2026 to give businesses one account that works across borders." />
        <div className="gd-about">
          <ul className="gd-facts">
            {facts.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.value}</strong>
                {fact.label}
              </li>
            ))}
          </ul>
          <div className="gd-reserves">
            <h3>Where the reserves sit</h3>
            <div className="gd-reserve-bar" role="img" aria-label={reserves.map((entry) => `${entry.share}% ${entry.label}`).join(", ")}>
              {reserves.map((entry) => (
                <i key={entry.label} style={{ width: `${entry.share}%` }} />
              ))}
            </div>
            <ul>
              {reserves.map((entry) => (
                <li key={entry.label}>
                  <i aria-hidden="true" />
                  {entry.label}
                  <strong>{entry.share}%</strong>
                </li>
              ))}
            </ul>
            <p>Checked every month by an independent firm. Demonstration figures.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Journal() {
  return (
    <section className="gd-section" id="journal" aria-labelledby="gd-journal-title">
      <div className="gd-wrap">
        <Head id="gd-journal-title" first="Journal:" second="notes on moving money" />
        <JournalList />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="gd-section" id="faq" aria-labelledby="gd-faq-title">
      <div className="gd-wrap gd-faq">
        <h2 id="gd-faq-title">
          Questions <em>worth asking</em>
        </h2>
        <div>
          {faqs.map((item, index) => (
            <details key={item.q} name="gd-faq" open={index === 0}>
              <summary>
                {item.q}
                <Plus size={16} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="gd-section gd-section-last" aria-labelledby="gd-closing-title">
      <div className="gd-wrap">
        <div className="gd-closing">
          <h2 id="gd-closing-title">
            Open the account <em>your payments deserve</em>
          </h2>
          <p>Apply in ten minutes. Send your first payout this week.</p>
          <div className="gd-hero-actions">
            <OpenButton />
            <button type="button" className="gd-button gd-button-ghost" data-gd-open="sales">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="gd-footer">
      <div className="gd-wrap gd-footer-grid">
        <div>
          <a href="#top" aria-label="Guilder home">
            <Wordmark />
          </a>
          <p>The business account for dollars, euros and digital dollars.</p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="gd-wrap gd-footer-base">
        <p>© 2026 Guilder. Concept website with demonstration content. Guilder is not a real financial institution and offers no financial services.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
