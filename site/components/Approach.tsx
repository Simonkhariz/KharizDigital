import { approach } from "@/content/approach";
import { NumberedRows } from "./NumberedRows";
import { Section } from "./Section";

export function Approach({ number, className }: { number: string; className?: string }) {
  return (
    <Section id="approach" title="Our approach." number={number} className={className}>
      <NumberedRows rows={approach} />
    </Section>
  );
}
