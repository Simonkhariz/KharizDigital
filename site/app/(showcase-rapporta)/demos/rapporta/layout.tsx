import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Manrope } from "next/font/google";
import "@/demos/showcase/rapporta/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const display = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-rapporta-display",
  display: "swap",
});

const ui = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-rapporta-ui",
  display: "swap",
});

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Rapporta | AI agents that turn conversations into loyalty",
  description:
    "Rapporta is a customer-experience agent platform that resolves conversations across chat, email and voice. Concept website with demonstration content.",
};

export default function RapportaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="rapporta" className={`${display.variable} ${ui.variable}`}>
      <body>
        {children}
        <DemoBar slug="rapporta" />
      </body>
    </html>
  );
}
