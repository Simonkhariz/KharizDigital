import * as LucideIcons from "lucide-react";
import { CircleQuestionMark, Code, Globe, MessageCircle, type LucideIcon } from "lucide-react";

/** An icon can be passed as a component or as the name of a lucide icon. */
export type IconInput = LucideIcon | string | null | undefined;

/** Brand icons are not shipped with lucide, so they fall back to a neutral icon. */
const BRAND_ICON_FALLBACKS: Record<string, LucideIcon> = {
  Linkedin: Globe,
  Twitter: Globe,
  Instagram: Globe,
  Facebook: Globe,
  Youtube: Globe,
  Github: Code,
  Snapchat: Globe,
  Pinterest: Globe,
  Tiktok: Globe,
  Discord: MessageCircle,
};

const isComponent = (value: unknown): value is LucideIcon =>
  !!value && (typeof value === "function" || (typeof value === "object" && "$$typeof" in value));

export function resolveIcon(icon: IconInput): LucideIcon {
  if (typeof icon === "string") {
    const brandFallback = BRAND_ICON_FALLBACKS[icon];
    if (brandFallback) return brandFallback;
    const namedIcon = (LucideIcons as Record<string, unknown>)[icon];
    return isComponent(namedIcon) ? namedIcon : CircleQuestionMark;
  }
  return isComponent(icon) ? icon : CircleQuestionMark;
}
