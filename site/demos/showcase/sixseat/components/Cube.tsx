import type { LucideIcon } from "lucide-react";
import { toneColors, type Tone } from "../data/content";

type CubeProps = {
  tone?: Tone;
  size?: number;
  icon?: LucideIcon;
  /** Dashed outline only: an empty seat. */
  ghost?: boolean;
  /** Soft tile under the cube, as on a game board. */
  tile?: boolean;
};

const tileTint: Record<Tone, string> = {
  blue: "#dfe4ff",
  orange: "#f6e0d0",
  pink: "#fbdbe6",
  green: "#d5eedf",
  ink: "#dddee2",
  white: "#ecedf0",
};

/** Isometric cube drawn in SVG: coloured top, white left face, grey right face. */
export function Cube({ tone = "white", size = 100, icon: Icon, ghost = false, tile = false }: CubeProps) {
  const height = tile ? 136 : 118;
  return (
    <svg className="sx-cube" width={size} height={(size * height) / 102} viewBox={`-1 -1 102 ${height}`} aria-hidden="true">
      {tile && !ghost && <path d="M50 76 100 105 50 134 0 105Z" fill={tileTint[tone]} />}
      {ghost ? (
        <g fill="none" stroke="#7b8cf5" strokeWidth="0.9" strokeDasharray="2 2.4">
          {tile && <path d="M50 76 100 105 50 134 0 105Z" stroke="#b9bdc9" />}
          <path d="M50 0 100 29v58L50 116 0 87V29Z" />
          <path d="M0 29 50 58l50-29M50 58v58" />
          <path d="M50 0v58M0 87l50-29 50 29" opacity="0.6" />
        </g>
      ) : (
        <g stroke="#1b1d22" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M0 29 50 58v58L0 87Z" fill="#fff" />
          <path d="M50 58 100 29v58L50 116Z" fill="#ececef" />
          <path d="M50 0 100 29 50 58 0 29Z" fill={toneColors[tone]} />
        </g>
      )}
      {Icon && !ghost && (
        <g transform="translate(14 55) skewY(30)" color="#1b1d22">
          <Icon width={22} height={22} strokeWidth={2} />
        </g>
      )}
    </svg>
  );
}

/** A named pointer, as in a shared canvas. */
export function CursorLabel({ label, tone, flip = false }: { label: string; tone: Tone; flip?: boolean }) {
  const color = toneColors[tone === "white" ? "ink" : tone];
  return (
    <span className="sx-cursor" data-flip={flip} style={{ color }}>
      <svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M1 1l12 4.5-5 2-2 5.500Z" fill="currentColor" stroke="#fff" strokeWidth="0.8" strokeLinejoin="round" />
      </svg>
      <span style={{ background: color }}>{label}</span>
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="sx-wordmark">
      <svg width="24" height="27" viewBox="-1 -1 102 118" aria-hidden="true">
        <path d="M0 29 50 58v58L0 87Z" fill="#fff" stroke="#17181c" strokeWidth="6" strokeLinejoin="round" />
        <path d="M50 58 100 29v58L50 116Z" fill="#3b5bfd" stroke="#17181c" strokeWidth="6" strokeLinejoin="round" />
        <path d="M50 0 100 29 50 58 0 29Z" fill="#17181c" stroke="#17181c" strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <span>Sixseat</span>
    </span>
  );
}
