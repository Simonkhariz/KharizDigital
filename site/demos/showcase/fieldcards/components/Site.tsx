import type { ReactNode } from "react";
import { navLinks, notes, type StageData } from "../data/content";

function Mark() {
  return (
    <span className="fc-mark">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect x="1" y="1" width="20" height="20" rx="6" fill="currentColor" />
        <rect x="6" y="5.5" width="10" height="11" rx="2.5" fill="#f3f2ee" />
      </svg>
      Fieldcards
    </span>
  );
}

export function Header() {
  return (
    <header className="fc-header">
      <a href="#top" aria-label="Fieldcards home">
        <Mark />
      </a>
      <nav aria-label="Primary">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Intro() {
  return (
    <section className="fc-intro" aria-labelledby="fc-intro-title">
      <p className="fc-kicker">Three card interfaces</p>
      <h1 id="fc-intro-title">Small cards, set against big landscapes.</h1>
      <p>
        Fieldcards is a study of the single card as a complete interface: a profile, an app and a journal entry. Each one works. Press the
        buttons.
      </p>
      <a className="fc-dark-button" href="#profile">
        See the first card
      </a>
    </section>
  );
}

export function Stage({ stage, children }: { stage: StageData; children: ReactNode }) {
  return (
    <section className="fc-stage-section" id={stage.id} aria-labelledby={`fc-${stage.id}-title`}>
      <div className="fc-stage-head">
        <span>{stage.number}</span>
        <h2 id={`fc-${stage.id}-title`}>{stage.title}</h2>
        <p>{stage.text}</p>
      </div>
      <div className="fc-stage" data-texture={stage.texture} style={{ backgroundImage: `url(${stage.image})` }}>
        {children}
      </div>
    </section>
  );
}

export function Notes() {
  return (
    <section className="fc-notes" id="notes" aria-labelledby="fc-notes-title">
      <h2 id="fc-notes-title">Notes on the set</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="fc-footer">
      <Mark />
      <nav aria-label="Footer">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#top">Back to top</a>
      </nav>
      <p>© 2026 Fieldcards. Concept website with demonstration content. People, apps and places shown are invented.</p>
    </footer>
  );
}
