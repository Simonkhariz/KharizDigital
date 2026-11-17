import { ArrowRight, MessageCircle, Plug, UserRoundCheck } from "lucide-react";
import { navLinks, numbers, processSteps, sequence } from "../data/content";
import { RoutingRules, StartForm } from "./Interactive";
import { LogoMark } from "./Logo";

const stepIcons = { plug: Plug, message: MessageCircle, route: UserRoundCheck };

export function Hero() {
  return (
    <section className="lg-hero lg-wrap" id="top" aria-labelledby="lg-hero-title">
      <p className="lg-chip">Sales automation for growing teams</p>
      <h1 id="lg-hero-title">
        Plant a lead today. <span>Harvest a customer by the end of the quarter.</span>
      </h1>
      <div className="lg-hero-foot">
        <p>
          Leadgrove connects your CRM to every channel, writes the follow-ups and sends each lead to the rep best placed
          to close it.
        </p>
        <div>
          <a className="lg-button" href="#start">
            Start Outreach <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="lg-button lg-button-ghost" href="#process">
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="lg-process" id="process" aria-labelledby="lg-process-title">
      <header>
        <div>
          <p className="lg-chip lg-chip-dark">How it works</p>
          <h2 id="lg-process-title">
            Our Sales
            <br />
            Automation Process
          </h2>
        </div>
        <p>Empower your team with tools designed to increase productivity, improve follow-ups and close deals faster.</p>
      </header>
      <ol>
        {processSteps.map((step) => {
          const Icon = stepIcons[step.icon];
          return (
            <li key={step.title}>
              <span aria-hidden="true">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function Statement() {
  return (
    <section className="lg-statement lg-wrap" aria-label="About Leadgrove">
      <p>
        Our platform empowers sales teams with advanced tools that streamline workflows, enhance collaboration,{" "}
        <span>and drive results. It supports your team&apos;s success in closing deals and managing client relationships.</span>
      </p>
    </section>
  );
}

export function Platform() {
  return (
    <section className="lg-platform lg-wrap" id="platform" aria-labelledby="lg-platform-title">
      <header className="lg-head">
        <div>
          <p className="lg-chip">Platform</p>
          <h2 id="lg-platform-title">
            Everything between
            <br />
            first touch and signed
          </h2>
        </div>
        <p>Three tools that share one record of every lead, so nothing is typed twice and nobody is contacted twice.</p>
      </header>
      <div className="lg-cards">
        <article className="lg-card">
          <ol className="lg-sequence">
            {sequence.map((step) => (
              <li key={step.day}>
                <small>{step.day}</small>
                <span>
                  <strong>{step.channel}</strong>
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
          <h3>Sequences that react</h3>
          <p>Each step waits for what the lead did last: opened, replied, booked or went quiet.</p>
        </article>
        <article className="lg-card">
          <RoutingRules />
          <h3>Routing you can read</h3>
          <p>Plain rules, run in order. Switch one off and see who would get the next lead instead.</p>
        </article>
        <article className="lg-card lg-card-numbers">
          <dl>
            {numbers.map((item) => (
              <div key={item.label}>
                <dd>{item.value}</dd>
                <dt>{item.label}</dt>
              </div>
            ))}
          </dl>
          <h3>Reports that add up</h3>
          <p>The sample month from the insights panel above, traced from first contact to won deal.</p>
        </article>
      </div>
    </section>
  );
}

export function Start() {
  return (
    <section className="lg-start" id="start" aria-labelledby="lg-start-title">
      <div>
        <h2 id="lg-start-title">Start your first outreach this afternoon</h2>
        <p>Tell us where to send the trial link. Fourteen days on the Grove plan, no card needed.</p>
      </div>
      <StartForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="lg-footer lg-wrap">
      <div>
        <a className="lg-logo" href="#top" aria-label="Leadgrove home">
          <LogoMark /> Leadgrove
        </a>
        <p>Sales automation that turns customer data into the next right action.</p>
      </div>
      <nav aria-label="Footer">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#start">Start a trial</a>
      </nav>
      <p className="lg-footer-note">
        <span>© 2026 Leadgrove. Concept website with demonstration content.</span>
        <a href="#top">Back to top</a>
      </p>
    </footer>
  );
}
