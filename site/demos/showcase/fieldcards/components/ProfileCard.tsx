"use client";

import { Check, Plus, RotateCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "../data/content";

type Status = "connecting" | "connected";

export function ProfileCard() {
  const [status, setStatus] = useState<Status>("connecting");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (status !== "connecting") return;
    const timer = window.setTimeout(() => setStatus("connected"), 3200);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <article className="fc-card fc-profile" aria-label={`Profile: ${profile.name}`}>
      <div className="fc-profile-panel">
        <h3>{profile.name}</h3>
        <p className="fc-status" data-status={status} role="status">
          {status === "connecting" ? <i className="fc-spinner" aria-hidden="true" /> : <i className="fc-dot" aria-hidden="true" />}
          {status === "connecting" ? "Connecting" : "Connected"}
          {status === "connected" && (
            <button type="button" aria-label="Connect again" title="Connect again" onClick={() => setStatus("connecting")}>
              <RotateCw size={13} aria-hidden="true" />
            </button>
          )}
        </p>
        <Image src={profile.portrait} alt={`Portrait of ${profile.name}, smiling, in a yellow jacket`} width={900} height={900} sizes="420px" priority />
      </div>
      <footer>
        <span className="fc-avatar">
          <Image src={profile.portrait} alt="" width={900} height={900} sizes="48px" />
          <i data-on={status === "connected"} aria-hidden="true" />
        </span>
        <p>
          <strong>{profile.handle}</strong>
          <span>{added ? `In ${profile.team}` : profile.seen}</span>
        </p>
        <button type="button" className="fc-dark-button" aria-pressed={added} onClick={() => setAdded((value) => !value)}>
          {added ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
          {added ? "Member added" : "Add member"}
        </button>
      </footer>
      <p className="fc-sr" role="status">
        {added ? `${profile.name} was added to ${profile.team}. This is a demo, so nothing was saved.` : ""}
      </p>
    </article>
  );
}
