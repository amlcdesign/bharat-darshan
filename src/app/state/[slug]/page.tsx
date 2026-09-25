import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INDIA_MAP } from "@/data/india-states";
import { STATE_INFO } from "@/data/state-info";
import { StateView } from "@/components/state-view";

export async function generateStaticParams() {
  return INDIA_MAP.states.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = INDIA_MAP.states.find((s) => s.id === slug);
  if (!state) return { title: "State not found" };
  return { title: `${state.name} — Districts` };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = INDIA_MAP.states.find((s) => s.id === slug);
  if (!state) notFound();
  const info = STATE_INFO[slug];

  return (
    <StateView
      stateId={state.id}
      stateName={state.name}
      info={info ?? null}
    />
  );
}
