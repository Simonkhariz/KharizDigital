import { Dialogs } from "@/demos/showcase/guilder/components/Dialogs";
import { Header } from "@/demos/showcase/guilder/components/Header";
import { About, Closing, Developers, Faq, Footer, Hero, Journal, Pricing, Product, Steps } from "@/demos/showcase/guilder/components/Sections";
import "@/demos/showcase/guilder/components/Site.css";

export default function GuilderPage() {
  return (
    <div className="gd-frame" id="top">
      <div className="gd-sheet">
        <div className="gd-hero-block">
          <Header />
          <Hero />
        </div>
        <main>
          <Product />
          <Steps />
          <Developers />
          <Pricing />
          <About />
          <Journal />
          <Faq />
          <Closing />
        </main>
        <Footer />
      </div>
      <Dialogs />
    </div>
  );
}
