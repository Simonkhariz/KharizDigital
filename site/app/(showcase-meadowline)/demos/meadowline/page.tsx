import { About } from "@/demos/showcase/meadowline/components/About";
import { Contact } from "@/demos/showcase/meadowline/components/Contact";
import { Faq } from "@/demos/showcase/meadowline/components/Faq";
import { Features } from "@/demos/showcase/meadowline/components/Features";
import { Footer } from "@/demos/showcase/meadowline/components/Footer";
import { Hero } from "@/demos/showcase/meadowline/components/Hero";
import { Journal } from "@/demos/showcase/meadowline/components/Journal";
import { Nav } from "@/demos/showcase/meadowline/components/Nav";
import { Pricing } from "@/demos/showcase/meadowline/components/Pricing";
import { Process } from "@/demos/showcase/meadowline/components/Process";
import { Results } from "@/demos/showcase/meadowline/components/Results";
import { Scene } from "@/demos/showcase/meadowline/components/Scene";
import { Trusted } from "@/demos/showcase/meadowline/components/Trusted";
import { UseCases } from "@/demos/showcase/meadowline/components/UseCases";
import { Why } from "@/demos/showcase/meadowline/components/Why";
import { articles } from "@/demos/showcase/meadowline/data/content";

export default function MeadowlinePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Trusted />
        <Why />
        <Features />
        <UseCases />
        <Process />
        <Results />
        <Pricing />
        <Journal
          covers={articles.map((article) => (
            <Scene key={article.id} palette={article.palette} />
          ))}
        />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
