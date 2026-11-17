"use client";

import { useEffect, useRef } from "react";

/** Deterministic lattice hash in the range 0..1, used to pick a tint per dot. */
function hash(x: number, y: number): number {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const tints = ["#f1f0dc", "#f1f0dc", "#f1f0dc", "#f1f0dc", "#f1f0dc", "#ffffff", "#ffffff", "#ffffff", "#ece6ae", "#dbe8c6"];

/** Greyscale photograph of cumulus cloud against a dark sky (see docs/image-credits/nocturn.md). */
const SOURCE = { src: "/showcase/nocturn/clouds.webp", width: 640, height: 325 };

interface Props {
  /** "rise": clouds climb from the bottom of a tall panel. "band": clouds fill a short strip. */
  variant: "rise" | "band";
  className?: string;
}

/**
 * Halftone clouds drawn on a canvas: a real cloud photograph is sampled on a grid and rendered as square
 * dots whose size follows the brightness. It drifts very slowly unless reduced motion is set.
 */
export function Halftone({ variant, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const cell = 6;
    let frame = 0;
    let visible = true;
    let last = 0;
    let luminance: Uint8ClampedArray | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /** Brightness of the photograph at (s, t), both 0..1; outside the picture is night sky. */
    const sample = (s: number, t: number) => {
      if (!luminance || s < 0 || s > 1 || t < 0 || t > 1) return 0;
      const px = Math.min(SOURCE.width - 1, Math.floor(s * SOURCE.width));
      const py = Math.min(SOURCE.height - 1, Math.floor(t * SOURCE.height));
      return luminance[(py * SOURCE.width + px) * 4] / 255;
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = "#020006";
      context.fillRect(0, 0, width, height);
      if (!luminance) return;

      const columns = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      // On narrow, tall panels the copy takes more of the height, so the sky starts lower.
      const skyStart = variant === "rise" ? (width < 700 ? 0.52 : 0.36) : 0;
      // The photograph covers the sky area, anchored to the bottom edge and centred, like object-fit: cover.
      const areaHeight = height * (1 - skyStart);
      const scale = Math.max(width / SOURCE.width, areaHeight / SOURCE.height) * (variant === "band" ? 1.25 : 1.06);
      const shownWidth = SOURCE.width * scale;
      const shownHeight = SOURCE.height * scale;
      const drift = Math.sin(time * 0.00004) * Math.min(0.025, Math.max(0, (shownWidth - width) / shownWidth / 2));
      const left = (width - shownWidth) / 2 + drift * shownWidth;
      const top = variant === "band" ? (height - shownHeight) * 0.62 : height - shownHeight;

      for (let row = 0; row < rows; row += 1) {
        const v = row / rows;
        if (v < skyStart) continue;
        // Clouds fade in below the copy instead of starting on a hard line.
        const rise = variant === "rise" ? Math.pow(clamp((v - skyStart) / 0.5), 1.6) : 1;
        for (let column = 0; column < columns; column += 1) {
          const x = column * cell;
          const y = row * cell;
          const tone = sample((x + cell / 2 - left) / shownWidth, (y + cell / 2 - top) / shownHeight);
          const brightness = Math.pow(tone, 1.5) * rise * (variant === "band" ? 0.8 : 1);

          context.fillStyle = `rgba(13, 17, 52, ${Math.min(1, brightness * 1.8 + (variant === "rise" ? rise * 0.25 : 0.2))})`;
          context.fillRect(x, y, cell, cell);

          const wanted = Math.min(cell - 1.2, cell * Math.pow(brightness, 0.75) * 1.05);
          if (wanted < 0.03) continue;
          // Dots smaller than a pixel are drawn at one pixel and faded instead, so the sky thins out smoothly.
          const size = Math.max(wanted, 1);
          context.globalAlpha = Math.min(1, wanted);
          context.fillStyle = tints[Math.floor(hash(column, row) * tints.length)];
          context.fillRect(x + (cell - size) / 2, y + (cell - size) / 2, size, size);
          context.globalAlpha = 1;
        }
      }
    };

    const loop = (time: number) => {
      frame = window.requestAnimationFrame(loop);
      if (!visible || time - last < 110) return;
      last = time;
      draw(time);
    };

    const photo = new Image();
    photo.decoding = "async";
    photo.onload = () => {
      const buffer = document.createElement("canvas");
      buffer.width = SOURCE.width;
      buffer.height = SOURCE.height;
      const reader = buffer.getContext("2d", { willReadFrequently: true });
      if (!reader) return;
      reader.drawImage(photo, 0, 0, SOURCE.width, SOURCE.height);
      luminance = reader.getImageData(0, 0, SOURCE.width, SOURCE.height).data;
      draw(last);
    };
    photo.src = SOURCE.src;

    draw(0);
    const resize = new ResizeObserver(() => draw(last));
    resize.observe(canvas);
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    watcher.observe(canvas);
    if (!reduced) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      photo.onload = null;
      resize.disconnect();
      watcher.disconnect();
    };
  }, [variant]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
