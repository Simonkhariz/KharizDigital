"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { assistant } from "../data/editor";

export type SuggestionState = "open" | "applied" | "discarded";

type Props = {
  state: SuggestionState;
  onChange: (state: SuggestionState) => void;
  onShowFile: () => void;
};

export function AssistantPanel({ state, onChange, onShowFile }: Props) {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string[]>([]);

  function handleAsk(event: FormEvent) {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;
    setAsked((current) => [...current, text]);
    setQuestion("");
  }

  return (
    <aside className="vd-assistant" aria-label="Assistant">
      <header className="vd-assistantHead">
        <span className="vd-assistantIcon" aria-hidden="true">
          <Sparkles size={15} />
        </span>
        <p>
          <strong>{assistant.name}</strong>
          <small>{assistant.status}</small>
        </p>
      </header>

      <div className="vd-thread" aria-live="polite">
        <div className="vd-message">
          <Sparkles size={12} aria-hidden="true" />
          <p>
            {assistant.message[0]}
            <code>{assistant.messageCode}</code>
            {assistant.message[1]}
          </p>
        </div>

        {state === "open" ? (
          <div className="vd-suggestion">
            <p className="vd-suggestionHead">
              <b>Refactor suggestion</b>
              <span>{assistant.suggestionFile}</span>
            </p>
            <pre>
              {assistant.removed.map((line) => (
                <del key={line}>- {line}</del>
              ))}
              {assistant.added.map((line) => (
                <ins key={line}>+ {line}</ins>
              ))}
            </pre>
            <div className="vd-suggestionActions">
              <button
                type="button"
                className="vd-apply"
                onClick={() => {
                  onShowFile();
                  onChange("applied");
                }}
              >
                Apply Changes
              </button>
              <button type="button" className="vd-discard" onClick={() => onChange("discarded")}>
                Discard
              </button>
            </div>
          </div>
        ) : (
          <div className="vd-suggestion vd-suggestionDone">
            <p>{state === "applied" ? "Applied to auth-service.ts, lines 42 to 43." : "Suggestion discarded. Nothing was changed."}</p>
            <button type="button" className="vd-discard" onClick={() => onChange("open")}>
              {state === "applied" ? "Undo" : "Show again"}
            </button>
          </div>
        )}

        {asked.map((text, index) => (
          <div key={index} className="vd-exchange">
            <p className="vd-question">{text}</p>
            <div className="vd-message">
              <Sparkles size={12} aria-hidden="true" />
              <p>{assistant.reply}</p>
            </div>
          </div>
        ))}
      </div>

      <form className="vd-ask" onSubmit={handleAsk}>
        <label htmlFor="verdance-ask" className="vd-srOnly">
          Ask the assistant
        </label>
        <input
          id="verdance-ask"
          value={question}
          placeholder={assistant.placeholder}
          autoComplete="off"
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button type="submit" aria-label="Send" disabled={!question.trim()}>
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </form>
    </aside>
  );
}
