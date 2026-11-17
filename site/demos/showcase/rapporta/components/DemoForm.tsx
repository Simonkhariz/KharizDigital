"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { ui } from "@/demos/showcase/rapporta/styles";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select";
  options?: string[];
  autoComplete?: string;
  placeholder?: string;
  hideLabel?: boolean;
};

type Props = {
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successBody?: string;
  resetLabel?: string;
  inline?: boolean;
  submitTone?: "dark" | "light";
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(field: FormField, value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return field.type === "select"
      ? `Choose your ${field.label.toLowerCase()}.`
      : `Enter your ${field.label.toLowerCase()}.`;
  }
  if (field.type === "email" && !emailPattern.test(trimmed)) {
    return "Enter a valid email address, such as name@company.com.";
  }
  if (field.type === "password" && trimmed.length < 8) {
    return "Use at least 8 characters.";
  }
  return null;
}

export function DemoForm({
  fields,
  submitLabel,
  successTitle,
  successBody = "This is a demo, so nothing was sent.",
  resetLabel = "Start again",
  inline = false,
  submitTone = "dark",
}: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const message = validate(field, String(data.get(field.name) ?? ""));
      if (message) next[field.name] = message;
    }
    setErrors(next);
    const firstInvalid = fields.find((field) => next[field.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className={ui.success} role="status">
        <p className={ui.successTitle}>{successTitle}</p>
        <p className={ui.successBody}>{successBody}</p>
        <button type="button" className={ui.textButton} onClick={() => setDone(false)}>
          {resetLabel}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={clsx(ui.form, inline && ui.inline)} onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const id = `${uid}-${field.name}`;
        const error = errors[field.name];
        const shared = {
          id,
          name: field.name,
          className: ui.input,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          "aria-label": field.hideLabel ? field.label : undefined,
        };
        return (
          <div key={field.name} className={ui.field}>
            {!field.hideLabel && (
              <label className={ui.label} htmlFor={id}>
                {field.label}
              </label>
            )}
            {field.type === "select" ? (
              <div className={ui.selectWrap}>
                <select {...shared} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </div>
            ) : (
              <input
                {...shared}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
              />
            )}
            {error && (
              <p className={ui.error} id={`${id}-error`}>
                {error}
              </p>
            )}
          </div>
        );
      })}
      <button type="submit" className={clsx(ui.btn, ui.md, submitTone === "dark" ? ui.dark : ui.light)}>
        {submitLabel}
      </button>
    </form>
  );
}
