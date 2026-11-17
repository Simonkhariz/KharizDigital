const ASSETS = "/showcase/fieldcards";

export const navLinks = [
  { label: "Profile", href: "#profile" },
  { label: "App", href: "#app" },
  { label: "Journal", href: "#journal" },
  { label: "Notes", href: "#notes" },
] as const;

export type StageData = {
  id: string;
  number: string;
  title: string;
  text: string;
  image: string;
  texture: "glyphs" | "hatch" | "none";
};

export const stages: StageData[] = [
  {
    id: "profile",
    number: "01",
    title: "Profile card",
    text: "A person, a live status and one action. The status resolves on its own and the button confirms in place.",
    image: `${ASSETS}/stage-sky.webp`,
    texture: "glyphs",
  },
  {
    id: "app",
    number: "02",
    title: "App card",
    text: "A ranked app with a single way in. The button opens a detail sheet inside the card instead of leaving it.",
    image: `${ASSETS}/stage-grass.webp`,
    texture: "hatch",
  },
  {
    id: "journal",
    number: "03",
    title: "Journal card",
    text: "An entry with a tag, a date and a place. The date pill pages through entries and the place opens its details.",
    image: `${ASSETS}/stage-hills.webp`,
    texture: "none",
  },
];

export const profile = {
  name: "Ines Calder",
  handle: "@inescalder",
  seen: "12m ago",
  portrait: `${ASSETS}/card-portrait.webp`,
  team: "Field team",
} as const;

export const app = {
  rank: 10,
  name: "Fellfoot Trail Club",
  blurb: "A free, all-in-one trail app designed to help walkers and runners of every level start",
  image: `${ASSETS}/card-trail.webp`,
  stats: [
    { value: "4.8", label: "Rating" },
    { value: "312", label: "Mapped trails" },
    { value: "Free", label: "No sign-up fee" },
  ],
  features: ["Guided first walks from 2 km", "Offline maps with elevation", "Weekly club routes near you"],
} as const;

export const entries = [
  {
    id: "peace",
    tag: "Lush and green",
    month: "JAN",
    day: "25",
    title: "Discovering peace",
    text: "Far from the city's noise, the green hills stretch endlessly into the horizon, blanketed with mist and silence.",
    place: "Fern Ridge",
    region: "Northern Highlands",
    detail: "Elevation 1,120 m · 6.4 km from the trailhead",
    focus: "50% 60%",
  },
  {
    id: "morning",
    tag: "First light",
    month: "FEB",
    day: "09",
    title: "A slower morning",
    text: "The meadow was still wet when the sun cleared the trees. One chair, one flask of tea and nowhere to be until noon.",
    place: "Alder Meadow",
    region: "Lower Valley",
    detail: "Elevation 340 m · 1.2 km from the trailhead",
    focus: "30% 70%",
  },
  {
    id: "wind",
    tag: "Open ground",
    month: "MAR",
    day: "17",
    title: "Listening to wind",
    text: "Up here the grass moves like water. I stayed long enough to stop checking the time, which was the whole point.",
    place: "Tarn Shoulder",
    region: "Western Fells",
    detail: "Elevation 780 m · 4.9 km from the trailhead",
    focus: "70% 55%",
  },
] as const;

export const notes = [
  {
    title: "One card, one job",
    text: "Each card answers a single question: who is this, what is this, where was this. Everything else is removed.",
  },
  {
    title: "Controls stay inside",
    text: "Buttons confirm, expand or page within the card. Nothing navigates away, so a card can sit anywhere.",
  },
  {
    title: "Set against a place",
    text: "The landscapes are part of the design. Soft blur and rounded corners let a white card sit on a busy photograph.",
  },
] as const;
