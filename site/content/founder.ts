import type { ProjectImage } from "./project-types";

// The founder section on the home and about pages.
export type Founder = {
  heading: string;
  name: string;
  role: string;
  /** Paragraphs of the biography. */
  bio: string[];
  /** Technologies and tools, written in full. */
  stack: string[];
  /** Original at media/founder/; run `npm run images` after replacing it. */
  photo: ProjectImage;
  /** Personal portfolio. */
  portfolioUrl: string;
  portfolioLabel: string;
};

export const founder: Founder = {
  heading: "Meet the Founder",
  name: "Simon Ogbu",
  role: "Founder and full-stack developer",
  bio: [
    "Simon started Khariz Digital to build the kind of websites he enjoys using: clear, quick and made with care. He has spent six years designing and developing for the web, moving comfortably between a Figma file and a production codebase.",
    "He is a passionate, creative developer who treats every project as a craft, from the first layout to the last line of code, and he leads the team's work on design, front-end and back-end alike.",
  ],
  stack: ["JavaScript", "TypeScript", "React", "Next.js", "PHP", "Laravel", "MySQL", "PostgreSQL", "Figma"],
  photo: { src: "/founder/simon-ogbu", alt: "Simon Ogbu, founder of Khariz Digital", width: 1254, height: 1254 },
  portfolioUrl: "https://khariz.vercel.app",
  portfolioLabel: "khariz.vercel.app",
};
