import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Source_Serif_4 } from "next/font/google";
import "@/demos/showcase/sixseat/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--sx-font-serif", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--sx-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Sixseat: agents, finally multiplayer",
  description:
    "Sixseat puts every agent run in a shared, live session that your team can watch, steer and take over. Concept website with demonstration content.",
};

export default function SixseatLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="sixseat" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <DemoBar slug="sixseat" />
      </body>
    </html>
  );
}
