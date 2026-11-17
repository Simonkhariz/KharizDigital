import { studio } from "@/content/site";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

// Home section: one statement about the agency and a few labelled facts.
export function Studio({ number }: { number: string }) {
  return (
    <Section id="studio" title="Studio." number={number}>
      <Reveal
        as="p"
        y={24}
        duration={0.6}
        delay={0.1}
        className="text-[1.4rem] md:text-[2.25rem] font-medium leading-[1.3] tracking-[-0.02em] max-w-4xl text-balance"
      >
        {studio.statement}
      </Reveal>
      <Reveal delay={0.2} className="mt-12 md:mt-16">
        <dl className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">
          {studio.facts.map((fact) => (
            <div key={fact.label} className="border-r border-b border-border p-5 md:p-6">
              <dt className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground mb-3">{fact.label}</dt>
              <dd className="text-sm md:text-base leading-relaxed">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
