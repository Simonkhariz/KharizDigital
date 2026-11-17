import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import "@/demos/showcase/swiftlet/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const sans = Geist({ subsets: ["latin"], variable: "--sw-font-sans", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Swiftlet: mail, docs and agents in one keyboard-first workspace",
  description: "Swiftlet is a fast workspace for mail, docs and agents where every action is one key. Concept website with demonstration content.",
};

export default function SwiftletLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="swiftlet" className={sans.variable}>
      <body>
        {children}
        <DemoBar slug="swiftlet" />
      </body>
    </html>
  );
}
