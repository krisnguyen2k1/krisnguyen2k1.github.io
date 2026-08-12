import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DarkCta, MetricBlock, TagPill } from "@/components/ui";
import { certifications, formalEducation, languageProficiency } from "@/lib/education";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Education & Credentials",
  description:
    "Formal education, professional certifications and English proficiency for Kris Nguyen.",
};

export default function EducationPage() {
  return (
    <main id="main-content">
      <header className="section-pad">
        <div className="shell">
          <p className="eyebrow">Education & credentials</p>
          <h1 className="page-title mt-5 max-w-4xl">
            Hospitality, psychology and language shape how I approach learning at work.
          </h1>
          <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
            My academic background combines operating context, an understanding of people and the language skills needed to make learning clear across audiences.
          </p>
        </div>
      </header>

      <section className="section-rule py-12 md:py-16" aria-labelledby="education-summary-heading">
        <div className="shell">
          <h2 id="education-summary-heading" className="sr-only">Education and credential summary</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <MetricBlock eyebrow="Academic path" value="3 programmes" label="Hospitality management, psychology and English language." />
            <MetricBlock eyebrow="Additional credentials" value="3 certificates" label="Tour guiding, tertiary pedagogy and school counselling." />
            <MetricBlock eyebrow="English proficiency" value="IELTS 6.5" label="English-language assessment reported by the candidate." />
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface" aria-labelledby="formal-education-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <p className="eyebrow">Formal education</p>
            <h2 id="formal-education-heading" className="section-title mt-4">
              A multidisciplinary academic foundation.
            </h2>
          </Reveal>

          <ol className="border-t border-border">
            {formalEducation.map((item, index) => (
              <li key={item.degree} className="border-b border-border py-7">
                <Reveal>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="eyebrow">0{index + 1} / {item.dates}</p>
                    <TagPill>{item.status}</TagPill>
                  </div>
                  <h3 className="mt-4 font-serif text-h3 font-medium">{item.degree}</h3>
                  <p className="mt-2 font-medium text-secondary">{item.institution}</p>
                  <dl className="mt-5 grid gap-2 sm:grid-cols-[9rem_1fr]">
                    <dt className="eyebrow">{item.gpaLabel}</dt>
                    <dd className="font-medium">{item.gpa}</dd>
                  </dl>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="credentials-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">Other certifications</p>
            <h2 id="credentials-heading" className="section-title mt-4">
              Skills that support facilitation, guidance and learner care.
            </h2>
          </div>
          <ul className="border-t border-border">
            {certifications.map((certification, index) => (
              <li key={certification} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_1fr]">
                <p className="eyebrow pt-1">0{index + 1}</p>
                <p className="text-lg font-medium">{certification}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad border-t border-border" aria-labelledby="language-heading">
        <div className="shell grid gap-10 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <div>
            <p className="eyebrow">Foreign language proficiency</p>
            <h2 id="language-heading" className="section-title mt-4">English</h2>
          </div>
          <div className="border-l-2 border-accent pl-5">
            <p className="eyebrow">{languageProficiency.assessment}</p>
            <p className="mt-3 font-serif text-5xl font-medium leading-none tracking-[-0.04em]">
              {languageProficiency.score}
            </p>
            <p className="mt-3 max-w-prose text-secondary">
              Reported English proficiency score supporting study, communication and learning work in an international hospitality environment.
            </p>
          </div>
        </div>
      </section>

      <DarkCta
        title="Looking for an L&D professional with a multidisciplinary foundation?"
        copy={`Email ${site.email} or call ${site.phoneDisplay}.`}
        href={`mailto:${site.email}?subject=L%26D%20opportunity`}
        label="Contact Kris"
      />
    </main>
  );
}
