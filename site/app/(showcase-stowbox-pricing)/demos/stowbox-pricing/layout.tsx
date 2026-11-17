import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/demos/showcase/stowbox-pricing/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Inter({ subsets: ["latin"], variable: "--sb-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Stowbox: choose your plan",
  description:
    "Stowbox is secure cloud storage for freelancers and teams. Compare the Starter, Growth and Enterprise plans. Concept website with demonstration content.",
};

export default function StowboxLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="stowbox-pricing" className={sans.variable}>
      <body>
        {children}
        <DemoBar slug="stowbox-pricing" />
      </body>
    </html>
  );
}
