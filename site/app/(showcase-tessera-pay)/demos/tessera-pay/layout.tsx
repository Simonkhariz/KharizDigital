import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Inter, Inter_Tight } from "next/font/google";
import "@/demos/showcase/tessera-pay/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Inter_Tight({ subsets: ["latin"], variable: "--tp-font-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--tp-font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--tp-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Tessera Pay: get paid globally, by card or crypto",
  description:
    "Tessera Pay is one payment layer for internet businesses: accept card and crypto payments and receive payouts in digital dollars. Concept website with demonstration content.",
};

export default function TesseraPayLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="tessera-pay" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="tessera-pay" />
      </body>
    </html>
  );
}
