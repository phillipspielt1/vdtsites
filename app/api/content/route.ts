import { NextResponse } from "next/server";
import { loadContent, saveContent } from "@/lib/inline-editor/content-store";
import type { SiteContent } from "@/lib/site-content";
import { isAdmin } from "@/lib/inline-editor/admin-auth";

export async function GET() {
  const content = await loadContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  // Minimal sanity check - body must have the top-level shape we expect.
  if (!body || typeof body !== "object" || !("brand" in body) || !("home" in body)) {
    return NextResponse.json({ error: "Malformed content" }, { status: 400 });
  }
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
