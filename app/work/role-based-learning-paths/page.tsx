import type { Metadata } from "next";
import { CaseLayout } from "@/components/CaseLayout";
import Content from "@/content/case-studies/role-based-learning-paths.mdx";
import { caseStudies } from "@/lib/content";

const study = caseStudies.find((item) => item.slug === "role-based-learning-paths")!;

export const metadata: Metadata = {
  title: study.title,
  description: study.summary,
  robots: { index: false, follow: false },
};

export default function RolePathsCasePage() {
  return <CaseLayout study={study}><Content /></CaseLayout>;
}
