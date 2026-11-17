"use client";

import { Bot, Building2, CircleUserRound, FolderSearch, HelpCircle, LineChart, UserRound } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";
import { useCases } from "../data/content";
import { Avatar } from "./Brand";
import "./UseCases.css";

const icons = {
  founder: UserRound,
  agency: Building2,
  solo: CircleUserRound,
} as const;

type Decision = "open" | "reviewed" | "dismissed";

export function UseCaseTabs({ backdrop }: { backdrop: ReactNode }) {
  const [active, setActive] = useState(1);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = useCases[active];
  const decision = decisions[current.id] ?? "open";

  const decide = (value: Decision) => setDecisions((state) => ({ ...state, [current.id]: value }));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (active + step + useCases.length) % useCases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="ml-use-cases-tabs">
      <div
        className="ml-use-cases-stage"
        role="tabpanel"
        id="ml-usecase-panel"
        aria-labelledby={`ml-usecase-tab-${current.id}`}
      >
        {backdrop}
        <div className="ml-use-cases-app" key={current.id}>
          <div className="ml-use-cases-rail" aria-hidden="true">
            <FolderSearch size={20} />
            <LineChart size={20} />
            <HelpCircle size={20} />
          </div>
          <div className="ml-use-cases-suggestion">
            <span className="ml-use-cases-bot">
              <Bot size={26} aria-hidden="true" />
            </span>
            <div>
              <h3>
                <em>Meadowline</em> AI suggests
              </h3>
              <p>{decision === "open" ? current.suggestion : decision === "reviewed" ? "All reviewed. Nice work." : "Dismissed for today."}</p>
              <p>
                {decision === "open"
                  ? current.detail
                  : decision === "reviewed"
                    ? "Every item was handled and the owners were notified."
                    : "I will bring this back tomorrow morning."}
              </p>
            </div>
          </div>
          <div className="ml-use-cases-thread">
            <p className="ml-use-cases-asked">
              <HelpCircle size={12} aria-hidden="true" />
              {current.question}
              <Avatar tone="rust" size={22} />
            </p>
            <p className="ml-use-cases-answered">{current.answer}</p>
          </div>
          <div className="ml-use-cases-actions">
            {decision === "open" ? (
              <>
                <button type="button" className="ml-use-cases-primary" onClick={() => decide("reviewed")}>
                  Review Now
                </button>
                <button type="button" onClick={() => decide("dismissed")}>
                  Dismiss
                </button>
              </>
            ) : (
              <button type="button" onClick={() => decide("open")}>
                Undo
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="ml-use-cases-tablist" role="tablist" aria-label="Who Meadowline is for" onKeyDown={onKeyDown}>
        {useCases.map((useCase, index) => {
          const Icon = icons[useCase.icon];
          const selected = index === active;
          return (
            <button
              key={useCase.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`ml-usecase-tab-${useCase.id}`}
              aria-selected={selected}
              aria-controls="ml-usecase-panel"
              tabIndex={selected ? 0 : -1}
              className={clsx("ml-use-cases-tab", selected && "ml-use-cases-selected")}
              onClick={() => setActive(index)}
            >
              <span className="ml-use-cases-tab-head">
                <span className="ml-use-cases-tab-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                {useCase.label}
              </span>
              <span className="ml-use-cases-tab-text">{useCase.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
