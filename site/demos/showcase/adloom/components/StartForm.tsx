"use client";

import { useState, type FormEvent } from "react";
import { startForm } from "../data/content";
import "./StartForm.css";

type Errors = Partial<Record<"name" | "email" | "store" | "volume", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function StartForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const found: Errors = {};
    if (value("name").length < 2) found.name = "Tell us your name.";
    if (!emailPattern.test(value("email"))) found.email = "Enter a valid work email.";
    if (value("store").length < 2) found.store = "Add your brand or store name.";
    if (!value("volume")) found.volume = "Pick the closest range.";
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSentTo(value("name"));
      return;
    }
    const first = Object.keys(found)[0];
    event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const field = (name: keyof Errors) => ({
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `al-start-${name}-error` : undefined,
  });

  const errorText = (name: keyof Errors) =>
    errors[name] && (
      <span id={`al-start-${name}-error`} className="al-start-form-error">
        {errors[name]}
      </span>
    );

  return (
    <section id="start" className="al-section" aria-labelledby="al-start-title">
      <div className="al-container">
        <div className="al-start-form-stage">
          <div className="al-start-form-glow" aria-hidden="true" />
          <div className="al-start-form-copy">
            <h2 id="al-start-title" className="al-display">
              {startForm.title}
            </h2>
            <p>{startForm.body}</p>
          </div>
          <div className="al-start-form-card">
            {sentTo ? (
              <div className="al-start-form-done" role="status">
                <h3 className="al-display">Thanks, {sentTo}.</h3>
                <p>This is a demo, so nothing was sent and no workspace was created.</p>
                <button type="button" className="al-btn al-btn--light" onClick={() => setSentTo("")}>
                  Fill it in again
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="al-start-form-form">
                <label>
                  Name
                  <input type="text" autoComplete="name" {...field("name")} />
                  {errorText("name")}
                </label>
                <label>
                  Work email
                  <input type="email" autoComplete="email" {...field("email")} />
                  {errorText("email")}
                </label>
                <label>
                  Brand or store
                  <input type="text" autoComplete="organization" {...field("store")} />
                  {errorText("store")}
                </label>
                <label>
                  Ads you run today
                  <select defaultValue="" {...field("volume")}>
                    <option value="" disabled>
                      Choose a range
                    </option>
                    {startForm.volumes.map((volume) => (
                      <option key={volume}>{volume}</option>
                    ))}
                  </select>
                  {errorText("volume")}
                </label>
                <button type="submit" className="al-btn al-btn--dark al-btn--lg">
                  Request a workspace
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
