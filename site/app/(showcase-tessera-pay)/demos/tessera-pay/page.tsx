import { Dialogs, Header } from "@/demos/showcase/tessera-pay/components/Interactive";
import { Cta, FaqSection, Features, Footer, Hero, How, Pricing, Trusted, UseCasesSection } from "@/demos/showcase/tessera-pay/components/Sections";
import "@/demos/showcase/tessera-pay/components/Site.css";

export default function TesseraPayPage() {
  return (
    <div className="tp-page">
      <Header />
      <main>
        <Hero />
        <Trusted />
        <Features />
        <How />
        <UseCasesSection />
        <Pricing />
        <FaqSection />
        <Cta />
      </main>
      <Footer />
      <Dialogs />
    </div>
  );
}
