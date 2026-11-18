import Link from "next/link";
import type { Project } from "@/content/project-types";
import { Picture } from "./Picture";
import { categoryLabel, demoLinkProps, projectUrl } from "@/lib/projects";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const CARD = "group relative block aspect-[4/3] overflow-hidden bg-secondary";
const COVER = `absolute inset-0 w-full h-full object-cover grayscale transition-[transform,filter] duration-700 ${EASE} group-hover:grayscale-0 group-data-[in-view]:grayscale-0`;
const coverClass = (project: Project) => `${COVER} ${project.coverPosition === "center" ? "object-center" : "object-top"}`;
const SIZES = "(max-width: 768px) 100vw, (max-width: 1792px) 50vw, 864px";

// Caption under a card: category and description on the left, the demo link on the right.
function Caption({ project, showDescription }: { project: Project; showDescription: boolean }) {
  // Services other than the one already named by the category.
  const url = projectUrl(project);
  const otherServices = project.services.filter((service) => service !== categoryLabel(project.category));
  return (
    <div className="mt-3 flex items-start justify-between gap-6">
      <div className="min-w-0">
        <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] text-muted-foreground">
          {categoryLabel(project.category)}
          {otherServices.length ? <span> · {otherServices.slice(0, 2).join(", ")}</span> : null}
        </p>
        {showDescription ? <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-md">{project.description}</p> : null}
      </div>
      {url ? (
        <a
          href={url}
          {...demoLinkProps}
          aria-label={`View the ${project.title} website (opens in a new tab)`}
          className="group/demo relative shrink-0 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] whitespace-nowrap"
        >
          View website <span aria-hidden>↗</span>
          <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-brand transition-all duration-300 group-hover/demo:w-full" />
        </a>
      ) : null}
    </div>
  );
}

// Home page card: greyscale cover with a label tab in the bottom-left corner.
export function FeaturedCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article>
      <Link href={`/work/${project.slug}`} aria-label={`${project.title}: project details`} data-colour-on-scroll className={CARD}>
        <Picture image={project.coverImage} sizes={SIZES} priority={priority} className={coverClass(project)} />
        <span className="absolute left-0 bottom-0 inline-flex items-center gap-2 bg-background text-foreground font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-none px-3 py-2 transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
          <span aria-hidden>→</span>
          {project.title}
        </span>
      </Link>
      <Caption project={project} showDescription />
    </article>
  );
}

// Gallery card: title and year slide up over a dark gradient on hover.
export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article>
      <Link href={`/work/${project.slug}`} aria-label={`${project.title}: project details`} data-colour-on-scroll className={CARD}>
        <Picture image={project.coverImage} sizes={SIZES} priority={priority} className={coverClass(project)} />
        <span
          className={`absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-700 ${EASE} group-hover:opacity-100 pointer-events-none`}
        />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-4 pointer-events-none">
          <span
            className={`text-white text-[12px] md:text-[13px] font-medium tracking-[-0.01em] opacity-0 translate-y-2 transition-all duration-500 delay-100 ${EASE} group-hover:opacity-100 group-hover:translate-y-0`}
          >
            Explore project
          </span>
          <span
            className={`font-mono text-[9px] uppercase text-white/70 opacity-0 translate-y-2 transition-all duration-500 delay-200 ${EASE} group-hover:opacity-100 group-hover:translate-y-0`}
          >
            {project.year}
          </span>
        </span>
      </Link>
      <h2 className="mt-4 text-base md:text-lg font-medium tracking-[-0.02em]">
        <Link href={`/work/${project.slug}`} className="hover:text-muted-foreground transition-colors duration-200">
          {project.title}
        </Link>
      </h2>
      <Caption project={project} showDescription={false} />
    </article>
  );
}
