import Link from "next/link";
import { HomeExplorer } from "@/components/home-explorer";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:pt-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[var(--terracotta)] uppercase">
          An atlas you can hold in your pocket
        </p>
        <h1 className="font-display text-4xl leading-tight font-semibold tracking-tight text-[var(--ink)] sm:text-6xl">
          India, <em className="not-italic text-[var(--terracotta)]">state</em> by
          state, <em className="not-italic text-[var(--terracotta)]">district</em>{" "}
          by district.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--ink-soft)] sm:text-lg">
          Tap any state on the map to open its district atlas — all 760
          districts, ready to explore. District guides with attractions,
          markets, scenic spots, food and culture arrive in the next update.
          Installable as an app and light enough to work offline.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="#atlas"
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 font-semibold text-[var(--paper)] transition hover:bg-[var(--terracotta)]"
          >
            Open the atlas
          </Link>
          <span className="text-[var(--ink-soft)]">
            Try Kerala, Rajasthan or Ladakh to begin.
          </span>
        </div>
      </section>

      <div id="atlas" className="scroll-mt-20">
        <HomeExplorer />
      </div>

      <p className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-[var(--ink-soft)]">
        State imagery via Wikipedia/Wikimedia Commons contributors.
      </p>
    </main>
  );
}
