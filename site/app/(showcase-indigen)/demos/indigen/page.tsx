import { AgentDemo } from "@/demos/showcase/indigen/components/AgentDemo";
import { BookingForm } from "@/demos/showcase/indigen/components/BookingForm";
import { CaseStudies } from "@/demos/showcase/indigen/components/CaseStudies";
import { Header } from "@/demos/showcase/indigen/components/Header";
import { About, Faq, Footer, Hero, Logos, Pitch, Process, Services } from "@/demos/showcase/indigen/components/Sections";
import "@/demos/showcase/indigen/components/Site.css";

export default function IndigenPage() {
  return (
    <div className="ig-sheet" id="top">
      <Header />
      <main>
        <Hero />
        <Logos />
        <Pitch>
          <AgentDemo />
        </Pitch>
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <Faq />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
