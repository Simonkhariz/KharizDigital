import { Dialogs, Header } from "@/demos/showcase/magmashield/components/Interactive";
import { Faq, Features, FinalCta, Footer, Hero, Platform, Pricing, UseCases } from "@/demos/showcase/magmashield/components/Sections";
import "@/demos/showcase/magmashield/components/Site.css";

export default function MagmashieldPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Platform />
        <Features />
        <UseCases />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Dialogs />
    </>
  );
}
