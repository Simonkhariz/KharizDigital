import type { LogoMarkKind } from "../data/content";

/** Swiftlet mark: a swept wing inside a dark rounded square. */
export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6.5" fill="#1c1a20" />
      <path
        d="M6.2 16.9c.5-5.2 4-9 11.4-9.9-1 2-2.3 3.2-4 4.1 1.3.1 2.3 0 3.2-.3-1.7 3.3-5 5.3-10.6 6.1Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6.2 17c1.8-2.6 3.9-4.5 6.6-5.9" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ size = 24 }: { size?: number }) {
  return (
    <span className="sw-wordmark">
      <BrandMark size={size} />
      <span>SWIFTLET</span>
    </span>
  );
}

const marks: Record<LogoMarkKind, string> = {
  lines: "M3 7h11M3 11h15M3 15h8M17 6l3 1-3 1",
  loop: "M7 15a4 4 0 1 1 0-8c3 0 5 8 9 8a4 4 0 1 0 0-8c-4 0-6 8-9 8Z",
  grid: "M4 4h14v14H4zM4 11h14M11 4v14",
  peak: "M3 18h16M5 18l6-10 6 10M11 4v2M8 5l1 1.5M14 5l-1 1.5",
  ring: "M11 3a8 8 0 1 0 8 8M11 7a4 4 0 1 0 4 4M15 3v4h4",
  arc: "M4 18 9 5l4 8 4-5 2 10Z",
};

/** Small original line marks for the invented company names in the logo row. */
export function CompanyMark({ kind }: { kind: LogoMarkKind }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path d={marks[kind]} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
