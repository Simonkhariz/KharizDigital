/** How headings and paragraphs animate into view. */
export type TextAnimationVariant = "slide-up" | "fade-blur" | "fade";

/** A call-to-action: the label and where it leads (`#section`, `/path` or a full URL). */
export interface ButtonLink {
  text: string;
  href: string;
}

/** A navigation entry in a navbar. */
export interface NavItem {
  name: string;
  href: string;
}

/** A link in a footer column or legal row. */
export interface FooterLink {
  label: string;
  href: string;
}

/** Props shared by every button variant in components/ui/buttons. */
export interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  /** Fade the button in when it scrolls into view. */
  animate?: boolean;
  /** Delay of the fade-in, in seconds. */
  animationDelay?: number;
  className?: string;
}
