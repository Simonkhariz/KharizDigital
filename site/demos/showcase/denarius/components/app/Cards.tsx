"use client";

import { Eye, EyeOff, Globe, HandCoins, LoaderCircle, Nfc, Snowflake } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cardOfTransaction, cardSpend, cards, categoryById, dayLabel } from "../../data/bank";
import type { CardId } from "../../data/bank";
import { money, usd } from "../../data/format";
import { BankCard } from "../Artwork";
import type { AppProps } from "./BankApp";
import type { CardControls } from "./state";
import { Amount, CategoryIcon, EmptyState, Meter, Panel } from "./ui";

const controls: { key: Exclude<keyof CardControls, "frozen">; label: string; text: string; icon: typeof Globe }[] = [
  { key: "online", label: "Online payments", text: "Shops, apps and subscriptions", icon: Globe },
  { key: "contactless", label: "Contactless", text: "Tap to pay in person", icon: Nfc },
  { key: "cash", label: "Cash withdrawals", text: "ATMs and cashback", icon: HandCoins },
];

/** Invented numbers for the reveal: clearly not a real card. */
const demoDetails: Record<CardId, { number: string; cvc: string }> = {
  metal: { number: "0000 1234 5678 4821", cvc: "000" },
  virtual: { number: "0000 8765 4321 9034", cvc: "000" },
};

export function Cards({ state, dispatch, toast, go }: AppProps) {
  const [selected, setSelected] = useState<CardId>("metal");
  const [reveal, setReveal] = useState<"hidden" | "loading" | "shown">("hidden");
  const timer = useRef<number | undefined>(undefined);
  const card = cards.find((item) => item.id === selected) ?? cards[0];
  const settings = state.cards[card.id];
  const account = state.accounts.find((item) => item.id === card.account);
  const spent = cardSpend(state.transactions, card.id);
  const payments = state.transactions.filter((item) => cardOfTransaction[item.id] === card.id);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (id: CardId) => {
    window.clearTimeout(timer.current);
    setReveal("hidden");
    setSelected(id);
  };

  const toggleReveal = () => {
    if (reveal !== "hidden") {
      window.clearTimeout(timer.current);
      setReveal("hidden");
      return;
    }
    setReveal("loading");
    timer.current = window.setTimeout(() => setReveal("shown"), 800);
  };

  const setControl = (key: keyof CardControls, value: boolean, message: string) => {
    dispatch({ type: "setCard", id: card.id, key, value });
    toast(message);
  };

  return (
    <div className="dna-cards-view">
      <div className="dna-card-picker" role="group" aria-label="Choose a card">
        {cards.map((item) => {
          const frozen = state.cards[item.id].frozen;
          return (
            <button key={item.id} type="button" aria-pressed={item.id === card.id} onClick={() => choose(item.id)}>
              <BankCard amount={item.kind} label={item.name} last4={item.last4} frozen={frozen} />
              <span className="dna-card-picker-meta">
                <span>
                  {item.name}
                  <small>
                    {item.kind} · •• {item.last4}
                  </small>
                </span>
                <span className={`dna-chip${frozen ? " is-frozen" : " is-live"}`}>{frozen ? "Frozen" : "Active"}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="dna-card-cols" key={card.id}>
        <Panel className="dna-card-controls" title="Controls">
          <div className={`dna-freeze${settings.frozen ? " is-on" : ""}`}>
            <span aria-hidden="true">
              <Snowflake size={18} strokeWidth={1.6} />
            </span>
            <p>
              {settings.frozen ? "This card is frozen" : "Freeze this card"}
              <small>{settings.frozen ? "Payments are declined until you unfreeze it." : "Pause every payment instantly. Unfreeze whenever you like."}</small>
            </p>
            <button
              type="button"
              className="dna-switch"
              role="switch"
              aria-checked={settings.frozen}
              aria-label="Freeze card"
              onClick={() => setControl("frozen", !settings.frozen, settings.frozen ? `${card.name} unfrozen` : `${card.name} frozen`)}
            >
              <span />
            </button>
          </div>
          <ul className="dna-toggles">
            {controls.map((control) => (
              <li key={control.key} className={settings.frozen ? "is-muted" : undefined}>
                <span aria-hidden="true">
                  <control.icon size={17} strokeWidth={1.6} />
                </span>
                <p>
                  {control.label}
                  <small>{control.text}</small>
                </p>
                <button
                  type="button"
                  className="dna-switch"
                  role="switch"
                  aria-checked={settings[control.key]}
                  aria-label={control.label}
                  disabled={settings.frozen}
                  onClick={() => setControl(control.key, !settings[control.key], `${control.label} ${settings[control.key] ? "off" : "on"}`)}
                >
                  <span />
                </button>
              </li>
            ))}
          </ul>
          <div className="dna-limit">
            <p>
              <span>Spent this month</span>
              <span>
                <b>{usd(spent)}</b> of ${money(card.limit, 0)}
              </span>
            </p>
            <Meter value={spent} max={card.limit} label="Card spend against monthly limit" />
          </div>
        </Panel>

        <Panel className="dna-card-details" title="Card details">
          <dl className="dna-facts">
            <div>
              <dt>Linked to</dt>
              <dd>{account?.name}</dd>
            </div>
            <div>
              <dt>Card number</dt>
              <dd className="dna-mono" aria-live="polite">
                {reveal === "shown" ? demoDetails[card.id].number : `•••• •••• •••• ${card.last4}`}
              </dd>
            </div>
            <div>
              <dt>Expires</dt>
              <dd className="dna-mono">{reveal === "shown" ? card.expiry : "••/••"}</dd>
            </div>
            <div>
              <dt>Security code</dt>
              <dd className="dna-mono">{reveal === "shown" ? demoDetails[card.id].cvc : "•••"}</dd>
            </div>
          </dl>
          <button type="button" className="dn-btn dn-btn-soft dna-wide" aria-busy={reveal === "loading"} onClick={toggleReveal}>
            {reveal === "loading" ? (
              <>
                <LoaderCircle size={15} strokeWidth={1.8} className="dna-spin" aria-hidden="true" />
                Checking it is you
              </>
            ) : reveal === "shown" ? (
              <>
                <EyeOff size={15} strokeWidth={1.6} aria-hidden="true" />
                Hide details
              </>
            ) : (
              <>
                <Eye size={15} strokeWidth={1.6} aria-hidden="true" />
                Show details
              </>
            )}
          </button>
          {reveal === "shown" && <p className="dna-hint">Placeholder numbers for the demonstration. They do not belong to a real card.</p>}
        </Panel>

        <Panel
          className="dna-card-payments"
          title="Card payments"
          action={
            <button type="button" className="dna-link" onClick={() => go("transactions")}>
              All transactions
            </button>
          }
        >
          {payments.length === 0 ? (
            <EmptyState title="No card payments yet" text="Payments made with this card will be listed here." />
          ) : (
            <ul className="dna-rows">
              {payments.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <CategoryIcon id={item.category} />
                  <span className="dna-row-name">
                    {item.payee}
                    <small>{categoryById[item.category].label}</small>
                  </span>
                  <span className="dna-row-date">{dayLabel(item.date)}</span>
                  <Amount value={item.amount} sign />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
