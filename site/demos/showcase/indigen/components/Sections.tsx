import { ChevronRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { about, clients, faqs, footerColumns, hero, pitch, services, steps } from "../data/content";
import { Bars } from "./Bars";
import { LogoMark } from "./Logo";

function BookButton({ label = "Book a call" }: { label?: string }) {
  return (
    <a className="ig-button ig-button-large" href="#book">
      {label} <ChevronRight size={16} aria-hidden="true" />
    </a>
  );
}

function SectionHead({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="ig-head">
      <p className="ig-chip">{label}</p>
      <h2>{title}</h2>
      {children && <p className="ig-head-body">{children}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <section className="ig-hero" aria-labelledby="ig-hero-title">
      <p className="ig-chip">
        {hero.chip}
        <span className="ig-chip-tick" aria-hidden="true" />
      </p>
      <h1 id="ig-hero-title">
        {hero.titleLines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h1>
      <p className="ig-hero-body">{hero.body}</p>
      <BookButton label={hero.cta} />
      <Bars />
    </section>
  );
}

export function Logos() {
  return (
    <section className="ig-logos" aria-labelledby="ig-logos-title">
      <h2 id="ig-logos-title" className="ig-logos-title">
        Trusted by industry leaders
      </h2>
      <ul className="ig-logos-row">
        {clients.map((client) => (
          <li key={client.name} className={`ig-logo ig-logo-${client.style}`}>
            {client.style === "node" && (
              <svg width="34" height="16" viewBox="0 0 34 16" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="4" cy="8" r="3" />
                  <circle cx="16" cy="8" r="3" />
                  <circle cx="29" cy="4" r="3" />
                  <path d="M7 8h6M19 8c4 0 3-4 7-4" />
                </g>
              </svg>
            )}
            <span>{client.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pitch({ children }: { children: ReactNode }) {
  return (
    <section className="ig-pitch" aria-labelledby="ig-pitch-title">
      <p className="ig-chip">
        {pitch.chip}
        <span className="ig-chip-tick" aria-hidden="true" />
        <span>{pitch.chipTag}</span>
      </p>
      <h2 id="ig-pitch-title">
        {pitch.titleLines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h2>
      <p className="ig-pitch-body">{pitch.body}</p>
      <BookButton />
      <div className="ig-stage">{children}</div>
    </section>
  );
}

export function Services() {
  return (
    <section className="ig-section" id="build" aria-label="What we build">
      <SectionHead label="What we build" title="Six kinds of work we take off your team.">
        Each engagement starts with one workflow and a measurable target. These are the ones we are asked for most.
      </SectionHead>
      <ul className="ig-services">
        {services.map((service) => (
          <li key={service.id}>
            <span className="ig-services-id">{service.id}</span>
            <h3>{service.title}</h3>
            <p>{service.body}</p>
            <ul>
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section className="ig-section ig-process" id="process" aria-label="How we work">
      <SectionHead label="How we work" title="Live in six weeks, measured from day one.">
        A fixed plan with a deliverable at the end of every stage, so you always know what you are paying for.
      </SectionHead>
      <ol className="ig-steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <div className="ig-steps-rail" aria-hidden="true">
              <span>{index + 1}</span>
            </div>
            <p className="ig-steps-week">{step.week}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <p className="ig-steps-output">
              <strong>You get</strong> {step.output}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  return (
    <section className="ig-section ig-about" id="about" aria-label="About">
      <p className="ig-chip">About</p>
      <div className="ig-about-grid">
        <h2>{about.statement}</h2>
        <div>
          <p>{about.body}</p>
          <BookButton label="Meet the team on a call" />
        </div>
      </div>
      <dl className="ig-stats">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Faq() {
  return (
    <section className="ig-section ig-faq" id="faq" aria-label="Questions">
      <SectionHead label="Questions" title="What operations leaders ask us first." />
      <div className="ig-faq-list">
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
    <footer className="ig-footer">
      <div className="ig-footer-top">
        <div className="ig-footer-brand">
          <a href="#top" aria-label="Indigen home">
            <LogoMark size={26} />
            <span>Indigen</span>
          </a>
          <p>Agents that run your business workflows, built inside the systems you already use.</p>
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
      <div className="ig-footer-bottom">
        <p>© 2026 Indigen. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
