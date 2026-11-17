"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { app } from "../data/content";

export function AppCard() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="fc-card fc-app" aria-label={`App: ${app.name}`} data-open={open}>
      <Image src={app.image} alt="A walker with a backpack on a green ridge above forested hills" width={1000} height={667} sizes="440px" loading="lazy" />
      <div className="fc-app-top">
        <p className="fc-pill" aria-label={`Ranked in the top ${app.rank}`}>
          <span>TOP</span>
          <b>{app.rank}</b>
        </p>
        <svg className="fc-app-mark" width="46" height="26" viewBox="0 0 46 26" aria-hidden="true">
          <path d="M2 24 15 6l7 9 6-13 16 22h-9L27 13l-5 11h-5l-3-6-4 6Z" fill="currentColor" />
        </svg>
        <h3>{app.name}</h3>
        <p>{app.blurb}</p>
      </div>

      <div className="fc-app-sheet" id="fc-app-sheet" hidden={!open}>
        <ul className="fc-app-stats">
          {app.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              {stat.label}
            </li>
          ))}
        </ul>
        <ul className="fc-app-features">
          {app.features.map((feature) => (
            <li key={feature}>
              <Check size={15} aria-hidden="true" /> {feature}
            </li>
          ))}
        </ul>
        <button type="button" className="fc-dark-button" aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
          {saved ? "Saved to your list" : "Save to my list"}
        </button>
        <p role="status">{saved ? "Saved. This is a demo, so nothing was installed." : "A concept app with demonstration figures."}</p>
      </div>

      <button type="button" className="fc-explore" aria-expanded={open} aria-controls="fc-app-sheet" onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true">{open ? <ArrowLeft size={17} /> : <ArrowRight size={17} />}</span>
        {open ? "Back to card" : "Explore app"}
      </button>
    </article>
  );
}
