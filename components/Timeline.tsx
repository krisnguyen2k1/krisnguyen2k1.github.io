import { timeline } from "@/lib/content";

export function Timeline() {
  return (
    <ol className="border-t border-border">
      {timeline.map((item) => (
        <li key={`${item.dates}-${item.role}`} className="grid gap-3 border-b border-border py-7 md:grid-cols-[12rem_1fr] md:gap-8">
          <p className="eyebrow pt-1">{item.dates}</p>
          <div>
            <h3 className="text-lg font-semibold">{item.role}</h3>
            <p className="mt-1 font-medium text-secondary">{item.organisation}</p>
            <p className="mt-3 max-w-prose text-secondary">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
