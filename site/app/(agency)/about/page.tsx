import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { Approach } from "@/components/Approach";
import { Footer } from "@/components/Footer";
import { FounderSection } from "@/components/FounderSection";
import { Section } from "@/components/Section";
import { Services } from "@/components/Services";
import { UnderlineLink } from "@/components/links";
import { aboutIntro } from "@/content/about";
import { socialLinks } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

const MONO_LABEL = "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-[1.9] text-muted-foreground";
const FACT_ROW = "grid grid-cols-12 gap-4 border-t border-border py-4 last:border-b";
const FACT_LABEL = `col-span-4 md:col-span-3 ${MONO_LABEL} pt-0.5`;
const FACT_VALUE = "col-span-8 md:col-span-9 font-mono text-[13px] leading-relaxed";

export default function AboutPage() {
  return (
    <main className="relative">
      <AboutHero />

      <Section title="About." number="01" className="pt-6 md:pt-10 pb-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8 items-start lg:items-stretch">
          <figure className="md:col-span-5 lg:col-span-4 w-[280px] md:w-full border border-border flex flex-col">
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="aspect-square bg-secondary flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/khariz-star-black.png" alt="" width={600} height={383} loading="lazy" className="w-3/5 h-auto" />
              </div>
            </div>
            <figcaption className="border-t border-border p-4 flex justify-between gap-4">
              <span className={`${MONO_LABEL} text-foreground`}>{site.name}</span>
              <span className={`${MONO_LABEL} text-right`}>{site.descriptor}</span>
            </figcaption>
          </figure>

          <div className="md:col-span-7 md:col-start-6 flex flex-col">
            <p className="font-mono text-[15px] md:text-[17px] leading-[1.7] max-w-2xl">{aboutIntro.lead}</p>
            <p className="mt-6 font-mono text-[13px] md:text-[14px] leading-[1.75] text-muted-foreground max-w-2xl">{aboutIntro.body}</p>
            <dl className="mt-auto pt-8">
              {aboutIntro.facts.map((fact) => (
                <div key={fact.label} className={FACT_ROW}>
                  <dt className={FACT_LABEL}>{fact.label}</dt>
                  <dd className={FACT_VALUE}>{fact.value}</dd>
                </div>
              ))}
              <div className={FACT_ROW}>
                <dt className={FACT_LABEL}>Social</dt>
                <dd className={FACT_VALUE}>
                  <span className="flex flex-wrap gap-x-6 gap-y-1">
                    {socialLinks.map((link) => (
                      <UnderlineLink key={link.href} href={link.href} external>
                        {link.label}
                      </UnderlineLink>
                    ))}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Services number="02" className="py-14 md:py-20" />
      <Approach number="03" className="py-14 md:py-20" />
      <FounderSection number="04" className="py-14 md:py-20" />
      <Footer />
    </main>
  );
}
