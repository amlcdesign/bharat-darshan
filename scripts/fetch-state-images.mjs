import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// slug -> iconic Wikipedia page (lead image is downloaded)
const ICONIC = {
  "andaman-and-nicobar-islands": "Cellular Jail",
  "andhra-pradesh": "Tirumala Venkateswara Temple",
  "arunachal-pradesh": "Tawang Monastery",
  assam: "Kaziranga National Park",
  bihar: "Mahabodhi Temple",
  chandigarh: "Rock Garden, Chandigarh",
  chhattisgarh: "Chitrakote Falls",
  "dadra-and-nagar-haveli-and-daman-and-diu": "Diu Fort",
  delhi: "India Gate",
  goa: "Palolem Beach",
  gujarat: "Statue of Unity",
  haryana: "Brahma Sarovar",
  "himachal-pradesh": "Shimla",
  "jammu-and-kashmir": "Dal Lake",
  jharkhand: "Hundru Falls",
  karnataka: "Hampi",
  kerala: "Kerala backwaters",
  ladakh: "Pangong Tso",
  lakshadweep: "Lakshadweep",
  "madhya-pradesh": "Khajuraho",
  maharashtra: "Gateway of India",
  manipur: "Loktak Lake",
  meghalaya: "Living root bridge",
  mizoram: "Aizawl",
  nagaland: "Hornbill Festival",
  odisha: "Konark Sun Temple",
  puducherry: "Puducherry",
  punjab: "Golden Temple",
  rajasthan: "Hawa Mahal",
  sikkim: "Kangchenjunga",
  "tamil-nadu": "Brihadisvara Temple, Thanjavur",
  telangana: "Charminar",
  tripura: "Ujjayanta Palace",
  "uttar-pradesh": "Ram Mandir",
  uttarakhand: "Kedarnath Temple",
  "west-bengal": "Victoria Memorial, Kolkata",
};

const UA = "BharatExplorer/1.0 (educational atlas app; contact: dev@bharatexplorer.local)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function summary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      await sleep(1500 * attempt);
      continue;
    }
    if (!res.ok) throw new Error(`summary ${res.status} for ${title}`);
    return res.json();
  }
  throw new Error(`summary rate-limited for ${title}`);
}

async function fetchImage(src) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(src, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      await sleep(1500 * attempt);
      continue;
    }
    if (!res.ok) throw new Error(`image ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error("image too small");
    return buf;
  }
  throw new Error("image rate-limited");
}

const outDir = path.resolve("public/states");
await mkdir(outDir, { recursive: true });

const only = process.argv.slice(2);
const credits = await readFile(path.join(outDir, "credits.json"), "utf8")
  .then((t) => JSON.parse(t))
  .catch(() => ({}));
let ok = 0;
for (const [slug, title] of Object.entries(ICONIC)) {
  if (only.length && !only.includes(slug)) continue;
  try {
    const data = await summary(title);
    const orig = data.originalimage?.source;
    const thumb = data.thumbnail?.source;
    const origW = data.originalimage?.width ?? 0;

    // build candidate URLs: capped thumb -> raw thumb -> original
    const candidates = [];
    if (thumb && origW > 0 && origW < 960) candidates.push(thumb);
    else if (thumb) candidates.push(thumb.replace(/\/\d+px-/, "/960px-"));
    if (thumb) candidates.push(thumb);
    if (orig) candidates.push(orig);

    let buf = null;
    let used = null;
    for (const src of candidates) {
      try {
        buf = await fetchImage(src);
        used = src;
        break;
      } catch {}
    }
    if (!buf) throw new Error("all image candidates failed");
    const file = path.join(outDir, `${slug}.jpg`);
    await writeFile(file, buf);
    credits[slug] = {
      title: data.title,
      page: data.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      file: path.basename(file),
      source: used,
    };
    ok++;
    console.log(`ok  ${slug}  <- ${data.title} (${(buf.length / 1024).toFixed(0)}KB)`);
  } catch (e) {
    console.log(`ERR ${slug}: ${e.message}`);
  }
  await sleep(250);
}
await writeFile(path.join(outDir, "credits.json"), JSON.stringify(credits, null, 1));
console.log(`\n${ok}/${Object.keys(ICONIC).length} images saved`);
