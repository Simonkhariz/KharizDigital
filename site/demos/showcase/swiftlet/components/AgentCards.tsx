"use client";

import { Bot, Check, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { agentCards } from "../data/content";

const fixes = [
  { before: "Can we circle back on this", flagged: "at some point soon", fixed: "on Thursday at 10:00", after: "?", note: "Vague timing. Your calendar is free Thursday at 10:00." },
  { before: "The contract is", flagged: "basically fine I think", fixed: "ready to sign", after: ".", note: "Hedged phrasing. The review has no open comments." },
  { before: "Sending the deck", flagged: "asap", fixed: "by 15:00 today", after: ".", note: "No deadline given. The meeting starts at 16:00." },
] as const;

export function InlineSuggestCard() {
  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState(false);
  const fix = fixes[index];

  const next = () => {
    setIndex((value) => (value + 1) % fixes.length);
    setApplied(false);
  };

  return (
    <article className="sw-card sw-card-inline">
      <div className="sw-card-text">
        <p className="sw-card-label">{agentCards.inline.label}</p>
        <h3>{agentCards.inline.title}</h3>
      </div>
      <div className="sw-card-art sw-art-violet">
        <div className="sw-compose">
          <p className="sw-compose-to">To: Kai Sutter</p>
          <p className="sw-compose-line">
            {fix.before} {applied ? <span className="sw-compose-fixed">{fix.fixed}</span> : <span className="sw-compose-flag">{fix.flagged}</span>}
            {fix.after}
            <i className="sw-caret" aria-hidden="true" />
          </p>
          <div className="sw-compose-tip">
            <span className="sw-draft-icon" aria-hidden="true">
              <Sparkles size={14} />
            </span>
            <p role="status">{applied ? "Fixed. One more?" : fix.note}</p>
            {applied ? (
              <button type="button" className="sw-draft-send" onClick={next}>
                Next example
              </button>
            ) : (
              <>
                <button type="button" className="sw-draft-send" onClick={() => setApplied(true)}>
                  Fix
                </button>
                <button type="button" className="sw-chip-button" onClick={next}>
                  Ignore
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

type PromptId = (typeof agentCards.chat.prompts)[number]["id"];

export function ChatCard() {
  const [promptId, setPromptId] = useState<PromptId>("summary");
  const [thinking, setThinking] = useState(false);
  const prompt = agentCards.chat.prompts.find((entry) => entry.id === promptId) ?? agentCards.chat.prompts[0];

  useEffect(() => {
    if (!thinking) return;
    const timer = window.setTimeout(() => setThinking(false), 700);
    return () => window.clearTimeout(timer);
  }, [thinking, promptId]);

  return (
    <article className="sw-card sw-card-chat">
      <div className="sw-card-art sw-art-beam">
        <div className="sw-chat">
          <header>
            <span className="sw-draft-icon" aria-hidden="true">
              <Bot size={14} />
            </span>
            <strong>Swiftlet Agent</strong>
            <span className="sw-tag sw-tag-docs">{thinking ? "Thinking" : "Reading inbox"}</span>
          </header>
          <p className="sw-chat-ask">{prompt.ask}</p>
          <p className="sw-chat-answer" aria-live="polite">
            {thinking ? (
              <span className="sw-chat-dots" aria-label="Thinking">
                <i />
                <i />
                <i />
              </span>
            ) : (
              prompt.answer
            )}
          </p>
          <div className="sw-chat-prompts" role="group" aria-label="Ask the agent">
            {agentCards.chat.prompts.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="sw-chip-button"
                aria-pressed={entry.id === promptId}
                onClick={() => {
                  setPromptId(entry.id);
                  setThinking(true);
                }}
              >
                {entry.ask}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="sw-card-text">
        <p className="sw-card-label">{agentCards.chat.label}</p>
        <h3>{agentCards.chat.title}</h3>
      </div>
    </article>
  );
}

export function RulesCard() {
  const [on, setOn] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(agentCards.rules.items.map((item) => [item.id, item.on])),
  );
  const active = Object.values(on).filter(Boolean).length;

  return (
    <article className="sw-card sw-card-rules">
      <div className="sw-card-text">
        <p className="sw-card-label">{agentCards.rules.label}</p>
        <h3>{agentCards.rules.title}</h3>
      </div>
      <ul className="sw-rules">
        {agentCards.rules.items.map((item) => (
          <li key={item.id}>
            <span>{item.text}</span>
            <button
              type="button"
              role="switch"
              aria-checked={on[item.id]}
              aria-label={item.text}
              className="sw-switch"
              onClick={() => setOn((current) => ({ ...current, [item.id]: !current[item.id] }))}
            >
              <i />
            </button>
          </li>
        ))}
        <li className="sw-rules-foot" role="status">
          {active} of {agentCards.rules.items.length} rules running
        </li>
      </ul>
    </article>
  );
}

const queue = [
  { id: "q1", to: "Ana Weller", text: "Clause 7 reads correctly. I will sign by Wednesday." },
  { id: "q2", to: "Pilar Sanz", text: "Reads well. I will add the retention figure before 10:00." },
  { id: "q3", to: "Tomas Lund", text: "A call next week works. Tuesday at 14:00?" },
] as const;

export function ReviewCard() {
  const [sent, setSent] = useState<string[]>([]);
  const left = queue.filter((item) => !sent.includes(item.id));

  return (
    <article className="sw-card sw-card-review">
      <div className="sw-card-text">
        <p className="sw-card-label">{agentCards.review.label}</p>
        <h3>{agentCards.review.title}</h3>
      </div>
      <div className="sw-card-art sw-art-soft">
        <ul className="sw-review">
          {left.map((item) => (
            <li key={item.id}>
              <div>
                <strong>To {item.to}</strong>
                <p>{item.text}</p>
              </div>
              <button type="button" className="sw-draft-send" aria-label={`Send reply to ${item.to}`} onClick={() => setSent((current) => [...current, item.id])}>
                Send <Send size={13} aria-hidden="true" />
              </button>
            </li>
          ))}
          <li className="sw-review-foot" role="status">
            {left.length === 0 ? (
              <>
                <Check size={14} aria-hidden="true" /> Queue clear. Demo only: nothing was sent.{" "}
                <button type="button" onClick={() => setSent([])}>
                  Reset
                </button>
              </>
            ) : (
              `${left.length} ${left.length === 1 ? "draft" : "drafts"} waiting for you`
            )}
          </li>
        </ul>
      </div>
    </article>
  );
}
