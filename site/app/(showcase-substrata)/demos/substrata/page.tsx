import { Dialogs, Header } from "@/demos/showcase/substrata/components/Interactive";
import {
  Autonomy,
  Blog,
  Changelog,
  Faq,
  Features,
  FinalCta,
  Footer,
  Hero,
  Logos,
  Pricing,
} from "@/demos/showcase/substrata/components/Sections";
import "@/demos/showcase/substrata/components/Site.css";

export default function SubstrataPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Logos />
        <Autonomy />
        <Features />
        <Pricing />
        <Changelog />
        <Blog />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Dialogs />
    </>
  );
}
