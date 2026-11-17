import { cn } from "@/demos/lib/utils";

interface CornerGlowBackgroundProps {
  /** `fixed` covers the whole page, `absolute` fills the nearest positioned parent. */
  position: "fixed" | "absolute";
}

/** Soft radial glows in the top-right and bottom-left corners. */
export default function CornerGlowBackground({ position }: CornerGlowBackgroundProps) {
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
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-9/10 md:w-6/10 aspect-square rounded-full opacity-20 [background:radial-gradient(circle_at_center,var(--color-background-accent)_35%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-9/10 md:w-6/10 aspect-square rounded-full opacity-20 [background:radial-gradient(circle_at_center,var(--color-background-accent)_35%,transparent_70%)]" />
    </div>
  );
}
