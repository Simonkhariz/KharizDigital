import { Approach } from "@/components/Approach";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FounderSection } from "@/components/FounderSection";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Section } from "@/components/Section";
import { Services } from "@/components/Services";
import { Studio } from "@/components/Studio";
import { Testimonials, visibleTestimonials } from "@/components/Testimonials";

export default function HomePage() {
  // Sections are numbered in order; optional ones (testimonials)
  // only take a number when they are shown.
  let count = 0;
  const next = () => String(++count).padStart(2, "0");

  const work = next();
  const studio = next();
  const services = next();
  const approach = next();
  const testimonials = visibleTestimonials.length > 0 ? next() : "";
  const founder = next();
  const faq = next();

  return (
    <main className="relative">
      <Hero />
      <Projects number={work} />
      <Studio number={studio} />
      <Services number={services} />
      <Approach number={approach} />
      <Testimonials number={testimonials} />
      <FounderSection number={founder} />
      <Section id="faq" title="Questions." number={faq}>
        <Faq />
      </Section>
      <Footer />
    </main>
  );
}
