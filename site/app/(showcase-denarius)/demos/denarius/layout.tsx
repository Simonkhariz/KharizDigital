import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist_Mono, Inter_Tight } from "next/font/google";
import "@/demos/showcase/denarius/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT", "WONK"], variable: "--dn-font-serif", display: "swap" });
const sans = Inter_Tight({ subsets: ["latin"], variable: "--dn-font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--dn-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Denarius: build a smarter financial future",
  description: "Denarius is a personal-finance app for tracking, planning and protecting your money. Concept website with demonstration content.",
};

export default function DenariusLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="denarius" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="denarius" />
      </body>
    </html>
  );
}
