"use client";

import { ArrowRight, Check, FileText, Send } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { assistants, automation, campusAgents } from "../data/content";
import { Mark } from "./Logo";
import { SectionHead } from "./Sections";
import "./Platform.css";

const tabs = [
  { id: "workbench", label: "Workbench", blurb: "Every assistant a person is allowed to use, in one window." },
  { id: "agents", label: "Agents", blurb: "Service-desk agents you can switch on per department." },
  { id: "automations", label: "Automations", blurb: "Multi-step processes that run from request to record." },
] as const;

type TabId = (typeof tabs)[number]["id"];

function Workbench() {
  const [activeId, setActiveId] = useState(assistants[0].id);
  const [asked, setAsked] = useState(true);
  const assistant = assistants.find((entry) => entry.id === activeId) ?? assistants[0];

  const choose = (id: string) => {
    setActiveId(id);
    setAsked(false);
  };

  return (
    <div className="cm-bench">
      <aside aria-label="Assistants">
        <p>My assistants</p>
        <ul>
          {assistants.map((entry) => (
            <li key={entry.id}>
              <button type="button" aria-pressed={entry.id === activeId} onClick={() => choose(entry.id)}>
                <strong>{entry.name}</strong>
                <span>{entry.audience}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="cm-bench-chat">
        <header>
          <span className="cm-bench-avatar">
            <Mark size={16} />
          </span>
          <strong>{assistant.name}</strong>
          <em>Answers from approved campus sources</em>
        </header>
        <div className="cm-bench-log" aria-live="polite">
          {asked ? (
            <>
              <p className="cm-bench-user">{assistant.prompt}</p>
              <div className="cm-bench-answer" key={assistant.id}>
                <p>{assistant.answer}</p>
                <ul aria-label="Sources">
                  {assistant.sources.map((source) => (
                    <li key={source}>
                      <FileText size={12} aria-hidden="true" />
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="cm-bench-empty">Send the suggested question to see how {assistant.name} answers.</p>
          )}
        </div>
        <form
          className="cm-bench-input"
          onSubmit={(event) => {
            event.preventDefault();
            setAsked(true);
          }}
        >
          <label className="cm-sr" htmlFor="cm-bench-prompt">
            Suggested question
          </label>
          <input id="cm-bench-prompt" value={assistant.prompt} readOnly />
          <button type="submit" aria-label="Send question" disabled={asked}>
            <Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Agents() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(campusAgents.map((agent) => [agent.id, agent.enabled])));
  const live = campusAgents.filter((agent) => enabled[agent.id]).length;

  return (
    <div className="cm-agents">
      <p aria-live="polite">
        {live} of {campusAgents.length} agents are live for students
      </p>
      <ul>
        {campusAgents.map((agent) => (
          <li key={agent.id} data-on={enabled[agent.id]}>
            <div>
              <strong>{agent.name}</strong>
              <span>{agent.desk}</span>
            </div>
            <div className="cm-agents-meter" aria-hidden="true">
              <i style={{ width: `${agent.resolved}%` }} />
            </div>
            <span className="cm-agents-rate">{agent.resolved}% resolved without a ticket</span>
            <button
              type="button"
              role="switch"
              aria-checked={enabled[agent.id]}
              aria-label={`${agent.name} live`}
              onClick={() => setEnabled((state) => ({ ...state, [agent.id]: !state[agent.id] }))}
            >
              <i />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Automations() {
  const [step, setStep] = useState(automation.steps.length);
  const total = automation.steps.length;

  return (
    <div className="cm-flow">
      <header>
        <strong>{automation.name}</strong>
        <span>
          {automation.before} <ArrowRight size={13} aria-hidden="true" /> {automation.after}
        </span>
      </header>
      <ol>
        {automation.steps.map((entry, index) => (
          <li key={entry.title} data-done={index < step}>
            <span aria-hidden="true">{index < step ? <Check size={14} /> : index + 1}</span>
            <strong>{entry.title}</strong>
            <em>{entry.detail}</em>
          </li>
        ))}
      </ol>
      <footer>
        <p aria-live="polite">{step >= total ? "Run complete. Every step is logged for audit." : `Step ${step + 1} of ${total} is next.`}</p>
        <button type="button" className="cm-pill" onClick={() => setStep((value) => (value >= total ? 0 : value + 1))}>
          {step >= total ? "Run again" : step === 0 ? "Start run" : "Next step"}
        </button>
      </footer>
    </div>
  );
}

export function Platform() {
  const [active, setActive] = useState<TabId>("workbench");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.id === active);
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <section className="cm-section" id="platform" aria-label="Platform">
      <SectionHead title="A workbench, agents and automation in one platform">Try the three parts below. Everything shown is sample data.</SectionHead>
      <div className="cm-platform">
        <div className="cm-platform-tabs" role="tablist" aria-label="Platform areas" onKeyDown={onKeyDown}>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`cm-tab-${tab.id}`}
              aria-selected={tab.id === active}
              aria-controls="cm-platform-panel"
              tabIndex={tab.id === active ? 0 : -1}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="cm-platform-panel" role="tabpanel" id="cm-platform-panel" aria-labelledby={`cm-tab-${active}`}>
          <p className="cm-platform-blurb">{tabs.find((tab) => tab.id === active)?.blurb}</p>
          {active === "workbench" && <Workbench />}
          {active === "agents" && <Agents />}
          {active === "automations" && <Automations />}
        </div>
      </div>
    </section>
  );
}
