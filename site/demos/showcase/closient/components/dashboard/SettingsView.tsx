"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "./Shared";
import { useStore } from "./store";
import type { Settings } from "./store";

const toggles: Array<{ key: "notifyStalled" | "notifyWon" | "weeklyDigest" | "compactTables"; label: string; text: string }> = [
  { key: "notifyStalled", label: "Stalled deal alerts", text: "Tell me when an open deal passes its expected close date." },
  { key: "notifyWon", label: "Won deal alerts", text: "Tell the team when a deal is marked as won." },
  { key: "weeklyDigest", label: "Weekly digest", text: "A Monday summary of pipeline changes." },
  { key: "compactTables", label: "Compact tables", text: "Tighter rows in the deals and reports tables." },
];

const quotaPlans = [
  { value: 0.8, label: "Conservative (80% of standard quota)" },
  { value: 1, label: "Standard" },
  { value: 1.2, label: "Stretch (120% of standard quota)" },
];

export function SettingsView() {
  const { state, dispatch } = useStore();
  const [draft, setDraft] = useState<Settings>(state.settings);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const dirty = JSON.stringify(draft) !== JSON.stringify(state.settings);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (draft.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    dispatch({ type: "settings", settings: { ...draft, name: draft.name.trim(), email: draft.email.trim() } });
  };

  return (
    <form className="cl-d-settings" onSubmit={submit} noValidate>
      <Card title="Profile" hint="Shown in the sidebar and on deals you own">
        <div className="cl-d-form-grid">
          <label className="cl-d-field">
            <span>Name</span>
            <input
              type="text"
              value={draft.name}
              autoComplete="off"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "cl-d-set-name" : undefined}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            />
            {errors.name && <em id="cl-d-set-name">{errors.name}</em>}
          </label>
          <label className="cl-d-field">
            <span>Email</span>
            <input
              type="email"
              value={draft.email}
              autoComplete="off"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cl-d-set-email" : undefined}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
            />
            {errors.email && <em id="cl-d-set-email">{errors.email}</em>}
          </label>
        </div>
      </Card>

      <Card title="Quota plan" hint="Changes the quota used on the overview and in reports">
        <label className="cl-d-field">
          <span>Plan</span>
          <select value={draft.quotaScale} onChange={(event) => setDraft({ ...draft, quotaScale: Number(event.target.value) })}>
            {quotaPlans.map((plan) => (
              <option key={plan.value} value={plan.value}>
                {plan.label}
              </option>
            ))}
          </select>
        </label>
      </Card>

      <Card title="Preferences" hint="Alerts are illustrative: this demo never sends anything">
        <ul className="cl-d-toggles">
          {toggles.map((toggle) => (
            <li key={toggle.key}>
              <span>
                <strong id={`cl-d-toggle-${toggle.key}`}>{toggle.label}</strong>
                <small>{toggle.text}</small>
              </span>
              <button
                type="button"
                role="switch"
                className="cl-d-switch"
                aria-checked={draft[toggle.key]}
                aria-labelledby={`cl-d-toggle-${toggle.key}`}
                onClick={() => setDraft({ ...draft, [toggle.key]: !draft[toggle.key] })}
              >
                <span />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <div className="cl-d-settings-actions">
        <button
          type="button"
          className="cl-d-button"
          onClick={() => {
            dispatch({ type: "reset" });
            setErrors({});
          }}
        >
          Restore demo data
        </button>
        <button type="submit" className="cl-d-button cl-d-button-primary" disabled={!dirty}>
          Save changes
        </button>
      </div>
      <p className="cl-d-footnote">Concept dashboard with demonstration content. Changes live in memory and are lost on reload.</p>
    </form>
  );
}
