import { Dialogs } from "@/demos/showcase/campusmind/components/Dialogs";
import { Header } from "@/demos/showcase/campusmind/components/Header";
import { Platform } from "@/demos/showcase/campusmind/components/Platform";
import { PricingEstimator } from "@/demos/showcase/campusmind/components/PricingEstimator";
import { Closing, Faq, Footer, Hero, Hub, Institutions, Outcomes, Solutions, Trust } from "@/demos/showcase/campusmind/components/Sections";
import "@/demos/showcase/campusmind/components/Site.css";

export default function CampusmindPage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Institutions />
        <Hub />
        <Platform />
        <Solutions />
        <Outcomes />
        <Trust />
        <PricingEstimator />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <Dialogs />
    </>
  );
}
