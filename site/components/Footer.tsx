"use client";

import { collaboration, footerMenu, site } from "@/content/site";
import { address, contact, socialLinks } from "@/content/contact";
import { FitText } from "./FitText";
import { Reveal } from "./Reveal";
import { UnderlineLink } from "./links";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const COLUMN_LABEL = "font-mono text-[10px] uppercase text-background/35 mb-4";
const COLUMN_LINK = "text-sm text-background/70 hover:text-background transition-colors duration-200";
const LINE = "h-px bg-background";

// `cta={false}` drops the collaboration block; used on pages that are already
// about getting in touch or choosing a service.
export function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer id="collaborate" className="relative z-50 container-x bg-foreground text-background overflow-hidden">
      {/* Call to action. The button is for clients; the link under it is for collaborators. Both open WhatsApp. */}
      {cta ? (
        <Reveal y={20} className="py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-10 md:gap-16">
          <div className="max-w-3xl">
            <h2 className="text-[2rem] md:text-[3.5rem] font-medium tracking-[-0.03em] leading-[1.08] text-balance">
              {collaboration.heading[0]} <br className="hidden md:block" />
              {collaboration.heading[1]}
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5 self-start md:self-auto">
            <a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${collaboration.button} on WhatsApp`}
              className="group relative inline-flex items-center self-start rounded-full border border-background/30 h-[4.25rem] md:h-20 pl-[4.75rem] pr-9 md:pl-[5.5rem] md:pr-12 overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-background hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.35)]"
            >
              <span
                className={`absolute inset-0 rounded-full bg-background origin-left scale-x-0 transition-transform duration-[600ms] ${EASE} group-hover:scale-x-100`}
              />
              <span className="relative z-10 text-base md:text-lg font-medium whitespace-nowrap transition-colors duration-500 group-hover:text-foreground">
                {collaboration.button}
              </span>
              <span
                className={`absolute z-20 top-1/2 -translate-y-1/2 left-2 md:left-2.5 flex items-center justify-center w-[3.25rem] h-[3.25rem] md:w-[3.75rem] md:h-[3.75rem] rounded-full bg-background text-foreground transition-[left,background-color,color] duration-[600ms] ${EASE} group-hover:left-[calc(100%-3.5rem)] md:group-hover:left-[calc(100%-4rem)] group-hover:bg-foreground group-hover:text-background`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  className={`transition-transform duration-[600ms] ${EASE} group-hover:rotate-45`}
                >
                  <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <p className="text-sm text-background/50">
              {collaboration.secondary.lead}{" "}
              <UnderlineLink
                href={contact.whatsapp.collaborateHref}
                external
                className="text-background/80 hover:text-background transition-colors duration-200"
                lineClassName={LINE}
              >
                {collaboration.secondary.label} <span aria-hidden>↗</span>
              </UnderlineLink>
            </p>
          </div>
        </Reveal>
      ) : null}

      {/* Columns */}
      <Reveal
        y={0}
        delay={0.1}
        className={`grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 py-9 md:py-10 ${cta ? "border-t border-background/10" : "pt-20"}`}
      >
        <div>
          <p className={COLUMN_LABEL}>Menu</p>
          <ul className="space-y-2.5">
            {footerMenu.map((item) => (
              <li key={item.href}>
                <UnderlineLink href={item.href} className={COLUMN_LINK} lineClassName={LINE}>
                  {item.label}
                </UnderlineLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={COLUMN_LABEL}>Elsewhere</p>
          <ul className="space-y-2.5">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <UnderlineLink href={item.href} external className={COLUMN_LINK} lineClassName={LINE}>
                  {item.label}
                </UnderlineLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={COLUMN_LABEL}>Contact</p>
          <ul className="space-y-2.5">
            <li>
              <UnderlineLink href={contact.whatsapp.href} external className={COLUMN_LINK} lineClassName={LINE}>
                {contact.whatsapp.label} {contact.whatsapp.display}
              </UnderlineLink>
            </li>
            <li>
              <UnderlineLink href={contact.email.href} className={COLUMN_LINK} lineClassName={LINE}>
                {contact.email.display}
              </UnderlineLink>
            </li>
            <li>
              <address className="not-italic text-sm text-background/70">{address.full}</address>
            </li>
          </ul>
        </div>
        <div>
          <p className={COLUMN_LABEL}>{site.name}</p>
          <p className="flex items-center gap-2.5 text-sm text-background/70">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand/70 animate-ping-slow" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand" />
            </span>
            {site.availability}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-background/45 max-w-[18rem]">{site.footerNote}</p>
        </div>
      </Reveal>

      {/* Legal row */}
      <div className="relative flex items-center justify-between gap-4 py-4 border-t border-background/10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="font-mono text-[10px] uppercase text-background/30">{site.copyright}</p>
          <p className="font-mono text-[10px] uppercase text-background/30">{site.slogan}</p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group font-mono text-[10px] uppercase text-background/30 hover:text-background transition-colors duration-200"
        >
          Back to top
          <span className="inline-block ml-2 transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
        </button>
      </div>

      {/* Oversized wordmark, scaled to span the footer exactly */}
      <FitText text={site.wordmark} />
    </footer>
  );
}
