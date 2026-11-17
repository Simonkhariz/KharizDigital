import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight } from "next/font/google";
import "@/demos/showcase/fieldcards/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--fc-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Fieldcards: three card interfaces, set outdoors",
  description:
    "Fieldcards is a small set of interactive card components: a profile card, an app card and a journal card, each shown over a landscape. Concept website with demonstration content.",
};

export default function FieldcardsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="fieldcards" className={sans.variable}>
      <body>
        {children}
        <DemoBar slug="fieldcards" />
      </body>
    </html>
  );
}
