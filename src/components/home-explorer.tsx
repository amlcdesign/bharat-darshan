"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { IndiaMap } from "@/components/map/india-map";
import { INDIA_MAP } from "@/data/india-states";
import { STATE_INFO } from "@/data/state-info";

export function HomeExplorer() {
  const [query, setQuery] = useState("");

  const states = useMemo(() => INDIA_MAP.states, []);
  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      q
        ? states.filter((s) => s.name.toLowerCase().includes(q))
        : states,
    [states, q],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--ink-soft)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a state — e.g. Kerala, Ladakh…"
            className="w-full rounded-full border border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-[color-mix(in_srgb,var(--card)_85%,transparent)] py-2.5 pr-4 pl-9 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--marigold)]"
          />
        </label>
        <p className="text-xs tracking-wide text-[var(--ink-soft)] uppercase">
          {states.length} states &amp; union territories · 760 districts
        </p>
      </div>

      <div className="paper-card overflow-hidden p-2 sm:p-4">
        <IndiaMap query={query} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const info = STATE_INFO[s.id];
          return (
            <Link
              key={s.id}
              href={`/state/${s.id}`}
              className="paper-card group flex flex-col gap-1.5 p-4 transition hover:-translate-y-0.5 hover:border-[var(--marigold)]"
            >
              <span className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-[var(--ink)]">
                  {s.name}
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--ink-soft)] transition group-hover:translate-x-0.5 group-hover:text-[var(--marigold)]" />
              </span>
              {info && (
                <span className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <MapPin className="h-3 w-3" /> {info.capital}
                </span>
              )}
              {info && (
                <span className="line-clamp-2 text-sm text-[var(--ink-soft)]">
                  {info.knownFor}
                </span>
              )}
            </Link>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-[var(--ink-soft)]">
          No state matches “{query}”.
        </p>
      )}
    </section>
  );
}
