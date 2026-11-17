import { Header } from "@/demos/showcase/leadgrove/components/Header";
import { InsightCard } from "@/demos/showcase/leadgrove/components/InsightCard";
import { Faq, Pricing } from "@/demos/showcase/leadgrove/components/Interactive";
import { Footer, Hero, Platform, Process, Start, Statement } from "@/demos/showcase/leadgrove/components/Sections";
import "@/demos/showcase/leadgrove/components/Site.css";

export default function LeadgrovePage() {
  return (
    <div className="lg-page">
      <Header />
      <main>
        <Hero />
        <div className="lg-wrap lg-stack">
          <InsightCard />
          <Process />
        </div>
        <Statement />
        <Platform />
        <Pricing />
        <Faq />
        <div className="lg-wrap">
          <Start />
        </div>
      </main>
      <Footer />
    </div>
  );
}
