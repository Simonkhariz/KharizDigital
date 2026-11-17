"use client";

import { ChevronRight } from "lucide-react";
import AutoFillText from "@/demos/components/ui/AutoFillText";
import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { FooterLink } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

/** A footer entry: a link, or a plain label when no `href` is given. */
type FooterLinkItem = Omit<FooterLink, "href"> & { href?: string; onClick?: () => void };

interface FooterColumn {
  items: FooterLinkItem[];
}

interface FooterBrandProps {
  brand: string;
  columns: FooterColumn[];
}

/** A link inside a footer column. */
function FooterColumnLink({ label, href, onClick }: FooterLinkItem) {
  const handleClick = useButtonClick(href, onClick);

  return (
    <div className="flex items-center gap-2 text-base">
      <ChevronRight className="size-4" strokeWidth={3} aria-hidden="true" />
      <button
        onClick={handleClick}
        className="text-base text-primary-cta-text font-semibold hover:opacity-75 transition-opacity cursor-pointer"
      >
        {label}
      </button>
    </div>
  );
}

/** Footer on the primary colour with the brand name filling the width above link columns. */
export default function FooterBrand({ brand, columns }: FooterBrandProps) {
  return (
    <footer
      data-section="footer"
      aria-label="Site footer"
      className="w-full py-15 mt-20 rounded-t-lg overflow-hidden primary-button text-primary-cta-text"
    >
      <div className="w-content-width mx-auto flex flex-col gap-10 md:gap-20">
        <AutoFillText className="font-semibold">{brand}</AutoFillText>
        <div
          className={cn(
            "flex flex-col gap-8 mb-10 md:flex-row",
            columns.length === 1 ? "md:justify-center" : "md:justify-between",
          )}
        >
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col items-start gap-3">
              {column.items.map((item) => (
                <FooterColumnLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  onClick={item.onClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
