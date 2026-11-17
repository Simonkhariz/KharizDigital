// Client reviews and testimonials.
export type Testimonial = {
  name: string;
  company: string;
  text: string;
  avatar?: string; // path under /public
  projectSlug?: string; // related project in content/projects.ts
  published: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marcus Sterling",
    company: "Rapporta",
    text: "Khariz Digital transformed our product experience from top to bottom. The typography, interaction design, and sheer speed of the site exceeded every expectation. Our user engagement tripled within weeks of launching.",
    avatar: "/testimonials/avatar-marcus.webp",
    projectSlug: "rapporta",
    published: true,
  },
  {
    name: "Amara Nwachukwu",
    company: "Denarius Finance",
    text: "Working with Khariz Digital was one of the smoothest agency collaborations we’ve had. They possess an obsessive eye for detail, delivering clean engineering and design precision that stands out on a global stage.",
    avatar: "/testimonials/avatar-amara.webp",
    projectSlug: "denarius",
    published: true,
  },
  {
    name: "Elena Rostova",
    company: "Closient Systems",
    text: "From concept architecture to final deployment, Khariz Digital delivered a flawless web application interface that our users constantly compliment. Truly in a league of their own.",
    avatar: "/testimonials/avatar-elena.webp",
    projectSlug: "closient",
    published: true,
  },
  {
    name: "Julian Vance",
    company: "Vance & Co.",
    text: "They don’t just build websites; they craft digital identities that demand attention. Fast turnaround, world-class execution, and seamless communication throughout the entire project lifecycle.",
    avatar: "/testimonials/avatar-julian.webp",
    published: true,
  },
];
