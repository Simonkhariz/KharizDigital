"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { payees } from "../../data/bank";
import type { AccountId } from "../../data/bank";
import { money, usd } from "../../data/format";
import { TRANSFER_MAX, paymentReference } from "./state";
import type { BankState, Recipient, Transfer } from "./state";
import { Amount } from "./ui";

type Step = "details" | "review" | "sending" | "done";
type Mode = "saved" | "own" | "new";
type Errors = Partial<Record<"to" | "name" | "number" | "amount" | "note", string>>;

const steps = ["Details", "Review", "Done"] as const;
const quick = [25, 50, 100, 250];

export function SendMoney({
  state,
  from: initialFrom,
  onClose,
  onSend,
  onView,
}: {
  state: BankState;
  from: AccountId;
  onClose: () => void;
  onSend: (transfer: Transfer) => void;
  onView: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const formId = useId();

  const [step, setStep] = useState<Step>("details");
  const [from, setFrom] = useState<AccountId>(initialFrom);
  const [mode, setMode] = useState<Mode>("saved");
  const [payeeId, setPayeeId] = useState(payees[0].id);
  const [ownId, setOwnId] = useState<AccountId>(initialFrom === "savings" ? "everyday" : "savings");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [amountText, setAmountText] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [receipt, setReceipt] = useState<{ reference: string; amount: number; to: string; balance: number } | null>(null);

  const source = state.accounts.find((account) => account.id === from) ?? state.accounts[0];
  const others = state.accounts.filter((account) => account.id !== from);
  const own = others.find((account) => account.id === ownId) ?? others[0];
  const payee = payees.find((item) => item.id === payeeId) ?? payees[0];
  const amount = Math.round(Number(amountText) * 100) / 100;
  const recipientName = mode === "saved" ? payee.name : mode === "own" ? own.name : name.trim();
  const recipientDetail = mode === "saved" ? `Account ${payee.account}` : mode === "own" ? `${own.kind} ${own.number}` : `Account ${number}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const validate = (): Errors => {
    const found: Errors = {};
    if (mode === "new") {
      if (name.trim().length < 2) found.name = "Enter the name on the account.";
      if (!/^\d{8}$/.test(number)) found.number = "Account numbers have 8 digits.";
    }
    if (!amountText.trim()) found.amount = "Enter an amount.";
    else if (!Number.isFinite(amount) || amount <= 0) found.amount = "Enter an amount above $0.00.";
    else if (amount > source.balance) found.amount = `${source.name} holds ${usd(source.balance)}. Enter that or less.`;
    else if (amount > TRANSFER_MAX) found.amount = `Single payments are limited to $${money(TRANSFER_MAX, 0)}.`;
    if (note.length > 40) found.note = "Keep the reference to 40 characters.";
    return found;
  };

  const review = (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }
    setStep("review");
  };

  const confirm = () => {
    setStep("sending");
    timer.current = window.setTimeout(() => {
      const to: Recipient = mode === "own" ? { kind: "own", id: own.id } : { kind: "payee", name: recipientName, account: mode === "saved" ? payee.account : number };
      onSend({ from, to, amount, note: note.trim() });
      setReceipt({ reference: paymentReference(state.sent + 1), amount, to: recipientName, balance: Math.round((source.balance - amount) * 100) / 100 });
      setStep("done");
    }, 1100);
  };

  const again = () => {
    setAmountText("");
    setNote("");
    setErrors({});
    setReceipt(null);
    setStep("details");
  };

  const stepIndex = step === "details" ? 0 : step === "done" ? 2 : 1;
  const field = (key: keyof Errors) => ({
    id: `${formId}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${formId}-${key}-error` : undefined,
  });
  const error = (key: keyof Errors) =>
    errors[key] ? (
      <p className="dna-error" id={`${formId}-${key}-error`} role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <dialog
      ref={dialogRef}
      className="dna-dialog"
      aria-labelledby={`${formId}-title`}
      onClose={onClose}
      onCancel={(event) => {
        if (step === "sending") event.preventDefault();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current && step !== "sending") dialogRef.current?.close();
      }}
    >
      <div className="dna-dialog-inner">
        <header className="dna-dialog-head">
          <ol className="dna-steps" aria-label="Progress">
            {steps.map((label, index) => (
              <li key={label} className={index === stepIndex ? "is-current" : index < stepIndex ? "is-done" : undefined} aria-current={index === stepIndex ? "step" : undefined}>
                <span>0{index + 1}</span>
                {label}
              </li>
            ))}
          </ol>
          <button type="button" className="dna-icon-btn" aria-label="Close" disabled={step === "sending"} onClick={() => dialogRef.current?.close()}>
            <X size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </header>

        {step === "details" && (
          <form className="dna-send" noValidate onSubmit={review}>
            <h2 id={`${formId}-title`} ref={headingRef} tabIndex={-1}>
              Send money
            </h2>

            <fieldset>
              <legend>From</legend>
              <div className="dna-pick">
                {state.accounts.map((account) => (
                  <label key={account.id} className={account.id === from ? "is-on" : undefined}>
                    <input
                      type="radio"
                      name={`${formId}-from`}
                      checked={account.id === from}
                      onChange={() => {
                        setFrom(account.id);
                        if (ownId === account.id) setOwnId(state.accounts.find((item) => item.id !== account.id)?.id ?? "everyday");
                      }}
                    />
                    <span>{account.name}</span>
                    <Amount value={account.balance} />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>To</legend>
              <div className="dna-seg" role="group" aria-label="Recipient type">
                {(
                  [
                    ["saved", "Saved payee"],
                    ["own", "My accounts"],
                    ["new", "New payee"],
                  ] as const
                ).map(([id, label]) => (
                  <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)}>
                    {label}
                  </button>
                ))}
              </div>
              {mode === "saved" && (
                <div className="dna-pick dna-pick-list">
                  {payees.map((item) => (
                    <label key={item.id} className={item.id === payeeId ? "is-on" : undefined}>
                      <input type="radio" name={`${formId}-payee`} checked={item.id === payeeId} onChange={() => setPayeeId(item.id)} />
                      <span>
                        {item.name}
                        <small>
                          Account {item.account} · {item.last}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
              )}
              {mode === "own" && (
                <div className="dna-pick dna-pick-list">
                  {others.map((account) => (
                    <label key={account.id} className={account.id === own.id ? "is-on" : undefined}>
                      <input type="radio" name={`${formId}-own`} checked={account.id === own.id} onChange={() => setOwnId(account.id)} />
                      <span>
                        {account.name}
                        <small>
                          {account.kind} · {account.number}
                        </small>
                      </span>
                      <Amount value={account.balance} />
                    </label>
                  ))}
                </div>
              )}
              {mode === "new" && (
                <div className="dna-fields">
                  <div>
                    <label htmlFor={`${formId}-name`}>Name on the account</label>
                    <input {...field("name")} type="text" autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} />
                    {error("name")}
                  </div>
                  <div>
                    <label htmlFor={`${formId}-number`}>Account number</label>
                    <input
                      {...field("number")}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="8 digits"
                      value={number}
                      onChange={(event) => setNumber(event.target.value.replace(/\D/g, "").slice(0, 8))}
                    />
                    {error("number")}
                  </div>
                </div>
              )}
            </fieldset>

            <div className="dna-amount-field">
              <label htmlFor={`${formId}-amount`}>Amount</label>
              <div className={errors.amount ? "is-invalid" : undefined}>
                <span aria-hidden="true">$</span>
                <input
                  {...field("amount")}
                  className="dn-num"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0.00"
                  value={amountText}
                  onChange={(event) => {
                    const value = event.target.value.replace(/[^\d.]/g, "");
                    const [whole, ...rest] = value.split(".");
                    setAmountText(rest.length ? `${whole}.${rest.join("").slice(0, 2)}` : whole);
                    if (errors.amount) setErrors({ ...errors, amount: undefined });
                  }}
                />
              </div>
              <div className="dna-quick-amounts">
                {quick.map((value) => (
                  <button key={value} type="button" onClick={() => setAmountText(String(value))}>
                    ${value}
                  </button>
                ))}
              </div>
              {error("amount")}
            </div>

            <div className="dna-fields">
              <div>
                <label htmlFor={`${formId}-note`}>
                  Reference <span>(optional)</span>
                </label>
                <input {...field("note")} type="text" autoComplete="off" value={note} maxLength={60} onChange={(event) => setNote(event.target.value)} />
                {error("note")}
              </div>
            </div>

            <footer className="dna-dialog-foot">
              <button type="button" className="dn-btn dn-btn-soft" onClick={() => dialogRef.current?.close()}>
                Cancel
              </button>
              <button type="submit" className="dn-btn dn-btn-dark">
                Review payment
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </footer>
          </form>
        )}

        {(step === "review" || step === "sending") && (
          <div className="dna-send">
            <h2 id={`${formId}-title`} ref={headingRef} tabIndex={-1}>
              Check the details
            </h2>
            <p className="dna-review-amount">
              <Amount value={amount} />
              <span>to {recipientName}</span>
            </p>
            <dl className="dna-facts">
              <div>
                <dt>From</dt>
                <dd>
                  {source.name} {source.number}
                </dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>
                  {recipientName}
                  <small>{recipientDetail}</small>
                </dd>
              </div>
              <div>
                <dt>Reference</dt>
                <dd>{note.trim() || "None"}</dd>
              </div>
              <div>
                <dt>Arrives</dt>
                <dd>{mode === "own" ? "Instantly" : "Within two hours"}</dd>
              </div>
              <div>
                <dt>Balance after</dt>
                <dd className="dn-num">{usd(Math.round((source.balance - amount) * 100) / 100)}</dd>
              </div>
            </dl>
            <footer className="dna-dialog-foot">
              <button type="button" className="dn-btn dn-btn-soft" disabled={step === "sending"} onClick={() => setStep("details")}>
                <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
                Edit
              </button>
              <button type="button" className="dn-btn dn-btn-dark" disabled={step === "sending"} aria-busy={step === "sending"} onClick={confirm}>
                {step === "sending" ? (
                  <>
                    <LoaderCircle size={15} strokeWidth={1.8} className="dna-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    Confirm and send
                    <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
                  </>
                )}
              </button>
            </footer>
            <p className="dn-sr" role="status">
              {step === "sending" ? "Sending payment" : ""}
            </p>
          </div>
        )}

        {step === "done" && receipt && (
          <div className="dna-send dna-done">
            <span className="dna-done-mark" aria-hidden="true">
              <Check size={26} strokeWidth={1.8} />
            </span>
            <h2 id={`${formId}-title`} ref={headingRef} tabIndex={-1}>
              Payment sent
            </h2>
            <p className="dna-review-amount">
              <Amount value={receipt.amount} />
              <span>to {receipt.to}</span>
            </p>
            <dl className="dna-facts">
              <div>
                <dt>Reference</dt>
                <dd className="dna-mono">{receipt.reference}</dd>
              </div>
              <div>
                <dt>New balance</dt>
                <dd className="dn-num">{usd(receipt.balance)}</dd>
              </div>
            </dl>
            <p className="dna-hint">This is a demonstration: no money moved. The payment now appears in your transactions and balances.</p>
            <footer className="dna-dialog-foot">
              <button type="button" className="dn-btn dn-btn-soft" onClick={again}>
                Make another
              </button>
              <button type="button" className="dn-btn dn-btn-dark" onClick={onView}>
                View in transactions
                <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </footer>
          </div>
        )}
      </div>
    </dialog>
  );
}
