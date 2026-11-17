"use client";

import { Cloud, Code2, Database, Mail, MessageSquareText, Network, ScrollText } from "lucide-react";
import { useState } from "react";
import { integrations, releaseNote, type Integration } from "../data/content";

const icons: Record<Integration["icon"], typeof Cloud> = {
  cloud: Cloud,
  code: Code2,
  database: Database,
  mail: Mail,
  chat: MessageSquareText,
  pipeline: Network,
};

export function Stack() {
  const [activeId, setActiveId] = useState(integrations[0].id);
  const active = integrations.find((entry) => entry.id === activeId) ?? integrations[0];
  const ActiveIcon = icons[active.icon];

  return (
    <section id="stack" className="hd-section hd-stack">
      <h2>Connect your Stack</h2>
      <p className="hd-lede">Helm AI plays well with the tools you already love and rely on every day.</p>
      <div className="hd-stack-icons" role="tablist" aria-label="Integrations">
        {integrations.map((entry) => {
          const Icon = icons[entry.icon];
          const selected = entry.id === activeId;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`hd-stack-tab-${entry.id}`}
              aria-selected={selected}
              aria-controls="hd-stack-panel"
              aria-label={entry.name}
              title={entry.name}
              onClick={() => setActiveId(entry.id)}
            >
              <Icon size={18} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="hd-frame">
        <div className="hd-art hd-art-b" id="hd-stack-panel" role="tabpanel" aria-labelledby={`hd-stack-tab-${active.id}`}>
          <article className="hd-note" key={active.id}>
            <header>
              <span className="hd-note-icon">
                <ActiveIcon size={16} aria-hidden="true" />
              </span>
              <div>
                <h3>{active.name}</h3>
                <small>{active.status}</small>
              </div>
            </header>
            <p>{active.summary}</p>
            <code>$ {active.command}</code>
          </article>
        </div>
      </div>

      <div className="hd-frame" id="notes">
        <div className="hd-art hd-art-b hd-art-shift">
          <article className="hd-note">
            <header>
              <span className="hd-note-icon">
                <ScrollText size={16} aria-hidden="true" />
              </span>
              <div>
                <h3>{releaseNote.title}</h3>
                <small>{releaseNote.version}</small>
              </div>
            </header>
            <p>{releaseNote.text}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
