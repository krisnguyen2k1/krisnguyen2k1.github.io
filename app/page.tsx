import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { CaseCard } from "@/components/CaseCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, DarkCta, MetricBlock } from "@/components/ui";
import { articles, caseStudies, selectedProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="section-pad">
        <div className="shell">
          <p className="eyebrow">Learning systems and L&D operations</p>
          <h1 className="display mt-6 max-w-[14ch]">
            I turn operating needs into learning systems people can use and leaders can trust.
          </h1>
          <p className="mt-8 max-w-prose text-lead text-secondary">
            I work across learning operations, programme design, documentation and digital interaction in hospitality. I make the decisions, instructions and evidence behind the work easier to inspect.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <ButtonLink href="/work/">View case studies</ButtonLink>
            <Link href="/about/" className="text-link">About my practice</Link>
          </div>
        </div>
      </section>

      <section className="section-rule py-12 md:py-16" aria-labelledby="evidence-heading">
        <div className="shell">
          <h2 id="evidence-heading" className="sr-only">Evidence at a glance</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <MetricBlock eyebrow="Operating documentation" value="150 pages" label="Candidate-reported L&D reference built from six knowledge sources." />
            <MetricBlock eyebrow="Published digital work" value="10 products" label="Live projects spanning learning, research, data and long-form publishing." />
            <MetricBlock eyebrow="Verified interaction" value="10 clues" label="Mechanics in a working team challenge built for Culture Week." />
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="work-heading">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Selected L&D work</p>
                <h2 id="work-heading" className="section-title mt-4">Systems, decisions and participation.</h2>
              </div>
              <Link href="/work/" className="text-link">View work overview</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Reveal key={study.slug} className="h-full">
                <CaseCard study={study} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-prose text-sm leading-6 text-secondary">
            Detailed case pages remain outside public navigation until redacted artifacts and contribution boundaries are confirmed.
          </p>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="digital-heading">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">Selected digital work</p>
            <h2 id="digital-heading" className="section-title mt-4 max-w-3xl">
              Digital work that makes complex material easier to navigate.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {selectedProjects.map((project) => (
              <Reveal key={project.href} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/digital-work/" variant="secondary">Browse all digital work</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border" aria-labelledby="approach-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 id="approach-heading" className="section-title mt-4">Make the work clear enough to run again.</h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            {[
              ["Start with the operating decision", "I define what a person needs to decide or do before choosing a format."],
              ["Separate output from effect", "A finished document is evidence of production. Adoption and business effect require their own proof."],
              ["Design for handover", "Names, ownership and update rules matter when the work must continue after its author steps away."],
              ["Escalate ambiguity", "When the source data cannot support a reliable decision, I record the gap and ask the right owner."],
            ].map(([title, copy], index) => (
              <article key={title} className="border-t border-border pt-5">
                <p className="eyebrow">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-h3 font-medium">{title}</h3>
                <p className="mt-2 text-secondary">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="about-home-heading">
        <div className="shell grid gap-10 md:grid-cols-[18rem_1fr] md:items-center lg:gap-16">
          <div>
            <Image
              src="/assets/portrait.webp"
              alt="Portrait of Kris Nguyen"
              width={576}
              height={720}
              className="aspect-[4/5] w-full rounded-card object-cover grayscale-[15%]"
            />
          </div>
          <div>
            <p className="eyebrow">About</p>
            <h2 id="about-home-heading" className="section-title mt-4 max-w-2xl">
              Close to the operation, deliberate about the system.
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-8 text-secondary">
              I am a Learning and Development Coordinator at The Westin Resort & Spa Cam Ranh. My background across hospitality, education and commercial coordination shaped a practical view of learning: it must fit the work, leave a reliable record and remain understandable after handover.
            </p>
            <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
              <div><dt className="eyebrow">Currently</dt><dd className="mt-2 text-sm text-secondary">Property-level L&D operations</dd></div>
              <div><dt className="eyebrow">Previously</dt><dd className="mt-2 text-sm text-secondary">Education and sales coordination</dd></div>
              <div><dt className="eyebrow">Alongside</dt><dd className="mt-2 text-sm text-secondary">Tri Thuc Books and digital publishing</dd></div>
            </dl>
            <Link href="/about/" className="text-link mt-8 inline-block">Read the full profile</Link>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border" aria-labelledby="writing-heading">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Writing and research</p>
              <h2 id="writing-heading" className="section-title mt-4">Published long-form work.</h2>
            </div>
            <Link href="/digital-work/" className="text-link">Browse all digital work</Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {articles.map((article) => <ArticleCard key={article.href} article={article} />)}
          </div>
        </div>
      </section>

      <DarkCta
        title="Have an operating need that should become a usable learning system?"
        copy="I am open to L&D Specialist opportunities in large multinational and enterprise organisations."
        href={`mailto:${site.email}?subject=L%26D%20opportunity`}
        label="Start a conversation"
      />
    </main>
  );
}
