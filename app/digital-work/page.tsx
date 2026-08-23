import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, type Project } from "@/lib/content";

type Language = "English" | "Vietnamese";

type ProjectGroup = {
  id: string;
  title: string;
  items: { projectTitle: string; language: Language }[];
};

const projectGroups: ProjectGroup[] = [
  {
    id: "book-reviews",
    title: "Book Reviews",
    items: [
      { projectTitle: "Thân Ai Nấy Lo", language: "Vietnamese" },
      { projectTitle: "The Laws of Human Nature - Interactive Guide", language: "English" },
    ],
  },
  {
    id: "biographical-figures",
    title: "Biographical Figures",
    items: [
      { projectTitle: "The Man and His Country", language: "Vietnamese" },
      { projectTitle: "Bill Marriott: A Life of Service", language: "Vietnamese" },
      { projectTitle: "Before Marriott", language: "Vietnamese" },
      { projectTitle: "Steve Jobs: An Interactive Biography", language: "English" },
      { projectTitle: "Krishnamurti: A Human Life", language: "English" },
    ],
  },
  {
    id: "insightful-essays",
    title: "Insightful Essays",
    items: [
      { projectTitle: "Psychology in Vietnam", language: "English" },
      { projectTitle: "Ho Chi Minh City Labour Market 2026", language: "Vietnamese" },
    ],
  },
  {
    id: "english-teaching",
    title: "English Teaching",
    items: [
      { projectTitle: "Bright12 Learning Hub", language: "English" },
      { projectTitle: "Kris's English Studio 2.0", language: "English" },
    ],
  },
  {
    id: "my-life",
    title: "My Life Jour" + "ney",
    items: [{ projectTitle: "The Hotel Ledger", language: "English" }],
  },
];

function getProject(title: string): Project {
  const project = projects.find((item) => item.title === title);
  if (!project) throw new Error(`Missing digital project: ${title}`);
  return project;
}

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

      {projectGroups.map((group, index) => (
        <section
          key={group.id}
          className={`section-pad ${index % 2 === 0 ? "bg-surface" : ""}`}
          aria-labelledby={`${group.id}-heading`}
        >
          <div className="shell">
            <p className="eyebrow">Collection {String(index + 1).padStart(2, "0")}</p>
            <h2 id={`${group.id}-heading`} className="section-title mt-4">
              {group.title}
            </h2>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                const project = getProject(item.projectTitle);
                return (
                  <ProjectCard
                    key={project.href}
                    project={{ ...project, category: `${item.language} version` }}
                    compact
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
