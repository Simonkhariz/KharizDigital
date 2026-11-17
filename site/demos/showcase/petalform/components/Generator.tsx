"use client";

import { ArrowRight, Check, FileText } from "lucide-react";
import { useState, type FormEvent } from "react";
import { formats, sampleTopics, steps } from "../data/content";

type Result = { topic: string; formatId: string; score: number };

const titleCase = (value: string) => value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

/** Demonstration only: the "score" is derived from the topic text so the same input gives the same result. */
function scoreFor(topic: string) {
  const sum = [...topic].reduce((total, char) => total + char.charCodeAt(0), 0);
  return 82 + (sum % 15);
}

function headline(topic: string, formatId: string) {
  const name = titleCase(topic);
  if (formatId === "comparison") return `${name}: The Options Compared`;
  if (formatId === "listicle") return `9 Things to Know About ${name}`;
  return `${name}: A Practical Guide`;
}

export function Generator() {
  const [topic, setTopic] = useState("");
  const [formatId, setFormatId] = useState<string>(formats[0].id);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>({ topic: sampleTopics[0], formatId: formats[0].id, score: scoreFor(sampleTopics[0]) });

  const generate = (nextTopic: string, nextFormat: string) => {
    const clean = nextTopic.trim().replace(/\s+/g, " ");
    if (clean.length < 3) {
      setError("Enter a topic of at least 3 characters.");
      return;
    }
    setError("");
    setResult({ topic: clean, formatId: nextFormat, score: scoreFor(clean) });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generate(topic, formatId);
  };

  const format = formats.find((entry) => entry.id === result.formatId) ?? formats[0];

  return (
    <section id="how" className="pf-wrap pf-how">
      <header className="pf-heading">
        <h2>From a keyword to a publishable outline</h2>
        <p>Three steps, and you can try the first two right here.</p>
      </header>
      <ol className="pf-how-steps">
        {steps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="pf-how-demo">
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="pf-topic">Topic or keyword</label>
          <input
            id="pf-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="e.g. indoor herb garden"
            autoComplete="off"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "pf-topic-error" : undefined}
          />
          {error && (
            <span id="pf-topic-error" className="pf-how-error">
              {error}
            </span>
          )}
          <div className="pf-how-samples">
            {sampleTopics.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setTopic(sample);
                  generate(sample, formatId);
                }}
              >
                {sample}
              </button>
            ))}
          </div>
          <fieldset>
            <legend>Format</legend>
            {formats.map((entry) => (
              <label key={entry.id}>
                <input
                  type="radio"
                  name="format"
                  value={entry.id}
                  checked={formatId === entry.id}
                  onChange={() => setFormatId(entry.id)}
                />
                {entry.label}
              </label>
            ))}
          </fieldset>
          <button type="submit" className="pf-pill pf-pill-dark">
            Generate outline
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </form>
        <article className="pf-how-result" aria-live="polite">
          <header>
            <FileText size={16} aria-hidden="true" />
            <span>{format.label} · about {format.words.toLocaleString("en-US")} words</span>
            <strong>
              {result.score}
              <small>/100 SEO score</small>
            </strong>
          </header>
          <h3>{headline(result.topic, result.formatId)}</h3>
          <ol>
            {format.sections.map((section) => (
              <li key={section}>
                <Check size={14} aria-hidden="true" />
                {section}
              </li>
            ))}
          </ol>
          <p>Sample output with demonstration data. Nothing you type leaves this page.</p>
        </article>
      </div>
    </section>
  );
}
