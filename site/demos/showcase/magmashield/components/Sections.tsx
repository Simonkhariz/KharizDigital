import { faqs, features, logos, navLinks, platformStats, steps } from "../data/content";
import { PricingPlans, ThreatFeed, UseCaseTabs } from "./Interactive";
import { Logo, PixelIcon } from "./Marks";
import { Mountain } from "./Mountain";

export function Hero() {
  return (
    <section className="ms-hero" id="top" aria-labelledby="ms-hero-title">
      <Mountain className="ms-hero__art" priority />
      <div className="ms-hero__text">
        <h1 id="ms-hero-title">
          Stop cyber attacks
          <br />
          before they happen
        </h1>
        <p>Real-time AI to detect hidden vulnerabilities, stop intrusions, and give you 24/7 protection.</p>
        <button type="button" className="ms-btn ms-btn--lg" data-ms-open="trial">
          Start free trial
        </button>
      </div>
      <ul className="ms-logos" aria-label="Example customers">
        {logos.map((logo) => (
          <li key={logo.name} data-style={logo.style}>
            {logo.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Platform() {
  return (
    <section className="ms-dark" id="platform" aria-labelledby="ms-platform-title">
      <div className="ms-wrap">
        <p className="ms-eyebrow">Platform</p>
        <h2 id="ms-platform-title">One engine watching every layer</h2>
        <p className="ms-lede">
          Magmashield reads signals from your cloud, identities, endpoints and code, joins them into incidents, and contains the ones it is
          sure about. This is what the console shows while it works.
        </p>
        <ThreatFeed />
        <dl className="ms-stats">
          {platformStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="ms-sky" id="features" aria-labelledby="ms-features-title">
      <div className="ms-wrap">
        <p className="ms-eyebrow">Features</p>
        <h2 id="ms-features-title">See it. Stop it. Prove it.</h2>
        <ul className="ms-features">
          {features.map((feature) => (
            <li key={feature.title}>
              <PixelIcon name={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section className="ms-dark" id="use-cases" aria-labelledby="ms-cases-title">
      <div className="ms-wrap">
        <p className="ms-eyebrow">Use cases</p>
        <h2 id="ms-cases-title">Built for the team on call</h2>
        <UseCaseTabs />
        <ol className="ms-steps">
          {steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="ms-sky" id="pricing" aria-labelledby="ms-pricing-title">
      <div className="ms-wrap">
        <p className="ms-eyebrow">Pricing</p>
        <h2 id="ms-pricing-title">Priced per protected asset</h2>
        <PricingPlans />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="ms-sky ms-sky--flat" id="faq" aria-labelledby="ms-faq-title">
      <div className="ms-wrap ms-faq">
        <div>
          <p className="ms-eyebrow">FAQ</p>
          <h2 id="ms-faq-title">Before you start</h2>
        </div>
        <ul>
          {faqs.map((item) => (
            <li key={item.q}>
              <details name="ms-faq">
                <summary>
                  <h3>{item.q}</h3>
                  <span aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="ms-final" aria-labelledby="ms-final-title">
      <Mountain className="ms-final__art" />
      <div className="ms-final__body">
        <h2 id="ms-final-title">Be ready before the next one</h2>
        <p>Connect in an afternoon. Watch for a week. Then let it work.</p>
        <button type="button" className="ms-btn ms-btn--lg" data-ms-open="trial">
          Start free trial
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="ms-foot">
      <div className="ms-wrap">
        <a href="#top" className="ms-head__logo" aria-label="Magmashield, back to top">
          <Logo />
        </a>
        <nav aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#faq">FAQ</a>
          {["Docs", "Status", "Privacy"].map((label) => (
            <button key={label} type="button" data-ms-open="notice">
              {label}
            </button>
          ))}
        </nav>
        <p>&copy; 2026 Magmashield Security. Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
