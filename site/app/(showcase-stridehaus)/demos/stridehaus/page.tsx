import { CoachBoard } from "@/demos/showcase/stridehaus/components/CoachBoard";
import { Header } from "@/demos/showcase/stridehaus/components/Header";
import { JoinForm } from "@/demos/showcase/stridehaus/components/JoinForm";
import { Network } from "@/demos/showcase/stridehaus/components/Network";
import { PhoneApp } from "@/demos/showcase/stridehaus/components/PhoneApp";
import { Pricing } from "@/demos/showcase/stridehaus/components/Pricing";
import { Science } from "@/demos/showcase/stridehaus/components/Science";
import { Athletes, Built, Faq, Footer, Hero, Wordmark } from "@/demos/showcase/stridehaus/components/Sections";
import "@/demos/showcase/stridehaus/components/Site.css";

export default function StridehausPage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero>
          <PhoneApp />
        </Hero>
        <Built />
        <Wordmark />
        <Science />
        <Athletes />
        <CoachBoard />
        <Network />
        <Pricing />
        <Faq />
        <JoinForm />
      </main>
      <Footer />
    </>
  );
}
