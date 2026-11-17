import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { CircleArrowLink } from "@/components/links";
import { Picture } from "@/components/Picture";
import { categoryLabel, demoLinkProps, galleryHref, getProject, neighbours, projectUrl, publishedProjects } from "@/lib/projects";

const HOVER_LINE =
  "absolute left-0 -bottom-0.5 h-px w-full bg-foreground origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300";
const MONO_LABEL = "font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-[1.9] text-muted-foreground";
const PILL =
  "inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm leading-none transition-colors duration-200 hover:bg-foreground hover:text-background";
const BIG_TEXT = "md:col-span-6 md:col-start-7 text-[1.25rem] md:text-[1.6rem] font-medium leading-[1.32] tracking-[-0.02em] text-balance";

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.description, images: [`${project.coverImage.src}-1280.webp`] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const demo = projectUrl(project);
  const { previous, next } = neighbours(project.slug);
  const facts: [string, string][] = [
    ["Category", categoryLabel(project.category)],
    ["Services", project.services.join(", ")],
    ["Technologies", project.technologies.join(", ")],
    ["Year", project.year],
    ...Object.entries(project.metadata ?? {}),
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <main className="relative pt-16 md:pt-20">
      <article className="container-x pt-16 md:pt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6 md:pb-8">
          <h1 className="text-[clamp(2.2rem,5.5vw,4.25rem)] font-medium tracking-[-0.03em] leading-none">{project.title}</h1>
          <div className="md:pb-1">
            <div className="flex flex-wrap gap-2">
              <Link href={galleryHref(project.category)} className={PILL}>
                {categoryLabel(project.category)}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 md:pt-10">
          <div className="md:col-span-5">
            <p className="text-[1.25rem] md:text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-balance">{project.description}</p>
            <p className="mt-4 font-mono text-[10px] uppercase text-muted-foreground">
              {project.year} · {categoryLabel(project.category)}
            </p>
            {demo ? (
              <div className="mt-8">
                <CircleArrowLink href={demo} external direction="out">
                  View Website
                </CircleArrowLink>
              </div>
            ) : null}
          </div>
          <p className="md:col-span-6 md:col-start-7 text-base md:text-lg leading-relaxed text-balance">{project.projectDetails.overview}</p>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col gap-10 md:gap-16">
          {/* The main preview opens the working website, when there is one. */}
          {demo ? (
            <a
              href={demo}
              {...demoLinkProps}
              aria-label={`Open the ${project.title} website (opens in a new tab)`}
              className="group relative block overflow-hidden bg-secondary"
            >
              <Picture
                image={project.coverImage}
                sizes="100vw"
                priority
                className="block w-full h-auto transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01]"
              />
              <span className="absolute left-0 bottom-0 inline-flex items-center gap-2 bg-background text-foreground font-mono text-[10px] md:text-[11px] uppercase tracking-[0.04em] leading-none px-3 py-2 transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
                <span aria-hidden>↗</span>
                Open the website
              </span>
            </a>
          ) : (
            <div className="bg-secondary">
              <Picture image={project.coverImage} sizes="100vw" priority className="block w-full h-auto" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            <dl className="md:col-span-6 md:col-start-7">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-12 gap-4 border-t border-border py-4 last:border-b">
                  <dt className={`col-span-4 md:col-span-3 ${MONO_LABEL} pt-0.5`}>{label}</dt>
                  <dd className="col-span-8 md:col-span-9 font-mono text-[13px] leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {project.projectDetails.challenge ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-4 md:py-10">
              <p className={`md:col-span-2 ${MONO_LABEL}`}>Challenge</p>
              <p className={BIG_TEXT}>{project.projectDetails.challenge}</p>
            </div>
          ) : null}

          {project.galleryImages.slice(0, 1).map((image) => (
            <Picture key={image.src} image={image} sizes="100vw" className="block w-full h-auto bg-secondary" />
          ))}

          {project.projectDetails.solution ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-4 md:py-10">
              <p className={`md:col-span-2 ${MONO_LABEL}`}>Solution</p>
              <p className={BIG_TEXT}>{project.projectDetails.solution}</p>
            </div>
          ) : null}

          {project.galleryImages.slice(1).map((image) => (
            <Picture key={image.src} image={image} sizes="100vw" className="block w-full h-auto bg-secondary" />
          ))}

          {demo ? (
            <div className="flex justify-center py-4 md:py-8">
              <CircleArrowLink href={demo} external direction="out">
                Explore Project
              </CircleArrowLink>
            </div>
          ) : null}
        </div>

        <nav
          aria-label="More projects"
          className="mt-20 md:mt-28 border-t border-border pt-6 pb-20 md:pb-28 grid grid-cols-2 md:grid-cols-3 items-baseline gap-6"
        >
          <Link href="/work" className="group relative text-sm font-medium justify-self-start order-3 md:order-1 col-span-2 md:col-span-1">
            All work
            <span className={HOVER_LINE} />
          </Link>
          {previous ? (
            <Link href={`/work/${previous.slug}`} className="group order-1 md:order-2 md:justify-self-center md:text-center">
              <span className="block font-mono text-[10px] uppercase text-muted-foreground">Previous project</span>
              <span className="relative inline-block text-lg md:text-2xl font-medium tracking-[-0.02em] mt-1">
                {previous.title}
                <span className={HOVER_LINE} />
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group text-right order-2 md:order-3 justify-self-end">
              <span className="block font-mono text-[10px] uppercase text-muted-foreground">Next project</span>
              <span className="relative inline-block text-lg md:text-2xl font-medium tracking-[-0.02em] mt-1">
                {next.title}
                <span className={HOVER_LINE} />
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
      <Footer />
    </main>
  );
}
