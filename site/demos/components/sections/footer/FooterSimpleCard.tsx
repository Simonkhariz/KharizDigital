"use client";

import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { FooterLink } from "@/demos/lib/types";

/** A footer entry: a link, or a plain label when no `href` is given. */
type FooterLinkItem = Omit<FooterLink, "href"> & { href?: string; onClick?: () => void };

interface FooterColumn {
  title: string;
  items: FooterLinkItem[];
}

interface FooterSimpleCardProps {
  brand: string;
  columns: FooterColumn[];
  copyright: string;
  links: FooterLinkItem[];
}

/** A link inside a footer column. */
function FooterColumnLink({ label, href, onClick }: FooterLinkItem) {
  return (
    <button
      onClick={useButtonClick(href, onClick)}
      className="text-base text-left hover:opacity-75 transition-opacity cursor-pointer"
    >
      {label}
    </button>
  );
}

/** A small link in the bottom row of the footer. */
function FooterLegalLink({ label, href, onClick }: FooterLinkItem) {
  return (
    <button
      onClick={useButtonClick(href, onClick)}
      className="text-sm opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
    >
      {label}
    </button>
  );
}

/** Footer inside a card with the brand, link columns and a legal row. */
export default function FooterSimpleCard({
  brand,
  columns,
  copyright,
  links,
}: FooterSimpleCardProps) {
  return (
    <footer data-section="footer" aria-label="Site footer" className="w-full py-20">
      <div className="w-content-width mx-auto p-6 md:p-10 rounded-lg card">
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start mb-10">
          <h2 className="text-4xl font-semibold">{brand}</h2>
          <div className="w-full md:w-fit grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:gap-12">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col items-start gap-3 min-w-0">
                <h3 className="text-sm opacity-50 truncate">{column.title}</h3>
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
        <div className="flex flex-col items-start gap-3 pt-8 border-t border-foreground/20 md:flex-row md:items-center md:justify-between">
          <span className="text-sm opacity-50">{copyright}</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {links.map((link) => (
              <FooterLegalLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={link.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
