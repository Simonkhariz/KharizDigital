import { ArrowRight, Check } from "lucide-react";
import { features, modalityTiles, navLinks, partners, plans, workspaceTiles } from "../data/content";
import { Halftone } from "./Halftone";
import { ContactForm, Faq, NightLog, TileStrip } from "./Interactive";

const partnerMarks = [
  <path key="a" d="M2 5h16v11H2zM2 6l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  <circle key="b" cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="4" />,
  <path key="c" d="M11 1 4 11h5l-1 8 8-11h-5z" fill="currentColor" />,
  <path key="d" d="M14 5a4 4 0 0 0-8 0c0 5 8 3 8 9a4 4 0 0 1-8 0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />,
];

export function Hero() {
  return (
    <section className="nc-hero" id="top" aria-labelledby="nc-hero-title">
      <Halftone variant="rise" className="nc-hero-art" />
      <div className="nc-hero-copy">
        <h1 id="nc-hero-title">Your smartest Employee never sleeps.</h1>
        <p>
          Automate repetitive tasks, collaborate seamlessly and make smarter decisions with an assistant built to lift
          productivity across your entire organization.
        </p>
        <div>
          <a className="nc-pill" href="#pricing">
            Start Free <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="nc-pill nc-pill-grey" href="#contact">
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <ul className="nc-partners" aria-label="Example customers (invented names)">
      {partners.map((name, index) => (
        <li key={name} data-style={index}>
          <svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true">
            {partnerMarks[index]}
          </svg>
          {name}
        </li>
      ))}
    </ul>
  );
}

export function Workspace() {
  return (
    <section className="nc-block" id="features" aria-labelledby="nc-workspace-title">
      <header className="nc-head">
        <h2 id="nc-workspace-title">The AI workspace built to help modern teams move faster.</h2>
        <p>Stop wasting hours on repetitive work. Valuable time is lost switching between apps instead of focusing on meaningful work.</p>
      </header>
      <TileStrip name="workspace" tiles={workspaceTiles} />
    </section>
  );
}

export function Modalities() {
  return (
    <section className="nc-block" aria-labelledby="nc-modal-title">
      <header className="nc-head">
        <h2 id="nc-modal-title">Better understanding across modalities</h2>
        <p>Work does not arrive in one format. Nocturn reads what your team already produces and keeps the thread between them.</p>
      </header>
      <TileStrip name="modalities" tiles={modalityTiles}>
        <Halftone variant="band" className="nc-strip-art" />
      </TileStrip>
    </section>
  );
}

export function Features() {
  return (
    <section className="nc-block" id="about" aria-labelledby="nc-about-title">
      <header className="nc-head">
        <h2 id="nc-about-title">Hand it over at dusk. Review it at dawn.</h2>
        <p>Nocturn is a teammate for the hours nobody wants: the filing, chasing, checking and summarising that pile up behind real work.</p>
      </header>
      <ul className="nc-features">
        {features.map((feature, index) => (
          <li key={feature.title}>
            <span>0{index + 1}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </li>
        ))}
      </ul>
      <div className="nc-night">
        <div>
          <h3>While you slept</h3>
          <p>A sample night from a twelve-person team. Filter by the kind of work.</p>
        </div>
        <NightLog />
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="nc-block" id="pricing" aria-labelledby="nc-pricing-title">
      <header className="nc-head">
        <h2 id="nc-pricing-title">Pay for people, not for hours worked at night.</h2>
        <p>Every plan includes the morning summary. Change or cancel whenever you like.</p>
      </header>
      <div className="nc-plans">
        {plans.map((plan) => (
          <article key={plan.name} data-featured={plan.featured ?? false}>
            <h3>{plan.name}</h3>
            <p>{plan.blurb}</p>
            <p className="nc-price">
              <strong>${plan.price}</strong> {plan.unit}
            </p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" /> {feature}
                </li>
              ))}
            </ul>
            <a className={plan.featured ? "nc-pill" : "nc-pill nc-pill-dark"} href="#contact">
              {plan.cta}
              {plan.cta === "Start Free" && <ArrowRight size={17} aria-hidden="true" />}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Questions() {
  return (
    <section className="nc-block" aria-labelledby="nc-faq-title">
      <header className="nc-head">
        <h2 id="nc-faq-title">Questions worth asking first</h2>
      </header>
      <Faq />
    </section>
  );
}

export function Contact() {
  return (
    <section className="nc-contact" id="contact" aria-labelledby="nc-contact-title">
      <Halftone variant="rise" className="nc-contact-art" />
      <div className="nc-contact-copy">
        <h2 id="nc-contact-title">Give tonight&apos;s busywork to someone who is awake.</h2>
        <p>Tell us about your team and what piles up. We will show you a night shift on your own kind of work.</p>
      </div>
      <ContactForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="nc-footer nc-wrap">
      <a className="nc-logo" href="#top" aria-label="Nocturn home">
        Nocturn
      </a>
      <nav aria-label="Footer">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#contact">Contact</a>
      </nav>
      <p>© 2026 Nocturn. Concept website with demonstration content.</p>
    </footer>
  );
}
