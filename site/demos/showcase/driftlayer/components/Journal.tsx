"use client";

import { useState } from "react";
import { journal } from "../data/content";
import "./Journal.css";

export function Journal() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="journal" className="dl-section" aria-labelledby="dl-journal-title">
      <div className="dl-wrap">
        <div className="dl-split-head">
          <h2 id="dl-journal-title" className="dl-h2">
            Notes from
            <br />
            <em>above the stack.</em>
          </h2>
          <p>How we think about ambient software, and what we are learning as we build it.</p>
        </div>
        <ul className="dl-journal__grid">
          {journal.map((post) => {
            const open = openId === post.id;
            return (
              <li key={post.id}>
                <div className="dl-journal__art">
                  <img src={`/showcase/driftlayer/${post.image}.webp`} alt="" width={post.width} height={post.height} loading="lazy" decoding="async" style={{ objectPosition: post.focus }} />
                  <span>{post.tag}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="dl-journal__meta">{post.minutes} minute read</p>
                <p id={`dl-j-sum-${post.id}`} className="dl-journal__summary" hidden={!open}>
                  {post.summary}
                </p>
                <button type="button" className="dl-btn dl-btn--soft" aria-expanded={open} aria-controls={`dl-j-sum-${post.id}`} onClick={() => setOpenId(open ? null : post.id)}>
                  {open ? "Hide summary" : "Read summary"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
