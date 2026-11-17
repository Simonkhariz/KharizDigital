import { Download, Plus, ScanSearch, Star, TrendingUp, type LucideIcon } from "lucide-react";
import { faqs, features, hero, steps, trust } from "../data/content";
import { Face, LogoTile } from "./Logo";
import { AgePhone, CategoryPhone, CategoryScores, PlainNotes, ResultPhone, ScoreDial } from "./Mocks";
import { UploadCard } from "./UploadCard";

export function Hero() {
  return (
    <section className="vd-hero" aria-labelledby="vd-hero-title">
      <div className="vd-hero-photo">
        <img src="/showcase/verdia/hero-runner-motion.webp" alt="Runner in a lime top moving fast along a forest trail, the greenery streaked by motion" width={1920} height={1371} fetchPriority="high" />
      </div>
      <div className="vd-hero-copy">
        <h1 id="vd-hero-title">
          <span>
            Know <Face mood="happy" /> your health,
          </span>{" "}
          <span>
            before you <Face mood="worried" /> have to.
          </span>
        </h1>
        <p>{hero.body}</p>
        <div className="vd-hero-stores">
          <a className="vd-store" href="#get" data-vd-platform="iPhone">
            <Download size={15} aria-hidden="true" /> Download for iPhone
          </a>
          <a className="vd-store" href="#get" data-vd-platform="Android">
            <Download size={15} aria-hidden="true" /> Download for Android
          </a>
        </div>
        <p className="vd-hero-rating">
          <strong>{hero.rating.score}</strong>
          <span role="img" aria-label={`${hero.rating.score} out of 5 stars`}>
            {[0, 1, 2, 3, 4].map((index) => (
              <Star key={index} size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ))}
          </span>
          {hero.rating.label} <em>/ {hero.rating.reviews}</em>
        </p>
      </div>
    </section>
  );
}

const stepIcons: LucideIcon[] = [Plus, ScanSearch, TrendingUp];

export function Steps() {
  const visuals = [
    <div key="upload" className="vd-step-art vd-step-art-upload">
      <UploadCard />
    </div>,
    <div key="result" className="vd-step-art vd-step-art-result">
      <ResultPhone />
    </div>,
    <div key="track" className="vd-step-art vd-step-art-track">
      <img src="/showcase/verdia/hills.webp" alt="A lone runner on rolling green hills" width={736} height={1327} loading="lazy" />
      <CategoryScores glass />
    </div>,
  ];
  return (
    <section className="vd-section" id="steps" aria-labelledby="vd-steps-title">
      <h2 id="vd-steps-title" className="vd-title">
        Know your real <span>health in 3 easy steps.</span>
      </h2>
      <ol className="vd-steps">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <li key={step.id}>
              {visuals[index]}
              <div className="vd-step-tags" aria-hidden="true">
                <span>{step.id}</span>
                <i>
                  <Icon size={14} />
                </i>
              </div>
              <p>
                <strong>{step.lead}</strong> {step.text}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function Everything() {
  const visuals = [<CategoryPhone key="categories" />, <AgePhone key="age" />, <PlainNotes key="plain" />, <ScoreDial key="score" />];
  return (
    <section className="vd-section" id="features" aria-labelledby="vd-features-title">
      <h2 id="vd-features-title" className="vd-title">
        Everything you need to <span>take control of your health</span>
      </h2>
      <div className="vd-bento">
        {features.map((feature, index) => (
          <article key={feature.id} data-tone={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
            {visuals[index]}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="vd-section" aria-labelledby="vd-trust-title">
      <h2 id="vd-trust-title" className="vd-title">
        Careful with the thing <span>that matters most</span>
      </h2>
      <ul className="vd-trust">
        {trust.map((item, index) => (
          <li key={item.title}>
            <span aria-hidden="true">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Faq() {
  return (
    <section className="vd-section" id="faq" aria-labelledby="vd-faq-title">
      <h2 id="vd-faq-title" className="vd-title">
        Questions, <span>answered plainly</span>
      </h2>
      <div className="vd-faq">
        {faqs.map((faq, index) => (
          <details key={faq.q} open={index === 0}>
            <summary>
              {faq.q}
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="vd-footer">
      <div className="vd-footer-top">
        <a href="#top" className="vd-footer-brand" aria-label="Verdia home">
          <LogoTile size={34} />
          Verdia
        </a>
        <nav aria-label="Footer">
          <a href="#steps">How it works</a>
          <a href="#features">Features</a>
          <a href="#markers">Markers</a>
          <a href="#age">Biological age</a>
          <a href="#faq">Questions</a>
          <a href="#get">Get the app</a>
        </nav>
      </div>
      <p className="vd-footer-note">Verdia provides general wellness information and is not a medical device. It does not diagnose, treat or prevent any condition. Always talk to a qualified professional about your results.</p>
      <div className="vd-footer-bottom">
        <p>© 2026 Verdia. Concept website with demonstration content.</p>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
