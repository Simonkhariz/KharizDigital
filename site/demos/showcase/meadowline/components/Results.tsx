import { outcomes } from "../data/content";
import { ArrowLink, Tag } from "./Brand";
import { Scene } from "./Scene";
import "./Results.css";

export function Results() {
  return (
    <section id="results" className="ml-results-section">
      <Scene className="ml-results-backdrop" palette="fog" />
      <div className="ml-results-inner">
        <Tag>Reviews</Tag>
        <header className="ml-results-header">
          <div>
            <h2>
              Trusted by teams who
              <br />
              value clarity &amp; <em>control</em>.
            </h2>
            <p>
              From founders to fast-moving agencies, teams rely on Meadowline to eliminate repetitive work, streamline
              operations, and move faster with confidence.
            </p>
          </div>
          <ArrowLink href="#contact">Start Your Workflow</ArrowLink>
        </header>
        <ul className="ml-results-grid">
          {outcomes.map((outcome) => (
            <li key={outcome.team} className="ml-results-card">
              <div className="ml-results-visual">
                <Scene className="ml-results-scene" palette={outcome.palette} />
                <div className="ml-results-glass">
                  <strong>{outcome.metric}</strong>
                  <span>{outcome.metricLabel}</span>
                </div>
              </div>
              <div className="ml-results-body">
                <h3>{outcome.team}</h3>
                <small>{outcome.size}</small>
                <p>{outcome.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="ml-results-note">Typical results by team type. Figures are demonstration data.</p>
      </div>
    </section>
  );
}
