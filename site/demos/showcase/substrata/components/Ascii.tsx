"use client";

import { useEffect, useRef } from "react";

type Variant = "hero" | "grid" | "towers" | "wave";

const RAMPS: Record<Variant, string> = {
  hero: " ··:+=#%@",
  grid: " ··:++##",
  towers: "  ·:1l|i",
  wave: " ··:=+*#",
};

function hash(x: number, y: number) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

/** Smooth value noise in 0..1. */
function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const top = hash(xi, yi) * (1 - u) + hash(xi + 1, yi) * u;
  const bottom = hash(xi, yi + 1) * (1 - u) + hash(xi + 1, yi + 1) * u;
  return top * (1 - v) + bottom * v;
}

function field(variant: Variant, col: number, row: number, cols: number, rows: number, t: number) {
  const x = col / cols;
  const y = row / rows;
  if (variant === "hero") {
    const blob = Math.max(0, 1 - Math.hypot((x - 0.86) * 5.2, (y - 0.3) * 3.6));
    const cloud = noise(col * 0.045 + t * 0.4, row * 0.07 - t * 0.25) * noise(col * 0.012, row * 0.02 + t * 0.1);
    const fade = Math.sin(Math.min(1, y * 1.15) * Math.PI);
    return Math.min(1, Math.min(0.6, (cloud * 1.7 + 0.1) * fade) + blob * blob * 1.2);
  }
  if (variant === "towers") {
    const height = noise(Math.floor(col / 3) * 0.9, 7) * 0.9 + 0.05;
    const inside = 1 - y < height ? 1 : 0;
    return inside * (0.25 + 0.75 * noise(col * 0.7 + t, row * 0.5)) * (col % 3 === 2 ? 0 : 1);
  }
  if (variant === "wave") {
    const line = 0.5 + 0.28 * Math.sin(x * 7 + t * 2) * Math.cos(x * 2.3 - t);
    return Math.max(0, 1 - Math.abs(y - line) * 4.5) * (0.5 + 0.5 * noise(col * 0.3, row * 0.3 + t));
  }
  const ring = Math.hypot(x - 0.5, (y - 0.5) * 0.8);
  return Math.max(0, 1 - ring * 2.3) * (0.35 + 0.65 * noise(col * 0.16 + t, row * 0.16 - t * 0.5));
}

/** A slowly drifting field of mono characters, drawn on a canvas behind content. Decorative. */
export function Ascii({ variant, className }: { variant: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cell = 12;
    const ramp = RAMPS[variant];
    let visible = true;
    let timer = 0;
    let t = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.font = `10px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const value = field(variant, col, row, cols, rows, t);
          const index = Math.min(ramp.length - 1, Math.floor(value * ramp.length));
          const char = ramp[index];
          if (char === " ") continue;
          ctx.fillStyle = `rgba(255,255,255,${(0.1 + value * 0.5).toFixed(2)})`;
          ctx.fillText(char, col * cell + cell / 2, row * cell + cell / 2);
        }
      }
    };

    const tick = () => {
      if (!visible) return;
      t += 0.035;
      draw();
    };

    draw();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    const resize = new ResizeObserver(draw);
    resize.observe(canvas);
    if (!reduce) timer = window.setInterval(tick, 140);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      resize.disconnect();
    };
  }, [variant]);

  return <canvas ref={ref} className={["sb-ascii", className ?? ""].join(" ").trim()} aria-hidden="true" />;
}
