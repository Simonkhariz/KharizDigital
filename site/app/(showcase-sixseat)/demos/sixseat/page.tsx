import { Dialogs } from "@/demos/showcase/sixseat/components/Dialogs";
import { Header } from "@/demos/showcase/sixseat/components/Header";
import { Hero } from "@/demos/showcase/sixseat/components/Hero";
import { Audience, Blog, Changelog, Closing, Faq, Footer, Layers, Marquee, Pricing, UseCases } from "@/demos/showcase/sixseat/components/Sections";
import "@/demos/showcase/sixseat/components/Site.css";

export default function SixseatPage() {
  return (
    <div className="sx-frame" id="top">
      <div className="sx-sheet">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Audience />
          <Layers />
          <UseCases />
          <Pricing />
          <Changelog />
          <Blog />
          <Faq />
          <Closing />
        </main>
        <Footer />
      </div>
      <Dialogs />
    </div>
  );
}
