// Reads/writes the live SiteContent overrides.
// - On Cloudflare Workers (production / preview): Cloudflare KV (binding CONTENT_KV)
// - Locally (next dev): a JSON file at the project root (content.local.json)

import { getKV } from "./kv";
import { defaultContent, type SiteContent } from "@/lib/site-content";

const KV_KEY = "site-content";

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (!override || typeof override !== "object") return base;
  if (Array.isArray(base)) return (override as unknown as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(override as Record<string, unknown>)) {
    const baseVal = (base as Record<string, unknown>)[k];
    if (v && typeof v === "object" && !Array.isArray(v) && baseVal && typeof baseVal === "object" && !Array.isArray(baseVal)) {
      out[k] = deepMerge(baseVal, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

async function readLocalFile(): Promise<Partial<SiteContent> | null> {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(process.cwd(), "content.local.json");
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function writeLocalFile(next: SiteContent): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const file = path.join(process.cwd(), "content.local.json");
  await fs.writeFile(file, JSON.stringify(next, null, 2), "utf8");
}

export async function loadContent(): Promise<SiteContent> {
  const kv = await getKV();
  if (kv) {
    const raw = await kv.get(KV_KEY);
    if (raw) {
      try {
        return deepMerge(defaultContent, JSON.parse(raw) as Partial<SiteContent>);
      } catch {
        return defaultContent;
      }
    }
    return defaultContent;
  }
  const override = await readLocalFile();
  return override ? deepMerge(defaultContent, override) : defaultContent;
}

export async function saveContent(next: SiteContent): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.put(KV_KEY, JSON.stringify(next));
    return;
  }
  await writeLocalFile(next);
}

export { defaultContent };
