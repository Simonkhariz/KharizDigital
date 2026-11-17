import Link from "next/link";
import { Reveal } from "./Reveal";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export type NumberedRow = { title: string; description: string; href?: string };

// A ruled list: number, large title, description on the right. Rows with an
// `href` underline their title and show an arrow on hover.
export function NumberedRows({ rows }: { rows: NumberedRow[] }) {
  return (
    <div>
      {rows.map((row, i) => (
        <Reveal
          key={row.title}
          duration={0.45}
          delay={0.06 * i}
          className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start border-t border-border py-7 md:py-9 last:border-b"
        >
          <span className="font-mono text-xs text-muted-foreground md:col-span-1 tabular-nums md:pt-[0.55rem]">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="md:col-span-5 md:col-start-2 text-xl md:text-[1.75rem] font-medium tracking-[-0.02em] leading-snug">
            {row.href ? (
              <>
                <Link href={row.href} className="relative inline-block">
                  {row.title}
                  <span
                    className={`absolute left-0 -bottom-1 h-px w-full bg-foreground origin-left scale-x-0 md:group-hover:scale-x-100 transition-transform duration-400 ${EASE}`}
                  />
                </Link>
                <span className="inline-block ml-3 text-muted-foreground opacity-0 -translate-x-1.5 transition-all duration-300 delay-150 md:group-hover:opacity-100 md:group-hover:translate-x-0">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="inline -mt-1" aria-hidden>
                    <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </>
            ) : (
              row.title
            )}
          </h3>
          <p className="md:col-span-5 md:col-start-8 text-sm md:text-base text-muted-foreground leading-relaxed md:pt-[0.4rem] transition-colors duration-400 md:group-hover:text-foreground">
            {row.description}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
