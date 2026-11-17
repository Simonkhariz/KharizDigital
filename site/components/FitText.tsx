"use client";

import { useEffect, useRef } from "react";

/**
 * One line of text scaled so it spans the full width of its container,
 * whatever the text and whatever the screen size. Used for the oversized
 * wordmark at the bottom of the footer.
 */
export function FitText({ text }: { text: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const line = textRef.current;
    if (!box || !line) return;

    const fit = () => {
      // Measure at a known size, then scale to the container's width.
      line.style.fontSize = "100px";
      const natural = line.getBoundingClientRect().width;
      if (natural > 0) line.style.fontSize = `${(box.clientWidth / natural) * 100}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    // The width changes once the web font has loaded.
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={boxRef} className="relative select-none pointer-events-none pb-2 md:pb-3 overflow-hidden" aria-hidden>
      <p
        ref={textRef}
        // Starting size before the script runs: roughly right for a dozen letters.
        style={{ fontSize: `${Math.min(19, 190 / Math.max(text.length, 1))}vw` }}
        className="inline-block font-medium tracking-[-0.055em] leading-[0.8] whitespace-nowrap text-background/[0.16]"
      >
        {text}
      </p>
    </div>
  );
}
