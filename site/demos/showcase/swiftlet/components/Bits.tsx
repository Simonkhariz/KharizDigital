import type { ReactNode } from "react";
import type { Tag, Tone } from "../data/mailbox";

/** Initials on a tinted disc. Used wherever a person or sender is shown. */
export function Avatar({ initials, tone, size = 34 }: { initials: string; tone: Tone; size?: number }) {
  return (
    <span className={`sw-avatar sw-tone-${tone}`} style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function TagChip({ tag }: { tag: Tag }) {
  return <span className={`sw-tag sw-tag-${tag.toLowerCase()}`}>{tag}</span>;
}

export function Key({ children }: { children: ReactNode }) {
  return <kbd className="sw-key">{children}</kbd>;
}
