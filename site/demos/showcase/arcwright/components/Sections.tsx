import { Check, Gauge, History, Plug, Plus, Route, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { customerStats, customers, faqs, features, footerColumns, hero, reliable, type Feature } from "../data/content";
import { Slab } from "./iso";
import { Logo } from "./Logo";

const featureIcons: Record<Feature["icon"], LucideIcon> = {
  route: Route,
  shield: ShieldCheck,
  history: History,
  plug: Plug,
  gauge: Gauge,
  users: Users,
};

export function Chip({ children }: { children: ReactNode }) {
  return (
    <p className="aw-chip">
      {children}
      <span aria-hidden="true" />
    </p>
  );
}

export function SectionHead({ chip, title, children }: { chip: string; title: string; children?: ReactNode }) {
  return (
    <div className="aw-head">
      <Chip>{chip}</Chip>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="aw-hero" aria-labelledby="aw-hero-title">
      <Chip>{hero.chip}</Chip>
      <h1 id="aw-hero-title">
        {hero.title} <span>{hero.titleAccent}</span>
      </h1>
      <p className="aw-hero-body">{hero.body}</p>
      <div className="aw-hero-actions">
        <a className="aw-button" href="#demo">
          Book a Demo
        </a>
        <a className="aw-button aw-button-outline" href="#solutions">
          Learn More
        </a>
      </div>
      {children}
    </section>
  );
}

/** A stack of dark plates with the mark on top, drawn with the same isometric kit as the hero. */
function Plates() {
  const plate = { x: 0, y: 0, w: 240, d: 240, r: 4, stroke: "#4a4b50", side: "#141517" };
  return (
    <svg className="aw-plates" viewBox="-230 -40 460 330" aria-hidden="true">
      <ellipse cx="0" cy="262" rx="170" ry="24" fill="#000" opacity="0.55" filter="url(#aw-plates-blur)" />
      <defs>
        <filter id="aw-plates-blur" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <linearGradient id="aw-plates-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2c30" />
          <stop offset="1" stopColor="#1b1c1f" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((index) => (
        <Slab key={index} {...plate} z={index * 14} h={8} fill="#1c1d20" />
      ))}
      <Slab {...plate} z={42} h={9} fill="url(#aw-plates-top)">
        <g transform="translate(120 120)">
          <g fill="#fff">
            <rect x="-17" y="-52" width="34" height="34" rx="12" />
            <rect x="-17" y="18" width="34" height="34" rx="12" />
            <rect x="-52" y="-17" width="34" height="34" rx="12" />
            <rect x="18" y="-17" width="34" height="34" rx="12" />
          </g>
          <circle r="9" fill="#f04e23" />
        </g>
      </Slab>
    </svg>
  );
}

export function Reliable() {
  return (
    <section className="aw-dark" aria-labelledby="aw-reliable-title">
      <div className="aw-head aw-head-centre">
        <Chip>{reliable.chip}</Chip>
        <h2 id="aw-reliable-title">{reliable.title}</h2>
        <p>{reliable.body}</p>
      </div>
      <div className="aw-reliable">
        <Plates />
        <div>
          <h3>{reliable.blockTitle}</h3>
          <p>{reliable.blockBody}</p>
          <ul>
            {reliable.checklist.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <dl className="aw-dark-stats">
        {reliable.stats.map((stat) => (
          <div key={stat.label}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Features() {
  return (
    <section className="aw-section" id="features" aria-label="Features">
      <SectionHead chip="Features" title="Everything an agent needs to be trusted with real work.">
        The planner, the guardrails and the record of what happened, in one platform.
      </SectionHead>
      <ul className="aw-features">
        {features.map((feature, index) => {
          const Icon = featureIcons[feature.icon];
          return (
            <li key={feature.title}>
              <div>
                <span className="aw-features-icon">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="aw-features-id">F.{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Customers() {
  return (
    <section className="aw-section" id="customers" aria-label="Customers">
      <SectionHead chip="Customers" title="Running in production, not in pilots." />
      <dl className="aw-customer-stats">
        {customerStats.map((stat) => (
          <div key={stat.label}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
      <ul className="aw-customer-logos" aria-label="Customers include">
        {customers.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section className="aw-section aw-faq" id="faq" aria-label="Questions">
      <SectionHead chip="Questions" title="Answers before the demo." />
      <div className="aw-faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.q} open={index === 0}>
            <summary>
              {faq.q}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="aw-footer">
      <div className="aw-footer-top">
        <div>
          <a href="#top" aria-label="Arcwright home">
            <Logo />
          </a>
          <p>Agents that think, automate and deliver, inside the systems your company already uses.</p>
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
      <div className="aw-footer-bottom">
        <p>© 2026 Arcwright. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
