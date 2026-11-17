import { AgeCalculator } from "@/demos/showcase/verdia/components/AgeCalculator";
import { GetApp } from "@/demos/showcase/verdia/components/GetApp";
import { Header } from "@/demos/showcase/verdia/components/Header";
import { MarkerExplorer } from "@/demos/showcase/verdia/components/MarkerExplorer";
import { Everything, Faq, Footer, Hero, Steps, Trust } from "@/demos/showcase/verdia/components/Sections";
import "@/demos/showcase/verdia/components/Site.css";
import "@/demos/showcase/verdia/components/Mocks.css";

export default function VerdiaPage() {
  return (
    <div className="vd-sheet" id="top">
      <Header />
      <main>
        <Hero />
        <Steps />
        <Everything />
        <MarkerExplorer />
        <AgeCalculator />
        <Trust />
        <Faq />
        <GetApp />
      </main>
      <Footer />
    </div>
  );
}
