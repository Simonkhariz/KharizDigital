import { About } from "@/demos/showcase/aerelle/components/About";
import { Collection } from "@/demos/showcase/aerelle/components/Collection";
import { Contact } from "@/demos/showcase/aerelle/components/Contact";
import { Credible } from "@/demos/showcase/aerelle/components/Credible";
import { Footer } from "@/demos/showcase/aerelle/components/Footer";
import { FormulaQuiz } from "@/demos/showcase/aerelle/components/FormulaQuiz";
import { Header } from "@/demos/showcase/aerelle/components/Header";
import { Hero } from "@/demos/showcase/aerelle/components/Hero";
import { Ingredients } from "@/demos/showcase/aerelle/components/Ingredients";
import { Journal } from "@/demos/showcase/aerelle/components/Journal";

export default function AerellePage() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Credible />
        <Collection />
        <Ingredients />
        <FormulaQuiz />
        <Journal />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
