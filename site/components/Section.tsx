import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SECTION_HEADING_ROW, SectionHeading } from "./links";

// A numbered page section: "Title." on the left, "03" on the right, content below.
export function Section({
  id,
  title,
  number,
  className = "py-20 md:py-28",
  children,
}: {
  id?: string;
  title: string;
  number: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-14 container-x ${className}`}>
      <Reveal y={20} className={SECTION_HEADING_ROW}>
        <SectionHeading title={title} number={number} />
      </Reveal>
      {children}
    </section>
  );
}
