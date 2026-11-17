import {
  Atom,
  BookOpen,
  Bot,
  Check,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  Headset,
  Landmark,
  Layers,
  Lightbulb,
  Plus,
  ShieldCheck,
  Sparkles,
  Telescope,
  WalletCards,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { faqs, footerColumns, hero, hub, institutions, integrations, outcomes, security, solutions } from "../data/content";
import { Logo, Mark } from "./Logo";

export function SectionHead({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="cm-head">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <section className="cm-hero" aria-labelledby="cm-hero-title">
      <div className="cm-hero-copy">
        <h1 id="cm-hero-title">
          {hero.titleLines.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </h1>
        <p>{hero.body}</p>
        <button type="button" className="cm-pill cm-pill-large" data-cm-open="demo">
          Book a demo
        </button>
      </div>
      <img
        className="cm-scene"
        src="/showcase/campusmind/campus-quad.webp"
        alt="A sandstone university building with a tower and cloisters around a lawn, in warm afternoon light"
        width={1920}
        height={800}
        fetchPriority="high"
      />
    </section>
  );
}

export function Institutions() {
  // The list is rendered twice so the marquee can loop without a gap; the copy is hidden from assistive tech.
  return (
    <section className="cm-marquee" aria-label="Institutions using Campusmind">
      {[false, true].map((copy) => (
        <ul key={String(copy)} aria-hidden={copy || undefined}>
          {institutions.map((institution) => (
            <li key={institution.name} className={`cm-inst cm-inst-${institution.style}`}>
              <strong>{institution.name}</strong>
              {institution.small && <span>{institution.small}</span>}
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}

/** Neutral model glyphs circling the Campusmind shield. */
function ModelOrbit() {
  const icons = [Sparkles, Atom, Compass, Layers, Lightbulb, Telescope, Bot, Landmark];
  return (
    <div className="cm-orbit" aria-hidden="true">
      <span className="cm-orbit-ring" />
      <span className="cm-orbit-ring cm-orbit-ring-wide" />
      <ul>
        {icons.map((Icon, index) => (
          <li key={index} style={{ "--cm-angle": `${index * 45 - 112}deg` } as CSSProperties}>
            <span>
              <Icon size={17} strokeWidth={1.7} />
            </span>
          </li>
        ))}
      </ul>
      <span className="cm-orbit-core">
        <Mark size={22} />
      </span>
    </div>
  );
}

function KnowledgeStrip() {
  return (
    <div className="cm-strip" aria-hidden="true">
      <span className="cm-strip-core">
        <Mark size={22} />
      </span>
      <i />
      <span className="cm-strip-node">
        <Bot size={19} strokeWidth={1.6} />
      </span>
      <i />
      <span className="cm-strip-group">
        {[ClipboardList, FileText, BookOpen].map((Icon, index) => (
          <span key={index}>
            <Icon size={16} strokeWidth={1.6} />
          </span>
        ))}
      </span>
    </div>
  );
}

function DeskAgents() {
  const desks = [
    { Icon: WalletCards, label: "Financial aid", state: "Answered from policy 3.1" },
    { Icon: GraduationCap, label: "Admissions", state: "Application status sent" },
    { Icon: Headset, label: "IT help", state: "Handed to a technician" },
  ];
  return (
    <ul className="cm-desks" aria-hidden="true">
      {desks.map(({ Icon, label, state }) => (
        <li key={label}>
          <span>
            <Icon size={16} strokeWidth={1.6} />
          </span>
          <strong>{label}</strong>
          <em>{state}</em>
        </li>
      ))}
    </ul>
  );
}

export function Hub() {
  const [models, knowledge, agents] = hub.cards;
  return (
    <section className="cm-section cm-hub" id="hub" aria-labelledby="cm-hub-title">
      <h2 id="cm-hub-title" className="cm-hub-title">
        {hub.titleLines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h2>
      <div className="cm-cards">
        <article className="cm-card">
          <div className="cm-card-copy">
            <h3>{models.title}</h3>
            <p>{models.body}</p>
          </div>
          <div className="cm-card-art">
            <img src="/showcase/campusmind/reading-room.webp" alt="" width={1000} height={667} loading="lazy" />
            <ModelOrbit />
          </div>
        </article>
        <article className="cm-card cm-card-flip">
          <div className="cm-card-copy">
            <h3>{knowledge.title}</h3>
            <p>{knowledge.body}</p>
          </div>
          <div className="cm-card-art">
            <img src="/showcase/campusmind/lecture-hall.webp" alt="" width={1000} height={731} loading="lazy" />
            <KnowledgeStrip />
          </div>
        </article>
        <article className="cm-card">
          <div className="cm-card-copy">
            <h3>{agents.title}</h3>
            <p>{agents.body}</p>
          </div>
          <div className="cm-card-art">
            <img src="/showcase/campusmind/library-desk.webp" alt="" width={1000} height={667} loading="lazy" />
            <DeskAgents />
          </div>
        </article>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section className="cm-section" id="solutions" aria-label="Solutions">
      <SectionHead title="Built for everyone on campus">One platform, with a different front door for each group.</SectionHead>
      <ul className="cm-solutions">
        {solutions.map((solution) => (
          <li key={solution.title}>
            <h3>{solution.title}</h3>
            <p>{solution.body}</p>
            <ul>
              {solution.points.map((point) => (
                <li key={point}>
                  <Check size={15} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Outcomes() {
  return (
    <section className="cm-outcomes" aria-label="Outcomes">
      <dl>
        {outcomes.map((outcome) => (
          <div key={outcome.label}>
            <dd>{outcome.value}</dd>
            <dt>{outcome.label}</dt>
          </div>
        ))}
      </dl>
      <p>Figures from the Campusmind 2025-26 customer survey. Demonstration data.</p>
    </section>
  );
}

export function Trust() {
  return (
    <section className="cm-section cm-trust" aria-label="Integrations and security">
      <div id="integrations">
        <h2>Connects to the systems your campus already runs</h2>
        <p>Standards-based connectors for each category, set up by your IT team in an afternoon.</p>
        <ul className="cm-integrations">
          {integrations.map((integration) => (
            <li key={integration}>{integration}</li>
          ))}
        </ul>
      </div>
      <div id="security" className="cm-security">
        <span className="cm-security-icon">
          <ShieldCheck size={22} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h2>Governed from day one</h2>
        <ul>
          {security.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="cm-section cm-faq" id="faq" aria-label="Questions">
      <SectionHead title="Questions from provosts and CIOs" />
      <div className="cm-faq-list">
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

export function Closing() {
  return (
    <section className="cm-closing" id="demo" aria-labelledby="cm-closing-title">
      <h2 id="cm-closing-title">Bring every assistant on campus under one roof</h2>
      <p>See the workbench with your own courses and policies in a 30-minute walkthrough.</p>
      <div>
        <button type="button" className="cm-pill cm-pill-large" data-cm-open="demo">
          Book a demo
        </button>
        <a className="cm-pill cm-pill-large cm-pill-ghost" href="#pricing">
          Estimate pricing
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="cm-footer">
      <div className="cm-footer-top">
        <div>
          <a href="#top" aria-label="Campusmind home">
            <Logo />
          </a>
          <p>The institutional assistant platform for higher education.</p>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href === "#demo" ? (
                    <button type="button" data-cm-open="demo">
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="cm-footer-bottom">
        <p>© 2026 Campusmind. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
