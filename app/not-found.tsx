import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="shell py-24 md:py-32">
      <p className="eyebrow">404</p>
      <h1 className="page-title mt-5">This page is not in the system.</h1>
      <p className="mt-6 max-w-xl text-lg text-secondary">The address may have changed, or the page may still be under evidence review.</p>
      <Link href="/" className="button-primary mt-8">Return home</Link>
    </main>
  );
}
