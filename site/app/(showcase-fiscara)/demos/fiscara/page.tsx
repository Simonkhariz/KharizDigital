import { AccountDialog } from "@/demos/showcase/fiscara/components/Closing";
import { Estimator } from "@/demos/showcase/fiscara/components/Estimator";
import { Features } from "@/demos/showcase/fiscara/components/Features";
import { Header } from "@/demos/showcase/fiscara/components/Header";
import { About, Hero } from "@/demos/showcase/fiscara/components/Hero";
import { Platform } from "@/demos/showcase/fiscara/components/Platform";
import { Pricing } from "@/demos/showcase/fiscara/components/Pricing";
import { Demo, Footer, Questions } from "@/demos/showcase/fiscara/components/Sections";
import "@/demos/showcase/fiscara/styles/site.css";
import "@/demos/showcase/fiscara/styles/hero.css";
import "@/demos/showcase/fiscara/styles/sections.css";

export default function FiscaraPage() {
  return (
    <div className="fs-page">
      <Header />
      <main>
        <Hero />
        <About />
        <Platform />
        <Features />
        <Estimator />
        <Pricing />
        <Questions />
        <Demo />
      </main>
      <Footer />
      <AccountDialog />
    </div>
  );
}
