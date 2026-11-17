import { Dialogs } from "@/demos/showcase/swiftlet/components/Dialogs";
import { Header } from "@/demos/showcase/swiftlet/components/Header";
import { Hero } from "@/demos/showcase/swiftlet/components/Hero";
import { Agents, BlogSection, Docs, Faq, FinalCta, Footer, Logos, PricingSection, Shortcuts } from "@/demos/showcase/swiftlet/components/Sections";
import "@/demos/showcase/swiftlet/components/Shared.css";
import "@/demos/showcase/swiftlet/components/Site.css";

export default function SwiftletPage() {
  return (
    <div className="sw-frame" id="top">
      <div className="sw-sheet">
        <Header />
        <main>
          <Hero />
          <Logos />
          <Agents />
          <Docs />
          <Shortcuts />
          <PricingSection />
          <BlogSection />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
      <Dialogs />
    </div>
  );
}
