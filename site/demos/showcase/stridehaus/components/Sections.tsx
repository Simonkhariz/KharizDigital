import { CircleDot, HeartPulse, Plus, Smartphone, Sparkles, Watch } from "lucide-react";
import type { ReactNode } from "react";
import { athleteFeatures, built, faqs, footerColumns, hero, loadWidget } from "../data/content";

/** Two strides meeting at a point. */
export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 17L10 3l4 14" />
    </svg>
  );
}

export function SectionHead({ label, title, children }: { label: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="sh-head">
      <p>{label}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="sh-hero" aria-labelledby="sh-hero-title">
      <div className="sh-hero-backdrop" aria-hidden="true">
        <img src="/showcase/stridehaus/hero-stadium-track.webp" alt="" width={1920} height={1440} fetchPriority="high" />
      </div>
      <div className="sh-hero-inner">
        <div className="sh-hero-copy">
          <p>{hero.eyebrow}</p>
          <h1 id="sh-hero-title">
            {hero.titleLines.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </h1>
          <a className="sh-button sh-button-large" href="#join">
            Join for free
          </a>
        </div>
        {children}
        <p className="sh-hero-body">{hero.body}</p>
      </div>
    </section>
  );
}

const deviceIcons = [Watch, CircleDot, HeartPulse, Smartphone];

export function Built() {
  return (
    <section className="sh-built" aria-labelledby="sh-built-title">
      <span className="sh-built-icon">
        <Mark size={22} />
      </span>
      <h2 id="sh-built-title">
        {built.titleLines.map((line) => (
          <span key={line}>{line} </span>
        ))}
      </h2>
      <p className="sh-built-body">{built.body}</p>

      <div className="sh-bento">
        <article className="sh-bento-wide">
          <div className="sh-bento-art sh-bento-art-sky">
            <img src="/showcase/stridehaus/javelin-blue-sky.webp" alt="Athlete drawing back a javelin against a clear blue sky" width={1100} height={734} loading="lazy" />
            <div className="sh-load">
              <div>
                <span>Training Load</span>
                <strong>{loadWidget.value}</strong>
              </div>
              <div>
                <span>Last 7-day average</span>
                <ol aria-label="Seven-day load, five full days and two part days">
                  {loadWidget.days.map((fill, index) => (
                    <li key={index}>
                      <i style={{ height: `${fill * 100}%` }} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="sh-bento-copy">
            <h3>{built.log.title}</h3>
            <p>{built.log.body}</p>
          </div>
        </article>

        <article>
          <div className="sh-bento-art">
            <img src="/showcase/stridehaus/sprinter-start-overhead.webp" alt="Sprinter driving out of a start on a red track, seen from above" width={1000} height={750} loading="lazy" />
            <ul className="sh-devices" aria-label="Supported device types">
              {built.wearables.devices.map((device, index) => {
                const Icon = deviceIcons[index];
                return (
                  <li key={device}>
                    <span>
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    {device}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="sh-bento-copy">
            <h3>{built.wearables.title}</h3>
            <p>{built.wearables.body}</p>
          </div>
        </article>

        <article>
          <div className="sh-bento-art">
            <img className="sh-bento-img-right" src="/showcase/stridehaus/runner-track-bend.webp" alt="Runner on the bend of a red track, seen from behind" width={1100} height={734} loading="lazy" />
            <div className="sh-insight">
              <span aria-hidden="true">
                <i>
                  <Sparkles size={15} />
                </i>
                <i>
                  <Mark size={15} />
                </i>
              </span>
              <strong>{built.insights.cardTitle}</strong>
              <p>{built.insights.cardBody}</p>
            </div>
          </div>
          <div className="sh-bento-copy">
            <h3>{built.insights.title}</h3>
            <p>{built.insights.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Wordmark() {
  return (
    <section className="sh-band" aria-label="Stridehaus">
      <p aria-hidden="true">Stridehaus</p>
      <img className="sh-band-athlete" src="/showcase/stridehaus/runner-back-cutout.webp" alt="Runner in black shorts, seen from behind" width={560} height={1598} loading="lazy" />
    </section>
  );
}

export function Athletes() {
  return (
    <section className="sh-section" id="athletes" aria-label="For athletes">
      <SectionHead label="for Athletes" title="Train with the full picture.">
        Three habits that take less than a minute a day and change how you train.
      </SectionHead>
      <ul className="sh-trio">
        {athleteFeatures.map((feature) => (
          <li key={feature.title}>
            <strong>{feature.stat}</strong>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section className="sh-section sh-faq" id="faq" aria-label="Questions">
      <SectionHead label="Questions" title="Before you lace up." />
      <div className="sh-faq-list">
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
    <footer className="sh-footer">
      <div className="sh-footer-top">
        <div>
          <a className="sh-wordmark" href="#top" aria-label="Stridehaus home">
            Stridehaus
          </a>
          <p>The app for athletes. Log, learn and train together.</p>
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
      <div className="sh-footer-bottom">
        <p>© 2026 Stridehaus. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
