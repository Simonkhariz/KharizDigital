import { ArrowUpRight, Play, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_PATH, clients, features, footerColumns, leadScores, steps } from "../../data/content";
import { initialDeals } from "../../data/crm";
import { averageCycle, formatCompact, formatPercent, getRange, periodTotals, revenueSeries } from "../../data/metrics";
import { LogoMark } from "../Logo";
import { HeroMock } from "./HeroMock";
import { InsightCard } from "./InsightCard";
import { SuggestionList } from "./Interactive";

const year = getRange("12m");
const yearTotals = periodTotals(initialDeals, year.start, year.end);
const yearSeries = revenueSeries(initialDeals, year);
const cycle = averageCycle(initialDeals, year);

const clientMarks = [
  <rect key="a" x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />,
  <path key="b" d="M10 1v18M1 10h18M3.5 3.5l13 13M16.5 3.5l-13 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  <path key="c" d="M3 18V2l14 5-14 5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />,
  <circle key="d" cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="30 8" />,
  <path key="e" d="M2 5h10M2 10h16M2 15h8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
];

export function Hero() {
  return (
    <>
      <div className="cl-hero-copy">
        <a className="cl-badge" href="#features">
          <Sparkles size={14} aria-hidden="true" /> New: the forecast agent is now in every plan
        </a>
        <h1>
          Boost Sales
          <br />
          with AI Agents
        </h1>
        <div className="cl-hero-row">
          <p>Enhance your sales strategy and keep every customer conversation moving with the power of AI agents.</p>
          <div className="cl-hero-actions">
            <Link className="cl-pill cl-pill-large" href={DASHBOARD_PATH}>
              Get Started Now
            </Link>
            <div className="cl-trust">
              <span className="cl-trust-faces" aria-hidden="true">
                {[1, 2, 4].map((id) => (
                  <img key={id} src={`/showcase/closient/avatar-${id}.webp`} alt="" width={36} height={36} />
                ))}
              </span>
              <Star size={15} fill="currentColor" aria-hidden="true" />
              <span>4.5 Trust Score</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cl-hero-cards">
        <HeroMock />
        <InsightCard />
      </div>

      <div className="cl-clients">
        <p>Trusted by 1K+ sales teams</p>
        <ul aria-label="Example customers (invented names)">
          {clients.map((name, index) => (
            <li key={name} data-style={index % 5}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                {clientMarks[index]}
              </svg>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function About() {
  return (
    <section className="cl-about cl-wrap" id="about" aria-labelledby="cl-about-title">
      <p className="cl-about-lead">Our agents help sales teams stay close to clients and adapt to what the market asks for.</p>
      <h2 id="cl-about-title" className="cl-statement">
        Closient supports effective sales management, ensuring customers get assistance.{" "}
        <span>We provide tools to sharpen strategy and improve satisfaction.</span>
      </h2>
      <button type="button" className="cl-tour" data-cl-open="tour" aria-label="How it works: open the three-step walkthrough">
        <span className="cl-tour-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <svg viewBox="0 0 120 40" preserveAspectRatio="none">
            <path d="M0,34 C20,34 20,12 40,16 S70,30 84,10 S110,20 120,6" />
          </svg>
        </span>
        <span className="cl-tour-pill">
          How it Works <Play size={13} fill="currentColor" aria-hidden="true" />
        </span>
      </button>
      <div className="cl-about-more">
        <p>
          Reps connect with clients, track the numbers that matter and adjust to demand, while agents keep records and
          follow-ups in order.
        </p>
        <a className="cl-pill cl-pill-dark" href="#features">
          Learn More
        </a>
      </div>
    </section>
  );
}

function FeatureArt({ id }: { id: (typeof features)[number]["id"] }) {
  if (id === "qualify") {
    return (
      <ul className="cl-art cl-art-leads">
        {leadScores.map((lead) => (
          <li key={lead.company}>
            <span>
              <strong>{lead.company}</strong>
              <small>{lead.detail}</small>
            </span>
            <em data-level={lead.score >= 80 ? "high" : lead.score >= 50 ? "mid" : "low"}>{lead.score}</em>
          </li>
        ))}
      </ul>
    );
  }
  if (id === "hygiene") return <SuggestionList />;
  const max = Math.max(...yearSeries.map((point) => point.current));
  return (
    <div className="cl-art cl-art-forecast">
      <p>
        <span>Won revenue, last 12 months</span>
        <strong>{formatCompact(yearTotals.wonRevenue)}</strong>
      </p>
      <svg viewBox="0 0 240 90" role="img" aria-label="Monthly won revenue in the demo workspace">
        {yearSeries.map((point, index) => {
          const barHeight = Math.max(3, (point.current / max) * 84);
          return <rect key={point.title} x={index * 20 + 3} y={90 - barHeight} width="14" height={barHeight} rx="3" opacity={index === yearSeries.length - 1 ? 0.45 : 1} />;
        })}
      </svg>
    </div>
  );
}

export function Features() {
  return (
    <section className="cl-features cl-wrap" id="features" aria-labelledby="cl-features-title">
      <header className="cl-section-head">
        <p className="cl-eyebrow">Features</p>
        <h2 id="cl-features-title">
          Three agents for the work <span>between the calls.</span>
        </h2>
      </header>
      <div className="cl-feature-grid">
        {features.map((feature) => (
          <article key={feature.id} className="cl-feature">
            <div className="cl-feature-art">
              <FeatureArt id={feature.id} />
            </div>
            <p className="cl-eyebrow">{feature.eyebrow}</p>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Steps() {
  return (
    <section className="cl-steps cl-wrap" id="how" aria-labelledby="cl-steps-title">
      <header className="cl-section-head">
        <p className="cl-eyebrow">How it works</p>
        <h2 id="cl-steps-title">
          Live in an afternoon, <span>useful by the next morning.</span>
        </h2>
      </header>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Results() {
  const stats = [
    { value: formatCompact(yearTotals.wonRevenue), label: "won in the last 12 months" },
    { value: yearTotals.winRate === null ? "n/a" : formatPercent(yearTotals.winRate), label: "of closed deals were won" },
    { value: cycle === null ? "n/a" : `${cycle} days`, label: "average time from lead to won" },
  ];
  return (
    <section className="cl-results" id="results" aria-labelledby="cl-results-title">
      <div className="cl-results-head">
        <h2 id="cl-results-title">See the numbers for yourself.</h2>
        <p>
          These figures come straight from the demonstration workspace: six reps, 32 accounts and every deal behind each
          total.
        </p>
        <Link className="cl-pill" href={DASHBOARD_PATH}>
          Open the dashboard <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <dl>
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="cl-final cl-wrap" aria-labelledby="cl-final-title">
      <h2 id="cl-final-title" className="cl-statement">
        Give your team its selling hours back. <span>Start with the demo, then bring your own pipeline.</span>
      </h2>
      <div>
        <Link className="cl-pill cl-pill-dark cl-pill-large" href={DASHBOARD_PATH}>
          Get Started Now
        </Link>
        <button type="button" className="cl-pill cl-pill-outline cl-pill-large" data-cl-open="signup">
          Create an account
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="cl-footer cl-wrap">
      <div className="cl-footer-brand">
        <a href="#top" aria-label="Closient home">
          <LogoMark size={26} /> <span>Closient</span>
        </a>
        <p>Sales agents that qualify, update and forecast, so reps can stay in the conversation.</p>
      </div>
      {footerColumns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <h2>{column.title}</h2>
          <ul>
            {column.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
      <div className="cl-footer-contact">
        <h2>Get in touch</h2>
        <button type="button" data-cl-open="signup">
          Create an account
        </button>
        <button type="button" data-cl-open="tour">
          Take the walkthrough
        </button>
      </div>
      <p className="cl-footer-note">
        <span>© 2026 Closient. Concept website with demonstration content.</span>
        <a href="#top">Back to top</a>
      </p>
    </footer>
  );
}
