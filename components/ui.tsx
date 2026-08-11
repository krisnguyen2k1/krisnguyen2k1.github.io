import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const className = variant === "primary" ? "button-primary" : "button-secondary";
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function TagPill({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function MetricBlock({ eyebrow, value, label }: { eyebrow: string; value: string; label: string }) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <p className="font-serif text-4xl font-medium leading-none tracking-[-0.04em]">{value}</p>
      <p className="mt-2 max-w-[18rem] text-sm leading-6 text-secondary">{label}</p>
    </div>
  );
}

export function InlineCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="my-10 max-w-prose rounded-card border border-border bg-surface p-5 text-secondary">
      <p className="eyebrow mb-2 text-primary">Evidence note</p>
      {children}
    </aside>
  );
}

export function DarkCta({
  title,
  copy,
  href,
  label,
}: {
  title: string;
  copy: string;
  href: string;
  label: string;
}) {
  return (
    <section className="section-pad bg-inverse text-inverse-text">
      <div className="shell grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow !text-sand">Next conversation</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-prose text-sand">{copy}</p>
        </div>
        <a className="button-primary shrink-0" href={href}>
          {label}
        </a>
      </div>
    </section>
  );
}
