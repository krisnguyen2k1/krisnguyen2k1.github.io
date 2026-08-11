import type { Metadata } from "next";
import { CaseLayout } from "@/components/CaseLayout";
import Content from "@/content/case-studies/marriott-culture-week.mdx";
import { caseStudies } from "@/lib/content";

const study = caseStudies.find((item) => item.slug === "marriott-culture-week")!;

export const metadata: Metadata = {
  title: study.title,
  description: study.summary,
  robots: { index: false, follow: false },
};

export default function CultureWeekCasePage() {
  return <CaseLayout study={study}><Content /></CaseLayout>;
}
