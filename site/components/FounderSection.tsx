import { founder } from "@/content/founder";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { CircleArrowLink } from "./links";

const MONO_LABEL = "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-[1.9]";

export function FounderSection({ number, className }: { number: string; className?: string }) {
  return (
    <Section id="founder" title={`${founder.heading}.`} number={number} className={className}>
      <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 items-start lg:items-stretch">
        <figure data-colour-on-scroll className="group md:col-span-5 lg:col-span-4 w-[280px] md:w-full border border-border flex flex-col">
          <div className="p-4 flex-1 flex flex-col justify-center">
            <Picture
              image={founder.photo}
              sizes="(max-width: 768px) 280px, 40vw"
              className="w-full h-auto block grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-data-[in-view]:grayscale-0"
            />
          </div>
          <figcaption className="border-t border-border p-4 flex justify-between gap-4">
            <span className={`${MONO_LABEL} text-foreground`}>{founder.name}</span>
            <span className={`${MONO_LABEL} text-muted-foreground text-right`}>{founder.role}</span>
          </figcaption>
        </figure>

        <div className="md:col-span-7 md:col-start-6 flex flex-col">
          <p className="text-[1.25rem] md:text-[1.6rem] font-medium leading-[1.32] tracking-[-0.02em] text-balance">{founder.bio[0]}</p>
          {founder.bio.slice(1).map((paragraph) => (
            <p key={paragraph} className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
              {paragraph}
            </p>
          ))}

          <div className="mt-8">
            <p className={`${MONO_LABEL} text-muted-foreground mb-3`}>Stack</p>
            <ul className="flex flex-wrap gap-2">
              {founder.stack.map((item) => (
                <li key={item} className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm leading-none">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-10">
            <CircleArrowLink href={founder.portfolioUrl} external direction="out">
              {founder.portfolioLabel}
            </CircleArrowLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
