"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { TODAY, TODAY_ISO, companies, currentUser, dayToIso, openStages, reps, sources, stageMeta, toDay } from "../../data/crm";
import type { OpenStage } from "../../data/crm";
import { useStore } from "./store";

interface Draft {
  product: string;
  companyId: string;
  amount: string;
  stage: OpenStage;
  ownerId: string;
  source: string;
  closeDate: string;
}

type Errors = Partial<Record<"product" | "companyId" | "amount" | "closeDate", string>>;

const emptyDraft: Draft = {
  product: "",
  companyId: "",
  amount: "",
  stage: "lead",
  ownerId: currentUser.id,
  source: sources[0],
  closeDate: dayToIso(TODAY + 30),
};

function validate(draft: Draft): Errors {
  const errors: Errors = {};
  const amount = Number(draft.amount);
  if (draft.product.trim().length < 3) errors.product = "Describe what is being sold (at least 3 characters).";
  if (!draft.companyId) errors.companyId = "Choose a company.";
  if (!draft.amount.trim() || !Number.isFinite(amount) || amount <= 0) errors.amount = "Enter an amount above zero.";
  else if (amount > 1_000_000) errors.amount = "Amounts in this demo stop at $1,000,000.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.closeDate)) errors.closeDate = "Choose an expected close date.";
  else if (toDay(draft.closeDate) < TODAY) errors.closeDate = "The close date cannot be in the past.";
  return errors;
}

export function AddDealDialog() {
  const { state, dispatch } = useStore();
  const onClose = useCallback(() => dispatch({ type: "addOpen", open: false }), [dispatch]);
  if (!state.addOpen) return null;
  return <AddDealForm onClose={onClose} />;
}

function AddDealForm({ onClose }: { onClose: () => void }) {
  const { dispatch } = useStore();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  const update = (patch: Partial<Draft>) => setDraft((value) => ({ ...value, ...patch }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate(draft);
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const company = companies.find((item) => item.id === draft.companyId) ?? companies[0];
    dispatch({
      type: "addDeal",
      deal: {
        title: `${company.name}: ${draft.product.trim()}`,
        companyId: company.id,
        ownerId: draft.ownerId,
        stage: draft.stage,
        amount: Math.round(Number(draft.amount)),
        source: draft.source,
        closeDay: toDay(draft.closeDate),
      },
    });
  };

  const describe = (key: keyof Errors) => (errors[key] ? `cl-d-add-${key}` : undefined);

  return (
    <div className="cl-d-overlay cl-d-overlay-center">
      <button type="button" className="cl-d-overlay-scrim" aria-label="Close form" onClick={onClose} />
      <form ref={formRef} className="cl-d-dialog" role="dialog" aria-modal="true" aria-labelledby="cl-d-add-title" onSubmit={submit} noValidate>
        <header>
          <h2 id="cl-d-add-title">Add a deal</h2>
          <button type="button" className="cl-d-icon-button" aria-label="Close form" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <div className="cl-d-form-grid">
          <label className="cl-d-field cl-d-field-wide">
            <span>What is being sold</span>
            <input
              name="product"
              type="text"
              value={draft.product}
              placeholder="Agent seats, 12 months"
              aria-invalid={Boolean(errors.product)}
              aria-describedby={describe("product")}
              onChange={(event) => update({ product: event.target.value })}
            />
            {errors.product && <em id="cl-d-add-product">{errors.product}</em>}
          </label>
          <label className="cl-d-field cl-d-field-wide">
            <span>Company</span>
            <select
              name="companyId"
              value={draft.companyId}
              aria-invalid={Boolean(errors.companyId)}
              aria-describedby={describe("companyId")}
              onChange={(event) => update({ companyId: event.target.value })}
            >
              <option value="">Choose a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name} ({company.contact})
                </option>
              ))}
            </select>
            {errors.companyId && <em id="cl-d-add-companyId">{errors.companyId}</em>}
          </label>
          <label className="cl-d-field">
            <span>Amount (USD)</span>
            <input
              name="amount"
              type="text"
              inputMode="decimal"
              value={draft.amount}
              placeholder="12000"
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={describe("amount")}
              onChange={(event) => update({ amount: event.target.value.replace(/[^\d.]/g, "") })}
            />
            {errors.amount && <em id="cl-d-add-amount">{errors.amount}</em>}
          </label>
          <label className="cl-d-field">
            <span>Expected close</span>
            <input
              name="closeDate"
              type="date"
              min={TODAY_ISO}
              value={draft.closeDate}
              aria-invalid={Boolean(errors.closeDate)}
              aria-describedby={describe("closeDate")}
              onChange={(event) => update({ closeDate: event.target.value })}
            />
            {errors.closeDate && <em id="cl-d-add-closeDate">{errors.closeDate}</em>}
          </label>
          <label className="cl-d-field">
            <span>Stage</span>
            <select value={draft.stage} onChange={(event) => update({ stage: event.target.value as OpenStage })}>
              {openStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stageMeta[stage].label}
                </option>
              ))}
            </select>
          </label>
          <label className="cl-d-field">
            <span>Owner</span>
            <select value={draft.ownerId} onChange={(event) => update({ ownerId: event.target.value })}>
              {reps.map((rep) => (
                <option key={rep.id} value={rep.id}>
                  {rep.name}
                </option>
              ))}
            </select>
          </label>
          <label className="cl-d-field cl-d-field-wide">
            <span>Source</span>
            <select value={draft.source} onChange={(event) => update({ source: event.target.value })}>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>
        </div>
        <footer>
          <p>The deal is created today and kept in memory only.</p>
          <button type="button" className="cl-d-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cl-d-button cl-d-button-primary">
            Add deal
          </button>
        </footer>
      </form>
    </div>
  );
}
