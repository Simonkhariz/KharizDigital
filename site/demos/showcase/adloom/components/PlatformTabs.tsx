"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { platformTabs } from "../data/content";
import "./PlatformTabs.css";

export function PlatformTabs() {
  const [active, setActive] = useState(platformTabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = platformTabs.find((item) => item.id === active) ?? platformTabs[0];
  const max = Math.max(...tab.panel.rows.map((row) => row.value));
  const total = tab.panel.rows.reduce((sum, row) => sum + row.value, 0);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const target = (index + step + platformTabs.length) % platformTabs.length;
    setActive(platformTabs[target].id);
    tabRefs.current[target]?.focus();
  };

  return (
    <section id="platform" className="al-section" aria-labelledby="al-platform-title">
      <div className="al-container">
        <div className="al-section-head">
          <p className="al-eyebrow">Platform</p>
          <h2 id="al-platform-title" className="al-display">
            One workspace from brief to live ad
          </h2>
          <p>Generation is the only part that costs credits. Everything around it is there so the next batch is better than the last.</p>
        </div>

        <div className="al-platform-tabs-layout">
          <div className="al-platform-tabs-tabs" role="tablist" aria-label="Platform areas" aria-orientation="vertical">
            {platformTabs.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`al-tab-${item.id}`}
                aria-selected={item.id === active}
                aria-controls="al-platform-panel"
                tabIndex={item.id === active ? 0 : -1}
                className="al-platform-tabs-tab"
                onClick={(event) => {
                  setActive(item.id);
                  event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
                }}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="al-platform-tabs-tab-index">0{index + 1}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div id="al-platform-panel" role="tabpanel" aria-labelledby={`al-tab-${tab.id}`} className="al-platform-tabs-panel" key={tab.id}>
            <div className="al-platform-tabs-text">
              <h3 className="al-display">{tab.title}</h3>
              <p>{tab.body}</p>
              <ul>
                {tab.points.map((point) => (
                  <li key={point}>
                    <Check size={15} strokeWidth={2} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="al-platform-tabs-visual" data-tone={tab.id}>
              <div className="al-platform-tabs-card">
                <div className="al-platform-tabs-card-head">
                  <p>{tab.panel.heading}</p>
                  <p>
                    {total} {tab.panel.unit}
                  </p>
                </div>
                <ul className="al-platform-tabs-rows">
                  {tab.panel.rows.map((row) => (
                    <li key={row.name}>
                      <span className="al-platform-tabs-row-name">{row.name}</span>
                      <span className="al-platform-tabs-row-meta">{row.meta}</span>
                      <span className="al-platform-tabs-row-value">{row.value}</span>
                      <span className="al-platform-tabs-bar" aria-hidden="true">
                        <span style={{ width: `${(row.value / max) * 100}%` }} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
