"use client";

import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import { useButtonClick } from "@/demos/hooks/useButtonClick";

export interface SocialLink {
  iconSrc: string;
  href: string;
  label: string;
}

interface SocialLinkButtonProps {
  link: SocialLink;
}

/** Square outlined icon button linking to a social profile. */
export default function SocialLinkButton({ link }: SocialLinkButtonProps) {
  const handleClick = useButtonClick(link.href);
  return (
    <a
      href={link.href}
      onClick={handleClick}
      aria-label={link.label}
      className="size-10 md:size-11 2xl:size-12 flex items-center justify-center rounded-xl border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-all"
    >
      <ImageOrVideo imageSrc={link.iconSrc} className="size-4/10 rounded-none" />
    </a>
  );
}
