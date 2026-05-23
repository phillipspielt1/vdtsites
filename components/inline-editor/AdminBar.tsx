"use client";

import { useEffect } from "react";
import { useContentCtx } from "./content-context";

export default function AdminBar() {
  const { dirty, saving, lastSaved, save, undo, canUndo } = useContentCtx();

  // Ctrl/Cmd+Z to undo. Bound on document so it works anywhere, including
  // when no Editable has focus. When an Editable IS focused, the browser's
  // native contenteditable undo handles single-keystroke retraction first;
  // hitting Ctrl+Z again falls through to our edit-burst undo.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.ctrlKey || e.metaKey;
      if (!meta || e.shiftKey || e.key.toLowerCase() !== "z") return;
      // Let contenteditable handle in-progress single-character undo first.
      const active = document.activeElement as HTMLElement | null;
      if (active && active.isContentEditable) return;
      e.preventDefault();
      undo();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [undo]);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 print:hidden">
      <div className="rounded-full bg-[#1a1a1a] text-white shadow-2xl shadow-black/20 pl-5 pr-2 py-2 flex items-center gap-3 text-sm border border-white/10">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] tracking-widest uppercase">Editing</span>
        </span>
        <span className="hidden sm:inline text-white/65 max-w-[210px] truncate">
          Click any text to edit · auto-saves
        </span>
        <span className="hidden md:inline text-white/45 text-xs font-mono">
          {saving ? "saving…" : dirty ? "unsaved" : lastSaved ? `saved ${timeAgo(lastSaved)}` : "saved"}
        </span>
        <button
          type="button"
          onClick={() => undo()}
          disabled={!canUndo}
          title="Undo last change (Ctrl+Z)"
          aria-label="Undo last change"
          className={`rounded-full border px-3 py-1.5 text-[0.85rem] transition-colors inline-flex items-center gap-1.5 ${
            canUndo
              ? "border-white/30 text-white hover:border-white cursor-pointer"
              : "border-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          <span aria-hidden="true">↶</span>
          <span className="hidden sm:inline">Undo</span>
        </button>
        <button
          type="button"
          onClick={() => void save()}
          className="rounded-full bg-white text-[#1a1a1a] px-4 py-1.5 text-[0.85rem] font-medium hover:bg-white/90 transition-colors"
        >
          Save now
        </button>
        <a
          href="/admin"
          className="rounded-full border border-white/30 text-white px-3 py-1.5 text-[0.85rem] hover:border-white transition-colors"
        >
          Admin
        </a>
      </div>
    </div>
  );
}

function timeAgo(ts: number) {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  return new Date(ts).toLocaleTimeString();
}
