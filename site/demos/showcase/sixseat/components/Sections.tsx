import { Check, Plus } from "lucide-react";
import { changelog, faqs, footerColumns, marquee, plans } from "../data/content";
import { Cube, CursorLabel, Wordmark } from "./Cube";
import { CaseTabs, LayerList, PostList, SeatRow, Session } from "./Live";

export function Marquee() {
  return (
    <section className="sx-marquee" aria-label="Teams using shared sessions">
      <div className="sx-wrap">
        <p>Shared sessions are running at</p>
        <div className="sx-marquee-window">
          <ul>
            {[...marquee, ...marquee].map((logo, index) => (
              <li key={index} data-serif={logo.serif} aria-hidden={index >= marquee.length}>
                {logo.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="sx-section sx-audience" aria-labelledby="sx-audience-title">
      <div className="sx-wrap">
        <div className="sx-split-head">
          <h2 id="sx-audience-title">Most agent runs have an audience of one.</h2>
          <p>The people who own the outcome, review the result or carry the work forward are not in the room while the agent works.</p>
        </div>
        <div className="sx-compare-row">
          <div className="sx-compare-label">
            <h3>Your agent run today</h3>
            <p>1 of 6 seats taken</p>
          </div>
          <ul className="sx-seats">
            <li data-label="top">
              <Cube tone="blue" size={88} tile />
              <CursorLabel label="You" tone="blue" />
              <span className="sx-sr">You</span>
            </li>
            {Array.from({ length: 5 }, (_, index) => (
              <li key={index}>
                <Cube size={88} tile ghost />
                <span className="sx-sr">Empty seat</span>
              </li>
            ))}
          </ul>
        </div>
        <SeatRow />
      </div>
    </section>
  );
}

export function Layers() {
  return (
    <section className="sx-section sx-white" id="product" aria-labelledby="sx-layers-title">
      <div className="sx-wrap">
        <div className="sx-center-head">
          <h2 id="sx-layers-title">Three layers, one shared run.</h2>
          <p>Presence, steering and handoff sit on top of the agents you already use. Try them on the session below.</p>
        </div>
        <Session />
        <LayerList />
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section className="sx-section" id="use-cases" aria-labelledby="sx-cases-title">
      <div className="sx-wrap">
        <div className="sx-split-head">
          <h2 id="sx-cases-title">A seat for whoever needs to see it.</h2>
          <p>Different teams fill the table differently. The session works the same way for all of them.</p>
        </div>
        <CaseTabs />
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="sx-section sx-white" id="pricing" aria-labelledby="sx-pricing-title">
      <div className="sx-wrap">
        <div className="sx-center-head">
          <h2 id="sx-pricing-title">Pay for people. Agents sit free.</h2>
          <p>Every plan includes watching, steering and the full transcript.</p>
        </div>
        <ul className="sx-plans">
          {plans.map((plan) => (
            <li key={plan.id} data-featured={plan.featured}>
              <h3>{plan.name}</h3>
              <p className="sx-plan-price">
                <strong>{plan.price === null ? "Let's talk" : `$${plan.price}`}</strong>
                <span>{plan.unit}</span>
              </p>
              <p>{plan.text}</p>
              <button type="button" className={plan.featured ? "sx-button" : "sx-button sx-button-light"} data-sx-open={plan.dialog}>
                {plan.cta}
              </button>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={14} aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Changelog() {
  return (
    <section className="sx-section" id="changelog" aria-labelledby="sx-changelog-title">
      <div className="sx-wrap sx-changelog">
        <div>
          <h2 id="sx-changelog-title">Changelog</h2>
          <p>What shipped in the last four releases.</p>
        </div>
        <ol>
          {changelog.map((entry) => (
            <li key={entry.version}>
              <p>
                <span>v{entry.version}</span> {entry.date}
              </p>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section className="sx-section sx-white" id="blog" aria-labelledby="sx-blog-title">
      <div className="sx-wrap">
        <div className="sx-split-head">
          <h2 id="sx-blog-title">From the blog</h2>
          <p>Notes on working next to agents, from the team building Sixseat.</p>
        </div>
        <PostList />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="sx-section" id="faq" aria-labelledby="sx-faq-title">
      <div className="sx-wrap sx-changelog">
        <div>
          <h2 id="sx-faq-title">Questions</h2>
          <p>Short answers to what teams ask first.</p>
        </div>
        <div className="sx-faq">
          {faqs.map((item, index) => (
            <details key={item.q} name="sx-faq" open={index === 0}>
              <summary>
                {item.q}
                <Plus size={16} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="sx-closing" aria-labelledby="sx-closing-title">
      <div className="sx-wrap">
        <div className="sx-closing-cubes" aria-hidden="true">
          <Cube tone="blue" size={64} />
          <Cube tone="orange" size={64} />
          <Cube tone="pink" size={64} />
          <Cube tone="green" size={64} />
          <Cube tone="ink" size={64} />
          <Cube size={64} ghost />
        </div>
        <h2 id="sx-closing-title">One seat is still open.</h2>
        <p>Start a shared session and bring the next run into the room.</p>
        <div className="sx-hero-actions">
          <button type="button" className="sx-button" data-sx-open="start">
            Start a shared session
          </button>
          <button type="button" className="sx-button sx-button-light" data-sx-open="contact">
            Talk to us
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="sx-footer">
      <div className="sx-wrap sx-footer-grid">
        <div>
          <a href="#top" aria-label="Sixseat home">
            <Wordmark />
          </a>
          <p>Shared, live sessions for people and agents.</p>
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
      <div className="sx-wrap sx-footer-base">
        <p>© 2026 Sixseat. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
