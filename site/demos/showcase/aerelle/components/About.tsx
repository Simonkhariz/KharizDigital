import { about } from "../data/content";
import "./About.css";

export function About() {
  return (
    <section id="about" className="ae-section ae-about" aria-labelledby="ae-about-title">
      <div className="ae-wrap ae-about__inner">
        <div className="ae-about__art">
          <img
            src="/showcase/aerelle/pump-bottle.webp"
            alt="A plain pump bottle of white lotion against a pale blue backdrop"
            width={1000}
            height={1172}
            loading="lazy"
          />
        </div>
        <div>
          <h2 id="ae-about-title" className="ae-h2">
            Made Small, <em>On Purpose</em>
          </h2>
          {about.body.map((paragraph) => (
            <p key={paragraph} className="ae-lede">
              {paragraph}
            </p>
          ))}
          <dl className="ae-about__facts">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.figure}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
