import type { ReactNode } from "react";

export function Logo() {
  return (
    <span className="sb-logo">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
        <rect width="22" height="22" rx="5" fill="currentColor" />
        <rect x="7" y="7" width="8" height="8" rx="1.5" fill="#030303" />
      </svg>
      substrata
    </span>
  );
}

/** Pill label with a coloured dot, used above section headings. */
export function Chip({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "orange" }) {
  return (
    <p className="sb-chip" data-tone={tone}>
      <i aria-hidden="true" />
      {children}
    </p>
  );
}

const marks: ReactNode[] = [
  <path key="a" d="M3 3h18v18H3zM8 8v8h8V8z" fillRule="evenodd" />,
  <path key="b" d="M12 3 22 21H2zM12 9l-5 9h10z" fillRule="evenodd" />,
  <path key="c" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 0 1 0 12z" />,
  <path key="d" d="M3 3h8v8H3zM13 13h8v8h-8zM13 5h6v6h-6z" />,
  <path key="e" d="M12 2 21 7v10l-9 5-9-5V7zm0 5-4 2.3v5.4l4 2.3 4-2.3V9.300z" fillRule="evenodd" />,
  <path key="f" d="M2 6h20v3H2zM5 11h14v3H5zM8 16h8v3H8z" />,
  <path key="g" d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  <path key="h" d="M12 2c5 3 8 6 8 10a8 8 0 0 1-16 0c0-4 3-7 8-10zm0 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fillRule="evenodd" />,
  <path key="i" d="M2 20 9 4h3l7 16h-4l-4.500-11L6 20zM17 4h4v4h-4z" />,
];

/** Simple original glyphs for the invented company names in the logo row. */
export function Glyph({ index }: { index: number }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {marks[index % marks.length]}
    </svg>
  );
}
