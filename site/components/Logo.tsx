import { site } from "@/content/site";

// Star mark followed by the agency name in wide capitals.
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tone === "dark" ? "/brand/khariz-mark-black.png" : "/brand/khariz-mark-white.png"}
        alt=""
        width={20}
        height={20}
        className="h-[18px] w-[18px] md:h-5 md:w-5"
      />
      <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.3em] leading-none whitespace-nowrap">{site.name}</span>
    </span>
  );
}
