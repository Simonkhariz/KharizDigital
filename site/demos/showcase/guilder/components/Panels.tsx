"use client";

import { Check, Copy, Snowflake } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  accountDetails,
  balances,
  cards,
  EARN_RATE,
  money,
  PAYOUT_FEE,
  recipients,
  type AccountTab,
} from "../data/content";

function Panel({ id, title, text, size, children }: { id: string; title: string; text: string; size: "wide" | "narrow"; children: ReactNode }) {
  return (
    <article className={`gd-panel gd-panel-${size} gd-panel-${id}`} aria-labelledby={`gd-panel-${id}`}>
      <header>
        <h3 id={`gd-panel-${id}`}>{title}</h3>
        <p>{text}</p>
      </header>
      <div className="gd-app">{children}</div>
    </article>
  );
}

const usdAvailable = balances[0].amount;

export function SendPanel() {
  const [recipientId, setRecipientId] = useState<string>(recipients[0].id);
  const [input, setInput] = useState("25,000.00");
  const [sent, setSent] = useState(false);
  const recipient = recipients.find((entry) => entry.id === recipientId) ?? recipients[0];
  const amount = Number(input.replace(/,/g, ""));
  const valid = Number.isFinite(amount) && amount > 0;
  const fee = PAYOUT_FEE;
  const total = valid ? amount + fee : 0;
  const error = !valid ? "Enter an amount above zero." : total > usdAvailable ? `Your dollar balance is $${money(usdAvailable)}.` : null;

  return (
    <Panel id="send" size="wide" title="Send" text="Pay a bank or wallet in 140 countries. It lands in seconds.">
      <div className="gd-app-head">
        <strong>New payout</strong>
        <span>{sent ? "Done" : "Step 2 of 2"}</span>
      </div>
      <form
        className="gd-send"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!error) setSent(true);
        }}
      >
        <div className="gd-send-fields">
          <label htmlFor="gd-send-to">To</label>
          <div className="gd-input">
            <select id="gd-send-to" value={recipientId} disabled={sent} onChange={(event) => setRecipientId(event.target.value)}>
              {recipients.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.name}
                </option>
              ))}
            </select>
            <span>{recipient.account}</span>
          </div>
          <label htmlFor="gd-send-amount">You send</label>
          <div className="gd-input" data-invalid={Boolean(error)}>
            <input
              id="gd-send-amount"
              inputMode="decimal"
              autoComplete="off"
              value={input}
              disabled={sent}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "gd-send-error" : undefined}
              onChange={(event) => setInput(event.target.value.replace(/[^\d.,]/g, ""))}
              onBlur={() => valid && setInput(money(amount))}
            />
            <span>USD</span>
          </div>
          {error && (
            <p className="gd-error" id="gd-send-error">
              {error}
            </p>
          )}
          <label htmlFor="gd-send-receive">They receive</label>
          <div className="gd-input">
            <output id="gd-send-receive" htmlFor="gd-send-amount gd-send-to">
              {valid ? money(amount * recipient.rate, recipient.decimals) : "0"}
            </output>
            <span>{recipient.currency}</span>
          </div>
        </div>
        <div className="gd-summary">
          <strong>Summary</strong>
          {sent ? (
            <div className="gd-summary-done" role="status">
              <span aria-hidden="true">
                <Check size={18} />
              </span>
              <p>
                ${money(total)} sent to {recipient.name}. This is a demo, so no money moved.
              </p>
              <button type="button" className="gd-app-button gd-app-button-light" onClick={() => setSent(false)}>
                New payout
              </button>
            </div>
          ) : (
            <>
              <dl>
                <div>
                  <dt>Rate</dt>
                  <dd>{money(recipient.rate, recipient.rate < 10 ? 4 : 2)}</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>${money(fee)}</dd>
                </div>
                <div>
                  <dt>Arrives</dt>
                  <dd className="gd-positive">In seconds</dd>
                </div>
              </dl>
              <button type="submit" className="gd-app-button">
                Send ${money(total)}
              </button>
            </>
          )}
        </div>
      </form>
    </Panel>
  );
}

const tabs = Object.keys(accountDetails) as AccountTab[];

export function ReceivePanel() {
  const [tab, setTab] = useState<AccountTab>("usd");
  const [copied, setCopied] = useState(false);
  const details = accountDetails[tab];

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    const text = details.rows.map(([label, value]) => `${label}: ${value}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard access can be refused; the confirmation below still explains what happened.
    }
    setCopied(true);
  };

  return (
    <Panel id="receive" size="narrow" title="Receive" text="Your own US and EU account details.">
      <div className="gd-app-head">
        <strong>Account details</strong>
        <button type="button" className="gd-copy" onClick={copy}>
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          <span role="status">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="gd-tabs" role="tablist" aria-label="Currency">
        {tabs.map((id) => (
          <button key={id} type="button" role="tab" id={`gd-tab-${id}`} aria-selected={tab === id} aria-controls="gd-tabpanel" onClick={() => setTab(id)}>
            {accountDetails[id].label}
          </button>
        ))}
      </div>
      <div id="gd-tabpanel" role="tabpanel" aria-labelledby={`gd-tab-${tab}`} className="gd-details">
        <dl>
          {details.rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p>{details.note}</p>
      </div>
    </Panel>
  );
}

const dollarBalance = balances.filter((entry) => entry.symbol === "$").reduce((sum, entry) => sum + entry.amount, 0);
const monthlyEarned = (dollarBalance * EARN_RATE) / 12;

export function HoldPanel() {
  const [earning, setEarning] = useState(true);

  return (
    <Panel id="hold" size="narrow" title="Hold" text="Keep dollars and earn 4.1% a year on idle cash.">
      <div className="gd-app-head">
        <strong>Balances</strong>
        <span>Oct 31</span>
      </div>
      <div className="gd-total">
        <span>Total balance</span>
        <strong>${money(dollarBalance)}</strong>
        <p className="gd-chip" data-on={earning}>
          {earning ? `4.1% a year, $${money(monthlyEarned)} earned in October` : "Yield is switched off"}
        </p>
        <button type="button" role="switch" aria-checked={earning} className="gd-switch" onClick={() => setEarning((value) => !value)}>
          <i aria-hidden="true" />
          <span>Earn on idle cash</span>
        </button>
      </div>
      <dl className="gd-balances">
        {balances.map((entry) => (
          <div key={entry.id}>
            <dt>{entry.label}</dt>
            <dd>
              {entry.symbol}
              {money(entry.amount)}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

const totalSpent = cards.reduce((sum, card) => sum + card.spent, 0);
const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);

export function SpendPanel() {
  const [frozen, setFrozen] = useState<string[]>([]);
  const active = cards.length - frozen.length;

  return (
    <Panel id="spend" size="wide" title="Spend" text="Cards for your team, with limits you set. Works anywhere cards are accepted.">
      <div className="gd-app-head">
        <strong>Cards</strong>
        <span role="status">{active} active</span>
      </div>
      <table className="gd-cards">
        <thead>
          <tr>
            <th scope="col">Card</th>
            <th scope="col">Holder</th>
            <th scope="col">Spent this month</th>
            <th scope="col">
              <span className="gd-sr">Status</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => {
            const isFrozen = frozen.includes(card.id);
            const share = card.spent / card.limit;
            return (
              <tr key={card.id} data-frozen={isFrozen}>
                <th scope="row">
                  <i aria-hidden="true" />
                  {card.name} <span aria-hidden="true">•••</span> {card.last4}
                </th>
                <td>{card.holder}</td>
                <td>
                  ${money(card.spent, 0)} of ${money(card.limit, 0)}
                  <span className="gd-bar" data-high={share > 0.75} aria-hidden="true">
                    <i style={{ width: `${Math.round(share * 100)}%` }} />
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="gd-freeze"
                    aria-pressed={isFrozen}
                    aria-label={`${isFrozen ? "Unfreeze" : "Freeze"} the ${card.name} card`}
                    onClick={() => setFrozen((current) => (isFrozen ? current.filter((id) => id !== card.id) : [...current, card.id]))}
                  >
                    <Snowflake size={13} aria-hidden="true" />
                    {isFrozen ? "Frozen" : "Freeze"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="gd-cards-total">
        <span>All cards this month</span>
        <strong>
          ${money(totalSpent, 0)} of ${money(totalLimit, 0)}
        </strong>
      </p>
    </Panel>
  );
}
