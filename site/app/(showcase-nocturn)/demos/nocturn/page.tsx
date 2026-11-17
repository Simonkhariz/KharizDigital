import { Header } from "@/demos/showcase/nocturn/components/Header";
import {
  Contact,
  Features,
  Footer,
  Hero,
  Modalities,
  Partners,
  Pricing,
  Questions,
  Workspace,
} from "@/demos/showcase/nocturn/components/Sections";
import "@/demos/showcase/nocturn/components/Site.css";

export default function NocturnPage() {
  return (
    <div className="nc-page">
      <Header />
      <main className="nc-wrap">
        <Hero />
        <Partners />
        <Workspace />
        <Modalities />
        <Features />
        <Pricing />
        <Questions />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
