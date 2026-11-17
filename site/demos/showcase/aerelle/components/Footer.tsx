"use client";

import { useState, type FormEvent } from "react";
import { footerGroups } from "../data/content";
import { Wordmark } from "./Header";
import "./Footer.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Footer() {
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    setState(emailPattern.test(email) ? "done" : "error");
  };

  return (
    <footer className="ae-footer">
      <div className="ae-wrap ae-footer__inner">
        <div className="ae-footer__brand">
          <a href="#top" aria-label="Aerelle, back to top">
            <Wordmark />
          </a>
          <p>Skincare with short formulas and nothing to hide.</p>
        </div>
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="ae-footer__news">
          <h2>Journal By Email</h2>
          {state === "done" ? (
            <p role="status">Thanks. This is a demo, so you were not subscribed to anything.</p>
          ) : (
            <form onSubmit={subscribe} noValidate>
              <label htmlFor="ae-news-email" className="ae-sr">
                Email address
              </label>
              <input id="ae-news-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={state === "error" || undefined} aria-describedby={state === "error" ? "ae-news-error" : undefined} />
              <button type="submit" className="ae-btn ae-btn--navy">
                Subscribe
              </button>
              {state === "error" && (
                <p id="ae-news-error" role="alert">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="ae-wrap ae-footer__base">
        <p>Aerelle, 2026</p>
        <p>Concept website with demonstration content.</p>
      </div>
    </footer>
  );
}
