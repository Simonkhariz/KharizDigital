import { Cta } from "@/demos/showcase/rapporta/components/Cta";
import { DialogProvider } from "@/demos/showcase/rapporta/components/Dialogs";
import { Footer } from "@/demos/showcase/rapporta/components/Footer";
import { Header } from "@/demos/showcase/rapporta/components/Header";
import { Industries } from "@/demos/showcase/rapporta/components/Industries";
import { Pricing } from "@/demos/showcase/rapporta/components/Pricing";
import { Company, Hero, Platform, ProductStage, Resources, Standard, TrustedBy } from "@/demos/showcase/rapporta/components/Sections";
import { page as styles } from "@/demos/showcase/rapporta/styles";

export default function RapportaPage() {
  return (
    <DialogProvider>
      <div className={styles.page} id="top">
        <div className={styles.topStrip} aria-hidden="true" />
        <Header />
        <main>
          <Hero />
          <ProductStage />
          <TrustedBy />
          <Standard />
          <Platform />
          <Industries />
          <Pricing />
          <Resources />
          <Company />
          <Cta />
        </main>
        <Footer />
      </div>
    </DialogProvider>
  );
}
