import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { INDIA_MAP } from "@/data/india-states";
import { STATE_INFO } from "@/data/state-info";
import { DistrictView } from "@/components/district-view";

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; district: string }>;
}): Promise<Metadata> {
  const { slug, district } = await params;
  const state = INDIA_MAP.states.find((s) => s.id === slug);
  const name = titleCase(district);
  return { title: state ? `${name}, ${state.name}` : name };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ slug: string; district: string }>;
}) {
  const { slug, district } = await params;
  const state = INDIA_MAP.states.find((s) => s.id === slug);
  if (!state) notFound();

  const valid = await districtExists(slug, district);
  if (!valid) notFound();

  const stateInfo = STATE_INFO[slug] ?? null;

  return (
    <DistrictView
      stateId={slug}
      stateName={state.name}
      districtSlug={district}
      stateInfo={stateInfo}
    />
  );
}

async function districtExists(stateId: string, districtSlug: string) {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "public", "districts", `${stateId}.json`),
      "utf8",
    );
    const data = JSON.parse(raw) as { districts: { slug: string }[] };
    return data.districts.some((d) => d.slug === districtSlug);
  } catch {
    return false;
  }
}
