import { ArrowUpRight } from "lucide-react";
import { faqs, footerColumns, hero, partners, principles, stats } from "../data/site";
import { PromptBox } from "./PromptBox";

const avatarTones = ["#f2b84b", "#e9788a", "#7d8ff0"];

export function Hero() {
  return (
    <section className="md-hero" aria-labelledby="meridiem-title">
      <a href="#blog" className="md-announce">
        <span className="md-dot" aria-hidden="true" />
        <span>
          {hero.announcement} <strong>{hero.announcementStrong}</strong>
        </span>
        <u>Read more</u>
      </a>
      <h1 id="meridiem-title" className="md-h1">
        <span>{hero.titleTop}</span> <span>{hero.titleBottom}</span>
      </h1>
      <p className="md-lede">{hero.body}</p>
      <a href="#waitlist" className="md-button md-buttonHero">
        Join the waitlist <ArrowUpRight size={17} aria-hidden="true" />
      </a>
      <p className="md-proof">
        <span className="md-avatars" aria-hidden="true">
          {avatarTones.map((tone) => (
            <svg key={tone} viewBox="0 0 24 24" width="24" height="24">
              <circle cx="12" cy="12" r="12" fill={tone} />
              <circle cx="12" cy="9.5" r="4" fill="#fff6e8" />
              <path d="M4.5 21a7.5 7.5 0 0115 0z" fill="#fff6e8" />
            </svg>
          ))}
        </span>
        {hero.proof}
      </p>
    </section>
  );
}

export function TryPanel() {
  return (
    <section id="try" className="md-panel" aria-label="Try a prompt">
      <img
        className="md-meadow"
        src="/showcase/meridiem/meadow-golden-hour.webp"
        alt="Wildflowers on a hillside at golden hour, the sun low under a bank of clouds"
        width={1920}
        height={1286}
        fetchPriority="high"
      />
      <PromptBox />
    </section>
  );
}

const partnerMarks = [
  <path key="a" d="M4 4h6v6H4zM12 8h8v8h-8zM4 14h5v5H4z" fill="currentColor" />,
  <path key="b" d="M2 8l5 4 5-6 5 6 5-4v10H2z" fill="currentColor" />,
  <path key="c" d="M4 12h16M9 4v16" stroke="currentColor" strokeWidth="3.5" fill="none" />,
  <g key="d" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="9" cy="10" r="1" />
    <circle cx="15" cy="10" r="1" />
    <circle cx="9" cy="14.5" r="1" />
    <circle cx="15" cy="14.5" r="1" />
  </g>,
  <path key="e" d="M2 19a10 10 0 0120 0h-5a5 5 0 00-10 0z" fill="currentColor" />,
];

export function Partners() {
  return (
    <section className="md-partners" aria-labelledby="meridiem-partners">
      <h2 id="meridiem-partners">Trusted by teams building serious products</h2>
      <ul>
        {partners.map((name, index) => (
          <li key={name} className={`md-partner md-partner${index + 1}`}>
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              {partnerMarks[index]}
            </svg>
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="md-section" aria-labelledby="meridiem-about">
      <header className="md-sectionHead">
        <p className="md-eyebrow">About</p>
        <h2 id="meridiem-about" className="md-h2">
          <span>Slower to answer.</span> <span>Much harder to fool.</span>
        </h2>
        <p className="md-sub">
          Most models write the first plausible thing. Meridiem plans, drafts and verifies, then shows you how it got
          there.
        </p>
      </header>
      <ol className="md-principles">
        {principles.map((item) => (
          <li key={item.number}>
            <span className="md-numeral">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
      <dl className="md-stats">
        {stats.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="md-section md-faq" aria-labelledby="meridiem-faq">
      <header className="md-sectionHead">
        <p className="md-eyebrow">Questions</p>
        <h2 id="meridiem-faq" className="md-h2">
          <span>Asked before</span> <span>the first request.</span>
        </h2>
      </header>
      <div className="md-faqList">
        {faqs.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="md-footer">
      <div className="md-footerTop">
        <div>
          <a href="#top" className="md-logo">
            Meridiem
          </a>
          <p>The reasoning model built for what matters.</p>
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
      <p className="md-footerNote">Concept website with demonstration content.</p>
    </footer>
  );
}
