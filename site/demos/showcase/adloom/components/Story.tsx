import { story } from "../data/content";
import "./Story.css";

export function Story() {
  return (
    <section id="story" className="al-story-section" aria-labelledby="al-story-title">
      <div className="al-container al-story-inner">
        <div>
          <p className="al-story-eyebrow">{story.eyebrow}</p>
          <h2 id="al-story-title" className="al-display">
            {story.title}
          </h2>
        </div>
        <div className="al-story-text">
          {story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <dl className="al-story-split">
            {story.commitments.map((item) => (
              <div key={item.label}>
                <dt>
                  <span className="al-display">{item.figure}</span>
                  {item.label}
                </dt>
                <dd>{item.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
