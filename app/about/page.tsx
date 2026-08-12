import type { Metadata } from "next";
import Image from "next/image";
import { Timeline } from "@/components/Timeline";
import { ButtonLink, DarkCta } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Kris Nguyen, an L&D professional working across operations, documentation and digital learning.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <header className="section-pad">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="page-title mt-5 max-w-4xl">I build the operating layer that helps learning work repeatably.</h1>
            <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
              My practice sits where learning, documentation and day-to-day operations meet. I care about the decisions behind an assignment, the instructions behind a programme and the evidence behind a claim.
            </p>
          </div>
          <Image
            src="/assets/portrait.webp"
            alt="Portrait of Kris Nguyen"
            width={576}
            height={720}
            className="aspect-[4/5] w-full max-w-[20rem] rounded-card bg-surface object-cover"
          />
        </div>
      </header>

      <section className="section-pad bg-surface" aria-labelledby="practice-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Professional practice</p>
            <h2 id="practice-heading" className="section-title mt-4">Close to the work, clear about the evidence.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-secondary">
            <p>
              Hospitality taught me that a learning programme does not operate alone. It depends on staffing, schedules, compliance requirements, department decisions, accurate records and communication that reaches people at the right moment.
            </p>
            <p>
              My earlier work in education and commercial coordination strengthened the same habits: explain clearly, maintain the record and follow a request through the handover points that can otherwise be missed.
            </p>
            <p>
              Outside my formal role, I maintain Tri Thuc Books and publish independent digital projects. Both keep me close to readers, users and the practical limits of information design.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <ButtonLink href={site.bookstore} variant="secondary" external>Visit Tri Thuc Books</ButtonLink>
              <ButtonLink href={site.linkedin} variant="secondary" external>View LinkedIn</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="experience-heading">
        <div className="shell">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-heading" className="section-title mt-4">Work history</h2>
          <div className="mt-10"><Timeline /></div>
        </div>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="education-about-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Education & credentials</p>
            <h2 id="education-about-heading" className="section-title mt-4">
              Hospitality, psychology and English language.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-secondary">
              My formal education spans hotel management, psychology and English language, supported by credentials in tertiary pedagogy, psychological counselling and English-language tour guiding.
            </p>
            <div className="mt-7">
              <ButtonLink href="/education/" variant="secondary">View education and credentials</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border" aria-labelledby="next-role-heading">
        <div className="shell grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <h2 id="next-role-heading" className="section-title">What I am looking for next.</h2>
          <div>
            <p className="text-lg leading-8 text-secondary">
              Over the next 6 to 12 months, my priority is an L&D Specialist role in a large multinational or enterprise organisation where I can own defined workstreams, learn from mature systems and contribute close to operations.
            </p>
            <p className="mt-5 text-secondary">
              I am especially interested in learning operations, programme coordination, content systems and digital learning support.
            </p>
          </div>
        </div>
      </section>

      <DarkCta
        title="Let us compare the role with the work I do best."
        copy={`Email ${site.email} or call ${site.phoneDisplay}.`}
        href={`mailto:${site.email}?subject=L%26D%20role`}
        label="Contact Kris"
      />
    </main>
  );
}
