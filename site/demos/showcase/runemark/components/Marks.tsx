import type { ReactNode } from "react";

const bitmaps = {
  burst: ["x..x..x", ".x.x.x.", "..xxx..", "xxx.xxx", "..xxx..", ".x.x.x.", "x..x..x"],
  stack: [".xxxxx.", "xxxxxxx", ".......", "xxxxxxx", ".......", "xxxxxxx", ".xxxxx."],
  check: ["xxxxxxx", "x.....x", "xx...xx", "x.x.x.x", "x..x..x", "x.....x", "xxxxxxx"],
  plus: ["..xxx..", "..x.x..", "xxx.xxx", "x.....x", "xxx.xxx", "..x.x..", "..xxx.."],
  arrow: ["...x...", "..xxx..", ".x.x.x.", "x..x..x", "...x...", "...x...", "...x..."],
  grid: ["xxx.xxx", "xxx.xxx", "xxx.xxx", ".......", "xxx.xxx", "xxx.xxx", "xxx.xxx"],
  hex: [".xxxxx.", "xx...xx", "x.x.x.x", "x..x..x", "x..x..x", "xx.x.xx", ".xxxxx."],
  bars: ["xxxx...", ".......", ".xxxx..", ".......", "..xxxx.", ".......", "...xxxx"],
  shield: ["x.x.x.x", "xxxxxxx", "xxxxxxx", "xxxxxxx", ".xxxxx.", "..xxx..", "...x..."],
  emblem: ["..xx.xx..", ".xx...xx.", "xx..x..xx", "x..xxx..x", "..xxxxx..", "x..xxx..x", "xx..x..xx", ".xx...xx.", "..xx.xx.."],
  quote: ["xx..xx.", "xx..xx.", "xx..xx.", ".x...x.", "x...x..", ".......", "......."],
} as const;

export type PixelName = keyof typeof bitmaps;

/** A small icon drawn from a bitmap of square pixels. Colour comes from `currentColor`. */
export function Pixel({ name, size = 16, className }: { name: PixelName; size?: number; className?: string }) {
  const rows = bitmaps[name];
  const n = rows.length;
  const d = rows
    .flatMap((row, y) => [...row].map((cell, x) => (cell === "x" ? `M${x} ${y}h1v1h-1z` : "")))
    .join("");
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${n} ${n}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="rm-logo">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <circle cx="10" cy="10" r="8.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8.5 5h3v3.5H15v3h-3.5V15h-3v-3.5H5v-3h3.5z" fill="currentColor" />
        <rect x="8.9" y="8.9" width="2.2" height="2.2" fill="var(--rm-logo-hole, #f3f3ef)" />
      </svg>
      Runemark
    </span>
  );
}

export function ArrowOut({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}

/** Mono label in a hairline box with an orange square, used above section headings. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <p className="rm-tag">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

/** Four small corner ticks drawn inside a positioned parent. */
export function Corners() {
  return (
    <span className="rm-corners" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function Band({
  n,
  id,
  dark,
  label,
  className,
  children,
}: {
  n: string;
  id?: string;
  dark?: boolean;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={["rm-band", dark ? "rm-band--dark" : "", className ?? ""].filter(Boolean).join(" ")}
    >
      <span className="rm-band__n" aria-hidden="true">
        {n}
      </span>
      <div className="rm-band__body">{children}</div>
    </section>
  );
}
