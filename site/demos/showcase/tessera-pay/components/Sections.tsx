import { ArrowUpRight, Check, CircleDollarSign, Coins, CreditCard, Gem, Globe2, Link2, ShieldCheck } from "lucide-react";
import { features, navLinks, plans, steps, trusted } from "../data/content";
import { CheckoutDemo, Faq, FeeCalculator, LogoMark, UseCases } from "./Interactive";
import { Phones } from "./Phones";

export function Hero() {
  return (
    <section className="tp-hero" id="top">
      <div className="tp-hero-glow" aria-hidden="true" />
      <span className="tp-coin tp-coin-lilac" aria-hidden="true">
        <Gem size={30} strokeWidth={2.2} />
      </span>
      <span className="tp-coin tp-coin-mint" aria-hidden="true">
        <CreditCard size={30} strokeWidth={2.2} />
      </span>
      <span className="tp-coin tp-coin-honey" aria-hidden="true">
        <Coins size={30} strokeWidth={2.2} />
      </span>
      <span className="tp-coin tp-coin-sky" aria-hidden="true">
        <CircleDollarSign size={32} strokeWidth={2.2} />
      </span>
      <div className="tp-hero-copy">
        <a className="tp-pill" href="#features">
          <i aria-hidden="true" />
          <strong>NEW</strong> Next-day payouts in digital dollars
        </a>
        <h1>
          Get Paid Globally.
          <br />
          <em>Card</em> or <em>Crypto.</em>
        </h1>
        <p>
          One payment layer for modern internet businesses. Accept card and <strong>crypto payments from anywhere</strong> - and receive
          payouts directly in <strong>digital dollars</strong>.
        </p>
        <div className="tp-hero-actions">
          <button type="button" className="tp-btn tp-btn-dark" data-tp-open="signup">
            Start accepting payments
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <button type="button" className="tp-btn tp-btn-light" data-tp-open="talk">
            Talk with us
          </button>
        </div>
      </div>
      <Phones />
    </section>
  );
}

export function Trusted() {
  return (
    <section className="tp-trusted" aria-labelledby="tp-trusted-title">
      <h2 id="tp-trusted-title">
        <span>Trusted by</span> leading names worldwide.
      </h2>
      <div className="tp-marquee">
        <ul>
          {trusted.map((name, index) => (
            <li key={name} className={`tp-brand-${index % 4}`}>
              {name}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {trusted.map((name, index) => (
            <li key={name} className={`tp-brand-${index % 4}`}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionHead({ label, title, accent, text }: { label: string; title: string; accent: string; text: string }) {
  return (
    <div className="tp-head">
      <p className="tp-label">{label}</p>
      <h2>
        {title} <em>{accent}</em>
      </h2>
      <p>{text}</p>
    </div>
  );
}

const featureIcons = { checkout: CreditCard, payouts: CircleDollarSign, global: Globe2, risk: ShieldCheck, links: Link2 };

export function Features() {
  return (
    <section className="tp-section" id="features">
      <SectionHead label="Features" title="Every payment, on" accent="one layer." text="Cards and crypto usually mean two providers, two dashboards and two sets of reports. Tessera Pay gives you one." />
      <div className="tp-bento">
        {features.map((feature) => {
          const Icon = featureIcons[feature.id];
          return (
            <article key={feature.id} className={`tp-tile tp-tile-${feature.size} tp-tile-${feature.id}`}>
              <span className="tp-tile-icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              {feature.id === "checkout" && (
                <div className="tp-tile-rails" aria-hidden="true">
                  <span>
                    <CreditCard size={15} /> Card
                  </span>
                  <span>
                    <Coins size={15} /> Crypto
                  </span>
                  <i />
                  <b>1 order · 1 receipt · 1 webhook</b>
                </div>
              )}
              {feature.id === "payouts" && (
                <dl className="tp-tile-payout">
                  <div>
                    <dt>Collected today</dt>
                    <dd>$12,480.00</dd>
                  </div>
                  <div>
                    <dt>Fees</dt>
                    <dd>-$267.14</dd>
                  </div>
                  <div>
                    <dt>Payout tomorrow</dt>
                    <dd>$12,212.86</dd>
                  </div>
                </dl>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="tp-section" id="how">
      <SectionHead label="How it works" title="From link to payout in" accent="three steps." text="Try the checkout demo: choose a rail, pay, and see what lands in your account." />
      <div className="tp-how">
        <ol>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="tp-how-stage">
          <CheckoutDemo />
        </div>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section className="tp-section" id="use-cases">
      <SectionHead label="Use cases" title="Built for how you" accent="actually sell." text="Four common set-ups. Pick the one closest to your business." />
      <UseCases />
    </section>
  );
}

export function Pricing() {
  return (
    <section className="tp-section" id="pricing">
      <SectionHead label="Pricing" title="Simple rates," accent="no surprises." text="No set-up fee and no minimums. Crypto payments cost less than half as much as cards." />
      <div className="tp-pricing">
        {plans.map((plan) => (
          <article key={plan.id} className={plan.dark ? "tp-plan tp-plan-dark tp-on-dark" : "tp-plan"}>
            <h3>{plan.name}</h3>
            <p className="tp-plan-price">
              <strong>${plan.price}</strong> {plan.unit}
            </p>
            <p>{plan.blurb}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <button type="button" className={plan.dark ? "tp-btn tp-btn-light tp-btn-block" : "tp-btn tp-btn-dark tp-btn-block"} data-tp-open="signup">
              {plan.cta}
            </button>
          </article>
        ))}
        <FeeCalculator />
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="tp-section tp-faq-section" id="faq">
      <SectionHead label="Questions" title="Good to know," accent="before you start." text="Short answers to what teams ask first." />
      <Faq />
    </section>
  );
}

export function Cta() {
  return (
    <section className="tp-cta" aria-labelledby="tp-cta-title">
      <div className="tp-hero-glow" aria-hidden="true" />
      <h2 id="tp-cta-title">
        Your next customer is
        <br />
        <em>already abroad.</em>
      </h2>
      <p>Open an account today and take your first payment by card or crypto this afternoon.</p>
      <div className="tp-hero-actions">
        <button type="button" className="tp-btn tp-btn-dark" data-tp-open="signup">
          Start accepting payments
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
        <button type="button" className="tp-btn tp-btn-light" data-tp-open="talk">
          Talk with us
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="tp-footer">
      <a className="tp-logo" href="#top" aria-label="Tessera Pay, back to top">
        <LogoMark />
        Tessera
      </a>
      <nav aria-label="Footer">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#faq">Questions</a>
      </nav>
      <p>© 2026 Tessera Pay. Concept website with demonstration content.</p>
    </footer>
  );
}
