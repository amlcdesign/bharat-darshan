"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { INDIA_MAP } from "@/data/india-states";

const PALETTE = [
  "#8ca88f", "#7f9db4", "#c9a26d", "#b48a7e", "#9aa4b1",
  "#a3b07f", "#c78f5e", "#7ba8a0", "#b5979b", "#8f9e6f",
  "#a98f6d", "#7d99a8", "#bd9a82", "#93a58c", "#a8878f",
  "#7f9e9a", "#bfa27b", "#8d9db0", "#a4a08c", "#8a97a5",
];

export function IndiaMap({ query }: { query: string }) {
  const router = useRouter();
  const [tip, setTip] = useState<{ x: number; y: number; label: string } | null>(
    null,
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const states = useMemo(() => INDIA_MAP.states, []);
  const q = query.trim().toLowerCase();

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${INDIA_MAP.width} ${INDIA_MAP.height}`}
        className="mx-auto block h-auto w-full max-w-3xl"
        role="img"
        aria-label="Interactive map of India by state"
        onMouseLeave={() => setTip(null)}
        onMouseMove={(e) => {
          setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
        }}
      >
        {states.map((s, i) => {
          const dimmed = q.length > 0 && !s.name.toLowerCase().includes(q);
          return (
            <g
              key={s.id}
              className={`state-group ${dimmed ? "dimmed" : ""}`}
              style={{ ["--state-fill" as string]: PALETTE[i % PALETTE.length] }}
              tabIndex={0}
              role="link"
              aria-label={`View ${s.name} districts`}
              onMouseEnter={() => setTip((t) => (t ? { ...t, label: s.name } : null))}
              onMouseMove={(e) =>
                setTip({ x: e.clientX, y: e.clientY, label: s.name })
              }
              onFocus={() => setTip(null)}
              onClick={() => router.push(`/state/${s.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/state/${s.id}`);
                }
              }}
            >
              {s.paths.map((d, j) => (
                <path key={j} d={d} className="state-shape" />
              ))}
            </g>
          );
        })}
      </svg>
      {tip && (
        <div className="map-tooltip" style={{ left: tip.x, top: tip.y }}>
          {tip.label}
        </div>
      )}
    </div>
  );
}
