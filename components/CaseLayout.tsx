import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import { InlineCallout, MetricBlock, TagPill } from "@/components/ui";

export function CaseLayout({ study, children }: { study: CaseStudy; children: ReactNode }) {
  return (
    <>
      <header className="section-pad border-b border-border">
        <div className="shell">
          <Link href="/work/" className="text-link text-sm">
            Back to work
          </Link>
          <p className="eyebrow mt-12">{study.eyebrow}</p>
          <h1 className="page-title mt-5 max-w-5xl">{study.title}</h1>
          <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">{study.summary}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </div>
      </header>
      <main id="main-content" className="section-pad shell">
        <InlineCallout>{study.evidence}</InlineCallout>
        <section aria-label="Case evidence metrics" className="my-12 grid gap-8 border-y border-border py-8 md:grid-cols-3">
          {study.metrics.map((metric) => <MetricBlock key={metric.eyebrow} {...metric} />)}
        </section>
        <figure className="my-12 max-w-prose rounded-card border border-border bg-surface p-6">
          <div className="grid min-h-48 place-items-center rounded-button border border-dashed border-border-strong bg-canvas p-6 text-center">
            <div>
              <p className="eyebrow">Artifact publication gate</p>
              <p className="mt-3 text-secondary">A redacted artifact will appear here after confidentiality, ownership and publication rights are confirmed.</p>
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-secondary">The case structure is complete. Sensitive evidence remains outside the public build.</figcaption>
        </figure>
        <article className="case-copy">{children}</article>
      </main>
    </>
  );
}
