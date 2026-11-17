import { Check } from "lucide-react";
import { codeLines, features, footerLinks, logos, problems, reliability, stats, steps } from "../data/content";
import { CubeField, ServerStack, Squares } from "./Art";
import { CopyCommand, Faq, Pricing, UseCases, Wordmark } from "./Interactive";
import { ArrowOut, Band, Corners, Logo, Pixel, Tag } from "./Marks";
import { Pipeline } from "./Pipeline";

export function Ticker() {
  return (
    <Band n="01" label="Announcement" className="rm-ticker">
      <p>Routed 12M+ agent runs today</p>
    </Band>
  );
}

export function Hero() {
  return (
    <Band n="02" id="top" label="Introduction" className="rm-hero">
      <span className="rm-hero__flag" aria-hidden="true" />
      <h1>
        <Pixel name="burst" className="rm-hero__burst" size={28} />
        Every agent.
        <br />
        One <em>control plane</em>.
      </h1>
      <div className="rm-hero__row">
        <p className="rm-hero__lede">
          Deploy, route and monitor AI agents in production from one place. No glue code, no scattered scripts, no guessing what your
          agents did at 3 AM.
        </p>
        <div className="rm-hero__cta">
          <div className="rm-hero__buttons">
            <button type="button" className="rm-btn" data-rm-open="trial">
              <Pixel name="burst" size={16} />
              Start free trial
            </button>
            <a href="#sdk" className="rm-link">
              Read the docs <ArrowOut />
            </a>
          </div>
          <CopyCommand />
        </div>
      </div>
    </Band>
  );
}

export function Diagram() {
  return (
    <Band n="03" label="How a run moves through Runemark" className="rm-flush">
      <Pipeline />
    </Band>
  );
}

export function Logos() {
  return (
    <Band n="04" label="Example teams" className="rm-logos">
      <ul>
        {logos.map((logo) => (
          <li key={logo.name} data-style={logo.style}>
            <Pixel name={logo.mark} size={16} />
            {logo.name}
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function Problem() {
  return (
    <Band n="05" id="product" dark className="rm-problem">
      <Tag>The problem</Tag>
      <h2 className="rm-h2">Agents don&rsquo;t fail loudly.</h2>
      <div className="rm-problem__box">
        <ul className="rm-problem__grid">
          {problems.map((item) => (
            <li key={item.title}>
              <span className="rm-num" data-hot={item.hot}>
                {item.value}
              </span>
              <p>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="rm-problem__fix">
          <div>
            <p className="rm-kicker">With Runemark</p>
            <h3>
              Traced, fixed and rerouted in <em>4.2s.</em>
            </h3>
            <button type="button" className="rm-btn rm-btn--light" data-rm-open="trial">
              <Pixel name="burst" size={16} />
              Start free trial
            </button>
          </div>
          <CubeField />
        </div>
      </div>
    </Band>
  );
}

export function HowItWorks() {
  return (
    <Band n="06" id="how" className="rm-pad">
      <Tag>How it works</Tag>
      <h2 className="rm-h2">From script to production in three steps.</h2>
      <ol className="rm-steps">
        {steps.map((step) => (
          <li key={step.n}>
            <Corners />
            <span className="rm-num">{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <code>$ {step.code}</code>
          </li>
        ))}
      </ol>
    </Band>
  );
}

export function Features() {
  return (
    <Band n="07" id="features" className="rm-pad">
      <Tag>Features</Tag>
      <h2 className="rm-h2">Everything between the prompt and the pager.</h2>
      <ul className="rm-features">
        {features.map((feature) => (
          <li key={feature.id}>
            <p className="rm-kicker">{feature.tag}</p>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <table>
              <caption>{feature.tag} example</caption>
              <tbody>
                {feature.rows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function Reliability() {
  return (
    <Band n="08" id="reliability" className="rm-rely">
      <div className="rm-rely__art">
        <ServerStack />
      </div>
      <div className="rm-rely__text">
        <Corners />
        <h2 className="rm-h2">
          Reliability at
          <br />
          every scale.
        </h2>
        <p>Built for uptime and isolation, from your first deploy to millions of runs a day.</p>
        <ul>
          {reliability.map((item) => (
            <li key={item}>
              <Check size={14} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}

export function Sdk() {
  return (
    <Band n="09" id="sdk" dark className="rm-sdk">
      <div className="rm-sdk__text">
        <h2 className="rm-h2">Ship an agent in one command.</h2>
        <p>Define agents in TypeScript, set a budget, then deploy. Runemark handles versions, isolation and scale.</p>
        <button type="button" className="rm-link" data-rm-open="notice">
          Read the SDK docs <ArrowOut />
        </button>
      </div>
      <figure className="rm-code">
        <figcaption>
          <span>
            <i aria-hidden="true" />
            agent.ts
          </span>
          <small>TypeScript</small>
        </figcaption>
        <pre>
          <code>
            {codeLines.map((line, i) => (
              <span key={i} className="rm-code__line">
                <span className="rm-code__n" aria-hidden="true">
                  {i + 1}
                </span>
                {line.map((token, j) => (
                  <span key={j} data-k={token.k}>
                    {token.t}
                  </span>
                ))}
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
        <p className="rm-code__status">
          <i aria-hidden="true" />
          Deployed <span>support-triage@v12</span>
        </p>
      </figure>
    </Band>
  );
}

export function Stats() {
  return (
    <Band n="10" label="Runemark in numbers" className="rm-flush">
      <dl className="rm-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <Corners />
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

export function Cases() {
  return (
    <Band n="11" id="cases" className="rm-pad rm-pad--bleed">
      <UseCases />
    </Band>
  );
}

export function Plans() {
  return (
    <Band n="12" id="pricing" className="rm-pad">
      <Pricing />
    </Band>
  );
}

export function Questions() {
  return (
    <Band n="13" id="faq" className="rm-questions">
      <div className="rm-questions__head">
        <Tag>FAQ</Tag>
        <h2 className="rm-h2">Questions, answered.</h2>
        <p>
          Something else?{" "}
          <button type="button" className="rm-link" data-rm-open="engineer">
            Talk to an engineer <ArrowOut />
          </button>
        </p>
      </div>
      <Faq />
    </Band>
  );
}

export function FinalCta() {
  return (
    <Band n="14" dark className="rm-final">
      <div>
        <h2>
          Ship agents
          <br />
          that don&rsquo;t
          <br />
          <em>break.</em>
        </h2>
        <p>Set up in under ten minutes. See every run from day one.</p>
        <div className="rm-hero__buttons">
          <button type="button" className="rm-btn rm-btn--light" data-rm-open="trial">
            <Pixel name="burst" size={16} />
            Start free trial
          </button>
          <button type="button" className="rm-link" data-rm-open="engineer">
            Talk to an engineer <ArrowOut />
          </button>
        </div>
      </div>
      <div className="rm-final__art">
        <Squares />
      </div>
    </Band>
  );
}

export function Footer() {
  return (
    <footer className="rm-band rm-band--dark rm-foot">
      <span className="rm-band__n" aria-hidden="true">
        15
      </span>
      <div className="rm-band__body">
        <nav className="rm-foot__grid" aria-label="Footer">
          <button type="button" className="rm-foot__demo" data-rm-open="demo">
            <span className="rm-foot__n">01</span>
            <span>Request a demo</span>
            <ArrowOut size={22} />
          </button>
          {footerLinks.map((link) => (
            <a key={link.n} href={link.href}>
              <span className="rm-foot__n">{link.n}</span>
              <span>{link.label}</span>
              <ArrowOut />
            </a>
          ))}
        </nav>
        <div className="rm-foot__brand">
          <a href="#top" aria-label="Runemark, back to top">
            <Logo />
          </a>
          <p>The infrastructure layer for AI agents.</p>
          <small>Concept website with demonstration content.</small>
        </div>
        <div className="rm-foot__word">
          <Wordmark />
        </div>
        <div className="rm-foot__legal">
          <p>&copy; 2026 Runemark Labs</p>
          <ul>
            {["Privacy", "Terms", "DPA"].map((label) => (
              <li key={label}>
                <button type="button" data-rm-open="notice">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
