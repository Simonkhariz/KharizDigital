// Client testimonials.
//
// Only entries with `published: true` appear on the live site. The entries
// below are PLACEHOLDERS that show the layout during development; they are
// not real feedback and are never shown in a production build. Replace them
// with genuine testimonials (with the client's permission) and set
// `published: true`.
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
    name: "Client name",
    company: "Company",
    text: "Placeholder. A genuine client testimonial will go here once one has been supplied.",
    published: false,
  },
  {
    name: "Client name",
    company: "Company",
    text: "Placeholder. A genuine client testimonial will go here once one has been supplied.",
    published: false,
  },
];
