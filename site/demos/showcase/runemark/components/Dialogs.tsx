"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Kind = "trial" | "engineer" | "demo" | "notice";
type Errors = Partial<Record<"email" | "team" | "message", string>>;

const copy: Record<Kind, { title: string; intro: string; submit: string; done: string }> = {
  trial: {
    title: "Start your free trial",
    intro: "14 days on the Team plan. No card needed.",
    submit: "Create workspace",
    done: "Thanks. This is a demo, so no workspace was created and nothing was sent.",
  },
  engineer: {
    title: "Talk to an engineer",
    intro: "Tell us what your agents do today and where they break.",
    submit: "Request a call",
    done: "Thanks. This is a demo, so nothing was sent.",
  },
  demo: {
    title: "Request a demo",
    intro: "A 30-minute walkthrough using one of your own agents.",
    submit: "Request a demo",
    done: "Thanks. This is a demo, so nothing was sent.",
  },
  notice: {
    title: "Concept website",
    intro: "Runemark is a fictional product. Legal documents, the changelog and external pages do not exist for this demonstration.",
    submit: "",
    done: "",
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isKind(value: string | null): value is Kind {
  return value !== null && value in copy;
}

/** One modal for every call to action. Any element with `data-rm-open` opens it. */
export function Dialogs() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("trial");
  const [plan, setPlan] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-rm-open]") : null;
      const next = trigger?.getAttribute("data-rm-open") ?? null;
      if (!trigger || !isKind(next)) return;
      setKind(next);
      setPlan(trigger.getAttribute("data-rm-plan"));
      setErrors({});
      setDone(false);
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const next: Errors = {};
    if (!emailPattern.test(value("email"))) next.email = "Enter a valid work email.";
    if (kind !== "trial" && value("team").length < 2) next.team = "Enter your company or team name.";
    if (kind === "engineer" && value("message").length < 10) next.message = "Add a sentence or two (10 characters or more).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDone(true);
  };

  const text = copy[kind];
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="rm-dialog"
      aria-labelledby="rm-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="rm-dialog__in">
        <button type="button" className="rm-dialog__close" onClick={close} aria-label="Close">
          <X size={16} aria-hidden="true" />
        </button>
        <p className="rm-dialog__kicker">{plan ? `${plan} plan` : "Runemark"}</p>
        <h2 id="rm-dialog-title">{text.title}</h2>
        {done ? (
          <div className="rm-dialog__done" role="status">
            <p>{text.done}</p>
            <button type="button" className="rm-btn" onClick={close}>
              Close
            </button>
          </div>
        ) : kind === "notice" ? (
          <div className="rm-dialog__done">
            <p>{text.intro}</p>
            <button type="button" className="rm-btn" onClick={close}>
              Got it
            </button>
          </div>
        ) : (
          <form key={kind} onSubmit={onSubmit} noValidate>
            <p className="rm-dialog__intro">{text.intro}</p>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="rm-err-email" />
              <span id="rm-err-email" className="rm-dialog__err">
                {errors.email}
              </span>
            </label>
            {kind !== "trial" ? (
              <label>
                Company or team
                <input name="team" type="text" autoComplete="organization" aria-invalid={Boolean(errors.team)} aria-describedby="rm-err-team" />
                <span id="rm-err-team" className="rm-dialog__err">
                  {errors.team}
                </span>
              </label>
            ) : null}
            {kind === "engineer" ? (
              <label>
                What are you running?
                <textarea name="message" rows={3} aria-invalid={Boolean(errors.message)} aria-describedby="rm-err-message" />
                <span id="rm-err-message" className="rm-dialog__err">
                  {errors.message}
                </span>
              </label>
            ) : null}
            <button type="submit" className="rm-btn">
              {text.submit}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
