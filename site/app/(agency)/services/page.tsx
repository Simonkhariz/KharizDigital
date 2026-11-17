import type { Metadata } from "next";
import { Approach } from "@/components/Approach";
import { Footer } from "@/components/Footer";
import { LineDrawing } from "@/components/LineDrawing";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Web design, web development, and logo design and branding from Khariz Digital.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="relative">
      <section className="container-x pt-28 md:pt-36 pb-12 md:pb-16">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground mb-5">Services</p>
        <h1 className="text-[clamp(2rem,4.6vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] text-balance max-w-[18ch]">Services.</h1>
        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          <p className="md:col-span-6 text-base md:text-[1.0625rem] leading-relaxed text-muted-foreground">
            Three things, often two or all of them for the same client. Each one covers what is listed below, from the first conversation to handover.
          </p>
        </div>
      </section>

      <section className="container-x py-10 md:py-14 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {services.map((service) => (
            <article key={service.id} id={service.id} className="group scroll-mt-24">
              <div className="h-[200px] md:h-[220px] flex items-end justify-center border-b border-border text-foreground">
                <LineDrawing drawing={service.drawing} className="h-full w-auto max-w-full" />
              </div>
              <h2 className="mt-4 text-lg md:text-xl font-medium tracking-[-0.02em]">{service.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{service.summary}</p>
              <ul className="mt-5 border-t border-border">
                {service.includes.map((item) => (
                  <li key={item} className="border-b border-border py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <Approach number="02" className="py-14 md:py-20" />
      <Footer />
    </main>
  );
}
