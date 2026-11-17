import { ArrowRight } from "lucide-react";
import { intro, principles } from "../data/content";
import "./Intro.css";

export function Intro() {
  return (
    <>
      <section className="dl-intro" aria-labelledby="dl-intro-title">
        <div className="dl-wrap">
          <p className="dl-pill">{intro.pill}</p>
          <h2 id="dl-intro-title" className="dl-h2">
            {intro.titleStart} <em>{intro.titleAccent}</em>
          </h2>
          <p className="dl-intro__body">{intro.body}</p>
          <a href="#product" className="dl-btn dl-btn--navy">
            {intro.cta}
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="dl-principles" aria-labelledby="dl-principles-title">
        <div className="dl-wrap">
          <div className="dl-split-head">
            <h2 id="dl-principles-title" className="dl-h2">
              {principles.titleStart} <em>{principles.titleAccent}</em>
              <br />
              {principles.titleEnd}
            </h2>
            <p>{principles.body}</p>
          </div>
          <ol className="dl-principles__grid">
            {principles.cards.map((card, index) => (
              <li key={card.image}>
                <img src={`/showcase/driftlayer/${card.image}.webp`} alt={card.alt} width={card.width} height={card.height} loading="lazy" decoding="async" style={{ objectPosition: card.focus }} />
                <span className="dl-principles__num">0{index + 1}</span>
                <div className="dl-principles__caption">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
