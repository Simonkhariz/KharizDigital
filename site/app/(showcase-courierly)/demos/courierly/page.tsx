import { Dialogs } from "@/demos/showcase/courierly/components/Dialogs";
import { Header } from "@/demos/showcase/courierly/components/Header";
import { Api, Audiences, Closing, Hero, How, Pricing, Tools, Why } from "@/demos/showcase/courierly/components/Sections";
import "@/demos/showcase/courierly/components/Site.css";

export default function CourierlyPage() {
  return (
    <div className="co-page">
      <Header />
      <main>
        <Hero />
        <Audiences />
        <Why />
        <Tools />
        <Api />
        <How />
        <Pricing />
      </main>
      <Closing />
      <Dialogs />
    </div>
  );
}
