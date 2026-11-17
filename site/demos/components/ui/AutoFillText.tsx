"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/demos/lib/utils";

interface AutoFillTextProps {
  /** The single line of text to stretch across the container. */
  children: string;
  className?: string;
  /** Vertical padding classes, applied when the text has no descenders. */
  paddingY?: string;
}

/** A one-line heading whose font size is scaled so the text spans the full container width. */
export default function AutoFillText({
  children,
  className = "",
  paddingY = "py-10",
}: AutoFillTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const hasDescenders = /[gjpqy]/.test(children);
  const lineHeight = hasDescenders ? 1.2 : 0.8;

  useEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    if (!container || !heading) {
      return;
    }

    const fitText = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth === 0) {
        return;
      }
      const canvasContext = document.createElement("canvas").getContext("2d");
      if (!canvasContext) {
        return;
      }
      const headingStyle = getComputedStyle(heading);
      canvasContext.font = `${headingStyle.fontWeight} 100px ${headingStyle.fontFamily}`;
      const textWidthAt100px = canvasContext.measureText(children).width;
      if (textWidthAt100px > 0) {
        setFontSize((containerWidth / textWidthAt100px) * 100);
      }
    };

    fitText();
    const resizeObserver = new ResizeObserver(fitText);
    resizeObserver.observe(container);
    // Measure again once web fonts have loaded: a display font is usually a different
    // width from the fallback the first measurement was taken with.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) fitText();
    });
    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div ref={containerRef} className={cn("w-full min-w-0 flex-1", !hasDescenders && paddingY)}>
      <h2
        ref={headingRef}
        className={cn(
          "whitespace-nowrap transition-opacity duration-150",
          fontSize ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{
          fontSize: fontSize ? `${fontSize}px` : undefined,
          lineHeight,
        }}
      >
        {children}
      </h2>
    </div>
  );
}
