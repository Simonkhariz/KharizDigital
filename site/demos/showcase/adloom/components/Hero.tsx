import { hero } from "../data/content";
import { StudioMock } from "./StudioMock";
import "./Hero.css";

export function Hero() {
  return (
    <section className="al-hero-hero" aria-labelledby="al-hero-title">
      <div className="al-container al-hero-copy">
        <p className="al-eyebrow">{hero.eyebrow}</p>
        <h1 id="al-hero-title" className="al-display al-hero-title">
          {hero.headline[0]} <br className="al-hero-break" />
          {hero.headline[1]}
        </h1>
        <p className="al-hero-body">{hero.body}</p>
        <div className="al-hero-actions">
          <a href="#start" className="al-btn al-btn--light al-btn--lg">
            Get started
          </a>
          <a href="#start" className="al-btn al-btn--dark al-btn--lg">
            Talk to sales
          </a>
        </div>
      </div>
      <div className="al-container">
        <div className="al-hero-stage">
          <div className="al-hero-glow" aria-hidden="true" />
          <StudioMock />
        </div>
      </div>
    </section>
  );
}
