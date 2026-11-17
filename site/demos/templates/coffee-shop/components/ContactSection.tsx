"use client";

import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { TextAnimationVariant } from "@/demos/lib/types";

interface ContactOption {
  icon: LucideIcon;
  label: string;
  /** A URL, `mailto:` or `tel:` link opened when the option is clicked. */
  href: string;
}

/** Round icon button with a caption, linking to one way of getting in touch. */
function ContactOptionButton({ icon: Icon, label, href }: ContactOption) {
  return (
    <button
      onClick={useButtonClick(href)}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="size-22 md:size-16 lg:size-24 xl:size-28 2xl:size-30 rounded-full primary-button flex items-center justify-center">
        <Icon className="size-4/10 text-primary-cta-text" strokeWidth={1.5} />
      </div>
      <p className="text-sm md:text-base text-foreground/60 group-hover:text-foreground transition-colors">
        {label}
      </p>
    </button>
  );
}

interface ContactSectionProps {
  tag: string;
  title: string;
  options: ContactOption[];
  textAnimation: TextAnimationVariant;
}

/** Contact card with a heading on one side and a row of round contact buttons on the other. */
export default function ContactSection({
  tag,
  title,
  options,
  textAnimation,
}: ContactSectionProps) {
  return (
    <section aria-label="Contact section" className="py-20">
      <div className="w-content-width mx-auto">
        <ScrollReveal variant="slide-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 card rounded p-6 md:p-10">
            <div className="flex flex-col gap-2 md:max-w-1/2">
              <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
                <p>{tag}</p>
              </div>
              <TextAnimation
                text={title}
                variant={textAnimation}
                gradientText
                tag="h2"
                className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-balance"
              />
            </div>
            <div className="flex items-center gap-6 md:gap-10">
              {options.map((option) => (
                <ContactOptionButton key={option.label} {...option} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
