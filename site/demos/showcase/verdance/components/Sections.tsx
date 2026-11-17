import { faqs, features, footerColumns, hero, stats } from "../data/site";
import { EditorMock } from "./EditorMock";

export function Hero() {
  return (
    <section className="vd-hero" aria-labelledby="verdance-title">
      <h1 id="verdance-title">
        <span>{hero.titleTop}</span> <span>{hero.titleBottom}</span>
      </h1>
      <p>{hero.body}</p>
      <div className="vd-heroActions">
        <a href="#platform" className="vd-btn vd-btnLight">
          Explore Platform
        </a>
        <a href="#start" className="vd-btn vd-btnDark">
          Start Building
        </a>
      </div>
    </section>
  );
}

export function Stage() {
  return (
    <section id="editor" className="vd-stage" aria-label="Product preview">
      <img
        className="vd-field-art"
        src="/showcase/verdance/cosmos-field.webp"
        alt="Field of pink and magenta cosmos flowers under a blue sky with scattered clouds"
        width={1920}
        height={1280}
        fetchPriority="high"
      />
      <div className="vd-frame">
        <EditorMock />
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section aria-label="Platform figures" className="vd-wrap">
      <dl className="vd-stats vd-box">
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

export function Platform() {
  return (
    <section id="platform" className="vd-section vd-wrap" aria-labelledby="verdance-platform">
      <header className="vd-sectionHead">
        <p className="vd-kicker">Platform</p>
        <h2 id="verdance-platform">Four tools your team already needs, working as one</h2>
      </header>
      <ul className="vd-features vd-box">
        {features.map((item) => (
          <li key={item.code}>
            <span className="vd-code-label">{item.code}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="vd-section vd-wrap vd-split" aria-labelledby="verdance-faq">
      <header className="vd-sectionHead">
        <p className="vd-kicker">Questions</p>
        <h2 id="verdance-faq">Before you move your team in</h2>
      </header>
      <div className="vd-faq vd-box">
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
    <footer className="vd-wrap vd-footer">
      <div className="vd-box vd-footerBox">
        <div>
          <a href="#top" className="vd-logo">
            Verdance
          </a>
          <p>One platform, everything under control.</p>
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
      <p className="vd-footerNote">Concept website with demonstration content.</p>
    </footer>
  );
}
