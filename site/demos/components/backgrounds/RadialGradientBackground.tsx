import { cn } from "@/demos/lib/utils";

interface RadialGradientBackgroundProps {
  /** `fixed` covers the whole page, `absolute` fills the nearest positioned parent. */
  position: "fixed" | "absolute";
}

/** A radial gradient of the accent colour rising from the bottom. */
export default function RadialGradientBackground({ position }: RadialGradientBackgroundProps) {
  return (
    <div
      className={cn(
        position,
        "inset-0 -z-10 overflow-hidden pointer-events-none select-none",
        position === "absolute" &&
          "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
      )}
      aria-hidden="true"
    >
      <div className="relative w-full h-full bg-[radial-gradient(130%_130%_at_50%_15%,var(--background)_40%,var(--color-background-accent)_100%)] mask-[linear-gradient(180deg,transparent_0%,transparent_15%,black_55%,black_100%)]" />
    </div>
  );
}
