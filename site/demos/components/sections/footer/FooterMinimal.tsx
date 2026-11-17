"use client";

import AutoFillText from "@/demos/components/ui/AutoFillText";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { IconInput } from "@/demos/lib/resolve-icon";

interface SocialLinkButtonProps {
  icon: IconInput;
  href?: string;
  onClick?: () => void;
}

interface FooterMinimalProps {
  brand: string;
  copyright: string;
  socialLinks?: SocialLinkButtonProps[];
}

/** A round icon button linking to a social profile. */
function SocialLinkButton({ icon, href, onClick }: SocialLinkButtonProps) {
  return (
    <button
      onClick={useButtonClick(href, onClick)}
      className="flex items-center justify-center size-10 rounded-full primary-button text-primary-cta-text cursor-pointer"
    >
      <DynamicIcon icon={icon} className="size-4" strokeWidth={1.5} />
    </button>
  );
}

/** Card footer with the brand name filling the width, a copyright line and social icons. */
export default function FooterMinimal({ brand, copyright, socialLinks }: FooterMinimalProps) {
  return (
    <footer data-section="footer" aria-label="Site footer" className="relative w-full py-20">
      <div className="flex flex-col w-content-width mx-auto px-6 md:px-10 pb-5 rounded-lg card">
        <AutoFillText className="font-semibold" paddingY="py-5">
          {brand}
        </AutoFillText>
        <div className="h-px w-full mb-5 bg-foreground/50" />
        <div className="flex flex-col gap-3 items-center justify-between md:flex-row">
          <span className="text-base text-center opacity-75">{copyright}</span>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((socialLink, index) => (
                <SocialLinkButton
                  key={index}
                  icon={socialLink.icon}
                  href={socialLink.href}
                  onClick={socialLink.onClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
