import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { resolveIcon, type IconInput } from "@/demos/lib/resolve-icon";

interface DynamicIconProps extends LucideProps {
  /** A lucide icon component, or the name of one (for example "Sparkles"). */
  icon: IconInput;
}

/** Renders an icon that was passed in as content (a component or an icon name). */
export default function DynamicIcon({ icon, ...props }: DynamicIconProps) {
  return createElement(resolveIcon(icon), props);
}
