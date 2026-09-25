"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  UtensilsCrossed,
  Languages,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { DistrictMap, type DistrictMapData } from "@/components/map/district-map";
import type { StateInfo } from "@/data/state-info";

export function StateView({
  stateId,
  stateName,
  info,
}: {
  stateId: string;
  stateName: string;
  info: StateInfo | null;
}) {
  const [data, setData] = useState<DistrictMapData | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let alive = true;
    setData(null);
    setError(false);
    fetch(`/districts/${stateId}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: DistrictMapData) => alive && setData(j))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [stateId]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      data
        ? q
          ? data.districts.filter((d) => d.name.toLowerCase().includes(q))
          : data.districts
        : [],
    [data, q],
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--terracotta)]"
      >
        <ArrowLeft className="h-4 w-4" /> All states
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
          {stateName}
        </h1>
        {info && (
          <p className="mt-2 max-w-3xl text-[var(--ink-soft)]">{info.about}</p>
        )}
      </header>

      {info && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Fact icon={MapPin} label="Capital" value={info.capital} />
          <Fact icon={Languages} label="Languages" value={info.languages} />
          <Fact icon={UtensilsCrossed} label="Must try" value={info.cuisine} />
          <Fact icon={CalendarDays} label="Best time" value={info.bestTime} />
        </div>
      )}

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="paper-card overflow-hidden p-2 sm:p-4">
          {error && (
            <p className="p-10 text-center text-sm text-[var(--ink-soft)]">
              District map unavailable for this state.
            </p>
          )}
          {!error && !data && (
            <div className="grid min-h-72 place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--ink-soft)]" />
            </div>
          )}
          {data && <DistrictMap data={data} />}
          {data && (
            <p className="pt-2 text-center text-xs text-[var(--ink-soft)]">
              {data.districts.length} districts — tap any district to explore
            </p>
          )}
        </div>

        <aside className="flex flex-col gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a district…"
            className="w-full rounded-full border border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-[color-mix(in_srgb,var(--card)_85%,transparent)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)] focus:border-[var(--marigold)]"
          />
          <div className="paper-card max-h-[26rem] overflow-y-auto p-2">
            {filtered.map((d) => (
              <Link
                key={d.slug}
                href={`/state/${stateId}/${d.slug}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--ink)] transition hover:bg-[color-mix(in_srgb,var(--marigold)_18%,transparent)]"
              >
                <span>{d.name}</span>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-[var(--ink-soft)]">
                No district matches “{query}”.
              </p>
            )}
          </div>
          <p className="text-xs text-[var(--ink-soft)]">
            Tap a district to open its page — detailed guides arrive in the
            next update.
          </p>
        </aside>
      </section>

      {info && (
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="paper-card p-5">
            <h2 className="font-display text-lg font-semibold text-[var(--ink)]">
              Signature festival
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {info.festival}
            </p>
          </div>
          <div className="paper-card p-5">
            <h2 className="font-display text-lg font-semibold text-[var(--ink)]">
              Known for
            </h2>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {info.knownFor}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="paper-card p-4">
      <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--ink-soft)] uppercase">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1.5 text-sm leading-snug text-[var(--ink)]">{value}</p>
    </div>
  );
}
