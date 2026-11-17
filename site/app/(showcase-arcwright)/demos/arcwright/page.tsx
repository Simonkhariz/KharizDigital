import { DemoForm } from "@/demos/showcase/arcwright/components/DemoForm";
import { Header } from "@/demos/showcase/arcwright/components/Header";
import { HeroScene } from "@/demos/showcase/arcwright/components/HeroScene";
import { Pricing } from "@/demos/showcase/arcwright/components/Pricing";
import { Customers, Faq, Features, Footer, Hero, Reliable } from "@/demos/showcase/arcwright/components/Sections";
import { Solutions } from "@/demos/showcase/arcwright/components/Solutions";
import "@/demos/showcase/arcwright/components/Site.css";

export default function ArcwrightPage() {
  return (
    <div className="aw-page" id="top">
      <Header />
      <main>
        <Hero>
          <HeroScene />
        </Hero>
        <Reliable />
        <Solutions />
        <Features />
        <Pricing />
        <Customers />
        <Faq />
        <DemoForm />
      </main>
      <Footer />
    </div>
  );
}
