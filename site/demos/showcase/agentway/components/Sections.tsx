import type { ReactNode } from "react";
import { Check, CornerDownLeft } from "lucide-react";
import { heroStats, ideas, logos, masthead, navLinks, notes, plans } from "../data/content";
import { City, Sketch } from "./City";
import { ContactForm, PlatformTabs } from "./Interactive";
import { Logo, LogoIcon } from "./Marks";

const sketches = ["slab", "tank", "stack", "cube"] as const;

/** Full-width band with a hairline on top; its inner column carries the two vertical rules. */
function Band({ id, label, className, children }: { id?: string; label?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} aria-label={label} className={["aw-band", className ?? ""].join(" ").trim()}>
      <div className="aw-band__in">{children}</div>
    </section>
  );
}

function Enter() {
  return (
    <span aria-hidden="true">
      <CornerDownLeft size={12} />
    </span>
  );
}

export function Masthead() {
  return (
    <div className="aw-band aw-masthead">
      <div className="aw-band__in">
        <p>{masthead.left}</p>
        <p>{masthead.middle}</p>
        <p>{masthead.right}</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <Band id="top" label="Introduction" className="aw-hero">
      <h1>
        The next trillion users{" "}
        <br />
        won&rsquo;t be people.
      </h1>
      <p className="aw-hero__lede">
        Agents already browse, research and buy on the web, through screens built for people. Four ideas for building the software they
        actually want, and the platform that does all four.
      </p>
      <div className="aw-hero__cta">
        <button type="button" className="aw-btn" data-aw-open="start">
          Start building <Enter />
        </button>
        <button type="button" className="aw-btn aw-btn--line" data-aw-open="notice">
          Read the docs
        </button>
      </div>
      <dl className="aw-hero__stats">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
      <City />
    </Band>
  );
}

export function Logos() {
  return (
    <Band label="Example products" className="aw-logos">
      <p>Agent-ready with Agentway</p>
      <ul>
        {logos.map((logo) => (
          <li key={logo.name}>
            <LogoIcon name={logo.icon} />
            {logo.name}
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function Ideas() {
  return (
    <>
      <Band id="ideas" className="aw-intro">
        <div>
          <p className="aw-kicker">The field guide · 4 ideas</p>
          <h2>
            Four ideas for building
            <br />
            software agents want.
          </h2>
        </div>
        <p>Each one comes with proof from real agent traffic, and the part of Agentway that does it for you.</p>
      </Band>
      {ideas.map((idea, index) => (
        <Band key={idea.n} label={`Idea ${idea.n}: ${idea.tag}`} className="aw-idea">
          <div className="aw-idea__n">
            <span>{idea.n}</span>
            <Sketch kind={sketches[index % sketches.length]} />
          </div>
          <div className="aw-idea__text">
            <p className="aw-kicker">{idea.tag}</p>
            <h3>{idea.title}</h3>
            <p>{idea.text}</p>
            <p className="aw-idea__part">
              <a href="#product">
                {idea.part} <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
          <figure className="aw-proof">
            <figcaption className="aw-kicker">Proof · {idea.proof.label}</figcaption>
            <ul>
              {idea.proof.rows.map((row) => (
                <li key={row.name} data-win={row.win ?? false}>
                  <div>
                    <p>
                      <strong>{row.name}</strong>
                      <span>{row.note}</span>
                    </p>
                    <b>{row.value}</b>
                  </div>
                  <i style={{ width: `${Math.max(1.5, row.share * 100)}%` }} aria-hidden="true" />
                </li>
              ))}
            </ul>
            <p className="aw-proof__caption">{idea.proof.caption}</p>
          </figure>
        </Band>
      ))}
    </>
  );
}

export function Platform() {
  return (
    <Band id="product" className="aw-pad">
      <p className="aw-kicker">The platform</p>
      <h2>One platform that does all four.</h2>
      <PlatformTabs />
    </Band>
  );
}

export function Pricing() {
  return (
    <Band id="pricing" className="aw-pad">
      <p className="aw-kicker">Pricing</p>
      <h2>Free to build. Paid when agents pay you.</h2>
      <ul className="aw-plans">
        {plans.map((plan) => (
          <li key={plan.name} data-featured={"featured" in plan}>
            <p className="aw-kicker">{plan.name}</p>
            <p className="aw-plans__price">
              {plan.price} {plan.unit ? <small>{plan.unit}</small> : null}
            </p>
            <p>{plan.text}</p>
            <ul>
              {plan.points.map((point) => (
                <li key={point}>
                  <Check size={14} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            {plan.cta === "Talk to us" ? (
              <a href="#contact" className="aw-btn aw-btn--line">
                {plan.cta}
              </a>
            ) : (
              <button type="button" className={"featured" in plan ? "aw-btn" : "aw-btn aw-btn--line"} data-aw-open="start">
                {plan.cta} <Enter />
              </button>
            )}
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function Notes() {
  return (
    <Band id="notes" className="aw-pad">
      <p className="aw-kicker">Blog · Field notes</p>
      <h2>Notes from Vol. 2.</h2>
      <ul className="aw-notes">
        {notes.map((note) => (
          <li key={note.n}>
            <span className="aw-notes__n">{note.n}</span>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <button type="button" className="aw-textbtn" data-aw-open="notice" aria-label={`Read: ${note.title}`}>
              Read · {note.minutes} min <span aria-hidden="true">→</span>
            </button>
          </li>
        ))}
      </ul>
    </Band>
  );
}

export function About() {
  return (
    <Band id="about" className="aw-about">
      <div>
        <p className="aw-kicker">About</p>
        <h2>We build for the users nobody designs for.</h2>
      </div>
      <div>
        <p>
          Agentway is a team of 34 in Lisbon and Toronto. We spent a decade building payment and developer platforms for people, then
          watched software start using them without us.
        </p>
        <p>The field guide is how we share what we measure. The platform is how we act on it.</p>
        <dl>
          <div>
            <dt>Founded</dt>
            <dd>2023</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>34</dd>
          </div>
          <div>
            <dt>Uptime, 12 mo</dt>
            <dd>99.98%</dd>
          </div>
        </dl>
      </div>
    </Band>
  );
}

export function Contact() {
  return (
    <Band id="contact" className="aw-contact">
      <div>
        <p className="aw-kicker">Contact</p>
        <h2>
          Make your product
          <br />
          agent-ready.
        </h2>
        <p>Tell us what your product does. We will reply with the contract we would write first.</p>
      </div>
      <ContactForm />
    </Band>
  );
}

export function Footer() {
  return (
    <footer className="aw-band aw-foot">
      <div className="aw-band__in">
        <a href="#top" aria-label="Agentway, back to top">
          <Logo />
        </a>
        <nav aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <button type="button" data-aw-open="notice">
            Privacy
          </button>
          <button type="button" data-aw-open="notice">
            Terms
          </button>
        </nav>
        <p>&copy; 2026 Agentway · Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
