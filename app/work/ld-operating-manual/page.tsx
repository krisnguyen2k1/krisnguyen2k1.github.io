import type { Metadata } from "next";
import { CaseLayout } from "@/components/CaseLayout";
import Content from "@/content/case-studies/ld-operating-manual.mdx";
import { caseStudies } from "@/lib/content";

const study = caseStudies.find((item) => item.slug === "ld-operating-manual")!;

export const metadata: Metadata = {
  title: study.title,
  description: study.summary,
  robots: { index: false, follow: false },
};

export default function ManualCasePage() {
  return <CaseLayout study={study}><Content /></CaseLayout>;
}
