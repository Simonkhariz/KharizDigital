import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, JetBrains_Mono, Newsreader } from "next/font/google";
import "@/demos/showcase/guilder/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--gd-font-serif", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--gd-font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--gd-font-mono", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Guilder: stablecoin payments for business worldwide",
  description:
    "Guilder is a business account for dollars, euros and digital dollars, with payouts to 140 countries in seconds. Concept website with demonstration content.",
};

export default function GuilderLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="guilder" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <DemoBar slug="guilder" />
      </body>
    </html>
  );
}
