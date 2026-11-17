"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  BadgePercent,
  CircleDollarSign,
  HeartPulse,
  type LucideIcon,
  Megaphone,
  Plane,
  ShoppingBag,
} from "lucide-react";
import { industries, moreIndustries, type IndustryIcon } from "../data/site";
import { page as styles, ui } from "@/demos/showcase/rapporta/styles";

const icons: Record<IndustryIcon, LucideIcon> = {
  finance: CircleDollarSign,
  utilities: BadgePercent,
  communication: Megaphone,
  retail: ShoppingBag,
  travel: Plane,
  health: HeartPulse,
};

export function Industries() {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? [...industries, ...moreIndustries] : industries;

  return (
    <section id="industries" aria-labelledby="industries-title">
      <div className={clsx(styles.band, styles.white)}>
        <div className={clsx(styles.inner, styles.industryHead)}>
          <h2 className={styles.h2} id="industries-title">
            Solution for every <span>Industry</span>
          </h2>
          <p className={styles.lede}>Every use case mapped out before you go live.</p>
          <button
            type="button"
            className={clsx(ui.btn, ui.dark, ui.md, styles.industryCta)}
            aria-expanded={expanded}
            aria-controls="industry-grid"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "View fewer" : "View more"}
          </button>
        </div>
      </div>
      <div className={clsx(styles.band, styles.white)}>
        <ul id="industry-grid" className={clsx(styles.inner, styles.industryGrid)}>
          {shown.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className={styles.industry}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <h3 className={styles.cellTitle}>{item.title}</h3>
                <p className={styles.cellBody}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={clsx(styles.band, styles.white)}>
        <div className={clsx(styles.inner, styles.spacer)} />
      </div>
    </section>
  );
}
