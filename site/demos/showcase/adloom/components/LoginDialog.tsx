"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import "./LoginDialog.css";

type Props = { open: boolean; onClose: () => void };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginDialog({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleClose = () => {
    setError("");
    setDone(false);
    onClose();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (!emailPattern.test(email)) return setError("Enter a valid work email.");
    if (password.length < 8) return setError("Your password has at least 8 characters.");
    setError("");
    setDone(true);
  };

  return (
    <dialog ref={ref} className="al-login-dialog-dialog" aria-labelledby="al-login-title" onClose={handleClose}>
      <button type="button" className="al-login-dialog-close" aria-label="Close" onClick={() => ref.current?.close()}>
        <X size={18} strokeWidth={1.75} />
      </button>
      <h2 id="al-login-title" className="al-display">
        Log in to Adloom
      </h2>
      {done ? (
        <p className="al-login-dialog-done" role="status">
          That would sign you in. This is a demo, so there is no workspace behind it and nothing was sent.
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="al-login-dialog-form">
          <label>
            Work email
            <input name="email" type="email" autoComplete="email" placeholder="you@yourbrand.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" />
          </label>
          {error && (
            <p className="al-login-dialog-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="al-btn al-btn--dark al-btn--lg">
            Log in
          </button>
        </form>
      )}
    </dialog>
  );
}
