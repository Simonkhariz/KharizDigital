import { cn } from "@/demos/lib/utils";

interface AuroraBackgroundProps {
  /** `fixed` covers the whole page, `absolute` fills the nearest positioned parent. */
  position: "fixed" | "absolute";
}

/** Blurred diagonal streaks of the accent colour. */
export default function AuroraBackground({ position }: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        position,
        "inset-0 -z-10 w-full h-full overflow-hidden bg-background pointer-events-none",
        position === "absolute" &&
          "mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
      )}
    >
      <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-[120%] w-[9vw] h-[110vh] bg-background-accent/15 -rotate-[52.5deg] rounded-[100%]" />
      <div className="absolute top-[-20vh] right-[2.5vw] w-[12.5vw] h-screen bg-background-accent/15 -rotate-60 rounded-[100%]" />
      <div className="absolute top-[-20vh] left-[2vw] w-[15vw] h-[150vh] bg-background-accent/20 -rotate-45 rounded-[100%]" />
      <div className="absolute top-[-30vh] left-0 w-[10vw] h-[70vh] bg-background-accent/15 -rotate-45 rounded-[100%]" />
      <div className="absolute bottom-[-40vh] left-0 w-[120vw] h-[50vh] bg-background-accent/10 -rotate-20 rounded-[100%]" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
    </div>
  );
}
