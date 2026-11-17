import { services } from "@/content/services";
import { NumberedRows } from "./NumberedRows";
import { Section } from "./Section";

// Numbered list of services; each row links to its card on /services.
export function Services({ number, className }: { number: string; className?: string }) {
  return (
    <Section id="services" title="Services." number={number} className={className}>
      <NumberedRows rows={services.map((s) => ({ title: s.title, description: s.description, href: `/services#${s.id}` }))} />
    </Section>
  );
}
