import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Inter, Inter_Tight } from "next/font/google";
import "@/demos/showcase/adloom/styles/base.css";
import DemoBar from "@/demos/components/DemoBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "800"],
  variable: "--font-display",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-app", display: "swap" });

export const metadata: Metadata = {
  // Reached from the portfolio; search engines should index the project page instead.
  robots: { index: false, follow: false },
  title: "Adloom | Ad creative studio for social commerce",
  description: "Adloom turns your products, briefs and best-performing content into hundreds of reviewed ad variants each week.",
};

export default function AdloomLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-showcase="adloom" className={`${inter.variable} ${interTight.variable} ${figtree.variable}`}>
      <body>
        {children}
        <DemoBar slug="adloom" />
      </body>
    </html>
  );
}
