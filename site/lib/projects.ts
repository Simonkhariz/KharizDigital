import { categories, PROJECTS_PER_PAGE } from "@/content/categories";
import { projects } from "@/content/projects";
import type { Project } from "@/content/project-types";

/**
 * Where "View website" goes: the real live site if there is one, otherwise the
 * demo on this site. Undefined for work with nothing to open (e.g. a logo).
 */
export function projectUrl(project: Project): string | undefined {
  return project.liveUrl ?? project.demoPath;
}

export const isExternal = (url: string) => /^https?:\/\//.test(url);

/**
 * Attributes for links that open a project's website. Demos are complete
 * websites of their own, so they open in a new tab and the portfolio stays
 * open behind them.
 */
export const demoLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

export const publishedProjects: Project[] = projects.filter((p) => p.published);
export const featuredProjects: Project[] = publishedProjects.filter((p) => p.featured);

export const getProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);

export function projectsInCategory(categoryId?: string): Project[] {
  return categoryId ? publishedProjects.filter((p) => p.category === categoryId) : publishedProjects;
}

export const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

/** Projects whose title, description, category, services or technologies contain every word typed. */
export function searchProjects(list: Project[], query: string): Project[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return list;
  return list.filter((project) => {
    const text = [project.title, project.description, categoryLabel(project.category), ...project.services, ...project.technologies]
      .join(" ")
      .toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/** Previous and next project, wrapping round at the ends. */
export function neighbours(slug: string): { previous?: Project; next?: Project } {
  const index = publishedProjects.findIndex((p) => p.slug === slug);
  if (index === -1 || publishedProjects.length < 2) return {};
  const count = publishedProjects.length;
  return { previous: publishedProjects[(index - 1 + count) % count], next: publishedProjects[(index + 1) % count] };
}

export function paginate<T>(items: T[], page: number, perPage: number = PROJECTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return { items: items.slice((current - 1) * perPage, current * perPage), current, totalPages };
}

/** Builds a gallery URL such as /work/?category=dashboards&q=hotel&page=2. */
export function galleryHref(category?: string, page: number = 1, query: string = ""): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (query.trim()) params.set("q", query.trim());
  if (page > 1) params.set("page", String(page));
  const text = params.toString();
  return text ? `/work/?${text}` : "/work/";
}
