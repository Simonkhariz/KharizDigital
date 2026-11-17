"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { entries } from "../data/content";

const IMAGE = "/showcase/fieldcards/card-chair.webp";

export function JournalCard() {
  const [index, setIndex] = useState(0);
  const [placeOpen, setPlaceOpen] = useState(false);
  const entry = entries[index];
  const next = entries[(index + 1) % entries.length];

  return (
    <article className="fc-card fc-journal" aria-label={`Journal entry: ${entry.title}`}>
      <header>
        <p className="fc-tag">{entry.tag}</p>
        <button
          type="button"
          className="fc-pill fc-pill-button"
          aria-label={`${entry.month} ${entry.day}. Show the next entry, ${next.month} ${next.day}`}
          title="Next entry"
          onClick={() => {
            setIndex((value) => (value + 1) % entries.length);
            setPlaceOpen(false);
          }}
        >
          <span>{entry.month}</span>
          <b>{entry.day}</b>
        </button>
      </header>
      <div className="fc-journal-text" key={entry.id} aria-live="polite">
        <h3>{entry.title}</h3>
        <p>{entry.text}</p>
      </div>
      <div className="fc-journal-image">
        <Image
          src={IMAGE}
          alt="A single white chair on a small platform in a sunlit green meadow"
          width={1200}
          height={676}
          sizes="520px"
          loading="lazy"
          style={{ objectPosition: entry.focus }}
        />
        <button type="button" className="fc-place" aria-expanded={placeOpen} onClick={() => setPlaceOpen((value) => !value)}>
          <MapPin size={19} aria-hidden="true" />
          <span>
            {entry.place}
            <br />
            {entry.region}
            {placeOpen && <small>{entry.detail}</small>}
          </span>
        </button>
      </div>
      <ol className="fc-journal-dots" aria-label="Entries">
        {entries.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              aria-label={`Entry ${itemIndex + 1}: ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => {
                setIndex(itemIndex);
                setPlaceOpen(false);
              }}
            />
          </li>
        ))}
      </ol>
    </article>
  );
}
