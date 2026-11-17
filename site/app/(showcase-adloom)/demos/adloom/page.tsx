import { Agents } from "@/demos/showcase/adloom/components/Agents";
import { AnnouncementBar } from "@/demos/showcase/adloom/components/AnnouncementBar";
import { Faq } from "@/demos/showcase/adloom/components/Faq";
import { Footer } from "@/demos/showcase/adloom/components/Footer";
import { Header } from "@/demos/showcase/adloom/components/Header";
import { Hero } from "@/demos/showcase/adloom/components/Hero";
import { LogoRow } from "@/demos/showcase/adloom/components/LogoRow";
import { PlatformTabs } from "@/demos/showcase/adloom/components/PlatformTabs";
import { Pricing } from "@/demos/showcase/adloom/components/Pricing";
import { StartForm } from "@/demos/showcase/adloom/components/StartForm";
import { Steps } from "@/demos/showcase/adloom/components/Steps";
import { Story } from "@/demos/showcase/adloom/components/Story";
import { UseCases } from "@/demos/showcase/adloom/components/UseCases";

export default function AdloomPage() {
  return (
    <div id="top">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <LogoRow />
        <PlatformTabs />
        <Agents />
        <Steps />
        <UseCases />
        <Story />
        <Pricing />
        <Faq />
        <StartForm />
      </main>
      <Footer />
    </div>
  );
}
