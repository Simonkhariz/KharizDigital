import { hero } from "../data/content";
import { HeroScene } from "./HeroScene";
import "./Hero.css";

export function Hero() {
  return (
    <section className="ae-hero ae-on-sky" aria-labelledby="ae-hero-title">
      <HeroScene />
      <div className="ae-wrap ae-hero__copy">
        <h1 id="ae-hero-title">
          {hero.titleStart}
          <br />
          {hero.titleEnd} <em>{hero.titleAccent}</em>
        </h1>
        <p>{hero.body}</p>
        <a href="#skincare" className="ae-btn ae-btn--white">
          {hero.cta}
        </a>
      </div>
    </section>
  );
}
