"use client";

import { useState } from "react";
import clsx from "clsx";
import { CloudUpload, Ellipsis } from "lucide-react";
import { dayNames, days, series, todayIndex, type SeriesId } from "../data/dashboard";
import { dashboard as styles } from "@/demos/showcase/rapporta/styles";

const seriesIds = Object.keys(series) as SeriesId[];

export function DashboardChart() {
  const [seriesId, setSeriesId] = useState<SeriesId>("resolved");
  const [selected, setSelected] = useState(todayIndex);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = series[seriesId];
  const max = Math.max(...current.values.map((value) => value ?? 0));
  const selectedValue = current.values[selected] ?? 0;

  return (
    <section className={styles.chart} aria-label="Resolution momentum">
      <div className={styles.chartHead}>
        <span className={styles.chartIcon} aria-hidden="true">
          <CloudUpload size={14} />
        </span>
        <h3>Resolution Momentum</h3>
        <div className={styles.menuWrap}>
          <button
            type="button"
            className={styles.dots}
            aria-label="Choose chart data"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Ellipsis size={14} aria-hidden="true" />
          </button>
          {menuOpen && (
            <ul className={clsx(styles.popover, styles.popoverMenu)}>
              {seriesIds.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    aria-pressed={id === seriesId}
                    onClick={() => {
                      setSeriesId(id);
                      setMenuOpen(false);
                    }}
                  >
                    {series[id].label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className={styles.chartTotal} aria-live="polite">
        <strong>{selectedValue}</strong>
        <span>
          {current.label} ({selected === todayIndex ? "today so far" : dayNames[selected]})
        </span>
      </p>

      <div className={styles.bars}>
        {days.map((day, index) => {
          const value = current.values[index];
          if (value === null) {
            return (
              <div key={day} className={styles.barSlot}>
                <span className={styles.barEmpty} aria-hidden="true" />
                <span className={styles.barDay}>{day}</span>
              </div>
            );
          }
          return (
            <div key={day} className={styles.barSlot}>
              <button
                type="button"
                className={clsx(styles.bar, index === selected && styles.barActive)}
                style={{ height: `${Math.max((value / max) * 100, 24)}%` }}
                aria-pressed={index === selected}
                aria-label={`${dayNames[index]}: ${value}`}
                onClick={() => setSelected(index)}
              >
                <span aria-hidden="true">{value}</span>
              </button>
              <span className={styles.barDay}>{day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
