"use client";

import { ArrowRight, Check, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { benefits, insightTabs, months } from "../data/content";
import type { TabKey } from "../data/content";

export function InsightCard() {
  const [tabKey, setTabKey] = useState<TabKey>("overview");
  const [benefitId, setBenefitId] = useState(benefits[0].id);
  const [exported, setExported] = useState(false);
  const tab = insightTabs.find((item) => item.key === tabKey) ?? insightTabs[0];
  const benefit = benefits.find((item) => item.id === benefitId) ?? benefits[0];

  useEffect(() => {
    if (!exported) return;
    const timer = window.setTimeout(() => setExported(false), 4000);
    return () => window.clearTimeout(timer);
  }, [exported]);

  return (
    <section className="lg-insight" id="insights" aria-labelledby="lg-insight-title">
      <div className="lg-insight-copy">
        <h2 id="lg-insight-title">Turn Data Into Actions That Drive Growth</h2>
        <div>
          <p>Centralize your customer data, analyze sales performance and automate decisions with insights your team can act on.</p>
          <a className="lg-button" href="#start">
            Start Outreach <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="lg-glass">
        <div className="lg-widget lg-widget-leads" aria-live="polite">
          <span className="lg-faces" aria-hidden="true">
            {[1, 2, 3].map((id) => (
              <img key={id} src={`/showcase/leadgrove/lead-${id}.webp`} alt="" width={44} height={44} />
            ))}
          </span>
          <p>
            {benefit.title}
            <br />
            <strong>{benefit.figure}</strong> {benefit.rest}
          </p>
        </div>

        <div className="lg-widget lg-widget-main">
          <div className="lg-tabs" role="tablist" aria-label="Metric">
            {insightTabs.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`lg-tab-${item.key}`}
                aria-selected={item.key === tabKey}
                aria-controls="lg-tab-panel"
                tabIndex={item.key === tabKey ? 0 : -1}
                onClick={() => setTabKey(item.key)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  const index = insightTabs.findIndex((entry) => entry.key === tabKey);
                  const next = insightTabs[(index + (event.key === "ArrowRight" ? 1 : insightTabs.length - 1)) % insightTabs.length];
                  setTabKey(next.key);
                  document.getElementById(`lg-tab-${next.key}`)?.focus();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="lg-widget-panel" id="lg-tab-panel" role="tabpanel" aria-labelledby={`lg-tab-${tab.key}`}>
            <div>
              <p className="lg-widget-value">
                {tab.value.toLocaleString("en-US")}
                <span>
                  {tab.gain.toLocaleString("en-US")} <TrendingUp size={13} aria-hidden="true" />
                </span>
              </p>
              <p>{tab.note}</p>
            </div>
            <ul className="lg-bars" aria-label={tab.chartLabel}>
              {tab.bars.map((value, index) => (
                <li key={months[index]}>
                  <span style={{ height: `${value}%` }} data-last={index === tab.bars.length - 1}>
                    {value}
                    <br />%
                  </span>
                  <small>{months[index]}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg-widget lg-widget-revenue">
          <p>
            Revenue today
            <strong>$10,850.10</strong>
          </p>
          <button type="button" onClick={() => setExported(true)} aria-live="polite">
            {exported ? (
              <>
                Demo: nothing saved <Check size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Export Data <ArrowRight size={17} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>

      <ul className="lg-timeline" aria-label="What the insights help with">
        {benefits.map((item) => (
          <li key={item.id}>
            <button type="button" aria-pressed={item.id === benefitId} onClick={() => setBenefitId(item.id)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
