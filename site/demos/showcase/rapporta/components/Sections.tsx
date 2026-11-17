import clsx from "clsx";
import { company, guides, hero, platformSteps, trustedBy, type LogoMark as Mark } from "../data/site";
import { Faq, Roles } from "./Accordions";
import { Dashboard } from "./Dashboard";
import { DialogButton } from "./Dialogs";
import { FlowDiagram } from "./FlowDiagram";
import { page as styles, ui } from "@/demos/showcase/rapporta/styles";

export function Hero() {
  return (
    <section className={styles.band} aria-labelledby="hero-title">
      <div className={clsx(styles.inner, styles.hero)}>
        <div className={styles.heroTitleWrap}>
          <p className={styles.pill}>{hero.pill}</p>
          <h1 className={styles.h1} id="hero-title">
            <span>{hero.titleTop}</span> <span>{hero.titleBottom}</span>
          </h1>
        </div>
        <p className={styles.heroBody}>{hero.body}</p>
        <div className={styles.heroActions}>
          <DialogButton request={{ kind: "demo" }} className={clsx(ui.btn, ui.dark)}>
            Book a demo
          </DialogButton>
          <a href="#pricing" className={clsx(ui.btn, ui.light)}>
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

export function ProductStage() {
  return (
    <section id="product" className={styles.band} aria-label="Product preview">
      <div className={clsx(styles.inner, styles.stage)}>
        <Dashboard />
      </div>
    </section>
  );
}

const marks: Record<Mark, React.ReactNode> = {
  wing: (
    <path
      d="M3 8c7-1 13 1 19 7M3 8c4 5 6 9 7 15M10 23c2-6 6-9 12-8M12 4c3 3 5 7 5 11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  crate: (
    <>
      <circle cx="13" cy="13" r="11" fill="currentColor" />
      <path d="M6 10l7-3 7 3-7 3zM13 13v8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  loop: (
    <path
      d="M16 3L6 14h9a5 5 0 110 10 5 5 0 01-5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  grid: (
    <>
      <circle cx="13" cy="13" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M9 9h3v3H9zM14 9h3v3h-3zM9 14h3v3H9zM14 14h3v3h-3z" fill="currentColor" />
    </>
  ),
};

const logoStyles = {
  light: styles.logoLight,
  condensed: styles.logoCondensed,
  heavy: styles.logoHeavy,
  bold: styles.logoBold,
};

export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-title">
      <div className={clsx(styles.band, styles.white)}>
        <h2 className={clsx(styles.inner, styles.trustedTitle)} id="trusted-title">
          Trusted by Companies and Agencies
        </h2>
      </div>
      <div className={clsx(styles.band, styles.white)}>
        <ul className={clsx(styles.inner, styles.logos)}>
          {trustedBy.map((logo) => (
            <li key={logo.name} className={clsx(styles.logoCell, logoStyles[logo.style])}>
              <svg width="28" height="28" viewBox="0 0 26 26" aria-hidden="true">
                {marks[logo.mark]}
              </svg>
              {logo.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={clsx(styles.band, styles.white)}>
        <div className={clsx(styles.inner, styles.spacer)} />
      </div>
    </section>
  );
}

export function Standard() {
  return (
    <section className={styles.band} aria-labelledby="standard-title">
      <div className={clsx(styles.inner, styles.standard)}>
        <div>
          <h2 className={styles.h2} id="standard-title">
            A new standard for <span>customer experience</span>
          </h2>
          <p className={styles.lede}>
            We bridge the gap between growing companies and their customers by changing what a support conversation
            can do.
          </p>
          <a href="#platform" className={clsx(ui.btn, ui.dark, ui.md, styles.standardCta)}>
            How our platform works
          </a>
        </div>
        <FlowDiagram />
      </div>
    </section>
  );
}

export function Platform() {
  return (
    <section id="platform" aria-labelledby="platform-title">
      <div className={clsx(styles.band, styles.white)}>
        <div className={clsx(styles.inner, styles.sectionHead)}>
          <div>
            <h2 className={styles.h2} id="platform-title">
              Live in days, <span>better every week</span>
            </h2>
            <p className={styles.lede}>Three steps from your first call with us to agents closing real cases.</p>
          </div>
        </div>
      </div>
      <div className={clsx(styles.band, styles.white)}>
        <ol className={clsx(styles.inner, styles.cells3)}>
          {platformSteps.map((step) => (
            <li key={step.number} className={styles.cell}>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.cellTitle}>{step.title}</h3>
              <p className={styles.cellBody}>{step.body}</p>
              <span className={styles.cellMeta}>{step.meta}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Resources() {
  return (
    <section id="resources" aria-labelledby="resources-title">
      <div className={clsx(styles.band, styles.white)}>
        <div className={clsx(styles.inner, styles.resources)}>
          <div className={styles.resourcesIntro}>
            <h2 className={styles.h2} id="resources-title">
              Answers before <span>you ask</span>
            </h2>
            <p className={styles.lede}>
              The questions support leaders raise most often in a first call, answered plainly.
            </p>
          </div>
          <Faq />
        </div>
      </div>
      <div className={clsx(styles.band, styles.white)} id="guides">
        <ul className={clsx(styles.inner, styles.cells3)} aria-label="Recent guides">
          {guides.map((guide) => (
            <li key={guide.title} className={clsx(styles.cell, styles.guide)}>
              <p className={styles.guideMeta}>
                <span>{guide.tag}</span>
                <span>{guide.minutes} min read</span>
              </p>
              <h3 className={styles.guideTitle}>{guide.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Company() {
  return (
    <section id="company" className={styles.band} aria-labelledby="company-title">
      <div className={clsx(styles.inner, styles.company)}>
        <div className={styles.companyIntro}>
          <h2 className={styles.h2} id="company-title">
            A small team, <span>built around support</span>
          </h2>
          <p className={styles.lede}>{company.statement}</p>
          <dl className={styles.facts}>
            {company.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Roles />
      </div>
    </section>
  );
}
