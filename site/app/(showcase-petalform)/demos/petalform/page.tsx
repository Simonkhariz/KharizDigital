import { Generator } from "@/demos/showcase/petalform/components/Generator";
import { Header } from "@/demos/showcase/petalform/components/Header";
import { Faq, Pricing } from "@/demos/showcase/petalform/components/Interactive";
import { About, ContentTypes, FinalCta, Footer, Hero, Stats } from "@/demos/showcase/petalform/components/Sections";
import "@/demos/showcase/petalform/components/Site.css";

export default function PetalformPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ContentTypes />
        <Generator />
        <Pricing />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
