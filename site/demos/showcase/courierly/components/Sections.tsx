import { audiences, footerColumns, naira, plans, reasons, steps, tools } from "../data/content";
import type { Feature } from "../data/content";
import { Bullet, Grain, IconTile, StippleArt } from "./Art";
import { ApiPanel, HeroSlider, Segments } from "./Widgets";

export function Hero() {
  return (
    <section className="co-hero co-on-blue" id="top">
      <StippleArt priority />
      <div className="co-hero-copy">
        <h1>
          Email that won’t go down.
          <br />
          Built to last.
        </h1>
        <p>
          From assisted drafts to scheduling, auto-reply, and full analytics on every send, plus a REST API for developers who want to
          build email sending directly into their own product or workflow.
        </p>
        <div className="co-hero-actions">
          <button type="button" className="co-btn co-btn-white" data-co-open="demo">
            Watch demo
          </button>
          <button type="button" className="co-btn co-btn-blue co-btn-edge" data-co-open="signup">
            Get started
          </button>
        </div>
      </div>
      <HeroSlider />
    </section>
  );
}

function Heading({ title, accent, text, all = false }: { title?: string; accent?: string; text: string; all?: boolean }) {
  return (
    <div className="co-heading">
      <h2 className={all ? "co-accent" : undefined}>
        {title}
        {title && accent ? " " : ""}
        {accent && <span className="co-accent">{accent}</span>}
      </h2>
      <p>{text}</p>
    </div>
  );
}

export function Audiences() {
  return (
    <section className="co-section" id="audiences">
      <p className="co-chip co-chip-avatars">
        <span aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        Trusted by 500+ professionals
      </p>
      <Heading title="Designed for" accent="Everyone" text="Whether you need a simple no-code web app or a robust API integration, Courierly fits your workflow." />
      <div className="co-tray co-tray-2">
        {audiences.map((audience) => (
          <article key={audience.title} className="co-card co-card-tall">
            <IconTile name={audience.icon} tone={audience.tone} />
            <h3 className={audience.tone === "blue" ? "co-accent" : undefined}>{audience.title}</h3>
            <p>{audience.text}</p>
            <ul className="co-points">
              {audience.points.map((point) => (
                <li key={point}>
                  <Bullet tone={audience.tone} />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="co-card">
      <IconTile name={feature.icon} tone={feature.tone} />
      <h3 className={feature.tone === "blue" ? "co-accent" : undefined}>{feature.title}</h3>
      <p>{feature.text}</p>
    </article>
  );
}

export function Why() {
  return (
    <section className="co-section" id="why">
      <Heading title="Why" accent="Courierly" text="Built the way email infrastructure should be: reliable, secure, and always yours." />
      <div className="co-tray co-tray-2 co-tray-blue">
        <Grain id="co-why-art" className="co-art" />
        {reasons.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
      <Segments />
    </section>
  );
}

export function Tools() {
  return (
    <section className="co-section" id="tools">
      <Heading title="Powerful Email Tools" text="Everything you need to create, send, and optimize your emails." />
      <div className="co-tray co-tray-2">
        {tools.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </section>
  );
}

export function Api() {
  return (
    <section className="co-section" id="api">
      <Heading title="One request," accent="one email" text="The same send your team makes in the app, as a single call from your own backend." />
      <div className="co-tray co-api-tray">
        <div className="co-card">
          <IconTile name="braces" tone="dark" />
          <h3>Scheduled, routed, tracked</h3>
          <p>
            Pass a template, a recipient and a local send time. Courierly picks the delivery route, falls back if the primary is
            down, and reports the status on a webhook.
          </p>
          <ul className="co-points">
            {["Per-user keys you can rotate", "Idempotent sends", "Status webhooks for every message"].map((point) => (
              <li key={point}>
                <Bullet tone="dark" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ApiPanel />
      </div>
    </section>
  );
}

export function How() {
  return (
    <section className="co-section" id="how">
      <Heading accent="How It Works" text="Get started with Courierly in just a few simple steps" />
      <ol className="co-steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">{index + 1}</span>
            <h3 className="co-accent">{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="co-section" id="pricing">
      <Heading title="Simple Pricing" text="Start free, upgrade when you need more" />
      <div className="co-pricing co-on-blue">
        <StippleArt wide />
        <div className="co-pricing-grid">
          {plans.map((plan) => (
            <article key={plan.id} className="co-card co-plan">
              <header>
                <h3 className={plan.tone === "blue" ? "co-accent" : undefined}>{plan.name}</h3>
                <p className={plan.tone === "blue" ? "co-price co-accent" : "co-price"}>
                  {plan.price === null ? (
                    "Custom"
                  ) : (
                    <>
                      {naira(plan.price)}
                      <small>/mon</small>
                    </>
                  )}
                </p>
              </header>
              <p className="co-plan-blurb">{plan.blurb}</p>
              <ul className="co-points">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Bullet tone={plan.tone} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`co-btn co-btn-lg ${plan.tone === "blue" ? "co-btn-blue" : "co-btn-black"}`}
                data-co-open={plan.price === null ? "estimate" : "signup"}
                data-co-plan={plan.id}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <div className="co-closing co-on-blue" id="contact">
      <Grain id="co-close-art" className="co-art" />
      <section className="co-cta" aria-labelledby="co-cta-title">
        <h2 id="co-cta-title">Ready to Write Smarter Emails?</h2>
        <p>Join the teams and developers who send from their own domain, on their own schedule.</p>
        <div className="co-hero-actions">
          <button type="button" className="co-btn co-btn-white" data-co-open="signup">
            Get started free
          </button>
          <button type="button" className="co-btn co-btn-blue co-btn-edge" data-co-open="contact">
            Talk to us
          </button>
        </div>
      </section>
      <footer className="co-footer">
        <div className="co-footer-cols">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.open ? (
                      <button type="button" data-co-open={link.open}>
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="co-wordmark" aria-hidden="true">
          Courierly
        </p>
      </footer>
      <p className="co-legal">© 2026 Courierly. Concept website with demonstration content.</p>
    </div>
  );
}
