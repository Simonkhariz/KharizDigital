import { Dialogs } from "@/demos/showcase/helmdeck/components/Dialogs";
import { Header } from "@/demos/showcase/helmdeck/components/Header";
import { Clients, FinalCta, Footer, Hero, Numbers, Pricing } from "@/demos/showcase/helmdeck/components/Sections";
import { Stack } from "@/demos/showcase/helmdeck/components/Stack";
import "@/demos/showcase/helmdeck/components/Site.css";

export default function HelmdeckPage() {
  return (
    <>
      <Header />
      <main className="hd-page">
        <Hero />
        <Clients />
        <Numbers />
        <Stack />
        <Pricing />
        <FinalCta />
      </main>
      <div className="hd-page">
        <Footer />
      </div>
      <Dialogs />
    </>
  );
}
