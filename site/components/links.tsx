import Link from "next/link";
import type { ReactNode } from "react";

type Direction = "right" | "down" | "out";

// Text followed by a circled arrow that fills on hover ("View work", "All 32 projects").
export function CircleArrowLink({
  href,
  children,
  direction = "right",
  nowrap = false,
  external = false,
  plain = false,
}: {
  href: string;
  children: ReactNode;
  direction?: Direction;
  nowrap?: boolean;
  /** Use a normal page load. Needed for the demo websites, which have their own page shell. */
  plain?: boolean;
  /** Opens in a new tab (used for demo and WhatsApp links). */
  external?: boolean;
}) {
  const className = `group inline-flex items-center gap-3 text-sm font-medium${nowrap ? " whitespace-nowrap" : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="inline-flex items-center justify-center w-10 h-10 border border-foreground rounded-full transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={
            direction === "down"
              ? "transition-transform duration-300 rotate-90 group-hover:translate-y-0.5"
              : direction === "out"
                ? "transition-transform duration-300 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                : "transition-transform duration-300 group-hover:translate-x-0.5"
          }
        >
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );
  // In-page anchors use a plain <a> so the browser's smooth scroll applies.
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return href.startsWith("#") || plain ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

// Link with a 1px line that grows from the left on hover. `className` sets
// the text style; `lineClassName` sets the line colour.
export function UnderlineLink({
  href,
  children,
  className = "",
  lineClassName = "h-[1px] bg-foreground",
  external = false,
  hrefLang,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  lineClassName?: string;
  external?: boolean;
  hrefLang?: string;
}) {
  const cls = `group relative ${className}`.trim();
  const line = <span className={`absolute left-0 -bottom-0.5 w-0 ${lineClassName} transition-all duration-300 group-hover:w-full`} />;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {line}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} hrefLang={hrefLang}>
      {children}
      {line}
    </Link>
  );
}

// Section title with its number on the right ("Selected work." … "01").
export function SectionHeading({ title, number }: { title: string; number: string }) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">{title}</h2>
      <span className="font-mono text-[10px] uppercase text-muted-foreground">{number}</span>
    </>
  );
}

export const SECTION_HEADING_ROW = "mb-10 md:mb-14 flex items-baseline justify-between";
