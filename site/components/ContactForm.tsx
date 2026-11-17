"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact, enquiries, whatsappLink, type EnquiryKind } from "@/content/contact";
import { EASE } from "./motion";

type Status = "idle" | "error" | "opened";
type Field = "name" | "message";

const BUTTON_LABEL: Record<Status, string> = {
  idle: "Send on WhatsApp",
  error: "Check the fields",
  opened: "WhatsApp opened",
};

const EASE_CLASS = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const INPUT =
  "w-full bg-transparent border-b py-3 font-mono text-[16px] leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors duration-200 rounded-none";
const LABEL = "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground";

/**
 * Enquiry form for clients and collaborators. There is no server behind it:
 * submitting opens WhatsApp (our primary contact method) with the visitor's
 * message already written, ready for them to send. The "I want to" choice
 * sets the opening line.
 */
export function ContactForm() {
  // Why the visitor is writing: a client project (default) or a collaboration.
  const [kind, setKind] = useState<EnquiryKind>("project");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({});
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const later = (fn: () => void, ms: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const problems = { name: name.trim().length === 0, message: message.trim().length === 0 };
    setInvalid(problems);
    if (problems.name || problems.message) {
      setStatus("error");
      later(() => setStatus("idle"), 1800);
      return;
    }

    const lines = [
      enquiries[kind].message,
      "",
      `Name: ${name.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : "",
      "",
      message.trim(),
    ].filter((line, i) => line !== "" || i === 1 || i === 4);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setStatus("opened");
    later(() => setStatus("idle"), 6000);
  };

  const border = (bad?: boolean) => (bad ? "border-brand" : "border-border");
  const clear = (field: Field) => setInvalid((v) => ({ ...v, [field]: false }));
  const shake = status === "error";
  const filled = status === "opened";

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
      <fieldset className="pt-4">
        <legend className={LABEL}>I want to</legend>
        <div className="mt-3 inline-flex flex-wrap gap-2">
          {(Object.keys(enquiries) as EnquiryKind[]).map((option) => (
            <label key={option} className="cursor-pointer">
              <input type="radio" name="enquiry" value={option} checked={kind === option} onChange={() => setKind(option)} className="peer sr-only" />
              <span className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm leading-none transition-colors duration-200 hover:bg-foreground hover:text-background peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                {enquiries[option].label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className={LABEL}>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clear("name");
          }}
          placeholder="Your name"
          className={`${INPUT} ${border(invalid.name)}`}
          aria-invalid={invalid.name || undefined}
          aria-describedby={invalid.name ? "contact-name-error" : undefined}
        />
        {invalid.name ? (
          <span id="contact-name-error" className="mt-1.5 block font-mono text-[11px] text-brand">
            Please enter your name.
          </span>
        ) : null}
      </label>
      <label className="block">
        <span className={LABEL}>Company (optional)</span>
        <input
          type="text"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company or brand"
          className={`${INPUT} border-border`}
        />
      </label>
      <label className="block">
        <span className={LABEL}>Message</span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clear("message");
          }}
          placeholder={enquiries[kind].placeholder}
          className={`${INPUT} ${border(invalid.message)} resize-y min-h-[140px]`}
          aria-invalid={invalid.message || undefined}
          aria-describedby={invalid.message ? "contact-message-error" : undefined}
        />
        {invalid.message ? (
          <span id="contact-message-error" className="mt-1.5 block font-mono text-[11px] text-brand">
            Please tell us a little about your project.
          </span>
        ) : null}
      </label>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.985 }}
        animate={shake ? { x: [0, -7, 7, -5, 5, -2, 0] } : { x: 0 }}
        transition={shake ? { duration: 0.45, ease: "easeInOut" } : { type: "spring", stiffness: 500, damping: 30 }}
        className="relative overflow-hidden mt-2 inline-flex w-full items-center h-14 rounded-full border border-foreground bg-foreground text-background pl-[4.25rem] pr-6 font-medium font-mono text-[13px] uppercase tracking-[0.04em]"
        aria-live="polite"
      >
        <span
          className={`absolute inset-0 rounded-full bg-background origin-left transition-transform duration-[600ms] ${EASE_CLASS} ${filled ? "scale-x-100" : "scale-x-0"}`}
          aria-hidden
        />
        <span className={`relative z-10 inline-grid transition-colors duration-500 ${filled ? "text-foreground" : ""}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="[grid-area:1/1] whitespace-nowrap"
            >
              {BUTTON_LABEL[status]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span
          className={`absolute z-20 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full transition-[left,background-color,color] duration-[600ms] ${EASE_CLASS} ${
            filled ? "left-[calc(100%-3.125rem)] bg-foreground text-background" : "left-1.5 bg-background text-foreground"
          }`}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className={`transition-transform duration-[600ms] ${EASE_CLASS} ${filled ? "rotate-45" : ""}`}
          >
            <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.button>

      <p className="-mt-2 text-muted-foreground font-mono text-[11px] leading-relaxed">
        This opens WhatsApp with your message ready to send. Nothing is stored on this website. Prefer email?{" "}
        <a href={contact.email.href} className="underline underline-offset-4 decoration-border hover:text-foreground">
          {contact.email.display}
        </a>
      </p>
    </form>
  );
}
