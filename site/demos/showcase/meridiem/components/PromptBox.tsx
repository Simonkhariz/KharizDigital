"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, ChevronDown, Paperclip, RotateCcw, X } from "lucide-react";
import { answerStyles, genericRun, suggestions } from "../data/site";

type Run = { question: string; steps: string[]; answer: string; style: string; file: string | null };

export function PromptBox() {
  const [text, setText] = useState("");
  const [style, setStyle] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [run, setRun] = useState<Run | null>(null);
  const [shown, setShown] = useState(0);
  const input = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const total = run ? run.steps.length + 1 : 0;

  useEffect(() => {
    if (!run || shown >= total) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShown(reduced ? total : shown + 1), reduced ? 0 : 750);
    return () => window.clearTimeout(timer);
  }, [run, shown, total]);

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const question = text.trim();
    if (!question) {
      setHint(true);
      input.current?.focus();
      return;
    }
    const preset = suggestions.find((item) => item.prompt === question) ?? genericRun;
    setShown(0);
    setRun({ question, steps: preset.steps, answer: preset.answer, style: style || "Concise", file });
  }

  function reset() {
    setRun(null);
    setText("");
    setFile(null);
    window.setTimeout(() => input.current?.focus(), 0);
  }

  function fillSuggestion(prompt: string) {
    setRun(null);
    setHint(false);
    setText(prompt);
    input.current?.focus();
  }

  return (
    <div className="md-prompt">
      {run ? (
        <div className="md-glass md-run" aria-live="polite">
          <p className="md-runQuestion">{run.question}</p>
          <p className="md-runMeta">
            Style: {run.style}
            {run.file ? ` · Attached: ${run.file}` : ""}
          </p>
          <ol className="md-steps">
            {run.steps.slice(0, shown).map((step) => (
              <li key={step}>{step}</li>
            ))}
            {shown < run.steps.length && <li className="md-thinking">Thinking</li>}
          </ol>
          {shown >= total && (
            <>
              <p className="md-answer">{run.answer}</p>
              <div className="md-runFoot">
                <span>Demo response. No model was called.</span>
                <button type="button" className="md-pill" onClick={reset}>
                  <RotateCcw size={14} aria-hidden="true" /> Ask another
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <form className="md-glass md-ask" onSubmit={submit}>
          <label htmlFor="meridiem-prompt" className="md-srOnly">
            Ask Meridiem a question
          </label>
          <textarea
            id="meridiem-prompt"
            ref={input}
            value={text}
            placeholder="Ask anything.."
            rows={3}
            aria-describedby={hint ? "meridiem-prompt-hint" : undefined}
            onChange={(event) => {
              setText(event.target.value);
              setHint(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) submit(event);
            }}
          />
          {hint && (
            <p className="md-hint" id="meridiem-prompt-hint" role="alert">
              Type a question or pick a suggestion below.
            </p>
          )}
          <div className="md-askBar">
            <input
              ref={fileInput}
              type="file"
              className="md-srOnly"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(event) => setFile(event.target.files?.[0]?.name ?? null)}
            />
            {file ? (
              <span className="md-pill md-file">
                <Paperclip size={15} aria-hidden="true" />
                <span>{file}</span>
                <button
                  type="button"
                  aria-label={`Remove ${file}`}
                  onClick={() => {
                    setFile(null);
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </span>
            ) : (
              <button type="button" className="md-pill" onClick={() => fileInput.current?.click()}>
                <Paperclip size={15} aria-hidden="true" /> Attach
              </button>
            )}
            <span className="md-pill md-select">
              <select aria-label="Answer style" value={style} onChange={(event) => setStyle(event.target.value)}>
                <option value="">Select style</option>
                {answerStyles.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown size={15} aria-hidden="true" />
            </span>
            <button type="submit" className="md-send" aria-label="Send">
              <ArrowUp size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}

      <ul className="md-chips" aria-label="Suggestions">
        {suggestions.map((item) => (
          <li key={item.chip}>
            <button type="button" onClick={() => fillSuggestion(item.prompt)}>
              {item.chip}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
