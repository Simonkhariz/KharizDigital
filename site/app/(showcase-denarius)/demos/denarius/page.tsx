import { Header } from "@/demos/showcase/denarius/components/Header";
import { FaqSection, Footer, Hero, Payments, PlatformSection, Security, Signup, StoriesSection } from "@/demos/showcase/denarius/components/Sections";
import "@/demos/showcase/denarius/components/Site.css";

export default function DenariusPage() {
  return (
    <div className="dn-frame">
      <Header />
      <main>
        <Hero />
        <Payments />
        <Security />
        <PlatformSection />
        <StoriesSection />
        <FaqSection />
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
