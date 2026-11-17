import { Header } from "@/demos/showcase/closient/components/landing/Header";
import { Dialogs, Faq, Pricing } from "@/demos/showcase/closient/components/landing/Interactive";
import { About, Features, FinalCta, Footer, Hero, Results, Steps } from "@/demos/showcase/closient/components/landing/Sections";
import "@/demos/showcase/closient/components/landing/Site.css";

export default function ClosientPage() {
  return (
    <>
      <Header />
      <main>
        <section className="cl-hero" id="top" aria-label="Introduction">
          <Hero />
        </section>
        <div className="cl-page">
          <About />
          <Features />
          <Steps />
          <Results />
          <Pricing />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <div className="cl-page">
        <Footer />
      </div>
      <Dialogs />
    </>
  );
}
