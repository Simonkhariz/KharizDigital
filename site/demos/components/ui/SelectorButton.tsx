"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/demos/lib/utils";

interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorButtonProps {
  options: SelectorOption[];
  activeValue: string;
  onValueChange: (value: string) => void;
  className?: string;
}

/** A segmented control whose highlight slides to the active option. */
export default function SelectorButton({
  options,
  activeValue,
  onValueChange,
  className,
}: SelectorButtonProps) {
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;
    if (!container || !highlight) {
      return;
    }

    // Offsets are relative to the (possibly scrolled) bar, so the highlight stays on its option.
    const syncHighlight = () => {
      const activeButton = container.querySelector<HTMLElement>(`[data-value="${activeValue}"]`);
      if (activeButton) {
        highlight.style.width = `${activeButton.offsetWidth}px`;
        highlight.style.transform = `translateX(${activeButton.offsetLeft}px)`;
      }
    };

    syncHighlight();
    const resizeObserver = new ResizeObserver(syncHighlight);
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, [activeValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex gap-1 max-w-full p-1 overflow-x-auto card rounded-full [scrollbar-width:none]",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          data-value={option.value}
          onClick={() => onValueChange(option.value)}
          className={cn(
            "relative z-1 shrink-0 px-4 md:px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full cursor-pointer transition-colors duration-300",
            activeValue === option.value
              ? "text-primary-cta-text"
              : "text-foreground hover:text-foreground/80",
          )}
        >
          {option.label}
        </button>
      ))}
      <div
        ref={highlightRef}
        className="absolute z-0 inset-y-1 left-0 rounded-full primary-button pointer-events-none transition-all duration-300 ease-out"
      />
    </div>
  );
}
