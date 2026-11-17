import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Newsreader } from "next/font/google";
import "@/demos/showcase/campusmind/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Newsreader({ subsets: ["latin"], weight: ["300", "400"], variable: "--cm-font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--cm-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Campusmind: the institutional assistant platform for higher education",
  description:
    "Campusmind gives a university one governed place for assistants, agents and automation. Concept website with demonstration content.",
};

export default function CampusmindLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="campusmind" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="campusmind" />
      </body>
    </html>
  );
}
