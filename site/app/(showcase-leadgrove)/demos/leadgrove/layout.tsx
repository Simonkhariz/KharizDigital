import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Geist } from "next/font/google";
import "@/demos/showcase/leadgrove/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Fraunces({ subsets: ["latin"], weight: ["300", "400"], variable: "--lg-font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--lg-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Leadgrove: sales automation that turns data into action",
  description:
    "Leadgrove connects your CRM and channels, automates outreach and routes every lead to the right rep. Concept website with demonstration content.",
};

export default function LeadgroveLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="leadgrove" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="leadgrove" />
      </body>
    </html>
  );
}
