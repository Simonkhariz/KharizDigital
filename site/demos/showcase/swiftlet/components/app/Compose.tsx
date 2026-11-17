"use client";

import { Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { account } from "../../data/mailbox";
import { Key } from "../Bits";
import { validateDraft, type Draft, type Mailbox } from "./useMailbox";

type Field = "to" | "subject" | "body";

export function Compose({ mail, draft }: { mail: Mailbox; draft: Draft }) {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const first = draft.replyTo ? "body" : "to";
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    // Focus once when the panel opens; later edits must not move the caret.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const next = validateDraft(draft);
    setErrors(next);
    const firstInvalid = (["to", "subject", "body"] as const).find((name) => next[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    mail.send();
  };

  const change = (name: Field, value: string) => {
    mail.setDraft({ ...draft, [name]: value });
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const describe = (name: Field) => (errors[name] ? `sw-app-error-${name}` : undefined);

  return (
    <section className="sw-app-composer" role="dialog" aria-label={draft.replyTo ? "Reply" : "New message"}>
      <header>
        <strong>{draft.replyTo ? "Reply" : "New message"}</strong>
        <span>From {account.email}</span>
        <button type="button" aria-label="Discard and close (Esc)" title="Discard and close (Esc)" onClick={() => mail.setDraft(null)}>
          <X size={16} aria-hidden="true" />
        </button>
      </header>
      <form
        ref={formRef}
        noValidate
        onSubmit={submit}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) submit();
        }}
      >
        <label>
          <span>To</span>
          <input
            name="to"
            type="text"
            inputMode="email"
            autoComplete="off"
            placeholder="name@company.example"
            value={draft.to}
            aria-invalid={Boolean(errors.to)}
            aria-describedby={describe("to")}
            onChange={(event) => change("to", event.target.value)}
          />
        </label>
        {errors.to && (
          <p className="sw-field-error" id="sw-app-error-to">
            {errors.to}
          </p>
        )}
        <label>
          <span>Subject</span>
          <input
            name="subject"
            type="text"
            autoComplete="off"
            value={draft.subject}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={describe("subject")}
            onChange={(event) => change("subject", event.target.value)}
          />
        </label>
        {errors.subject && (
          <p className="sw-field-error" id="sw-app-error-subject">
            {errors.subject}
          </p>
        )}
        <textarea
          name="body"
          aria-label="Message"
          placeholder="Write your message"
          value={draft.body}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={describe("body")}
          onChange={(event) => change("body", event.target.value)}
        />
        {errors.body && (
          <p className="sw-field-error" id="sw-app-error-body">
            {errors.body}
          </p>
        )}
        <footer>
          <button type="submit" className="sw-button">
            Send <Send size={14} aria-hidden="true" />
          </button>
          <span className="sw-app-composer-hint">
            <Key>⌘</Key>
            <Key>Enter</Key>
          </span>
          <button type="button" className="sw-chip-button" onClick={() => mail.setDraft(null)}>
            Discard
          </button>
        </footer>
      </form>
    </section>
  );
}
