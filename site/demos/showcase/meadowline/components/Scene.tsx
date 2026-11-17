import clsx from "clsx";
import { palettes, type PaletteName } from "../data/palettes";

type SceneProps = {
  palette: PaletteName;
  /** Leave empty when the picture is only a backdrop. */
  alt?: string;
  /** Load eagerly: only for the picture at the top of the page. */
  priority?: boolean;
  /** Overrides the picture's default `object-position`. */
  position?: string;
  className?: string;
};

export function Scene({ palette, alt = "", priority = false, position, className }: SceneProps) {
  const image = palettes[palette];
  return (
    <img
      className={clsx("ml-scene", className)}
      src={`/showcase/meadowline/${image.file}.webp`}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      style={{ objectPosition: position ?? image.position }}
    />
  );
}
