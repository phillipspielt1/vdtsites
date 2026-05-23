// Shared Cloudflare KV accessor.
// In production (Cloudflare Workers), returns the CONTENT_KV binding.
// Locally (next dev), returns null - callers must fall back to filesystem or
// some other strategy.

export type KVNamespace = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
};

type CloudflareEnv = { CONTENT_KV?: KVNamespace };

export async function getKV(): Promise<KVNamespace | null> {
  try {
    const mod = await import("@opennextjs/cloudflare");
    const ctx = mod.getCloudflareContext();
    return (ctx?.env as CloudflareEnv | undefined)?.CONTENT_KV ?? null;
  } catch {
    return null;
  }
}
