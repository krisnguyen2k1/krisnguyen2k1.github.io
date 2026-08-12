import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing",
  description: "Editorial and research writing by Kris Nguyen.",
  robots: { index: false, follow: true },
};

export default function WritingPage() {
  return (
    <main id="main-content" className="section-pad shell">
      <p className="eyebrow">Writing</p>
      <h1 className="page-title mt-5 max-w-4xl">A focused writing selection is being prepared.</h1>
      <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
        My published digital work already includes long-form research, biographies, historical synthesis and Vietnamese editorial writing. A separate writing index will be added when the source list and contribution boundaries are confirmed.
      </p>
      <Link href="/digital-work/" className="button-secondary mt-8">View published digital work</Link>
    </main>
  );
}
