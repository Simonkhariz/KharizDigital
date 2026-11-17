"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { quiz } from "../data/content";
import { productById, type Product } from "../data/products";
import { ProductArt } from "./ProductArt";
import "./FormulaQuiz.css";

type Answers = Record<string, string>;

function buildRoutine(answers: Answers): { product: Product; why: string }[] {
  const picks: { id: string; why: string }[] = [
    { id: "cloud-cleanser", why: "A gentle cleanse is the base of every routine." },
  ];
  if (answers.time === "long") {
    picks.push({ id: "daylight-essence", why: "With five minutes, an essence helps the next layer absorb." });
  }
  if (answers.concern === "dullness" || answers.concern === "breakouts") {
    picks.push({ id: "blue-hour-serum", why: "Niacinamide targets uneven tone and visible pores." });
  } else {
    picks.push({ id: "dew-drop-concentrate", why: "Hyaluronic acid addresses dehydration and calms tight skin." });
  }
  if (answers.skin === "oily") {
    picks.push({ id: "halo-mist", why: "A weightless SPF finishes the routine without adding shine." });
  } else {
    picks.push({ id: "cirrus-cream", why: "Ceramides rebuild the barrier that dry or reactive skin lacks." });
  }
  return picks.flatMap((pick) => {
    const product = productById(pick.id);
    return product ? [{ product, why: pick.why }] : [];
  });
}

export function FormulaQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= quiz.steps.length;
  const current = quiz.steps[Math.min(step, quiz.steps.length - 1)];
  const routine = done ? buildRoutine(answers) : [];
  const total = routine.reduce((sum, item) => sum + item.product.price, 0);

  const choose = (optionId: string) => {
    setAnswers((value) => ({ ...value, [current.id]: optionId }));
    setStep((value) => value + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <section id="formula" className="ae-section ae-quiz" aria-labelledby="ae-quiz-title">
      <div className="ae-wrap ae-quiz__inner">
        <div className="ae-quiz__intro">
          <h2 id="ae-quiz-title" className="ae-h2">
            Get Your <em>Formula</em>
          </h2>
          <p className="ae-lede">{quiz.body}</p>
        </div>

        <div className="ae-quiz__card" aria-live="polite">
          {done ? (
            <div key="result">
              <p className="ae-quiz__count">Your routine</p>
              <h3>
                {routine.length} products, ${total}
              </h3>
              <ol className="ae-quiz__result">
                {routine.map(({ product, why }, index) => (
                  <li key={product.id}>
                    <span className="ae-quiz__thumb">
                      <ProductArt bottle={product.bottle} id={`ae-q-${product.id}`} alt="" />
                    </span>
                    <span>
                      <strong>
                        {index + 1}. {product.name}
                      </strong>
                      <span>{why}</span>
                    </span>
                    <span className="ae-quiz__price">${product.price}</span>
                  </li>
                ))}
              </ol>
              <div className="ae-quiz__end">
                <a href="#skincare" className="ae-btn ae-btn--navy">
                  See Them In The Collection
                </a>
                <button type="button" className="ae-btn ae-btn--line" onClick={restart}>
                  Start Again
                </button>
              </div>
            </div>
          ) : (
            <fieldset key={current.id}>
              <p className="ae-quiz__count">
                Question {step + 1} of {quiz.steps.length}
              </p>
              <div className="ae-quiz__progress" aria-hidden="true">
                <span style={{ width: `${((step + 1) / quiz.steps.length) * 100}%` }} />
              </div>
              <legend>{current.question}</legend>
              <div className="ae-quiz__options">
                {current.options.map((option) => (
                  <button key={option.id} type="button" onClick={() => choose(option.id)}>
                    {option.label}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button type="button" className="ae-quiz__back" onClick={() => setStep((value) => value - 1)}>
                  <ArrowLeft size={15} aria-hidden="true" />
                  Previous question
                </button>
              )}
            </fieldset>
          )}
        </div>
      </div>
    </section>
  );
}
