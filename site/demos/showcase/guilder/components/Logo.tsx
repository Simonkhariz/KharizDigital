import type { BadgeMark } from "../data/content";

/** Guilder mark: a coin outline holding an italic G. */
export function Wordmark() {
  return (
    <span className="gd-wordmark">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
        <circle cx="15" cy="15" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="15" cy="15" r="10.8" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 1.6" />
        <text x="15" y="20.4" textAnchor="middle" fontSize="15" fontStyle="italic" fill="currentColor" fontFamily="Georgia, serif">
          g
        </text>
      </svg>
      <span>Guilder</span>
    </span>
  );
}

/** Small engraved-style seals for the compliance row. */
export function Seal({ mark, code }: { mark: BadgeMark; code: string }) {
  if (mark === "shield") {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M22 4 37 9v12c0 9-6 15-15 19C13 36 7 30 7 21V9Z" fill="rgba(211,176,106,0.12)" stroke="currentColor" strokeWidth="1.3" />
        <path d="m15.5 21.5 4.5 4.5 9-9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="20.5" fill="rgba(211,176,106,0.1)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="22" cy="22" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeDasharray={mark === "stars" ? "1.5 7.4" : "0.8 2"} strokeLinecap={mark === "stars" ? "round" : "butt"} />
      {mark === "seal" && <circle cx="22" cy="22" r="12.5" fill="none" stroke="currentColor" strokeWidth="0.7" />}
      <text x="22" y="25" textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="0.5" fill="currentColor" fontFamily="ui-monospace, Menlo, monospace">
        {code}
      </text>
    </svg>
  );
}
