import { deflateSync } from "node:zlib";
import { mkdir } from "node:fs/promises";

// --- minimal PNG encoder ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- icon renderer: Ashoka-chakra compass on paper ---
const PAPER = [244, 236, 221];
const INK = [22, 50, 79];
const MARIGOLD = [232, 163, 61];

function smooth(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function renderIcon(size, { maskable = false } = {}) {
  const rgba = Buffer.alloc(size * size * 4);
  const c = size / 2;
  const maxR = maskable ? size * 0.5 : size * 0.5;
  const R = size * (maskable ? 0.30 : 0.34); // chakra radius
  const spokeW = size * 0.016;
  const ringW = size * 0.028;
  const dotR = size * 0.045;
  const N = 24;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - c;
      const dy = y + 0.5 - c;
      const r = Math.hypot(dx, dy);
      let ink = 0;

      if (r <= R + ringW) {
        // outer ring
        ink = Math.max(ink, 1 - smooth(ringW * 0.4, ringW, Math.abs(r - R)));
        // 24 spokes
        if (r > dotR && r <= R) {
          let ang = Math.atan2(dy, dx);
          if (ang < 0) ang += Math.PI * 2;
          const seg = (Math.PI * 2) / N;
          const off = Math.min(ang % seg, seg - (ang % seg));
          const half = Math.atan2(spokeW, r);
          if (off <= half) ink = Math.max(ink, 1 - smooth(half * 0.5, half, off));
        }
        // hub
        ink = Math.max(ink, 1 - smooth(dotR * 0.7, dotR, r));
      }

      // background: full-bleed paper for maskable, rounded square otherwise
      let bgA = 1;
      if (!maskable) {
        const corner = Math.max(
          Math.abs(dx) - (maxR - size * 0.18),
          Math.abs(dy) - (maxR - size * 0.18),
        );
        bgA = 1 - smooth(0, size * 0.02, corner);
      }

      // paper base, marigold fill inside chakra, ink lines
      let col;
      if (ink > 0.02) {
        col = [
          Math.round(PAPER[0] + (INK[0] - PAPER[0]) * ink),
          Math.round(PAPER[1] + (INK[1] - PAPER[1]) * ink),
          Math.round(PAPER[2] + (INK[2] - PAPER[2]) * ink),
        ];
      } else {
        const inside = 1 - smooth(R - size * 0.02, R, r);
        col = [
          Math.round(PAPER[0] + (MARIGOLD[0] - PAPER[0]) * inside * 0.55),
          Math.round(PAPER[1] + (MARIGOLD[1] - PAPER[1]) * inside * 0.55),
          Math.round(PAPER[2] + (MARIGOLD[2] - PAPER[2]) * inside * 0.55),
        ];
      }
      const a = Math.round(bgA * 255);
      const o = (y * size + x) * 4;
      rgba[o] = col[0];
      rgba[o + 1] = col[1];
      rgba[o + 2] = col[2];
      rgba[o + 3] = a;
    }
  }
  return encodePNG(size, size, rgba);
}

await mkdir("public/icons", { recursive: true });
await Bun.write("public/icons/icon-192.png", renderIcon(192));
await Bun.write("public/icons/icon-512.png", renderIcon(512));
await Bun.write("public/icons/maskable-512.png", renderIcon(512, { maskable: true }));
await Bun.write("public/icons/apple-touch-icon.png", renderIcon(180));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#f4ecdd"/>
  <circle cx="256" cy="256" r="150" fill="#e8a33d" opacity="0.55"/>
  <circle cx="256" cy="256" r="150" fill="none" stroke="#16324f" stroke-width="24"/>
  <g stroke="#16324f" stroke-width="14" stroke-linecap="round">
    ${Array.from({ length: 24 }, (_, i) => {
      const a = (i * Math.PI) / 12;
      const x2 = 256 + Math.cos(a) * 138;
      const y2 = 256 + Math.sin(a) * 138;
      const x1 = 256 + Math.cos(a) * 46;
      const y1 = 256 + Math.sin(a) * 46;
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }).join("\n    ")}
  </g>
  <circle cx="256" cy="256" r="40" fill="#16324f"/>
</svg>`;
await Bun.write("public/icons/icon.svg", svg);
console.log("Icons written to public/icons/");
