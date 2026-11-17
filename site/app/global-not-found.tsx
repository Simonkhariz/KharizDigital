import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CircleArrowLink } from "@/components/links";
import "./(agency)/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found | Khariz Digital",
  description: "The page you are looking for does not exist.",
  robots: { index: false },
};

// Shown for any address that matches no page. Exported as 404.html.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="relative">
          <section className="container-x pt-28 md:pt-40 pb-20 md:pb-28 min-h-[70svh] flex flex-col justify-center">
            <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground mb-5">Error 404</p>
            <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium tracking-[-0.03em] leading-[1.05]">This page does not exist.</h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              The address may be mistyped, or the page may have moved.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              <CircleArrowLink href="/">Back to home</CircleArrowLink>
              <CircleArrowLink href="/work">Explore our work</CircleArrowLink>
            </div>
          </section>
          <Footer cta={false} />
        </main>
      </body>
    </html>
  );
}
