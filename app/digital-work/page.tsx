import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { selectedProjects, secondaryProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Digital work",
  description: "Web products by Kris Nguyen across learning interaction, research, data and long-form publishing.",
};

export default function DigitalWorkPage() {
  return (
    <main id="main-content">
      <header className="section-pad">
        <div className="shell">
          <p className="eyebrow">Digital work</p>
          <h1 className="page-title mt-5 max-w-4xl">Research, learning and information made usable on the web.</h1>
          <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
            These live projects show how I structure long material, design interaction and publish work for real use.
          </p>
        </div>
      </header>

      <section className="section-pad bg-surface" aria-labelledby="selected-projects">
        <div className="shell">
          <h2 id="selected-projects" className="section-title">Selected projects</h2>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {selectedProjects.map((project) => <ProjectCard key={project.href} project={project} />)}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="more-projects">
        <div className="shell">
          <p className="eyebrow">More published work</p>
          <h2 id="more-projects" className="section-title mt-4">A wider editorial practice.</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project) => <ProjectCard key={project.href} project={project} compact />)}
          </div>
        </div>
      </section>
    </main>
  );
}
