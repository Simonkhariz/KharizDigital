import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publishedProjects } from "@/lib/projects";

// Generated once at build time (the site is exported as static files).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/services", "/about", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}/`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...publishedProjects.map((project) => ({ url: `${site.url}/work/${project.slug}/`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
