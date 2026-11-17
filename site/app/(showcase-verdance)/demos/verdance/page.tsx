import { ApiSection } from "@/demos/showcase/verdance/components/ApiSection";
import { Header } from "@/demos/showcase/verdance/components/Header";
import { Pricing } from "@/demos/showcase/verdance/components/Pricing";
import { Faq, Footer, Hero, Platform, Stage, Stats } from "@/demos/showcase/verdance/components/Sections";
import { Start } from "@/demos/showcase/verdance/components/Start";
import { Workflow } from "@/demos/showcase/verdance/components/Workflow";

export default function VerdancePage() {
  return (
    <div className="vd-page" id="top">
      <Header />
      <main>
        <Hero />
        <Stage />
        <Stats />
        <Platform />
        <Workflow />
        <Pricing />
        <ApiSection />
        <Faq />
        <Start />
      </main>
      <Footer />
    </div>
  );
}
