"use client";

import {
  AudioLines,
  Check,
  Cloud,
  Code,
  Database,
  FileText,
  Image as ImageIcon,
  Mail,
  MessageSquareText,
  Network,
  Plus,
  Table2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { faqs, nightLog } from "../data/content";
import type { IconKey, Tile } from "../data/content";

const icons: Record<IconKey, LucideIcon> = {
  cloud: Cloud,
  code: Code,
  database: Database,
  mail: Mail,
  chat: MessageSquareText,
  flow: Network,
  text: FileText,
  image: ImageIcon,
  audio: AudioLines,
  table: Table2,
};

/** A strip of icon tiles that work as tabs: choosing one shows what Nocturn does there. */
export function TileStrip({ name, tiles, children }: { name: string; tiles: Tile[]; children?: ReactNode }) {
  const [active, setActive] = useState(tiles[0].id);
  const current = tiles.find((tile) => tile.id === active) ?? tiles[0];

  return (
    <div className="nc-tiles">
      <div className="nc-strip" data-art={children ? "true" : undefined}>
        {children}
        <div className="nc-strip-row" role="tablist" aria-label={name}>
          {tiles.map((tile, index) => {
            const Icon = icons[tile.icon];
            return (
              <button
                key={tile.id}
                type="button"
                role="tab"
                id={`nc-${name}-${tile.id}`}
                aria-selected={tile.id === active}
                aria-controls={`nc-${name}-panel`}
                aria-label={tile.label}
                title={tile.label}
                tabIndex={tile.id === active ? 0 : -1}
                onClick={() => setActive(tile.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  const next = tiles[(index + (event.key === "ArrowRight" ? 1 : tiles.length - 1)) % tiles.length];
                  setActive(next.id);
                  document.getElementById(`nc-${name}-${next.id}`)?.focus();
                }}
              >
                <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
      <p className="nc-tile-note" id={`nc-${name}-panel`} role="tabpanel" aria-labelledby={`nc-${name}-${current.id}`}>
        <strong>{current.label}.</strong> {current.text}
      </p>
    </div>
  );
}

const kinds = ["All", "Email", "Docs", "Code", "Data"] as const;

export function NightLog() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const entries = nightLog.filter((entry) => kind === "All" || entry.kind === kind);

  return (
    <div className="nc-log">
      <div className="nc-log-filters" role="group" aria-label="Filter the log">
        {kinds.map((item) => (
          <button key={item} type="button" aria-pressed={kind === item} onClick={() => setKind(item)}>
            {item}
          </button>
        ))}
      </div>
      <ol aria-live="polite">
        {entries.map((entry) => (
          <li key={entry.time}>
            <time>{entry.time}</time>
            <span>{entry.kind}</span>
            <p>{entry.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="nc-faq-list">
      {faqs.map((item, index) => (
        <li key={item.question}>
          <h3>
            <button type="button" aria-expanded={open === index} aria-controls={`nc-faq-${index}`} onClick={() => setOpen(open === index ? null : index)}>
              {item.question}
              <Plus size={20} aria-hidden="true" />
            </button>
          </h3>
          <p id={`nc-faq-${index}`} hidden={open !== index}>
            {item.answer}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof values>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Partial<typeof values> = {};
    if (values.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid work email.";
    if (values.message.trim().length < 10) next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  if (sent) {
    return (
      <div className="nc-form nc-form-done" role="status">
        <Check size={22} aria-hidden="true" />
        <h3>Thanks, {values.name.trim().split(" ")[0]}.</h3>
        <p>This is a demo, so nothing was sent and no one will be in touch.</p>
        <button
          type="button"
          className="nc-pill"
          onClick={() => {
            setSent(false);
            setValues({ name: "", email: "", message: "" });
          }}
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form className="nc-form" onSubmit={submit} noValidate>
      <label>
        <span>Name</span>
        <input
          type="text"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "nc-err-name" : undefined}
          onChange={(event) => setValues({ ...values, name: event.target.value })}
        />
        {errors.name && <em id="nc-err-name">{errors.name}</em>}
      </label>
      <label>
        <span>Work email</span>
        <input
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "nc-err-email" : undefined}
          onChange={(event) => setValues({ ...values, email: event.target.value })}
        />
        {errors.email && <em id="nc-err-email">{errors.email}</em>}
      </label>
      <label>
        <span>What would you hand over first?</span>
        <textarea
          rows={3}
          value={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "nc-err-message" : undefined}
          onChange={(event) => setValues({ ...values, message: event.target.value })}
        />
        {errors.message && <em id="nc-err-message">{errors.message}</em>}
      </label>
      <button type="submit" className="nc-pill">
        Book a Demo
      </button>
    </form>
  );
}
