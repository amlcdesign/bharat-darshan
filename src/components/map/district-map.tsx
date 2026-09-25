"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type DistrictEntry = {
  name: string;
  slug: string;
  paths: string[];
  cx: number;
  cy: number;
};

export type DistrictMapData = {
  state: string;
  stateId: string;
  width: number;
  height: number;
  districts: DistrictEntry[];
};

const PALETTE = [
  "#8ca88f", "#7f9db4", "#c9a26d", "#b48a7e", "#9aa4b1",
  "#a3b07f", "#c78f5e", "#7ba8a0", "#b5979b", "#8f9e6f",
  "#a98f6d", "#7d99a8", "#bd9a82", "#93a58c", "#a8878f",
  "#7f9e9a", "#bfa27b", "#8d9db0", "#a4a08c", "#8a97a5",
];

export function DistrictMap({
  data,
  highlightSlug,
  onSelect,
  className,
}: {
  data: DistrictMapData;
  highlightSlug?: string;
  onSelect?: (d: DistrictEntry) => void;
  className?: string;
}) {
  const router = useRouter();
  const [tip, setTip] = useState<{ x: number; y: number; label: string } | null>(
    null,
  );

  const paletteFor = useMemo(
    () => (i: number) => PALETTE[i % PALETTE.length],
    [],
  );

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${data.width} ${data.height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`District map of ${data.state}`}
        onMouseLeave={() => setTip(null)}
      >
        {data.districts.map((d, i) => {
          const highlighted = d.slug === highlightSlug;
          return (
            <g
              key={d.slug}
              className={`district-group ${highlighted ? "district-highlight" : ""}`}
              style={{ ["--state-fill" as string]: paletteFor(i) }}
              tabIndex={onSelect ? 0 : -1}
              role={onSelect ? "link" : undefined}
              aria-label={d.name}
              onMouseMove={(e) =>
                setTip({ x: e.clientX, y: e.clientY, label: d.name })
              }
              onClick={() =>
                onSelect
                  ? onSelect(d)
                  : router.push(`/state/${data.stateId}/${d.slug}`)
              }
              onKeyDown={(e) => {
                if (!onSelect) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(d);
                }
              }}
            >
              {d.paths.map((p, j) => (
                <path key={j} d={p} className="district-shape" />
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
