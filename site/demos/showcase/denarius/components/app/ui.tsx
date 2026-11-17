"use client";

import {
  ArrowLeftRight,
  Banknote,
  Bus,
  HeartPulse,
  Home,
  Repeat,
  ShoppingBag,
  ShoppingBasket,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import type { CategoryId } from "../../data/bank";
import { splitAmount } from "../../data/format";

const icons: Record<CategoryId, typeof Home> = {
  housing: Home,
  groceries: ShoppingBasket,
  shopping: ShoppingBag,
  dining: UtensilsCrossed,
  health: HeartPulse,
  transport: Bus,
  subscriptions: Repeat,
  transfers: ArrowLeftRight,
  income: Banknote,
};

export function CategoryIcon({ id, size = 16 }: { id: CategoryId; size?: number }) {
  const Icon = icons[id];
  return (
    <span className="dna-cat" data-cat={id} aria-hidden="true">
      <Icon size={size} strokeWidth={1.6} />
    </span>
  );
}

/** A serif amount with the cents set smaller and quieter, as on the product screens of the site. */
export function Amount({ value, sign = false, className }: { value: number; sign?: boolean; className?: string }) {
  const { whole, cents } = splitAmount(value);
  const prefix = value < 0 ? "−" : sign && value > 0 ? "+" : "";
  return (
    <span className={`dna-amount dn-num${className ? ` ${className}` : ""}`}>
      {prefix}${whole}
      <span>.{cents}</span>
    </span>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
  dark = false,
  label,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  label?: string;
}) {
  return (
    <section className={`dna-panel${dark ? " is-dark dn-on-dark" : ""}${className ? ` ${className}` : ""}`} aria-label={label}>
      {(title || action) && (
        <header className="dna-panel-head">
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/** Hatched progress bar. Over-budget fills the track and switches to the warning tone. */
export function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const ratio = max > 0 ? value / max : value > 0 ? 1.01 : 0;
  const over = ratio > 1;
  return (
    <div
      className={`dna-meter${over ? " is-over" : ""}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(Math.min(value, max))}
      aria-valuetext={`${Math.round(ratio * 100)}%`}
    >
      <span style={{ width: `${Math.min(100, ratio * 100)}%` }} />
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="dna-empty">
      <pre aria-hidden="true">{`  . : - = + = - : .\n. : = + X X X + = : .\n  . : - = + = - : .`}</pre>
      <p>{title}</p>
      <p>{text}</p>
      {action}
    </div>
  );
}
