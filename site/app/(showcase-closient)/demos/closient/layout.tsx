import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";
import "@/demos/showcase/closient/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Newsreader({ subsets: ["latin"], weight: ["300", "400"], variable: "--cl-font-serif", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--cl-font-sans", display: "swap" });
const ui = Inter({ subsets: ["latin"], variable: "--cl-font-ui", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--cl-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Closient: close more deals with sales agents",
  description:
    "Closient is a sales platform whose assistant agents qualify leads, keep the pipeline current and forecast revenue. Concept website with demonstration content.",
};

export default function ClosientLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="closient" className={`${serif.variable} ${sans.variable} ${ui.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="closient" />
      </body>
    </html>
  );
}
