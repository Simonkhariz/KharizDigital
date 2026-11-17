"use client";

import { ArrowLeftRight, ArrowUpRight, Check, CreditCard, LayoutGrid, PieChart, Send, Wallet } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { HOME_PATH } from "../../data/content";
import { MONTH_LABEL } from "../../data/bank";
import type { AccountId } from "../../data/bank";
import { LogoMark } from "../Artwork";
import { Accounts } from "./Accounts";
import { Budgets } from "./Budgets";
import { Cards } from "./Cards";
import { Overview } from "./Overview";
import { SendMoney } from "./SendMoney";
import { Transactions } from "./Transactions";
import { bankReducer, emptyFilters, initialState } from "./state";
import type { BankAction, BankState, Filters, View } from "./state";

const views: { id: View; label: string; title: string; icon: typeof Send }[] = [
  { id: "overview", label: "Overview", title: "Good evening", icon: LayoutGrid },
  { id: "accounts", label: "Accounts", title: "Accounts", icon: Wallet },
  { id: "transactions", label: "Transactions", title: "Transactions", icon: ArrowLeftRight },
  { id: "budgets", label: "Budgets", title: "Budgets", icon: PieChart },
  { id: "cards", label: "Cards", title: "Cards", icon: CreditCard },
];

/** What every screen receives: the data, a way to change it and the app-level actions. */
export type AppProps = {
  state: BankState;
  dispatch: (action: BankAction) => void;
  go: (view: View) => void;
  openSend: (from?: AccountId) => void;
  toast: (text: string) => void;
};

function Skeleton() {
  return (
    <div className="dna-skeleton" aria-hidden="true">
      <span className="dna-sk dna-sk-a" />
      <span className="dna-sk dna-sk-b" />
      <span className="dna-sk dna-sk-c" />
      <span className="dna-sk dna-sk-d" />
      <span className="dna-sk dna-sk-e" />
    </div>
  );
}

export function BankApp() {
  const [state, dispatch] = useReducer(bankReducer, initialState);
  const [view, setView] = useState<View>("overview");
  const [ready, setReady] = useState(false);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [account, setAccount] = useState<AccountId>("everyday");
  const [send, setSend] = useState<{ open: boolean; from: AccountId }>({ open: false, from: "everyday" });
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const toastId = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // A short, honest loading state: the sample profile is "fetched" once when the app opens.
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [view]);

  const go = useCallback((next: View) => {
    moved.current = true;
    setView(next);
  }, []);

  const toast = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-2), { id, text }]);
    window.setTimeout(() => setToasts((list) => list.filter((item) => item.id !== id)), 2600);
  }, []);

  const openSend = useCallback((from: AccountId = "everyday") => setSend({ open: true, from }), []);

  const props: AppProps = { state, dispatch, go, openSend, toast };
  const current = views.find((item) => item.id === view) ?? views[0];

  return (
    <div className="dna-shell">
      <aside className="dna-side">
        <Link className="dn-logo dna-logo" href={HOME_PATH} aria-label="Denarius website">
          <LogoMark />
          <span>denarius</span>
        </Link>
        <nav className="dna-nav" aria-label="Sections">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={view === item.id ? "page" : undefined}
              onClick={(event) => {
                go(item.id);
                event.currentTarget.scrollIntoView({ block: "nearest", inline: "center" });
              }}
            >
              <item.icon size={16} strokeWidth={1.6} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="dna-side-foot">
          <div className="dna-profile">
            <span aria-hidden="true">SP</span>
            <p>
              Sample profile
              <small>Demonstration data</small>
            </p>
          </div>
          <Link className="dna-back" href={HOME_PATH}>
            Back to website
            <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <main className="dna-main" aria-busy={!ready}>
        <header className="dna-top">
          <div>
            <p className="dn-label">{MONTH_LABEL}</p>
            <h1 ref={headingRef} tabIndex={-1}>
              {current.title}
            </h1>
          </div>
          <button type="button" className="dn-btn dn-btn-dark" onClick={() => openSend()}>
            Send money
            <Send size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </header>

        {!ready ? (
          <>
            <p className="dn-sr" role="status">
              Loading the sample profile
            </p>
            <Skeleton />
          </>
        ) : (
          <div className="dna-view" key={view}>
            {view === "overview" && (
              <Overview
                {...props}
                openAccount={(id) => {
                  setAccount(id);
                  go("accounts");
                }}
              />
            )}
            {view === "accounts" && (
              <Accounts
                {...props}
                selected={account}
                onSelect={setAccount}
                showAll={(id) => {
                  setFilters({ ...emptyFilters, account: id });
                  go("transactions");
                }}
              />
            )}
            {view === "transactions" && <Transactions {...props} filters={filters} onFilters={setFilters} />}
            {view === "budgets" && (
              <Budgets
                {...props}
                showCategory={(category) => {
                  setFilters({ ...emptyFilters, category });
                  go("transactions");
                }}
              />
            )}
            {view === "cards" && <Cards {...props} />}
          </div>
        )}

        <p className="dna-note">
          Concept web application with demonstration content. Balances, budgets and payments are sample data kept in memory, and reset when the page reloads.
        </p>
      </main>

      {send.open && (
        <SendMoney
          state={state}
          from={send.from}
          onClose={() => setSend((value) => ({ ...value, open: false }))}
          onSend={(transfer) => dispatch({ type: "send", transfer })}
          onView={() => {
            setFilters({ ...emptyFilters, category: "transfers" });
            setSend((value) => ({ ...value, open: false }));
            go("transactions");
          }}
        />
      )}

      <div className="dna-toasts" role="status" aria-live="polite">
        {toasts.map((item) => (
          <p key={item.id}>
            <Check size={14} strokeWidth={2.2} aria-hidden="true" />
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
}
