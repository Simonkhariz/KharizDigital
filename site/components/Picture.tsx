import type { CSSProperties } from "react";
import type { ProjectImage } from "@/content/project-types";

const WIDTHS = [640, 1280, 1920];

/**
 * An image served as pre-sized WebP files, so the browser downloads only the
 * size it needs. `image.src` is written without an extension
 * ("/projects/rapporta/cover"); the files beside it are cover-640.webp,
 * cover-1280.webp and cover-1920.webp, made by `npm run images` from the
 * originals in media/.
 *
 * `sizes` tells the browser how wide the image is shown, e.g.
 * "(max-width: 768px) 100vw, 50vw". Images load lazily unless `priority`.
 */
export function Picture({
  image,
  sizes,
  priority = false,
  className,
  style,
}: {
  image: ProjectImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  // Copies are never larger than the original, so list each real width once.
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, image.width)))];
  const srcSet = WIDTHS.slice(0, widths.length)
    .map((w, i) => `${image.src}-${w}.webp ${widths[i]}w`)
    .join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${image.src}-${WIDTHS[Math.min(1, widths.length - 1)]}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
