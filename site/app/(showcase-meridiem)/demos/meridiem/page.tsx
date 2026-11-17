import { ApiSection } from "@/demos/showcase/meridiem/components/ApiSection";
import { Blog } from "@/demos/showcase/meridiem/components/Blog";
import { Header } from "@/demos/showcase/meridiem/components/Header";
import { Pricing } from "@/demos/showcase/meridiem/components/Pricing";
import { About, Faq, Footer, Hero, Partners, TryPanel } from "@/demos/showcase/meridiem/components/Sections";
import { Waitlist } from "@/demos/showcase/meridiem/components/Waitlist";

export default function MeridiemPage() {
  return (
    <div className="md-page" id="top">
      <Header />
      <main>
        <Hero />
        <TryPanel />
        <Partners />
        <About />
        <ApiSection />
        <Pricing />
        <Blog />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
