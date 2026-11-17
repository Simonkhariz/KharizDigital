import { ArrowRight, Check } from "lucide-react";
import { autonomy, changelog, faqs, features, logos, navLinks, plans, posts } from "../data/content";
import { Ascii } from "./Ascii";
import { Calculator } from "./Interactive";
import { Chip, Glyph, Logo } from "./Marks";
import { Terminal } from "./Terminal";

export function Hero() {
  return (
    <section className="sb-hero" id="top" aria-labelledby="sb-hero-title">
      <Ascii variant="hero" className="sb-hero__bg" />
      <div className="sb-hero__in">
        <a href="#changelog" className="sb-badge">
          <i aria-hidden="true" />
          New · Fork from any snapshot
        </a>
        <h1 id="sb-hero-title">Persistent machines for autonomous software.</h1>
        <p>
          Give every agent, workflow and user its own always-on VM. It boots in half a second, remembers everything, and can&rsquo;t
          break anything that matters.
        </p>
        <div className="sb-hero__cta">
          <button type="button" className="sb-btn" data-sb-open="start">
            Start free <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button type="button" className="sb-btn sb-btn--dark" data-sb-open="notice">
            Read the docs
          </button>
        </div>
        <Terminal />
      </div>
    </section>
  );
}

export function Logos() {
  return (
    <section className="sb-logos" aria-label="Example teams">
      <p className="sb-eyebrow">Built for teams shipping agents in production</p>
      <ul>
        {logos.map((name, index) => (
          <li key={name} title={name}>
            <Glyph index={index} />
            <span className="sb-sr">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Heading({ chip, first, second }: { chip: string; first: string; second: string }) {
  return (
    <div className="sb-heading">
      <Chip>{chip}</Chip>
      <h2>
        {first} <span>{second}</span>
      </h2>
    </div>
  );
}

export function Autonomy() {
  return (
    <section className="sb-section" id="autonomy" aria-label="Autonomy">
      <Heading chip="Autonomy" first="Give your agents true autonomy." second="Their own space to explore, build, break things, and try again." />
      <ul className="sb-duo">
        {autonomy.map((card, index) => (
          <li key={card.id}>
            <div className="sb-duo__art">
              <Ascii variant={index === 0 ? "grid" : "towers"} />
              <p>
                <strong>{card.stat}</strong>
                <span>{card.statLabel}</span>
              </p>
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Features() {
  return (
    <section className="sb-section" id="features" aria-label="Features">
      <Heading chip="Features" first="A real computer, on demand." second="Fast enough to treat like a function, durable enough to treat like a server." />
      <ul className="sb-grid">
        {features.map((feature) => (
          <li key={feature.id}>
            <p className="sb-grid__figure">
              <strong>{feature.figure}</strong>
              <span>{feature.figureLabel}</span>
            </p>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="sb-section" id="pricing" aria-label="Pricing">
      <Heading chip="Pricing" first="Pay only while a machine is awake." second="Sleeping machines cost only their disk." />
      <Calculator />
      <ul className="sb-plans">
        {plans.map((plan) => (
          <li key={plan.name}>
            <p className="sb-eyebrow">{plan.name}</p>
            <p className="sb-plans__price">{plan.price}</p>
            <p>{plan.note}</p>
            <ul>
              {plan.points.map((point) => (
                <li key={point}>
                  <Check size={14} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <button type="button" className="sb-btn sb-btn--dark" data-sb-open={plan.open}>
              {plan.open === "sales" ? "Talk to us" : "Get started"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Changelog() {
  return (
    <section className="sb-section" id="changelog" aria-label="Changelog">
      <Heading chip="Changelog" first="Shipped lately." second="A release roughly every three weeks." />
      <ol className="sb-log">
        {changelog.map((entry) => (
          <li key={entry.version}>
            <span className="sb-log__v">v{entry.version}</span>
            <time>{entry.date}</time>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Blog() {
  return (
    <section className="sb-section" id="blog" aria-label="Blog">
      <Heading chip="Blog" first="Notes from the build." second="How the platform works, written by the people who run it." />
      <ul className="sb-posts">
        {posts.map((post) => (
          <li key={post.title}>
            <details>
              <summary>
                <span className="sb-eyebrow">
                  {post.date} · {post.minutes} min
                </span>
                <h3>{post.title}</h3>
                <span className="sb-posts__more">Read the opening</span>
              </summary>
              <p>{post.text}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section className="sb-section sb-faq" id="faq" aria-label="Questions">
      <Heading chip="FAQ" first="Questions." second="The ones we hear most." />
      <ul>
        {faqs.map((item) => (
          <li key={item.q}>
            <details name="sb-faq">
              <summary>
                <h3>{item.q}</h3>
                <span aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="sb-final" aria-labelledby="sb-final-title">
      <Ascii variant="wave" />
      <div>
        <h2 id="sb-final-title">Boot your first machine.</h2>
        <p>Free to start. No card. Ready in 412 milliseconds.</p>
        <div className="sb-hero__cta">
          <button type="button" className="sb-btn" data-sb-open="start">
            Start free <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button type="button" className="sb-btn sb-btn--dark" data-sb-open="sales">
            Talk to us
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sb-foot">
      <div className="sb-foot__in">
        <div>
          <a href="#top" aria-label="Substrata, back to top">
            <Logo />
          </a>
          <p>Persistent machines for autonomous software.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <ul>
            {["Docs", "Status", "Privacy", "Terms"].map((label) => (
              <li key={label}>
                <button type="button" data-sb-open="notice">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sb-foot__legal">
        <p>&copy; 2026 Substrata Systems</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
