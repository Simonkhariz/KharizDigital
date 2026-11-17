"use client";

import { useButtonClick } from "@/demos/hooks/useButtonClick";
import type { FooterLink } from "@/demos/lib/types";

/** A footer entry: a link, or a plain label when no `href` is given. */
type FooterLinkItem = Omit<FooterLink, "href"> & { href?: string; onClick?: () => void };

interface FooterColumn {
  title: string;
  items: FooterLinkItem[];
}

interface FooterBasicProps {
  columns: FooterColumn[];
  leftText: string;
  rightText: string;
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

/** Footer with link columns above a divider and two lines of small print. */
export default function FooterBasic({ columns, leftText, rightText }: FooterBasicProps) {
  return (
    <footer data-section="footer" aria-label="Site footer" className="w-full pt-20 pb-10">
      <div className="w-content-width mx-auto pt-10 border-t border-foreground/15">
        <div className="w-full grid grid-cols-2 gap-x-6 gap-y-10 mb-10 md:flex md:flex-wrap md:justify-between">
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
        <div className="w-full h-px bg-foreground/20" />
        <div className="w-full flex flex-col items-start gap-2 pt-5 md:flex-row md:items-center md:justify-between">
          <span className="text-sm opacity-50">{leftText}</span>
          <span className="text-sm opacity-50">{rightText}</span>
        </div>
      </div>
    </footer>
  );
}
