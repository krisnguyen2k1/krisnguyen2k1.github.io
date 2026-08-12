import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-inverse py-10 text-inverse-text">
      <div className="shell grid gap-8 text-sm md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-serif text-lg font-medium">Kris Nguyen</p>
          <p className="mt-1 max-w-xl text-sand">
            Learning systems, evidence-minded programme design and practical digital work.
          </p>
          <p className="mt-4 text-sand">© {new Date().getFullYear()} Nguyen Trung Kien</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          <a className="text-inverse-text underline underline-offset-4 hover:text-sand" href={`mailto:${site.email}`}>
            Email
          </a>
          <a className="text-inverse-text underline underline-offset-4 hover:text-sand" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link className="text-inverse-text underline underline-offset-4 hover:text-sand" href="/writing/">
            Writing
          </Link>
        </div>
      </div>
    </footer>
  );
}
