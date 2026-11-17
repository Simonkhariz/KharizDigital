import { Check } from "lucide-react";
import { clients, footerColumns, plans, stats } from "../data/content";
import { EditorMock } from "./EditorMock";
import { ClientLogo } from "./Logo";

export function Hero() {
  return (
    <section id="top" className="hd-hero">
      <p className="hd-hero-tag">Helmdeck 2.0 is here</p>
      <h1>
        The only Command center{" "}
        <br />
        you’ll ever need.
      </h1>
      <p className="hd-lede">
        Transform your organization&apos;s technical mastery with Helm AI. A unified operating system for
        high-performance SaaS teams.
      </p>
      <button type="button" className="hd-button hd-button-large" data-hd-open="download">
        Download for macOS
      </button>
      <div id="editor" className="hd-art hd-art-a hd-hero-art">
        <div className="hd-hero-glass" />
        <EditorMock />
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="hd-clients" aria-labelledby="hd-clients-title">
      <p id="hd-clients-title">Over 40K+ software businesses growing with Helmdeck.</p>
      <ul className="hd-box">
        {clients.map((client) => (
          <ClientLogo key={client.name} name={client.name} mark={client.mark} tone={client.tone} />
        ))}
      </ul>
    </section>
  );
}

export function Numbers() {
  return (
    <section id="numbers" className="hd-numbers" aria-label="Helmdeck in numbers">
      <dl className="hd-box">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="hd-section">
      <h2>Scalable plans for every team</h2>
      <p className="hd-lede">Start free and scale as you grow. Transparent pricing with no hidden fees.</p>
      <div className="hd-art hd-art-a hd-pricing-art">
        <ul className="hd-pricing">
          {plans.map((plan) => (
            <li key={plan.id}>
              <h3>{plan.name}</h3>
              <p className="hd-pricing-price">
                {plan.price}
                {plan.period && <span> {plan.period}</span>}
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={12} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={plan.primary ? "hd-button hd-button-large" : "hd-button hd-button-outline hd-button-large"}
                data-hd-open={plan.dialog}
                data-hd-plan={plan.id}
              >
                {plan.cta}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="hd-section hd-cta">
      <h2>Ready to build the future?</h2>
      <p className="hd-lede">
        Join over 25,000 teams scaling their intelligence with Helm AI. Get started for free today.
      </p>
      <div>
        <button type="button" className="hd-button hd-button-large" data-hd-open="signup" data-hd-plan="starter">
          Create free account
        </button>
        <button type="button" className="hd-button hd-button-outline hd-button-large" data-hd-open="expert">
          Speak to an expert
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="hd-footer">
      <div className="hd-box">
        <div className="hd-footer-top">
          <div className="hd-footer-brand">
            <strong>Helmdeck 2.0</strong>
            <p>
              Built for the future of intelligence. Accelerating high-performance SaaS teams with universal context and
              orchestration.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <button type="button" data-hd-open={link.dialog}>
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="hd-footer-wordmark" aria-hidden="true">
          Helmdeck 2.0
        </p>
        <p className="hd-footer-note">© 2026 Helmdeck. Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
