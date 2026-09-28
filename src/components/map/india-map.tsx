"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { INDIA_MAP } from "@/data/india-states";
import { STATE_CODES } from "@/data/state-codes";

const PALETTE = [
  "#8ca88f", "#7f9db4", "#c9a26d", "#b48a7e", "#9aa4b1",
  "#a3b07f", "#c78f5e", "#7ba8a0", "#b5979b", "#8f9e6f",
  "#a98f6d", "#7d99a8", "#bd9a82", "#93a58c", "#a8878f",
  "#7f9e9a", "#bfa27b", "#8d9db0", "#a4a08c", "#8a97a5",
];

// Small states/UTs whose real footprint is too tiny to read on the map.
// They are enlarged inside a rectangular inset frame placed in open sea.
const INSET_BOXES: Record<
  string,
  {
    box: { x: number; y: number; w: number; h: number };
    labels: string[];
    leader: "top" | "left";
    marker?: boolean;
  }
> = {
  lakshadweep: {
    box: { x: 8, y: 675, w: 144, h: 145 },
    labels: ["Lakshadweep"],
    leader: "top",
    marker: true,
  },
  "andaman-and-nicobar-islands": {
    box: { x: 805, y: 590, w: 175, h: 410 },
    labels: ["Andaman & Nicobar", "Islands"],
    leader: "left",
  },
};

function bboxOfPaths(paths: string[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const d of paths) {
    const nums = d.match(/-?\d+(?:\.\d+)?/g);
    if (!nums) continue;
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = +nums[i];
      const y = +nums[i + 1];
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

export function IndiaMap({ query }: { query: string }) {
  const router = useRouter();
  const [tip, setTip] = useState<{ x: number; y: number; label: string } | null>(
    null,
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const states = useMemo(() => INDIA_MAP.states, []);
  const q = query.trim().toLowerCase();

  const insets = useMemo(() => {
    const out: Record<
      string,
      {
        box: { x: number; y: number; w: number; h: number };
        labels: string[];
        scale: number;
        tx: number;
        ty: number;
        leader: { x1: number; y1: number; x2: number; y2: number };
        marker: { cx: number; cy: number } | null;
      }
    > = {};
    for (const s of states) {
      const cfg = INSET_BOXES[s.id];
      if (!cfg) continue;
      const bb = bboxOfPaths(s.paths);
      const pad = 10;
      const labelH = cfg.labels.length * 17 + 8;
      const innerW = cfg.box.w - pad * 2;
      const innerH = cfg.box.h - labelH - pad * 2;
      const scale = Math.min(innerW / bb.w, innerH / bb.h);
      const tx = cfg.box.x + pad + (innerW - bb.w * scale) / 2 - bb.minX * scale;
      const ty = cfg.box.y + labelH + pad + (innerH - bb.h * scale) / 2 - bb.minY * scale;
      const cx = bb.minX + bb.w / 2;
      const cy = bb.minY + bb.h / 2;
      const leader =
        cfg.leader === "left"
          ? { x1: bb.maxX + 4, y1: cy, x2: cfg.box.x - 2, y2: cy }
          : { x1: cx, y1: cfg.box.y + cfg.box.h + 4, x2: cx, y2: cy - 6 };
      out[s.id] = {
        box: cfg.box,
        labels: cfg.labels,
        scale,
        tx,
        ty,
        leader,
        marker: cfg.marker ? { cx, cy } : null,
      };
    }
    return out;
  }, [states]);

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
          const inset = insets[s.id];
          return (
            <g
              key={s.id}
              className={`state-group ${dimmed ? "dimmed" : ""}`}
              style={{ ["--state-fill" as string]: PALETTE[i % PALETTE.length] }}
              tabIndex={0}
              role="link"
              aria-label={`View ${s.name} districts`}
              onMouseEnter={() =>
                setTip((t) =>
                  t ? { ...t, label: `${STATE_CODES[s.id] ?? ""} · ${s.name}`.replace(/^ · /, "") } : t,
                )
              }
              onMouseMove={(e) =>
                setTip({
                  x: e.clientX,
                  y: e.clientY,
                  label: `${STATE_CODES[s.id] ?? ""} · ${s.name}`.replace(/^ · /, ""),
                })
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
              {inset && (
                <g aria-hidden="true">
                  <line
                    className="map-inset-leader"
                    x1={inset.leader.x1}
                    y1={inset.leader.y1}
                    x2={inset.leader.x2}
                    y2={inset.leader.y2}
                  />
                  {inset.marker && (
                    <circle
                      className="map-inset-origin"
                      cx={inset.marker.cx}
                      cy={inset.marker.cy}
                      r={3.5}
                    />
                  )}
                  <rect
                    className="map-inset-frame"
                    x={inset.box.x}
                    y={inset.box.y}
                    width={inset.box.w}
                    height={inset.box.h}
                    rx={10}
                  />
                  {inset.labels.map((label, k) => (
                    <text
                      key={k}
                      className="map-inset-label"
                      x={inset.box.x + inset.box.w / 2}
                      y={inset.box.y + 18 + k * 17}
                      textAnchor="middle"
                    >
                      {label}
                    </text>
                  ))}
                  <g
                    transform={`translate(${inset.tx.toFixed(1)} ${inset.ty.toFixed(1)}) scale(${inset.scale.toFixed(3)})`}
                  >
                    {s.paths.map((d, j) => (
                      <path
                        key={j}
                        d={d}
                        className="state-shape"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </g>
                </g>
              )}
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
