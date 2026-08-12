import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";
import { DarkCta } from "@/components/ui";
import { caseStudies, supportingWork } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected L&D systems, learning data work and experience design by Kris Nguyen.",
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <header className="section-pad">
        <div className="shell">
          <p className="eyebrow">Work</p>
          <h1 className="page-title mt-5 max-w-4xl">Selected systems for learning operations.</h1>
          <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
            Three workstreams show how I structure operating knowledge, make learning decisions and design participation. Public depth pages will open when each evidence gate is met.
          </p>
        </div>
      </header>

      <section className="section-pad bg-surface" aria-labelledby="cases-heading">
        <div className="shell">
          <h2 id="cases-heading" className="sr-only">Case studies</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => <CaseCard key={study.slug} study={study} />)}
          </div>
          <div className="mt-8 rounded-card border border-border bg-canvas p-5 md:p-6">
            <p className="eyebrow">Publication standard</p>
            <p className="mt-3 max-w-prose text-secondary">
              No case claims adoption or business effect without supporting evidence. Sensitive files and workplace photographs remain withheld until redaction and publication rights are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="supporting-heading">
        <div className="shell">
          <p className="eyebrow">Supporting work</p>
          <h2 id="supporting-heading" className="section-title mt-4">The operating layer around the programmes.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2">
            {supportingWork.map((item) => (
              <article key={item.title} className="border-t border-border py-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-secondary">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DarkCta
        title="Looking for an L&D specialist who connects detail with operating context?"
        copy="I would be glad to discuss the systems, decisions and evidence behind this work."
        href={`mailto:${site.email}?subject=Portfolio%20conversation`}
        label="Email Kris"
      />
    </main>
  );
}
