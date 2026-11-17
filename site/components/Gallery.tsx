"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ALL_PROJECTS_LABEL, categories, getCategory, PROJECTS_PER_PAGE } from "@/content/categories";
import { galleryHref, paginate, projectsInCategory, publishedProjects, searchProjects } from "@/lib/projects";
import { WorkCard } from "./WorkCards";

const PILL = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm leading-none";
const PILL_IDLE = `${PILL} bg-secondary transition-colors duration-200 hover:bg-foreground hover:text-background`;
const PILL_ACTIVE = `${PILL} bg-foreground text-background`;
const PAGE_LINK =
  "inline-flex items-center justify-center min-w-10 h-10 px-3 border border-border rounded-full font-mono text-[11px] uppercase tracking-[0.04em] transition-colors duration-200 hover:border-foreground";
const PAGE_DISABLED =
  "inline-flex items-center justify-center min-w-10 h-10 px-3 border border-border rounded-full font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground/50";

/**
 * The filterable, paginated project grid.
 *
 * The category, the search words and the page number live in the address
 * (/work/?category=dashboards&q=sales&page=2), so a view can be refreshed, bookmarked
 * and shared. Changing them does not reload the page: the grid updates in
 * place. Addresses that point nowhere are corrected: an unknown category goes
 * back to all projects, a page past the end goes to the last page.
 */
export function Gallery() {
  const params = useSearchParams();
  return (
    <GalleryView categoryParam={params.get("category") ?? undefined} pageParam={params.get("page") ?? undefined} queryParam={params.get("q") ?? ""} />
  );
}

/** What is shown before the address has been read: all projects, page 1. */
export function GalleryFallback() {
  return <GalleryView />;
}

function GalleryView({ categoryParam, pageParam, queryParam = "" }: { categoryParam?: string; pageParam?: string; queryParam?: string }) {
  const router = useRouter();

  // What is typed in the search box. The address follows a moment after typing stops.
  const [typed, setTyped] = useState(queryParam);
  const [lastParam, setLastParam] = useState(queryParam);
  if (queryParam !== lastParam) {
    // The address changed from outside (back button, a shared link): show its words.
    setLastParam(queryParam);
    setTyped(queryParam);
  }

  const categoryId = categoryParam && getCategory(categoryParam) ? categoryParam : undefined;
  const query = typed.trim();
  const matching = searchProjects(projectsInCategory(categoryId), query);
  const requested = Number.parseInt(pageParam ?? "1", 10);
  const { items, current, totalPages } = paginate(matching, Number.isFinite(requested) ? requested : 1, PROJECTS_PER_PAGE);

  // Rewrite the address when it names an unknown category or an invalid page.
  const needsCorrection =
    (categoryParam !== undefined && !categoryId) || (pageParam !== undefined && pageParam !== String(current)) || pageParam === "1";
  useEffect(() => {
    if (needsCorrection) router.replace(galleryHref(categoryId, current, queryParam), { scroll: false });
  }, [needsCorrection, categoryId, current, queryParam, router]);

  // Put the search words in the address shortly after typing stops; a new search starts at page 1.
  useEffect(() => {
    if (query === queryParam.trim()) return;
    const timer = window.setTimeout(() => router.replace(galleryHref(categoryId, 1, query), { scroll: false }), 250);
    return () => window.clearTimeout(timer);
  }, [query, queryParam, categoryId, router]);

  return (
    <>
      {/* Search */}
      <form role="search" onSubmit={(event) => event.preventDefault()} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center mb-4">
        <label htmlFor="project-search" className="md:col-span-2 font-mono text-[10px] uppercase text-muted-foreground">
          Search
        </label>
        <div className="md:col-span-10 lg:col-span-6 relative">
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            id="project-search"
            type="search"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder="Search by name, type or technology"
            autoComplete="off"
            className="w-full bg-transparent border-b border-border py-3 pl-7 pr-16 text-base leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors duration-200 rounded-none [&::-webkit-search-cancel-button]:hidden"
          />
          {typed ? (
            <button
              type="button"
              onClick={() => setTyped("")}
              className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.04em] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Clear
            </button>
          ) : null}
        </div>
      </form>

      {/* Category filter. Choosing a category always starts again at page 1. */}
      <nav aria-label="Filter projects by category" className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start">
        <p className="md:col-span-2 font-mono text-[10px] uppercase text-muted-foreground pt-2.5">Category</p>
        <ul className="md:col-span-10 flex flex-wrap gap-2">
          {[{ id: undefined as string | undefined, label: ALL_PROJECTS_LABEL }, ...categories].map((category) => {
            const active = category.id === categoryId;
            const count = searchProjects(projectsInCategory(category.id), query).length;
            const content = (
              <>
                {category.label}
                <span className={`font-mono text-[10px] ${active ? "text-background/60" : "text-muted-foreground group-hover:text-background/60"}`}>
                  {count}
                </span>
              </>
            );
            return (
              <li key={category.id ?? "all"}>
                {active ? (
                  <span className={PILL_ACTIVE} aria-current="page">
                    {content}
                  </span>
                ) : (
                  <Link href={galleryHref(category.id, 1, query)} scroll={false} className={`group ${PILL_IDLE}`}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-10 md:mt-14" aria-live="polite">
        {items.length === 0 ? (
          <div className="border border-border px-6 py-16 md:py-24 text-center">
            <p className="text-lg md:text-xl font-medium tracking-[-0.02em]">
              {query ? `No projects match “${query}”.` : "No projects in this category yet."}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {query ? "Try a different word, or clear the search." : "We add new work regularly."}
            </p>
            <Link href="/work/" scroll={false} onClick={() => setTyped("")} className={`mt-6 ${PILL_IDLE}`}>
              View all {publishedProjects.length} projects
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-6 gap-y-10 md:gap-y-14">
            {items.map((project, i) => (
              <WorkCard key={project.slug} project={project} priority={i < 2} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 ? (
        <>
          <nav aria-label="Pagination" className="mt-14 md:mt-20 border-t border-border pt-6 flex items-center justify-between gap-4">
            {current > 1 ? (
              <Link href={galleryHref(categoryId, current - 1, query)} className={PAGE_LINK} rel="prev">
                ← Previous
              </Link>
            ) : (
              <span className={PAGE_DISABLED} aria-disabled="true">
                ← Previous
              </span>
            )}

            <ul className="hidden sm:flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  {n === current ? (
                    <span className={`${PAGE_LINK} bg-foreground text-background border-foreground`} aria-current="page">
                      {n}
                    </span>
                  ) : (
                    <Link href={galleryHref(categoryId, n, query)} className={PAGE_LINK} aria-label={`Page ${n}`}>
                      {n}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <p className="sm:hidden font-mono text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
              Page {current} of {totalPages}
            </p>

            {current < totalPages ? (
              <Link href={galleryHref(categoryId, current + 1, query)} className={PAGE_LINK} rel="next">
                Next →
              </Link>
            ) : (
              <span className={PAGE_DISABLED} aria-disabled="true">
                Next →
              </span>
            )}
          </nav>
          <p className="hidden sm:block mt-4 text-center font-mono text-[10px] uppercase tracking-[0.04em] text-muted-foreground">
            Page {current} of {totalPages} · {matching.length} {matching.length === 1 ? "project" : "projects"}
          </p>
        </>
      ) : null}
    </>
  );
}
