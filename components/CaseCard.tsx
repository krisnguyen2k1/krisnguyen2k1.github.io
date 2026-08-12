import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { TagPill } from "@/components/ui";

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="card relative flex h-full flex-col p-6 md:p-7">
      <p className="eyebrow">{study.eyebrow}</p>
      <h3 className="mt-5 font-serif text-h3 font-medium">
        {study.publicReady ? (
          <Link href={`/work/${study.slug}/`} className="after:absolute after:inset-0">
            {study.title}
          </Link>
        ) : (
          study.title
        )}
      </h3>
      <p className="mt-4 text-secondary">{study.summary}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </div>
      <p className="mt-auto pt-8 text-sm font-medium text-accent-press">
        {study.publicReady ? "Read case study" : "Evidence review in progress"}
      </p>
    </article>
  );
}
