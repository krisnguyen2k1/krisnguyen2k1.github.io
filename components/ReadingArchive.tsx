"use client";

import { useMemo, useState } from "react";
import type { BookEntry, FilmEntry } from "@/lib/reading-data";

type View = "fiction" | "nonfiction" | "films";

export function ReadingArchive({
  fiction,
  nonfiction,
  films,
}: {
  fiction: BookEntry[];
  nonfiction: BookEntry[];
  films: FilmEntry[];
}) {
  const [view, setView] = useState<View>("fiction");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const normalised = query.trim().toLocaleLowerCase("vi");
    if (view === "films") {
      return films.filter((item) => `${item.title} ${item.year}`.toLocaleLowerCase("vi").includes(normalised));
    }
    const source = view === "fiction" ? fiction : nonfiction;
    return source.filter((item) => `${item.title} ${item.creator}`.toLocaleLowerCase("vi").includes(normalised));
  }, [fiction, films, nonfiction, query, view]);

  const counts = { fiction: fiction.length, nonfiction: nonfiction.length, films: films.length };

  return (
    <div>
      <div className="grid gap-4 border-y border-border py-5 md:grid-cols-[1fr_auto] md:items-center">
        <label className="block max-w-xl">
          <span className="sr-only">Search reading archive</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author or year"
            className="min-h-11 w-full rounded-button border border-secondary bg-canvas px-4 text-primary placeholder:text-secondary"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Archive category">
          {(["fiction", "nonfiction", "films"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              onClick={() => setView(option)}
              className={`min-h-11 rounded-button border px-3 text-sm font-medium ${
                view === option
                  ? "border-primary bg-primary text-inverse-text"
                  : "border-secondary bg-canvas text-secondary hover:text-primary"
              }`}
            >
              {option === "nonfiction" ? "Non-fiction" : option[0].toUpperCase() + option.slice(1)} {counts[option]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-secondary" aria-live="polite">
        Showing {items.length} {view === "films" ? "films" : "books"}
      </p>

      <ol className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const isFilm = "year" in item;
          return (
            <li key={`${item.title}-${index}`} className="border-t border-border py-4">
              <p className="font-medium leading-6">{item.title}</p>
              <p className="mt-1 text-sm text-secondary">
                {isFilm ? item.year : item.creator}
                {!isFilm && item.favourite > 0 ? " | Favourite" : ""}
              </p>
            </li>
          );
        })}
      </ol>

      {items.length === 0 && (
        <p className="rounded-card border border-border bg-surface p-5 text-secondary">
          No matching entry. Try a shorter title or a creator name.
        </p>
      )}
    </div>
  );
}
