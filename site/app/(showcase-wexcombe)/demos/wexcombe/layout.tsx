import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "@/demos/showcase/wexcombe/styles/base.css";
import "@/demos/showcase/wexcombe/components/Site.css";
import DemoBar from "@/demos/components/DemoBar";
import { Footer } from "@/demos/showcase/wexcombe/components/Footer";
import { Header } from "@/demos/showcase/wexcombe/components/Header";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--wx-font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--wx-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--wx-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Wexcombe Partners: executive search, led by partners",
  description:
    "Wexcombe Partners is a partner-led executive search firm for founder-led, family-owned and private equity–backed companies. Concept website with demonstration content.",
};

export default function WexcombeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="wexcombe" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#wx-main" className="wx-skip">
          Skip to content
        </a>
        <Header />
        <main id="wx-main">{children}</main>
        <Footer />
        <DemoBar slug="wexcombe" />
      </body>
    </html>
  );
}
