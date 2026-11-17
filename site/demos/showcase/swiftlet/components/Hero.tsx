"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { APP_PATH } from "../data/content";
import { ProductMock, type MockView } from "./ProductMock";
import { useMockMail } from "./useMockMail";

const keys = [
  { label: "E", hint: "Archive the selected message" },
  { label: "J", hint: "Select the next message" },
  { label: "K", hint: "Select the previous message" },
  { label: "⌘K", hint: "Search" },
] as const;

type HeroKey = (typeof keys)[number]["label"];

export function Hero() {
  const mail = useMockMail();
  const [view, setView] = useState<MockView>("mail");
  const searchRef = useRef<HTMLInputElement>(null);

  const runKey = (id: HeroKey) => {
    setView("mail");
    if (id === "E") mail.archive();
    if (id === "J") mail.move(1);
    if (id === "K") mail.move(-1);
    if (id === "⌘K") searchRef.current?.focus();
  };

  return (
    <section className="sw-hero" id="mail">
      <div className="sw-wrap">
        <div className="sw-hero-top">
          <h1>
            <span>Inbox zero,</span> before lunch.
          </h1>
          <div className="sw-hero-side">
            <p>Mail, docs and agents in one fast workspace. Built for people who live on the keyboard.</p>
            <div className="sw-hero-actions">
              <Link className="sw-button" href={APP_PATH}>
                Start free
              </Link>
              <button type="button" className="sw-button sw-button-light" data-sw-open="demo">
                Book a demo
              </button>
            </div>
            <div className="sw-hero-keys">
              {keys.map((key) => (
                <button
                  key={key.label}
                  type="button"
                  className="sw-key sw-key-button"
                  aria-label={`${key.hint} (${key.label})`}
                  title={key.hint}
                  onClick={() => runKey(key.label)}
                >
                  {key.label}
                </button>
              ))}
              <span>Every action is one key</span>
            </div>
          </div>
        </div>
        <ProductMock mail={mail} view={view} onView={setView} searchRef={searchRef} />
      </div>
    </section>
  );
}
