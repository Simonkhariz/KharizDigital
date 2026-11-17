import { ArrowRight } from "lucide-react";
import { useCases } from "../data/content";
import "./UseCases.css";

export function UseCases() {
  return (
    <section id="usecases" className="al-section al-use-cases-section" aria-labelledby="al-usecases-title">
      <div className="al-container">
        <div className="al-use-cases-head">
          <div>
            <p className="al-eyebrow">Usecases</p>
            <h2 id="al-usecases-title" className="al-display">
              Built for teams that sell on social
            </h2>
          </div>
          <a href="#start" className="al-btn al-btn--light">
            Talk through your setup
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
        <ul className="al-use-cases-list">
          {useCases.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p className="al-use-cases-body">{item.body}</p>
              <p className="al-use-cases-stat">
                <span className="al-display">{item.stat}</span>
                {item.statLabel}
              </p>
            </li>
          ))}
        </ul>
        <p className="al-use-cases-note">Figures are illustrative examples of how a workspace might be set up.</p>
      </div>
    </section>
  );
}
