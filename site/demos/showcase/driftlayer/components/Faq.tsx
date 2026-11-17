import { Plus } from "lucide-react";
import { faqs } from "../data/content";
import "./Faq.css";

export function Faq() {
  return (
    <section id="faq" className="dl-section dl-faq" aria-labelledby="dl-faq-title">
      <div className="dl-wrap dl-faq__inner">
        <div>
          <p className="dl-pill">FAQ</p>
          <h2 id="dl-faq-title" className="dl-h2">
            Fair <em>questions.</em>
          </h2>
        </div>
        <div className="dl-faq__list">
          {faqs.map((item, index) => (
            <details key={item.q} name="dl-faq" open={index === 0}>
              <summary>
                {item.q}
                <span aria-hidden="true">
                  <Plus size={18} strokeWidth={2.2} />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
