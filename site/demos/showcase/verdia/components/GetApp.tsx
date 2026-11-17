"use client";

import { useEffect, useState, type FormEvent } from "react";
import { platforms, type Platform } from "../data/content";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isPlatform(value: string | null): value is Platform {
  return platforms.some((platform) => platform === value);
}

/** The download buttons across the page point here; each one also preselects its platform. */
export function GetApp() {
  const [platform, setPlatform] = useState<Platform>("iPhone");
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-vd-platform]") : null;
      const choice = trigger?.getAttribute("data-vd-platform") ?? null;
      if (isPlatform(choice)) {
        setPlatform(choice);
        setSentTo(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector<HTMLInputElement>('[name="email"]');
    const email = input?.value.trim() ?? "";
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      input?.focus();
      return;
    }
    setError(null);
    setSentTo(email);
  };

  return (
    <section className="vd-get" id="get" aria-labelledby="vd-get-title">
      <h2 id="vd-get-title">Your next blood test deserves a better read.</h2>
      <p>Tell us where to send the download link. Your first test is free.</p>
      {sentTo ? (
        <div className="vd-get-form vd-get-done" role="status">
          <strong>Thanks. This is a demo, so nothing was sent.</strong>
          <p>
            On a live site, the {platform} link would now be on its way to {sentTo}.
          </p>
          <button type="button" className="vd-store" onClick={() => setSentTo(null)}>
            Start again
          </button>
        </div>
      ) : (
        <form className="vd-get-form" onSubmit={onSubmit} noValidate>
          <fieldset>
            <legend className="vd-sr">Phone</legend>
            {platforms.map((entry) => (
              <label key={entry}>
                <input type="radio" name="platform" value={entry} checked={entry === platform} onChange={() => setPlatform(entry)} />
                <span>{entry}</span>
              </label>
            ))}
          </fieldset>
          <div className="vd-get-row">
            <label className="vd-sr" htmlFor="vd-get-email">
              Email address
            </label>
            <input id="vd-get-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(error)} aria-describedby={error ? "vd-get-error" : undefined} />
            <button type="submit" className="vd-store vd-store-lime">
              Send me the link
            </button>
          </div>
          {error && (
            <span id="vd-get-error" className="vd-get-error">
              {error}
            </span>
          )}
        </form>
      )}
    </section>
  );
}
