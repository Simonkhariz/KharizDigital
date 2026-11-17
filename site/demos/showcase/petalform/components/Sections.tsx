import { contentTypes, footerColumns, stats } from "../data/content";
import { SignupForm } from "./Interactive";

const heroImage = "/showcase/petalform/poppies-blue-sky.webp";

export function Hero() {
  return (
    <section id="top" className="pf-wrap">
      <div className="pf-hero">
        <img
          className="pf-hero-art"
          src={heroImage}
          alt="Orange, yellow and white poppies seen from below against a deep blue sky"
          width={1920}
          height={1280}
          fetchPriority="high"
        />
        <div className="pf-hero-copy">
          <h1>
            Generate content that Attracts{" "}
            <br />
            Organic traffic.
          </h1>
          <p>Create SEO-ready content that ranks, drives qualified visitors, and turns search traffic into customers.</p>
          <div className="pf-hero-actions">
            <a className="pf-pill pf-pill-white" href="#start">
              Get started free
            </a>
            <a className="pf-pill pf-pill-glass" href="#how">
              See how it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="pf-wrap pf-stats" aria-label="Petalform in numbers">
      <p className="pf-stats-pill">No credit card required · Start in seconds</p>
      <dl>
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

export function ContentTypes() {
  return (
    <section id="solutions" className="pf-wrap">
      <div className="pf-types">
        <h2>
          Create the exact content type you
          <br />
          need with AI
        </h2>
        <ul>
          {contentTypes.map((type) => (
            <li key={type.id}>
              <div className="pf-types-art">
                <img src={type.image} alt={type.alt} width={1280} height={853} loading="lazy" />
              </div>
              <div className="pf-types-copy">
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="pf-wrap pf-about">
      <h2>
        We built Petalform because good answers deserve to be found. Search rewards pages that help people, so every
        draft starts from what readers are actually asking.
      </h2>
      <dl>
        <div>
          <dt>Founded</dt>
          <dd>2021</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>34 people, fully remote</dd>
        </div>
        <div>
          <dt>Languages supported</dt>
          <dd>28</dd>
        </div>
      </dl>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="start" className="pf-wrap">
      <div className="pf-hero pf-cta">
        <img className="pf-hero-art" src={heroImage} alt="" width={1920} height={1280} loading="lazy" />
        <div className="pf-hero-copy">
          <h2>Plant the first article today.</h2>
          <p>Free for five articles a month. No credit card required.</p>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="pf-wrap pf-footer">
      <div className="pf-footer-top">
        <div>
          <a className="pf-header-logo" href="#top">
            Petalform
          </a>
          <p>SEO-ready content for teams that would rather be found than shout.</p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2>{column.title}</h2>
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
      <p className="pf-footer-note">© 2026 Petalform. Concept website with demonstration content.</p>
    </footer>
  );
}
