import { cn } from "@/demos/lib/utils";

interface GridLinesBackgroundProps {
  /** `fixed` covers the whole page, `absolute` fills the nearest positioned parent. */
  position: "fixed" | "absolute";
}

/** A faint grid of lines that fades out towards the edges. */
export default function GridLinesBackground({ position }: GridLinesBackgroundProps) {
  return (
    <div
      className={cn(
        position,
        "inset-0 -z-10 overflow-hidden bg-background pointer-events-none select-none mask-[radial-gradient(circle_at_center,white_0%,transparent_90%)] bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-background-accent)_17.5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-background-accent)_17.5%,transparent)_1px,transparent_1px)] bg-size-[10vw_10vw]",
      )}
      aria-hidden="true"
    />
  );
}
