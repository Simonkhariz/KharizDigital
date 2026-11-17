// The three services. Used by the numbered list (home, about) and the cards on /services.
export type Stroke = { d: string; delay: number; w?: number };
export type Service = {
  id: string;
  title: string;
  description: string; // one line, used in the numbered list
  summary: string; // longer text, used on /services
  includes: string[];
  drawing: { width: number; height: number; strokes: Stroke[] };
};

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    description: "Layouts, type and interface design for websites that are clear to read and easy to move through.",
    summary:
      "We plan the structure of a site, then design every page: layout, typography, colour, imagery and the states in between. Designs are made for phones, tablets and desktops from the start.",
    includes: ["Site structure and wireframes", "Interface and visual design", "Responsive layouts", "Design systems and components"],
    drawing: {
      width: 520,
      height: 340,
      strokes: [
        { d: "M60 236 V60 H400 V236 Z", delay: 0 },
        { d: "M230 236 V300 M180 300 H280", delay: 0.4 },
        { d: "M60 84 H400 M76 72 h4 M88 72 h4 M100 72 h4", delay: 0.6 },
        { d: "M92 112 H230", delay: 0.8 },
        { d: "M92 130 H190", delay: 0.85 },
        { d: "M260 104 h110 v70 h-110 Z", delay: 0.9 },
        { d: "M92 196 h86 v24 h-86 Z M188 196 h86 v24 h-86 Z M284 196 h86 v24 h-86 Z", delay: 1 },
        { d: "M0 336 H520", delay: 1.3 },
      ],
    },
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Fast, accessible websites and web applications built with modern tools, ready to be maintained.",
    summary:
      "We build what we design, or work from designs you already have. Our sites are written in React and Next.js with TypeScript, structured so content is simple to update and the code is simple to extend.",
    includes: [
      "Marketing sites and landing pages",
      "Web applications and dashboards",
      "Performance, accessibility and SEO",
      "Handover and documentation",
    ],
    drawing: {
      width: 520,
      height: 340,
      strokes: [
        { d: "M70 70 H450 V270 H70 Z", delay: 0 },
        { d: "M70 100 H450", delay: 0.3 },
        { d: "M86 85 h4 M98 85 h4 M110 85 h4", delay: 0.5 },
        { d: "M170 150 L130 185 L170 220", delay: 0.6 },
        { d: "M350 150 L390 185 L350 220", delay: 0.75 },
        { d: "M280 140 L240 230", delay: 0.9 },
        { d: "M200 270 V336 M320 270 V336", delay: 1.05 },
        { d: "M0 336 H520", delay: 1.3 },
      ],
    },
  },
  {
    id: "branding",
    title: "Logo Design & Branding",
    description: "Logos, colour and type that give a business one recognisable look across every screen.",
    summary:
      "We design the mark and the system around it: logo, colour palette, typefaces and simple rules for using them, so a brand looks the same on a website, a profile picture and a printed card.",
    includes: ["Logo design", "Colour and typography", "Brand guidelines", "Assets for web and social media"],
    drawing: {
      width: 520,
      height: 340,
      strokes: [
        { d: "M40 336 V60 H200", delay: 0 },
        { d: "M120 60 V90 M180 60 V90", delay: 0.5 },
        { d: "M96 90 H204 V180 H96 Z", delay: 0.3 },
        { d: "M134 118 h32 v32 h-32 Z", delay: 0.9 },
        { d: "M240 336 L262 262 H420 L398 336 Z", delay: 0.2 },
        { d: "M282 282 h16 v16 h-16 Z", delay: 0.8 },
        { d: "M290 316 H370 M286 306 H340", delay: 1 },
        { d: "M436 336 V300 H500 V336", delay: 0.4 },
        { d: "M456 300 V258 H480 V300", delay: 0.6 },
        { d: "M448 258 H488", delay: 0.7 },
        { d: "M0 336 H520", delay: 1.3 },
      ],
    },
  },
];
