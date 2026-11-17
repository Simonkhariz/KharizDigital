import { ArrowUpRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import "./Brand.css";

export function LogoMark({ size = 22, tone = "orange" }: { size?: number; tone?: "orange" | "white" }) {
  const fill = tone === "orange" ? "#ff7f37" : "#ffffff";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2.5 21.5 18H15l-3-5-3 5H2.5Z" fill={fill} />
      <path d="M5 20.5c2.3-1.3 4.7-1.3 7 0s4.7 1.3 7 0" stroke={fill} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="ml-brand-logo">
      <LogoMark />
      <span>Meadowline</span>
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="ml-brand-tag">
      <Sparkles size={12} aria-hidden="true" />
      {children}
    </span>
  );
}

export function ArrowLink({ href, plan, children }: { href: string; plan?: string; children: ReactNode }) {
  return (
    <a className="ml-brand-button" href={href} data-ml-plan={plan}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}

const avatarTones = {
  rust: { bg: "#f2d8c4", hair: "#d98a3d", top: "#ff7f37" },
  umber: { bg: "#e7d9cf", hair: "#5a3a26", top: "#3a2a22" },
  ink: { bg: "#dcdfe6", hair: "#22222a", top: "#2f3340" },
  moss: { bg: "#dfe8d4", hair: "#6b4a2c", top: "#5f7d3a" },
} as const;

export type AvatarTone = keyof typeof avatarTones;

export function Avatar({ tone, size = 36 }: { tone: AvatarTone; size?: number }) {
  const colors = avatarTones[tone];
  return (
    <svg className="ml-brand-avatar" width={size} height={size} viewBox="0 0 36 36" aria-hidden="true" focusable="false">
      <circle cx="18" cy="18" r="18" fill={colors.bg} />
      <path d="M5 36c1-8 6-11 13-11s12 3 13 11Z" fill={colors.top} />
      <circle cx="18" cy="15.5" r="6.4" fill="#f1c9a8" />
      <path d="M11 15c-.6-5 2.6-8.4 7-8.4s7.6 3.400 7 8.400c-1.800-2.300-4-3.800-7-3.800s-5.200 1.500-7 3.800Z" fill={colors.hair} />
    </svg>
  );
}

export function AvatarStack({ more, size = 36 }: { more: string; size?: number }) {
  return (
    <span className="ml-brand-stack" style={{ ["--ml-avatar" as string]: `${size}px` }}>
      <Avatar tone="rust" size={size} />
      <Avatar tone="umber" size={size} />
      <Avatar tone="ink" size={size} />
      <span className="ml-brand-more">{more}</span>
    </span>
  );
}
