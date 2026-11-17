import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Manrope } from "next/font/google";
import "@/demos/showcase/meadowline/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--ml-font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--ml-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Meadowline: workflow automation that feels effortless",
  description:
    "Meadowline designs, builds and runs automated workflows for founders, agencies and solo professionals. Concept website with demonstration content.",
};

export default function MeadowlineLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="meadowline" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="meadowline" />
      </body>
    </html>
  );
}
