"use client";

import { ArrowRight, Check, ChevronDown, Menu, Minus, X } from "lucide-react";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { comparison, dueToday, faqs, formatPrice, monthlyPrice, navLinks, planById, plans, recommend } from "../data/content";
import type { Billing, PlanId } from "../data/content";

type Selection = { billing: Billing; setBilling: (value: Billing) => void; plan: PlanId; setPlan: (value: PlanId) => void };

const SelectionContext = createContext<Selection | null>(null);

/** Shares the billing period and the chosen plan between the cards, the table and the sign-up form. */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [plan, setPlan] = useState<PlanId>("growth");
  const value = useMemo(() => ({ billing, setBilling, plan, setPlan }), [billing, plan]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

function useSelection(): Selection {
  const value = useContext(SelectionContext);
  if (!value) throw new Error("useSelection must be used inside SelectionProvider");
  return value;
}

export function Logo() {
  return (
    <a className="sb-logo" href="#top" aria-label="Stowbox home">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="7" fill="#111" />
        <path d="M7 10.500h12M7 15.500h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="13" cy="13" r="1.600" fill="#fff" />
      </svg>
      Stowbox
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sb-header">
      <div className="sb-header-bar">
        <Logo />
        <nav className="sb-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="sb-btn sb-btn-sm sb-header-cta" href="#signup">
          Sign up
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="sb-header-toggle"
          aria-expanded={open}
          aria-controls="sb-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>
      <nav id="sb-mobile-menu" className="sb-mobile" aria-label="Mobile" hidden={!open}>
        {[...navLinks, { label: "Sign up", href: "#signup" }].map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

const STORAGE_STEPS = [5, 10, 25, 50, 100, 250, 500, 1000, 2000];

/** Hero helper: drag to an amount of storage and get the plan that fits. */
export function StorageGuide() {
  const [index, setIndex] = useState(4);
  const { setPlan } = useSelection();
  const gigabytes = STORAGE_STEPS[index];
  const plan = recommend(gigabytes);
  const label = gigabytes >= 1000 ? `${gigabytes / 1000} TB` : `${gigabytes} GB`;

  return (
    <div className="sb-guide">
      <div className="sb-guide-inner">
        <label htmlFor="sb-storage">
          How much do you need to store?
          <output htmlFor="sb-storage">{label}</output>
        </label>
        <input
          id="sb-storage"
          type="range"
          min={0}
          max={STORAGE_STEPS.length - 1}
          step={1}
          value={index}
          aria-valuetext={label}
          onChange={(event) => setIndex(Number(event.target.value))}
        />
        <p aria-live="polite">
          <span>We suggest</span>
          <strong>{plan.name}</strong>
          <span>from {formatPrice(plan.monthly)}/month</span>
        </p>
        <a className="sb-btn" href="#pricing" onClick={() => setPlan(plan.id)}>
          See the {plan.name} plan
        </a>
      </div>
    </div>
  );
}

export function BillingToggle() {
  const { billing, setBilling } = useSelection();
  return (
    <div className="sb-toggle" role="group" aria-label="Billing period">
      <button type="button" aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>
        Per monthly
      </button>
      <button type="button" aria-pressed={billing === "yearly"} onClick={() => setBilling("yearly")}>
        Per yearly <span>50% off</span>
      </button>
    </div>
  );
}

export function PlanCards() {
  const { billing, plan: selected, setPlan } = useSelection();
  return (
    <div className="sb-plans">
      {plans.map((plan) => (
        <article key={plan.id} className={plan.featured ? "sb-plan sb-plan-featured" : "sb-plan"} data-selected={selected === plan.id}>
          <h3>{plan.name}</h3>
          <div className="sb-plan-body">
            <p className="sb-price" aria-live="polite">
              <strong>{formatPrice(monthlyPrice(plan, billing))}</strong>
              <span>/month</span>
            </p>
            <p className="sb-plan-note">{billing === "yearly" ? `Billed ${formatPrice(dueToday(plan, billing))} yearly, instead of $${plan.monthly * 12}` : "Billed monthly. Cancel any time."}</p>
            <p className="sb-plan-blurb">{plan.blurb}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a className="sb-btn" href="#signup" onClick={() => setPlan(plan.id)}>
              {plan.cta}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CompareTable() {
  const { billing, setPlan } = useSelection();
  return (
    <>
      <p className="sb-table-hint" aria-hidden="true">
        Swipe to see all plans <ArrowRight size={14} />
      </p>
      <div className="sb-table-wrap" role="region" aria-label="Plan comparison" tabIndex={0}>
        <table className="sb-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sb-sr">Feature</span>
              </th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col" className={plan.featured ? "sb-col-featured" : undefined}>
                  {plan.name}
                  <small>
                    {formatPrice(monthlyPrice(plan, billing))}/month{billing === "yearly" ? ", billed yearly" : ""}
                  </small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {plans.map((plan) => {
                  const value = row.values[plan.id];
                  return (
                    <td key={plan.id} className={plan.featured ? "sb-col-featured" : undefined}>
                      {value === true ? (
                        <>
                          <Check size={16} strokeWidth={3} aria-hidden="true" />
                          <span className="sb-sr">Included</span>
                        </>
                      ) : value === false ? (
                        <>
                          <Minus size={16} aria-hidden="true" />
                          <span className="sb-sr">Not included</span>
                        </>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              {plans.map((plan) => (
                <td key={plan.id} className={plan.featured ? "sb-col-featured" : undefined}>
                  <a className="sb-btn sb-btn-sm" href="#signup" onClick={() => setPlan(plan.id)}>
                    Choose<span className="sb-btn-plan">{"\u00a0"}{plan.name}</span>
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="sb-faq">
      {faqs.map((item, index) => (
        <div key={item.q} className="sb-faq-item">
          <h3>
            <button type="button" aria-expanded={open === index} aria-controls={`${base}-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </h3>
          <p id={`${base}-${index}`} hidden={open !== index}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

type Errors = Partial<Record<"name" | "email" | "team", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function SignupForm() {
  const { billing, setBilling, plan: planId, setPlan } = useSelection();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const plan = planById[planId];
  const sales = planId === "enterprise";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your name.";
    if (!emailPattern.test(email.trim())) next.email = "Enter a valid email address, for example name@example.com.";
    if (sales && !(Number(team) >= 1)) next.team = "Enter how many people will use Stowbox.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };

  if (done) {
    return (
      <div className="sb-form sb-form-done" role="status">
        <span aria-hidden="true">
          <Check size={22} strokeWidth={2.5} />
        </span>
        <h3>Thanks, {name.trim().split(/\s+/)[0]}.</h3>
        <p>
          {sales
            ? `Your request for the Enterprise plan (${team} people) is noted.`
            : `You chose ${plan.name}, billed ${billing}: ${formatPrice(dueToday(plan, billing))} ${billing === "yearly" ? "a year" : "a month"} after the 14-day trial.`}{" "}
          This is a demo, so nothing was sent, no account was created and no card was charged.
        </p>
        <button type="button" className="sb-btn" onClick={() => setDone(false)}>
          Change my choice
        </button>
      </div>
    );
  }

  return (
    <form className="sb-form" onSubmit={onSubmit} noValidate>
      <div className="sb-field">
        <label htmlFor="sb-name">Full name</label>
        <input id="sb-name" type="text" autoComplete="name" value={name} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "sb-e-name" : undefined} onChange={(event) => setName(event.target.value)} />
        {errors.name && (
          <p id="sb-e-name" className="sb-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="sb-field">
        <label htmlFor="sb-email">Work email</label>
        <input id="sb-email" type="email" autoComplete="email" placeholder="name@example.com" value={email} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "sb-e-email" : undefined} onChange={(event) => setEmail(event.target.value)} />
        {errors.email && (
          <p id="sb-e-email" className="sb-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div className="sb-field-row">
        <div className="sb-field">
          <label htmlFor="sb-plan">Plan</label>
          <select id="sb-plan" value={planId} onChange={(event) => setPlan(event.target.value as PlanId)}>
            {plans.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sb-field">
          <label htmlFor="sb-billing">Billing</label>
          <select id="sb-billing" value={billing} onChange={(event) => setBilling(event.target.value as Billing)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly, 50% off</option>
          </select>
        </div>
      </div>
      {sales && (
        <div className="sb-field">
          <label htmlFor="sb-team">Team size</label>
          <input id="sb-team" type="number" inputMode="numeric" min={1} value={team} aria-invalid={errors.team ? true : undefined} aria-describedby={errors.team ? "sb-e-team" : undefined} onChange={(event) => setTeam(event.target.value)} />
          {errors.team && (
            <p id="sb-e-team" className="sb-error" role="alert">
              {errors.team}
            </p>
          )}
        </div>
      )}
      <p className="sb-summary" aria-live="polite">
        <span>
          {plan.name}, billed {billing}
        </span>
        <strong>
          {formatPrice(dueToday(plan, billing))}
          <small>{billing === "yearly" ? " /year" : " /month"}</small>
        </strong>
      </p>
      <button type="submit" className="sb-btn">
        {sales ? "Contact Sales" : "Start 14-day trial"}
      </button>
    </form>
  );
}
