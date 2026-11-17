"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { flowSteps } from "../data/site";
import { page as styles } from "@/demos/showcase/rapporta/styles";

const stepClasses = [styles.s1, styles.s2, styles.s3];
const ghostClasses = [styles.g1, styles.g2, styles.g3];

export function FlowDiagram() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % flowSteps.length), 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className={styles.flow}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.flowCanvas}>
        <svg className={styles.flowLines} viewBox="0 0 534 300" aria-hidden="true">
          <path d="M166 73 V134" />
          <path d="M400 167 V227" />
          <rect x="164" y="72" width="4" height="4" transform="rotate(45 166 74)" />
          <rect x="164" y="130" width="4" height="4" transform="rotate(45 166 132)" />
          <rect x="398" y="166" width="4" height="4" transform="rotate(45 400 168)" />
          <rect x="398" y="223" width="4" height="4" transform="rotate(45 400 225)" />
        </svg>
        {flowSteps.map((step, index) => (
          <span
            key={`ghost-${step.id}`}
            aria-hidden="true"
            className={clsx(styles.ghost, ghostClasses[index], index === active && styles.ghostActive)}
          >
            {step.label}
          </span>
        ))}
        {flowSteps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={clsx(styles.step, stepClasses[index], index === active && styles.stepActive)}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            {step.label}
          </button>
        ))}
      </div>
      <p className={styles.flowDetail}>{flowSteps[active].detail}</p>
    </div>
  );
}
