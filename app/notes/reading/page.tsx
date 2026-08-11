import type { Metadata } from "next";
import { ReadingArchive } from "@/components/ReadingArchive";
import { fiction, films, nonfiction } from "@/lib/reading-data";

export const metadata: Metadata = {
  title: "Reading archive",
  description: "Kris Nguyen's searchable archive of books and films.",
};

export default function ReadingPage() {
  return (
    <main id="main-content">
      <header className="section-pad">
        <div className="shell">
          <p className="eyebrow">Reading archive</p>
          <h1 className="page-title mt-5 max-w-4xl">Books and films that feed the wider practice.</h1>
          <p className="mt-7 max-w-prose text-xl leading-8 text-secondary">
            A personal record of fiction, non-fiction and cinema. Search the archive by title, creator or year.
          </p>
        </div>
      </header>
      <section className="bg-surface py-12 md:py-16" aria-labelledby="archive-heading">
        <div className="shell">
          <h2 id="archive-heading" className="sr-only">Searchable archive</h2>
          <ReadingArchive fiction={fiction} nonfiction={nonfiction} films={films} />
        </div>
      </section>
    </main>
  );
}
