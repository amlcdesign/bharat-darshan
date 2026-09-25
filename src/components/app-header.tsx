"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Compass, Moon, Sun } from "lucide-react";

export function AppHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] text-[var(--paper)]">
            <Compass className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--ink)]">
            Bharat Explorer
          </span>
        </Link>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="grid h-9 w-9 place-items-center rounded-full border border-[color-mix(in_srgb,var(--ink)_20%,transparent)] text-[var(--ink)] transition hover:bg-[color-mix(in_srgb,var(--marigold)_25%,transparent)]"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
