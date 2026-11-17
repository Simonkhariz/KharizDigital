import { stats } from "../data/content";
import { Circuit } from "./Circuit";
import { FinanceWidgets } from "./FinanceWidgets";
import { HandDevice } from "./HandDevice";
import { Label, Mark, Tag } from "./Mark";

export function Hero() {
  return (
    <section className="fs-hero" id="top" aria-labelledby="fs-hero-title">
      <Circuit />
      <div className="fs-hero-copy">
        <p className="fs-hero-kicker">
          Built for
          <span aria-hidden="true">
            <Mark size={11} />
          </span>
          finance teams
        </p>
        <h1 id="fs-hero-title">
          Smarter <span>Financial</span>
          <br />
          Management
        </h1>
        <p className="fs-hero-sub">
          Gain complete and confident control over each <br />
          of your valuable assets with ease.
        </p>
        <div className="fs-hero-actions">
          <button type="button" className="fs-button fs-button-large" data-fs-open="signup">
            Get started
          </button>
          <a className="fs-button fs-button-white fs-button-large" href="#demo">
            Request demo
          </a>
        </div>
      </div>
      <div className="fs-hero-figure">
        <HandDevice />
      </div>
      <div className="fs-hero-info">
        <Label>Info</Label>
        <p className="fs-hero-statement">
          Fiscara helps finance managers <br />
          automate manual work, gain real-time <br />
          visibility into financial{" "}
          <span>
            performance, and <br />
            make faster, data-driven decisions with <br />
            intelligent AI-powered automation.
          </span>
        </p>
      </div>
      <FinanceWidgets />
    </section>
  );
}

export function About() {
  return (
    <section className="fs-about" id="about" aria-labelledby="fs-about-title">
      <Tag>About us</Tag>
      <h2 id="fs-about-title">
        Fiscara{" "}
        <span className="fs-about-icons" aria-hidden="true">
          <i>
            <Mark size={24} />
          </i>
          <i>
            <Mark size={24} />
          </i>
          <i>
            <Mark size={24} />
          </i>
        </span>{" "}
        helps finance managers eliminate manual work, gain real-time visibility into financial{" "}
        <em>performance, and make faster, data-driven decisions through intelligent AI automation.</em>
      </h2>
      <dl className="fs-stats">
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
