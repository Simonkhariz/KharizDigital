// Gallery categories shown as filters on /work. Add, rename or reorder here.
export type Category = { id: string; label: string };

export const categories: Category[] = [
  { id: "web-design", label: "Web Design" },
  { id: "web-development", label: "Web Development" },
  { id: "landing-pages", label: "Landing Pages" },
  { id: "web-applications", label: "Web Applications" },
  { id: "dashboards", label: "Dashboards" },
  { id: "branding", label: "Branding & Logo Design" },
];

export type CategoryId = (typeof categories)[number]["id"];

export const ALL_PROJECTS_LABEL = "All Projects";

/** How many projects one page of the gallery shows. */
export const PROJECTS_PER_PAGE = 8;

export const getCategory = (id: string) => categories.find((c) => c.id === id);
