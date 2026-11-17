import { credible } from "../data/content";
import "./Credible.css";

export function Credible() {
  return (
    <section className="ae-section ae-credible" aria-labelledby="ae-credible-title">
      <div className="ae-wrap">
        <div className="ae-head">
          <h2 id="ae-credible-title" className="ae-h2">
            {credible.title}
          </h2>
          <p className="ae-lede">{credible.body}</p>
        </div>
        <ul className="ae-credible__grid">
          {credible.cards.map((card) => (
            <li key={card.image}>
              <div className="ae-credible__art">
                <img
                  src={`/showcase/aerelle/${card.image}`}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  loading="lazy"
                  style={{ objectPosition: card.position }}
                />
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
