import { steps } from "../data/content";
import "./Steps.css";

export function Steps() {
  return (
    <section id="how" className="al-section" aria-labelledby="al-how-title">
      <div className="al-container">
        <div className="al-section-head">
          <p className="al-eyebrow">How it works</p>
          <h2 id="al-how-title" className="al-display">
            From a sentence to a live campaign
          </h2>
        </div>
        <ol className="al-steps-list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="al-steps-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
