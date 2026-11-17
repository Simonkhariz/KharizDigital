import { ArrowRight } from "lucide-react";
import { hero } from "../data/content";
import "./Hero.css";

export function Hero() {
  return (
    <section className="dl-hero dl-on-sky" aria-labelledby="dl-hero-title">
      <div className="dl-hero__sky">
        <img
          className="dl-hero__photo"
          src="/showcase/driftlayer/hero-portrait-sky.webp"
          alt="A woman in a pale pink jacket, eyes closed, in front of a blue sky with white clouds"
          width={1920}
          height={1503}
          fetchPriority="high"
          decoding="async"
        />
        <div className="dl-hero__rainbow" aria-hidden="true" />
      </div>

      <div className="dl-wrap dl-hero__copy">
        <h1 id="dl-hero-title">
          {hero.title[0]}
          <br />
          {hero.title[1]}
        </h1>
        <div className="dl-hero__side">
          <p>{hero.body}</p>
          <div className="dl-hero__actions">
            <a href="#access" className="dl-btn dl-btn--white">
              {hero.primary}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href="#product" className="dl-btn dl-btn--glass">
              {hero.secondary}
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <p className="dl-hero__wordmark" aria-hidden="true">
        Driftlayer
      </p>
    </section>
  );
}
