import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Gallery, GalleryFallback } from "@/components/Gallery";
import { publishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Websites, web applications and brand work designed and developed by Khariz Digital.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="relative pt-16 md:pt-20">
      <section className="container-x pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="flex items-baseline justify-between gap-6 mb-10 md:mb-14">
          <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium tracking-[-0.03em] leading-[1.05]">Work.</h1>
          <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground whitespace-nowrap">
            {publishedProjects.length} projects
          </p>
        </div>
        <Suspense fallback={<GalleryFallback />}>
          <Gallery />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
}
