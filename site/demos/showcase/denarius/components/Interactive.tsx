"use client";

import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CircleArrowDown, Maximize2, MoreVertical, Pencil } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import type { FormEvent } from "react";
import {
  APP_PATH,
  ASSETS,
  BALANCE_USD,
  PHONE_BALANCE,
  currencies,
  faqs,
  months,
  platformItems,
  securityCards,
  stories,
} from "../data/content";
import type { Currency, SecurityCard } from "../data/content";
import { money, splitAmount } from "../data/format";
import { BankCard, Flag } from "./Artwork";

/* ---------- Payments: currency tiles around the card stack ---------- */

function convert(currency: Currency): string {
  return `${currency.symbol} ${money(BALANCE_USD * currency.rate, currency.digits)}`;
}

export function PaymentsStage() {
  const [code, setCode] = useState<Currency["code"]>("USD");
  const active = currencies.find((currency) => currency.code === code) ?? currencies[4];

  const tile = (currency: Currency) => (
    <li key={currency.code}>
      <button
        type="button"
        className="dn-tile"
        aria-pressed={currency.code === code}
        aria-label={`Show balance in ${currency.label}`}
        title={currency.label}
        onClick={() => setCode(currency.code)}
      >
        <Flag code={currency.code} />
      </button>
    </li>
  );

  return (
    <div className="dn-pay-stage">
      <ul className="dn-tiles dn-tiles-left" aria-label="Currencies">
        {currencies.slice(0, 3).map(tile)}
      </ul>
      <div className="dn-stack">
        <span className="dn-stack-sheet dn-stack-sheet-a" aria-hidden="true" />
        <span className="dn-stack-sheet dn-stack-sheet-b" aria-hidden="true" />
        <BankCard amount={convert(active)} label={code === "USD" ? "Balance" : `Balance · ${code}`} />
        <p className="dn-stack-note" aria-live="polite">
          {code === "USD" ? "Shown in US dollars" : `Shown in ${active.label} · 1 USD = ${money(active.rate, active.rate > 100 ? 0 : 2)} ${code}`}
        </p>
      </div>
      <ul className="dn-tiles dn-tiles-right" aria-label="More currencies">
        {currencies.slice(3).map(tile)}
      </ul>
    </div>
  );
}

/* ---------- Security: three cards with product widgets ---------- */

function ProtectionWidget() {
  return (
    <div className="dn-w dn-w-protect">
      <p className="dn-w-kicker">Protection Level</p>
      <p className="dn-w-score">
        <span className="dn-num">98</span> %
      </p>
      <p className="dn-w-tag">Excellent Protection</p>
      <span className="dn-w-lock">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M8 10.5V7.8a4 4 0 017.7-1.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <rect x="5.5" y="10.5" width="13" height="10" rx="3.2" fill="#fff" />
          <path d="M12 14.2v2.6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <div className="dn-w-vault">
        <span className="dn-w-vault-back" />
        <div className="dn-w-vault-front">
          <div>
            <p>Savings Protected</p>
            <p className="dn-num">$250,000</p>
          </div>
          <span>100% secure</span>
          <i />
        </div>
      </div>
    </div>
  );
}

function MonitoringWidget() {
  return (
    <div className="dn-w dn-w-monitor">
      <svg className="dn-w-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(120,120,120,0.62)" strokeWidth="6" />
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#c3b5a9"
          strokeWidth="6"
          strokeDasharray="413 190.2"
          transform="rotate(150 100 100)"
        />
      </svg>
      <div className="dn-w-ring-copy">
        <p>Portfolio Net Value</p>
        <p className="dn-num">$384,720.50</p>
        <span>
          <i />
          +2.4% today
        </span>
      </div>
    </div>
  );
}

function TransactionWidget() {
  return (
    <div className="dn-w dn-w-secure">
      <svg className="dn-w-orbits" viewBox="0 0 410 332" aria-hidden="true" focusable="false">
        <circle cx="210" cy="198" r="92" fill="none" stroke="rgba(255,255,255,0.22)" />
        <circle cx="216" cy="190" r="150" fill="none" stroke="rgba(255,255,255,0.12)" />
        <path d="M24 168c60 6 110 12 148 12M290 176c44-4 76-10 100-18" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" strokeDasharray="6 5" />
        <ellipse cx="61" cy="176" rx="10" ry="12" fill="#101614" />
        <circle cx="300" cy="259" r="12" fill="rgba(20,28,24,0.5)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" />
      </svg>
      <span className="dn-w-coin">$</span>
      <span className="dn-w-mini dn-w-mini-a">
        <i />
        <b />
      </span>
      <span className="dn-w-mini dn-w-mini-b">
        <i />
        <b />
        <b />
      </span>
      <span className="dn-w-shield">
        <Check size={30} strokeWidth={2.2} aria-hidden="true" />
      </span>
    </div>
  );
}

function SecurityItem({ card }: { card: SecurityCard }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <li className="dn-sec-card">
      <div className="dn-sec-media">
        <img src={`${ASSETS}/${card.image}`} alt={card.imageAlt} width={960} height={778} loading="lazy" />
        {card.id === "protection" && <ProtectionWidget />}
        {card.id === "monitoring" && <MonitoringWidget />}
        {card.id === "transactions" && <TransactionWidget />}
      </div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <ul id={panelId} className="dn-sec-points" hidden={!open}>
        {card.points.map((point) => (
          <li key={point}>
            <Check size={14} strokeWidth={2} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
      <button type="button" className="dn-btn dn-btn-black" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
        {open ? "Show less" : "Learn more"}
        <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" className={open ? "is-turned" : undefined} />
      </button>
    </li>
  );
}

export function SecurityCards() {
  return (
    <ul className="dn-sec-grid">
      {securityCards.map((card) => (
        <SecurityItem key={card.id} card={card} />
      ))}
    </ul>
  );
}

/* ---------- Platform: numbered list driving the statistics phone ---------- */

const periods = ["Month", "Quarter", "Year"] as const;
const periodFactor = { Month: 1, Quarter: 3, Year: 12 } as const;

function StatusIcons() {
  return (
    <span className="dn-phone-status-icons" aria-hidden="true">
      <svg viewBox="0 0 18 12" width="18" height="12">
        <rect x="0" y="8" width="3" height="4" rx="0.8" fill="#fff" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" fill="#fff" />
        <rect x="10" y="3" width="3" height="9" rx="0.8" fill="#fff" />
        <rect x="15" y="0" width="3" height="12" rx="0.8" fill="#fff" />
      </svg>
      <svg viewBox="0 0 17 12" width="17" height="12">
        <path d="M8.5 2.2c2.6 0 5 1 6.8 2.7l1.1-1.2A11.3 11.3 0 008.500.5C5.500.5 2.7 1.700.6 3.7l1.1 1.2A9.7 9.7 0 018.5 2.2z" fill="#fff" />
        <path d="M8.5 6c1.5 0 2.900.6 4 1.6l1.1-1.2a7.5 7.5 0 00-10.2 0l1.1 1.2c1.1-1 2.5-1.6 4-1.6z" fill="#fff" />
        <path d="M8.5 9.7c.7 0 1.300.3 1.800.7L8.5 12 6.7 10.4c.5-.4 1.1-.7 1.8-.7z" fill="#fff" />
      </svg>
      <span className="dn-phone-battery">70</span>
    </span>
  );
}

export function PlatformExplorer() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [bar, setBar] = useState(4);
  const [period, setPeriod] = useState<(typeof periods)[number]>("Month");
  const [menu, setMenu] = useState(false);
  const item = platformItems[active];
  const values = item.screen.values;
  const max = Math.max(...values);
  const factor = periodFactor[period];
  const sum = values.reduce((running, value) => running + value, 0);
  const total = splitAmount(sum * factor);
  const balance = splitAmount(PHONE_BALANCE);

  const choose = (index: number) => {
    setActive(index);
    setOpen((current) => (current === index ? null : index));
  };

  return (
    <div className="dn-plat">
      <div className="dn-plat-copy">
        <h3>
          Smarter Money
          <br />
          Management, Made for You
        </h3>
        <p className="dn-plat-lede">
          At Denarius, we bring intuitive financial tools and smart insights together to help you manage your money with ease, giving you greater clarity,
          control, and confidence in every financial decision.
        </p>
        <ol className="dn-plat-list">
          {platformItems.map((entry, index) => (
            <li key={entry.title} className={index === active ? "is-active" : undefined}>
              <button type="button" aria-expanded={open === index} aria-controls={`dn-plat-panel-${index}`} onClick={() => choose(index)}>
                <span>0{index + 1}</span>
                {entry.title}
              </button>
              <div id={`dn-plat-panel-${index}`} className="dn-plat-panel" hidden={open !== index}>
                <p>{entry.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link className="dn-btn dn-btn-dark" href={APP_PATH}>
          Get started
          <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </Link>
      </div>

      <div className="dn-plat-visual">
        <img src={`${ASSETS}/scene-colonnade.webp`} alt="" width={1200} height={1163} loading="lazy" />
        <div className="dn-phone" role="group" aria-label="Statistics screen preview">
          <div className="dn-phone-status">
            <span>9:41</span>
            <StatusIcons />
          </div>
          <div className="dn-phone-bar">
            <span className="dn-phone-round">
              <ChevronLeft size={18} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <p>Statistics</p>
            <span className="dn-phone-round is-dim">
              <MoreVertical size={20} strokeWidth={2.4} aria-hidden="true" />
            </span>
          </div>
          <div className="dn-phone-balance">
            <div>
              <p>Current Balance</p>
              <p className="dn-phone-amount dn-num">
                ${balance.whole}
                <span>.{balance.cents}</span>
              </p>
            </div>
            <div className="dn-phone-period">
              <button type="button" aria-haspopup="listbox" aria-expanded={menu} onClick={() => setMenu((value) => !value)}>
                {period}
                <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
              </button>
              {menu && (
                <ul role="listbox" aria-label="Period">
                  {periods.map((option) => (
                    <li key={option} role="option" aria-selected={option === period}>
                      <button
                        type="button"
                        onClick={() => {
                          setPeriod(option);
                          setMenu(false);
                        }}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="dn-phone-row">
            <p>{item.screen.label === "Spending" ? "Spendings" : item.screen.label}</p>
            <span>See all</span>
          </div>
          <div className="dn-phone-chart">
            <div className="dn-phone-chart-head">
              <div>
                <p>{item.screen.label}</p>
                <p className="dn-phone-total dn-num" aria-live="polite">
                  ${total.whole}
                  <span>.{total.cents}</span>
                </p>
                <p className="dn-phone-delta">
                  <CircleArrowDown size={12} strokeWidth={2} aria-hidden="true" />
                  {item.screen.delta}
                </p>
              </div>
              <span className="dn-phone-tools" aria-hidden="true">
                <Maximize2 size={12} strokeWidth={1.8} />
                <Pencil size={12} strokeWidth={1.8} />
              </span>
            </div>
            <div className="dn-bars" role="group" aria-label={`${item.screen.label} by month`}>
              {values.map((value, index) => (
                <button
                  key={months[index]}
                  type="button"
                  className={`dn-bar${index === bar ? " is-active" : ""}`}
                  aria-pressed={index === bar}
                  aria-label={`${months[index]}: $${money(value * factor, 0)}`}
                  onClick={() => setBar(index)}
                  onMouseEnter={() => setBar(index)}
                  onFocus={() => setBar(index)}
                >
                  <span className="dn-bar-track">
                    <span className="dn-bar-fill" style={{ height: `${Math.max(8, (value / max) * 100)}%` }}>
                      {index === bar && (
                        <span className="dn-bar-tip">
                          {months[index]} ${money(value * factor, 0)}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="dn-bar-label">{months[index]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Stories ---------- */

export function StoriesSlider() {
  const [index, setIndex] = useState(0);
  const story = stories[index];
  const go = (step: number) => setIndex((current) => (current + step + stories.length) % stories.length);
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="dn-story" role="group" aria-roledescription="carousel" aria-label="Member stories">
      <div className="dn-story-main">
        <div className="dn-story-trust">
          <span className="dn-story-faces" aria-hidden="true">
            {stories.slice(0, 3).map((entry) => (
              <img key={entry.bust} src={`${ASSETS}/${entry.bust}`} alt="" width={480} height={480} loading="lazy" />
            ))}
          </span>
          <p>
            Trusted by ambitious people
            <br />
            building what comes next
          </p>
        </div>
        <blockquote key={index} className="dn-story-quote" aria-live="polite">
          <p>
            <span aria-hidden="true">“ </span>
            {story.quote}
            <span aria-hidden="true"> ”</span>
          </p>
        </blockquote>
        <div className="dn-story-nav">
          <p className="dn-story-count" aria-label={`Story ${index + 1} of ${stories.length}`}>
            {pad(index + 1)}/<span>{pad(stories.length)}</span>
          </p>
          <div>
            <button type="button" aria-label="Previous story" onClick={() => go(-1)}>
              <ArrowLeft size={24} strokeWidth={1.4} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next story" onClick={() => go(1)}>
              <ArrowRight size={24} strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <figure key={`fig-${index}`} className="dn-story-figure">
        <div className="dn-story-portrait">
          <img src={`${ASSETS}/${story.bust}`} alt={story.bustAlt} width={480} height={480} loading="lazy" />
        </div>
        <figcaption>
          <strong>{story.role}</strong>
          <span>{story.since}</span>
        </figcaption>
      </figure>
    </div>
  );
}

/* ---------- Questions ---------- */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ol className="dn-faq-list">
      {faqs.map((item, index) => (
        <li key={item.q} className={open === index ? "is-open" : undefined}>
          <h3>
            <button type="button" aria-expanded={open === index} aria-controls={`dn-faq-${index}`} onClick={() => setOpen(open === index ? null : index)}>
              <span>0{index + 1}</span>
              {item.q}
              <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </h3>
          <div id={`dn-faq-${index}`} className="dn-faq-panel" hidden={open !== index}>
            <p>{item.a}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Sign-up ---------- */

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const errorId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Enter your email address to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("That address does not look complete. Check it and try again.");
      return;
    }
    setError("");
    setDone(true);
  };

  if (done) {
    return (
      <div className="dn-signup-done" role="status">
        <span>
          <Check size={18} strokeWidth={2} aria-hidden="true" />
        </span>
        <div>
          <p>You are on the list.</p>
          <p>
            This is a demonstration, so nothing was sent or stored. The sample profile is ready whenever you are.{" "}
            <Link href={APP_PATH}>Open the web app</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="dn-signup-form" noValidate onSubmit={submit}>
      <div className="dn-signup-row">
        <label className="dn-sr" htmlFor="dn-signup-email">
          Email address
        </label>
        <input
          id="dn-signup-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
        />
        <button type="submit" className="dn-btn dn-btn-dark">
          Create account
          <ChevronRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
      {error ? (
        <p className="dn-signup-error" id={errorId} role="alert">
          {error}
        </p>
      ) : (
        <p className="dn-signup-hint">Free to start. No card needed for the demonstration.</p>
      )}
    </form>
  );
}
