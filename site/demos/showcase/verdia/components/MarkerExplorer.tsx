"use client";

import { useState, type CSSProperties } from "react";
import { markers } from "../data/content";

const percent = (value: number, [min, max]: [number, number]) => Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

export function MarkerExplorer() {
  const [activeId, setActiveId] = useState(markers[0].id);
  const marker = markers.find((entry) => entry.id === activeId) ?? markers[0];
  const bandStart = percent(marker.healthy[0], marker.scale);
  const bandEnd = percent(marker.healthy[1], marker.scale);

  return (
    <section className="vd-section" id="markers" aria-labelledby="vd-markers-title">
      <h2 id="vd-markers-title" className="vd-title">
        Every marker, <span>explained like a friend would</span>
      </h2>
      <div className="vd-markers">
        <div className="vd-markers-list" role="group" aria-label="Choose a marker">
          {markers.map((entry) => (
            <button key={entry.id} type="button" aria-pressed={entry.id === activeId} data-status={entry.status} onClick={() => setActiveId(entry.id)}>
              <span>
                <strong>{entry.name}</strong>
                <em>{entry.category}</em>
              </span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="vd-markers-detail" aria-live="polite" key={marker.id}>
          <header>
            <div>
              <h3>{marker.name}</h3>
              <span data-status={marker.status}>{marker.status}</span>
            </div>
            <p>
              <strong>{marker.value}</strong> {marker.unit}
            </p>
          </header>
          <div
            className="vd-range"
            style={{ "--vd-from": `${bandStart}%`, "--vd-to": `${bandEnd}%`, "--vd-at": `${percent(marker.value, marker.scale)}%` } as CSSProperties}
            role="img"
            aria-label={`${marker.value} ${marker.unit}. Usual range ${marker.healthy[0]} to ${marker.healthy[1]} ${marker.unit}.`}
          >
            <i />
            <b />
          </div>
          <div className="vd-range-scale" aria-hidden="true">
            <span>{marker.scale[0]}</span>
            <span>
              Usual range {marker.healthy[0]} to {marker.healthy[1]} {marker.unit}
            </span>
            <span>{marker.scale[1]}</span>
          </div>
          <h4>What it means</h4>
          <p>{marker.plain}</p>
          <h4>What you can do</h4>
          <p>{marker.action}</p>
          <small>Sample result for illustration. Not medical advice.</small>
        </div>
      </div>
    </section>
  );
}
