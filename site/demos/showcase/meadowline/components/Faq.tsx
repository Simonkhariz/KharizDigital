"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../data/content";
import { Tag } from "./Brand";
import "./Faq.css";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="ml-faq-section">
      <header className="ml-faq-header">
        <Tag>Questions</Tag>
        <h2>
          Answers before
          <br />
          you <em>ask.</em>
        </h2>
        <p>
          Still unsure about something? <a href="#contact">Write to us</a> and a person will reply.
        </p>
      </header>
      <ul className="ml-faq-list">
        {faqs.map((faq, index) => {
          const expanded = open === index;
          return (
            <li key={faq.question} className="ml-faq-item">
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`ml-faq-${index}`}
                  id={`ml-faq-button-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  {faq.question}
                  <span className="ml-faq-plus">
                    <Plus size={16} aria-hidden="true" />
                  </span>
                </button>
              </h3>
              <div
                id={`ml-faq-${index}`}
                role="region"
                aria-labelledby={`ml-faq-button-${index}`}
                className="ml-faq-answer"
                hidden={!expanded}
              >
                <p>{faq.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
