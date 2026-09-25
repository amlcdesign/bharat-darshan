"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, MapPin, Clock3 } from "lucide-react";
import { DistrictMap, type DistrictMapData } from "@/components/map/district-map";
import type { StateInfo } from "@/data/state-info";

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export function DistrictView({
  stateId,
  stateName,
  districtSlug,
  stateInfo,
}: {
  stateId: string;
  stateName: string;
  districtSlug: string;
  stateInfo: StateInfo | null;
}) {
  const [data, setData] = useState<DistrictMapData | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/districts/${stateId}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: DistrictMapData) => alive && setData(j))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [stateId]);

  const name = titleCase(districtSlug);

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6 pb-20">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--ink-soft)]">
        <Link href="/" className="transition hover:text-[var(--terracotta)]">
          India
        </Link>
        <span>/</span>
        <Link
          href={`/state/${stateId}`}
          className="transition hover:text-[var(--terracotta)]"
        >
          {stateName}
        </Link>
        <span>/</span>
        <span className="font-medium text-[var(--ink)]">{name}</span>
      </nav>

      <header className="mt-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
          {name}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-[var(--ink-soft)]">
          <MapPin className="h-4 w-4" /> District of {stateName}
        </p>
      </header>

      <section className="paper-card mt-8 flex flex-col items-center gap-3 p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[color-mix(in_srgb,var(--marigold)_30%,transparent)] text-[var(--ink)]">
          <Clock3 className="h-5 w-5" />
        </span>
        <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
          District guide coming soon
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-[var(--ink-soft)]">
          Detailed highlights for {name} — tourist attractions, major markets,
          scenic spots, food joints and culture — are being curated and will
          arrive in the next update. The full map of {stateName} is ready to
          explore in the meantime.
        </p>
        <Link
          href={`/state/${stateId}`}
          className="mt-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--paper)] transition hover:bg-[var(--terracotta)]"
        >
          Back to {stateName} districts
        </Link>
      </section>

      {stateInfo && (
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="paper-card p-5">
            <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--ink-soft)] uppercase">
              {stateName} is known for
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
              {stateInfo.knownFor}
            </p>
          </div>
          <div className="paper-card p-5">
            <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--ink-soft)] uppercase">
              Eat like a local in {stateName}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
              {stateInfo.cuisine}
            </p>
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
          {name} within {stateName}
        </h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Tap a neighbouring district to jump there.
        </p>
        <div className="paper-card mt-4 overflow-hidden p-2 sm:p-4">
          {data ? (
            <DistrictMap data={data} highlightSlug={districtSlug} />
          ) : (
            <div className="grid min-h-64 place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--ink-soft)]" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
