import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assets, base, insights, partners, practices, promises, stagesOfSearch, voices } from "../data/content";
import { Heading, Label, PillLink } from "./Bits";

export function Hero() {
  return (
    <section className="wx-hero" aria-labelledby="wx-hero-title">
      <Label>Executive search · Chicago</Label>
      <h1 id="wx-hero-title">The right leader, found quietly.</h1>
      <p>
        Wexcombe is a partner-led search firm for founder-led, family-owned and private equity–backed companies. One partner runs your
        search from first call to first day.
      </p>
      <div className="wx-hero__cta">
        <PillLink href={`${base}/#brief`}>Brief us on a search</PillLink>
        <Link href={`${base}/#process`} className="wx-ghost">
          How a search runs
        </Link>
      </div>
      <img
        className="wx-hero__img"
        src={`${assets}/hero.webp`}
        alt="A Wexcombe partner standing beside a glass wall in the firm's office"
        width={1800}
        height={1200}
        fetchPriority="high"
      />
    </section>
  );
}

export function Promises() {
  return (
    <section className="wx-section" id="about" aria-label="What we promise">
      <Heading label="What we commit to" first="What we promise" second="before we start." />
      <ul className="wx-bento">
        {promises.map((item) => (
          <li key={item.title}>
            <span className="wx-bento__value">{item.value}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FounderQuote() {
  return (
    <section className="wx-band" aria-label="Why the firm is small">
      <div className="wx-section">
        <Label>Why small</Label>
        <figure className="wx-quote">
          <blockquote>
            &ldquo;A search is a few hundred private conversations. A small firm can have every one of them itself.&rdquo;
          </blockquote>
          <figcaption>
            <strong>Helena Wexcombe</strong>
            Founding Partner
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function PracticeCards() {
  return (
    <section className="wx-section" id="practices" aria-label="Practices">
      <Heading label="Practices" first="Four practices." second="One way of working." link={{ href: `${base}/practices/`, text: "All practices" }} />
      <ul className="wx-cards">
        {practices.map((practice) => (
          <li key={practice.id} className="wx-card">
            <h3>{practice.title}</h3>
            <p>{practice.text}</p>
            <div className="wx-card__roles">
              <Label>Typical roles</Label>
              <p>{practice.roles}</p>
            </div>
            <Link href={`${base}/practices/#${practice.id}`} className="wx-arrowlink" aria-label={`View practice: ${practice.title}`}>
              View practice <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section className="wx-section" id="process" aria-label="Process">
      <Heading label="Process" first="How a search runs." second="Twelve weeks, five stages." />
      <ol className="wx-rows wx-rows--process">
        {stagesOfSearch.map((stage) => (
          <li key={stage.n}>
            <div>
              <Label>{stage.n}</Label>
              <span>{stage.weeks}</span>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PartnerCards() {
  return (
    <section className="wx-section" id="partners" aria-label="Partners">
      <Heading label="Partners" first="The people" second="who do the work." link={{ href: `${base}/partners/`, text: "Meet the team" }} />
      <ul className="wx-people">
        {partners.map((partner) => (
          <li key={partner.id}>
            <Link href={`${base}/partners/#${partner.id}`}>
              <img src={partner.image} alt={partner.alt} width={640} height={800} loading="lazy" />
              <h3>{partner.name}</h3>
            </Link>
            <span>{partner.role}</span>
            <p>{partner.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Voices() {
  return (
    <section className="wx-band" aria-label="What clients say">
      <div className="wx-section">
        <Heading label="Client voices" first="What clients say" second="once the search is done." />
        <ul className="wx-voices">
          {voices.map((voice) => (
            <li key={voice.by}>
              <figure>
                <blockquote>&ldquo;{voice.quote}&rdquo;</blockquote>
                <figcaption>{voice.by}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function InsightCards() {
  return (
    <section className="wx-section" id="insights" aria-label="Insights">
      <Heading label="Insights" first="Notes on hiring" second="at the top." link={{ href: `${base}/insights/`, text: "All insights" }} />
      <ul className="wx-insights">
        {insights.map((item) => (
          <li key={item.id}>
            <Link href={`${base}/insights/#${item.id}`}>
              <img src={item.image} alt={item.alt} width={960} height={640} loading="lazy" />
              <span className="wx-insights__meta">
                {item.date} · {item.minutes} min read
              </span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
