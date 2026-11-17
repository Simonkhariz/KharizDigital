import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/demos/showcase/arcwright/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--aw-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Arcwright: agents that think, automate and deliver",
  description:
    "Arcwright builds and deploys agents inside the systems a company already uses, handling complete workflows from intake to resolution. Concept website with demonstration content.",
};

export default function ArcwrightLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="arcwright" className={sans.variable}>
      <body>
        {children}
        <DemoBar slug="arcwright" />
      </body>
    </html>
  );
}
