import { AtSign, BarChart3, Braces, Clock, Code2, Globe, PenLine, RefreshCw, ShieldCheck, User, Webhook } from "lucide-react";
import type { IconName } from "../data/content";

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M2 7l14 10L30 7v18H2z" fill="currentColor" />
      <path d="M2 7h10l4 4 4-4h10L16 17z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

const icons = {
  user: User,
  code: Code2,
  pen: PenLine,
  braces: Braces,
  globe: Globe,
  clock: Clock,
  webhook: Webhook,
  chart: BarChart3,
  shield: ShieldCheck,
  refresh: RefreshCw,
  at: AtSign,
} satisfies Record<IconName, typeof User>;

export function IconTile({ name, tone }: { name: IconName; tone: "blue" | "dark" }) {
  const Icon = icons[name];
  return (
    <span className={`co-tile co-tile-${tone}`} aria-hidden="true">
      <Icon size={20} strokeWidth={2.2} />
    </span>
  );
}

export function Bullet({ tone }: { tone: "blue" | "dark" }) {
  return (
    <svg className={`co-bullet co-bullet-${tone}`} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="currentColor" />
      <path d="M7 3.500v6M4.500 7.200L7 9.700l2.500-2.500" fill="none" stroke="#fff" strokeWidth="1.500" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Stippled photograph of two hands holding a star, baked in the two brand blues (see docs/image-credits/courierly.md). */
export function StippleArt({ wide = false, priority = false }: { wide?: boolean; priority?: boolean }) {
  return (
    <img
      className="co-art co-art-photo"
      src={wide ? "/showcase/courierly/stipple-hands-star-wide.webp" : "/showcase/courierly/stipple-hands-star.webp"}
      alt=""
      width={900}
      height={wide ? 1080 : 900}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

/** Flat mid-blue panel with a light stipple grain. `id` keeps the SVG definitions unique on the page. */
export function Grain({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <filter id={`${id}-light`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="8" />
          <feColorMatrix values="0 0 0 0 0.66  0 0 0 0 0.76  0 0 0 0 0.97  0 0 0 11 -5.6" />
        </filter>
      </defs>
      <rect width="1000" height="1000" fill="#3f6fdc" />
      <rect width="1000" height="1000" filter={`url(#${id}-light)`} opacity="0.3" />
    </svg>
  );
}
