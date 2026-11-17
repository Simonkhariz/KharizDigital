"use client";

import { Flame } from "lucide-react";
import { useState } from "react";
import { feed } from "../data/content";
import { SectionHead } from "./Sections";

export function Network() {
  const [given, setGiven] = useState<Record<string, boolean>>({});

  return (
    <section className="sh-section" id="network" aria-label="For the network">
      <SectionHead label="for Network" title="Train alone, never on your own.">
        Follow training partners and athletes in your event. Sessions here are from fictional athletes.
      </SectionHead>
      <ul className="sh-feed">
        {feed.map((post) => {
          const on = Boolean(given[post.id]);
          return (
            <li key={post.id}>
              <header>
                <span aria-hidden="true">{post.initials}</span>
                <div>
                  <strong>{post.athlete}</strong>
                  <em>{post.discipline}</em>
                </div>
              </header>
              <h3>{post.title}</h3>
              <p>{post.detail}</p>
              <dl>
                {post.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" aria-pressed={on} onClick={() => setGiven((state) => ({ ...state, [post.id]: !on }))}>
                <Flame size={15} aria-hidden="true" />
                {on ? "Kudos given" : "Give kudos"}
                <b>{post.kudos + (on ? 1 : 0)}</b>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
