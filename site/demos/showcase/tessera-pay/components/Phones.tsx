"use client";

import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Bell, ChevronDown, ChevronLeft, ListFilter, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";
import { ACCOUNT_BALANCE, dollars, phoneActions, phoneFilters, phoneTransactions } from "../data/content";
import type { TxKind } from "../data/content";

type Filter = "all" | TxKind;

function StatusBar() {
  return (
    <div className="tp-phone-status" aria-hidden="true">
      <span>9:41</span>
      <i />
      <span className="tp-phone-battery" />
    </div>
  );
}

function HistoryPhone({ side, initial }: { side: "left" | "right"; initial: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const rows = phoneTransactions.filter((item) => filter === "all" || item.kind === filter);

  return (
    <div className={`tp-phone tp-phone-${side}`} role="group" aria-label="Transaction history preview">
      <div className="tp-phone-screen">
        <StatusBar />
        <div className="tp-phone-bar">
          <span className="tp-phone-round" aria-hidden="true">
            <ChevronLeft size={15} />
          </span>
          <strong>Transaction History</strong>
          <span className="tp-phone-round" aria-hidden="true">
            <Search size={14} />
          </span>
        </div>
        <div className="tp-phone-filters" role="group" aria-label="Filter transactions">
          {phoneFilters.map((item) => (
            <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <p className="tp-phone-day">Today</p>
        <ul className="tp-phone-list" aria-live="polite">
          {rows.map((item) => (
            <li key={item.id}>
              <span aria-hidden="true">{item.initials}</span>
              <p>
                {item.name}
                <small>{item.time}</small>
              </p>
              <p className="tp-phone-amount">
                {item.amount > 0 ? "+" : "-"}
                {dollars(item.amount)}
                <small>{item.label}</small>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const actionIcons = { send: ArrowUpRight, request: ArrowDownLeft, exchange: ArrowLeftRight, more: MoreHorizontal };

function AccountPhone() {
  const [action, setAction] = useState<(typeof phoneActions)[number]["id"]>("send");
  const current = phoneActions.find((item) => item.id === action) ?? phoneActions[0];

  return (
    <div className="tp-phone tp-phone-center" role="group" aria-label="Account preview">
      <div className="tp-phone-screen">
        <StatusBar />
        <div className="tp-phone-bar">
          <span className="tp-phone-round" aria-hidden="true">
            <ListFilter size={15} />
          </span>
          <strong>My Account</strong>
          <span className="tp-phone-round tp-phone-bell" aria-hidden="true">
            <Bell size={15} />
            <b>2</b>
          </span>
        </div>
        <p className="tp-phone-card">
          <i aria-hidden="true" />
          •••• 3425
          <ChevronDown size={12} aria-hidden="true" />
        </p>
        <p className="tp-phone-label">Your Balance</p>
        <p className="tp-phone-balance">{dollars(ACCOUNT_BALANCE)}</p>
        <p className="tp-phone-saved">You saved $290 in fees last month</p>
        <div className="tp-phone-actions" role="group" aria-label="Account actions">
          {phoneActions.map((item) => {
            const Icon = actionIcons[item.id];
            return (
              <button key={item.id} type="button" aria-pressed={action === item.id} onClick={() => setAction(item.id)}>
                <span>
                  <Icon size={18} aria-hidden="true" />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
        <p className="tp-phone-hint" aria-live="polite">
          {current.hint}
        </p>
      </div>
    </div>
  );
}

export function Phones() {
  return (
    <div className="tp-phones">
      <HistoryPhone side="left" initial="all" />
      <AccountPhone />
      <HistoryPhone side="right" initial="all" />
    </div>
  );
}
