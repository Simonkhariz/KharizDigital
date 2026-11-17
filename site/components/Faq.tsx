"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/content/faqs";
import { EASE } from "./motion";

// Accordion: one question open at a time. Each question is a real button, so
// it works with the keyboard and announces its open/closed state.
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={faq.question} className="border-t border-border last:border-b">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group w-full grid grid-cols-12 gap-2 md:gap-6 items-start text-left py-6 md:py-7"
              >
                <span className="hidden md:block col-span-1 font-mono text-xs text-muted-foreground tabular-nums pt-[0.35rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 md:col-span-9 text-lg md:text-[1.375rem] font-medium tracking-[-0.02em] leading-snug">
                  {faq.question}
                </span>
                <span className="col-span-2 flex justify-end pt-1">
                  <span
                    className={`relative inline-flex items-center justify-center w-8 h-8 border rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-foreground text-background border-foreground" : "border-foreground/30 group-hover:border-foreground"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute inset-0 m-auto w-3 h-[1px] bg-current" />
                    <span
                      className={`absolute inset-0 m-auto w-3 h-[1px] bg-current transition-transform duration-300 ease-out origin-center ${
                        isOpen ? "rotate-0" : "rotate-90"
                      }`}
                    />
                  </span>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-2 md:gap-6 pb-7 md:pb-8">
                    <p className="col-span-12 md:col-span-7 md:col-start-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
