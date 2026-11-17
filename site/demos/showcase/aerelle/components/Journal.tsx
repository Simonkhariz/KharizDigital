import { Plus } from "lucide-react";
import { journal } from "../data/content";
import "./Journal.css";

export function Journal() {
  return (
    <section id="journal" className="ae-section ae-journal" aria-labelledby="ae-journal-title">
      <div className="ae-wrap">
        <div className="ae-head">
          <h2 id="ae-journal-title" className="ae-h2">
            From The <em>Journal</em>
          </h2>
          <p className="ae-lede">Short reads on how skin works and how to get more from fewer products.</p>
        </div>
        <div className="ae-journal__list">
          {journal.map((entry, index) => (
            <details key={entry.id} name="ae-journal" open={index === 0}>
              <summary>
                <span className="ae-journal__tag">{entry.tag}</span>
                <span className="ae-journal__title">{entry.title}</span>
                <span className="ae-journal__time">{entry.minutes} min read</span>
                <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <div className="ae-journal__body">
                {entry.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
