import { AppCard } from "@/demos/showcase/fieldcards/components/AppCard";
import { JournalCard } from "@/demos/showcase/fieldcards/components/JournalCard";
import { ProfileCard } from "@/demos/showcase/fieldcards/components/ProfileCard";
import { Footer, Header, Intro, Notes, Stage } from "@/demos/showcase/fieldcards/components/Site";
import { stages } from "@/demos/showcase/fieldcards/data/content";
import "@/demos/showcase/fieldcards/components/Site.css";
import "@/demos/showcase/fieldcards/components/Cards.css";

export default function FieldcardsPage() {
  return (
    <div className="fc-page" id="top">
      <Header />
      <main>
        <Intro />
        <Stage stage={stages[0]}>
          <ProfileCard />
        </Stage>
        <Stage stage={stages[1]}>
          <AppCard />
        </Stage>
        <Stage stage={stages[2]}>
          <JournalCard />
        </Stage>
        <Notes />
      </main>
      <Footer />
    </div>
  );
}
