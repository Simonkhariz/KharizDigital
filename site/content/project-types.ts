/**
 * `src` has no file extension: "/projects/rapporta/cover" stands for the WebP
 * copies cover-640.webp, cover-1280.webp and cover-1920.webp that
 * `npm run images` makes from media/projects/rapporta/cover.jpg.
 * `width` and `height` are the original's pixel size.
 */
export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  id: string;
  title: string;
  /** URL segment: the project page is /work/<slug>. */
  slug: string;
  /** One or two sentences; shown on cards and at the top of the project page. */
  description: string;
  /** A category id from content/categories.ts. */
  category: string;
  /** Internal bookkeeping only; never shown to visitors. */
  sourceType: "image-reconstruction" | "js-bundle" | "branding" | "supplied-build";
  coverImage: ProjectImage;
  galleryImages: ProjectImage[];
  /** true = also shown in Selected Works on the home page. */
  featured: boolean;
  /** false = hidden everywhere (gallery, home page, project page). */
  published: boolean;
  year: string;
  services: string[];
  technologies: string[];
  projectDetails: {
    overview: string;
    challenge?: string;
    solution?: string;
  };
  /**
   * Address of the working demo website on this site, e.g. "/demos/web-agency/".
   * Leave out for work that has no website to open, such as a logo.
   */
  demoPath?: string;
  /** Which part of the cover stays visible when a card crops it. Default "top". */
  coverPosition?: "top" | "center";
  /** Address of an independently deployed version, if one really exists. */
  liveUrl?: string;
  /** Optional extra facts shown on the project page, e.g. { Type: "Concept" }. */
  metadata?: Record<string, string>;
};
