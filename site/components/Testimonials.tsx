import { testimonials } from "@/content/testimonials";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

const IS_DEV = process.env.NODE_ENV !== "production";

/**
 * Which testimonials to show. Published ones always show. While developing,
 * unpublished placeholders are shown too, clearly marked, so the layout can
 * be seen; they never appear in a production build.
 */
export const visibleTestimonials = testimonials.filter((t) => t.published || IS_DEV);

export function Testimonials({ number }: { number: string }) {
  if (visibleTestimonials.length === 0) return null;
  return (
    <Section id="reviews" title="Reviews." number={number}>
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
        {visibleTestimonials.map((item, i) => (
          <Reveal key={i} delay={0.06 * i} className="border-r border-b border-border p-6 md:p-8 flex flex-col gap-8">
            {!item.published ? (
              <p className="self-start font-mono text-[10px] uppercase tracking-[0.04em] text-brand border border-brand/40 px-2 py-1">
                Placeholder · not shown on the live site
              </p>
            ) : null}
            <blockquote className="text-lg md:text-[1.375rem] font-medium leading-[1.4] tracking-[-0.01em] text-balance">“{item.text}”</blockquote>
            <footer className="mt-auto flex items-center gap-3">
              {item.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.avatar} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 rounded-full object-cover grayscale" />
              ) : null}
              <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-[1.9]">
                {item.name}
                <span className="text-muted-foreground"> · {item.company}</span>
              </p>
            </footer>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
