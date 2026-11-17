import { Dialogs } from "@/demos/showcase/runemark/components/Dialogs";
import { Header } from "@/demos/showcase/runemark/components/Header";
import {
  Cases,
  Diagram,
  Features,
  FinalCta,
  Footer,
  Hero,
  HowItWorks,
  Logos,
  Plans,
  Problem,
  Questions,
  Reliability,
  Sdk,
  Stats,
  Ticker,
} from "@/demos/showcase/runemark/components/Sections";
import "@/demos/showcase/runemark/components/Site.css";

export default function RunemarkPage() {
  return (
    <div className="rm-page">
      <Header />
      <main>
        <Ticker />
        <Hero />
        <Diagram />
        <Logos />
        <Problem />
        <HowItWorks />
        <Features />
        <Reliability />
        <Sdk />
        <Stats />
        <Cases />
        <Plans />
        <Questions />
        <FinalCta />
      </main>
      <Footer />
      <Dialogs />
    </div>
  );
}
