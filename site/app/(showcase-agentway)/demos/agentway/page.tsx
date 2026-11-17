import { Dialogs, Header } from "@/demos/showcase/agentway/components/Interactive";
import {
  About,
  Contact,
  Footer,
  Hero,
  Ideas,
  Logos,
  Masthead,
  Notes,
  Platform,
  Pricing,
} from "@/demos/showcase/agentway/components/Sections";
import "@/demos/showcase/agentway/components/Site.css";

export default function AgentwayPage() {
  return (
    <div className="aw-page">
      <Header />
      <main>
        <Masthead />
        <Hero />
        <Logos />
        <Ideas />
        <Platform />
        <Pricing />
        <Notes />
        <About />
        <Contact />
      </main>
      <Footer />
      <Dialogs />
    </div>
  );
}
