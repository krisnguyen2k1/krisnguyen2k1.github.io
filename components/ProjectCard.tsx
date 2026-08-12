import type { Project } from "@/lib/content";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`card flex h-full flex-col ${compact ? "p-5" : "p-6 md:p-7"}`}>
      <p className="eyebrow">{project.category}</p>
      <h3 className={`${compact ? "mt-3 text-xl" : "mt-5 text-h3"} font-serif font-medium`}>
        <a href={project.href} target="_blank" rel="noreferrer">
          {project.title}
        </a>
      </h3>
      <p className="mt-3 text-sm leading-6 text-secondary">{project.summary}</p>
      {!compact && <p className="mt-5 text-sm text-secondary">{project.capability}</p>}
      <p className="mt-auto pt-6 text-sm font-medium text-accent-press">Open project</p>
    </article>
  );
}
