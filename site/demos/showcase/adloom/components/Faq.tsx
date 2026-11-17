import { Plus } from "lucide-react";
import { faqs } from "../data/content";
import "./Faq.css";

export function Faq() {
  return (
    <section id="faq" className="al-section al-faq-section" aria-labelledby="al-faq-title">
      <div className="al-container al-faq-inner">
        <div className="al-faq-head">
          <p className="al-eyebrow">Questions</p>
          <h2 id="al-faq-title" className="al-display">
            Credits, rights and review
          </h2>
          <p>Short answers to what teams ask before their first batch.</p>
        </div>
        <div className="al-faq-list">
          {faqs.map((item, index) => (
            <details key={item.q} name="al-faq" open={index === 0}>
              <summary>
                {item.q}
                <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
