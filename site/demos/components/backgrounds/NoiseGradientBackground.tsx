import { cn } from "@/demos/lib/utils";

interface NoiseGradientBackgroundProps {
  /** `fixed` covers the whole page, `absolute` fills the nearest positioned parent. */
  position: "fixed" | "absolute";
}

/** A diagonal tint gradient with a film-grain noise texture. */
export default function NoiseGradientBackground({ position }: NoiseGradientBackgroundProps) {
  return (
    <div
      className={cn(
        position,
        "inset-0 -z-10 overflow-hidden bg-background-accent/10 pointer-events-none select-none",
        position === "absolute" &&
          "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-background via-background-accent/10 to-background-accent/20" />
      <div className="absolute inset-0 bg-repeat mix-blend-overlay opacity-10 bg-[url(/images/shared/noise.webp)] bg-size-[512px]" />
    </div>
  );
}
