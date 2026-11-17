import { Access } from "@/demos/showcase/driftlayer/components/Access";
import { Faq } from "@/demos/showcase/driftlayer/components/Faq";
import { Feed } from "@/demos/showcase/driftlayer/components/Feed";
import { Footer } from "@/demos/showcase/driftlayer/components/Footer";
import { Hero } from "@/demos/showcase/driftlayer/components/Hero";
import { Intro } from "@/demos/showcase/driftlayer/components/Intro";
import { Journal } from "@/demos/showcase/driftlayer/components/Journal";
import { Nav } from "@/demos/showcase/driftlayer/components/Nav";
import { Pricing } from "@/demos/showcase/driftlayer/components/Pricing";
import { UseCases } from "@/demos/showcase/driftlayer/components/UseCases";

export default function DriftlayerPage() {
  return (
    <div id="top">
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Feed />
        <UseCases />
        <Pricing />
        <Journal />
        <Faq />
        <Access />
      </main>
      <Footer />
    </div>
  );
}
