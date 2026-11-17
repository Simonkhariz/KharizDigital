import { Brief } from "@/demos/showcase/wexcombe/components/Brief";
import {
  FounderQuote,
  Hero,
  InsightCards,
  PartnerCards,
  PracticeCards,
  Process,
  Promises,
  Voices,
} from "@/demos/showcase/wexcombe/components/Home";
import { SectorsAndAppointments } from "@/demos/showcase/wexcombe/components/Interactive";

export default function WexcombePage() {
  return (
    <>
      <Hero />
      <Promises />
      <FounderQuote />
      <PracticeCards />
      <Process />
      <PartnerCards />
      <SectorsAndAppointments />
      <Voices />
      <InsightCards />
      <Brief />
    </>
  );
}
