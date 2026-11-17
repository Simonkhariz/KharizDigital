import type { CSSProperties } from "react";
import "./Butterfly.css";

type ButterflyProps = {
  size: number;
  top: string;
  left: string;
  rotate?: number;
  delay?: number;
  blur?: boolean;
};

export function Butterfly({ size, top, left, rotate = 0, delay = 0, blur = false }: ButterflyProps) {
  const style: CSSProperties = {
    top,
    left,
    width: size,
    height: size,
    animationDelay: `${delay}s`,
    filter: blur ? "blur(1.5px)" : undefined,
  };
  return (
    <span className="ml-butterfly-butterfly" style={style} aria-hidden="true">
      <svg viewBox="0 0 48 48" style={{ transform: `rotate(${rotate}deg)` }} focusable="false">
        <g className="ml-butterfly-wing" style={{ animationDelay: `${delay}s` }}>
          <path d="M24 24C18 10 8 6 4 10c-3 4 2 13 12 15-7 1-10 7-7 11 4 4 12 0 15-12Z" fill="#2a1a12" />
          <path d="M22 23C17 13 10 9 7 12c-2 3 3 9 10 10ZM21 27c-5 1-8 4-6 7 2 2 6-1 7-7Z" fill="#f58a1f" />
        </g>
        <g className="ml-butterfly-wing-right" style={{ animationDelay: `${delay}s` }}>
          <path d="M24 24c6-14 16-18 20-14 3 4-2 13-12 15 7 1 10 7 7 11-4 4-12 0-15-12Z" fill="#2a1a12" />
          <path d="M26 23c5-10 12-14 15-11 2 3-3 9-10 10ZM27 27c5 1 8 4 6 7-2 2-6-1-7-7Z" fill="#ff9d2e" />
        </g>
        <path d="M24 17v18" stroke="#1d120c" strokeWidth="2.200" strokeLinecap="round" />
      </svg>
    </span>
  );
}
