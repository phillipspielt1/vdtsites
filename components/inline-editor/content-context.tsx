"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/site-content";

type Ctx = {
  content: SiteContent;
  editable: boolean;
  dirty: boolean;
  saving: boolean;
  lastSaved: number | null;
  set: (path: string, value: string) => void;
  // Array mutators - used by <EditableList> for Tier 1 add/remove/reorder.
  insertAt: (path: string, index: number, item: unknown) => void;
  removeAt: (path: string, index: number) => void;
  move: (path: string, fromIndex: number, toIndex: number) => void;
  save: () => Promise<void>;
  // Undo: reverts the most recent edit "burst". Text edits coalesce into one
  // history entry per ~500ms of continuous typing; list mutations are always
  // their own entry.
  undo: () => void;
  canUndo: boolean;
};

const ContentCtx = createContext<Ctx | null>(null);

function tokenize(path: string): string[] {
  return path.split(".").flatMap((seg) => {
    const out: string[] = [];
    const re = /([^[\]]+)|\[(\d+)\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(seg)) !== null) {
      out.push(m[1] !== undefined ? m[1] : `[${m[2]}]`);
    }
    return out;
  });
}

function readIn(obj: Record<string, unknown>, path: string): unknown {
  let cur: unknown = obj;
  for (const t of tokenize(path)) {
    if (cur == null) return undefined;
    const arr = /^\[(\d+)\]$/.exec(t);
    cur = arr ? (cur as unknown[])[Number(arr[1])] : (cur as Record<string, unknown>)[t];
  }
  return cur;
}

function setIn<T extends Record<string, unknown>>(obj: T, path: string, value: unknown): T {
  const tokens = tokenize(path);
  const next = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
  let cur: unknown = next;
  for (let i = 0; i < tokens.length - 1; i++) {
    const t = tokens[i];
    const arr = /^\[(\d+)\]$/.exec(t);
    cur = arr ? (cur as unknown[])[Number(arr[1])] : (cur as Record<string, unknown>)[t];
  }
  const last = tokens[tokens.length - 1];
  const arr = /^\[(\d+)\]$/.exec(last);
  if (arr) (cur as unknown[])[Number(arr[1])] = value;
  else (cur as Record<string, unknown>)[last] = value;
  return next as T;
}

export function ContentProvider({
  children,
  initial,
  editable,
}: {
  children: React.ReactNode;
  initial: SiteContent;
  editable: boolean;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Undo history: stack of previous SiteContent snapshots. Capped at 50.
  // Text edits coalesce into one entry per "burst" (no snapshot while a
  // continuous flow of keystrokes on the same path keeps arriving within
  // COALESCE_MS). List mutations (insert/remove/move) always snapshot.
  const historyRef = useRef<SiteContent[]>([]);
  const lastMutationAt = useRef(0);
  const lastMutationPath = useRef<string | null>(null);
  const HISTORY_MAX = 50;
  const COALESCE_MS = 500;

  // Use a ref to avoid recreating callbacks on every content change,
  // which would re-render every Editable.
  const contentRef = useRef(content);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  function pushHistory(snapshot: SiteContent) {
    historyRef.current.push(snapshot);
    if (historyRef.current.length > HISTORY_MAX) historyRef.current.shift();
    setCanUndo(true);
  }

  useEffect(() => {
    setContent(initial);
  }, [initial]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contentRef.current),
      });
      if (res.ok) {
        setDirty(false);
        setLastSaved(Date.now());
      }
    } finally {
      setSaving(false);
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void save();
    }, 1200);
  }, [save]);

  const set = useCallback((path: string, value: string) => {
    const now = Date.now();
    const isContinuation =
      lastMutationPath.current === path && (now - lastMutationAt.current) < COALESCE_MS;
    setContent((prev) => {
      if (!isContinuation) pushHistory(prev);
      return setIn(prev as unknown as Record<string, unknown>, path, value) as unknown as SiteContent;
    });
    lastMutationAt.current = now;
    lastMutationPath.current = path;
    setDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  const insertAt = useCallback((path: string, index: number, item: unknown) => {
    setContent((prev) => {
      pushHistory(prev);
      const arr = (readIn(prev as unknown as Record<string, unknown>, path) as unknown[] | undefined) ?? [];
      const next = [...arr];
      next.splice(index, 0, item);
      return setIn(prev as unknown as Record<string, unknown>, path, next) as unknown as SiteContent;
    });
    lastMutationAt.current = Date.now();
    lastMutationPath.current = null; // never coalesce list ops with subsequent text edits
    setDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  const removeAt = useCallback((path: string, index: number) => {
    setContent((prev) => {
      pushHistory(prev);
      const arr = (readIn(prev as unknown as Record<string, unknown>, path) as unknown[] | undefined) ?? [];
      const next = arr.filter((_, i) => i !== index);
      return setIn(prev as unknown as Record<string, unknown>, path, next) as unknown as SiteContent;
    });
    lastMutationAt.current = Date.now();
    lastMutationPath.current = null;
    setDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  const move = useCallback((path: string, fromIndex: number, toIndex: number) => {
    setContent((prev) => {
      const arr = (readIn(prev as unknown as Record<string, unknown>, path) as unknown[] | undefined) ?? [];
      if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) return prev;
      pushHistory(prev);
      const next = [...arr];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return setIn(prev as unknown as Record<string, unknown>, path, next) as unknown as SiteContent;
    });
    lastMutationAt.current = Date.now();
    lastMutationPath.current = null;
    setDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  const undo = useCallback(() => {
    const prev = historyRef.current.pop();
    if (prev == null) {
      setCanUndo(false);
      return;
    }
    setContent(prev);
    setCanUndo(historyRef.current.length > 0);
    // After undo, any next text edit starts a fresh burst.
    lastMutationPath.current = null;
    setDirty(true);
    scheduleSave();
  }, [scheduleSave]);

  return (
    <ContentCtx.Provider value={{ content, editable, dirty, saving, lastSaved, set, insertAt, removeAt, move, save, undo, canUndo }}>
      {children}
    </ContentCtx.Provider>
  );
}

export function useContentCtx() {
  const v = useContext(ContentCtx);
  if (!v) throw new Error("useContentCtx outside provider");
  return v;
}
