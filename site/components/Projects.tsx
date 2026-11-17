import { featuredProjects } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { FeaturedCard } from "./WorkCards";
import { CircleArrowLink } from "./links";

// Home section: only published projects marked `featured` in content/projects.ts.
export function Projects({ number }: { number: string }) {
  return (
    <Section id="work" title="Selected work." number={number}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-6 gap-y-10 md:gap-y-12">
        {featuredProjects.map((project, i) => (
          // The right-hand card of each row starts slightly later.
          <Reveal key={project.slug} y={30} duration={0.6} delay={(i % 2) * 0.08}>
            <FeaturedCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15} className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
        <CircleArrowLink href="/work">Explore All Projects</CircleArrowLink>
      </Reveal>
    </Section>
  );
}
