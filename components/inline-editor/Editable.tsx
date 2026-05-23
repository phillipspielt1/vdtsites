"use client";

import { useEffect, useRef } from "react";
import { useContentCtx } from "./content-context";

type Props = {
  path: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  multiline?: boolean;
  children?: React.ReactNode;
};

/**
 * Renders text from the content store. When editable, becomes a contenteditable
 * element that React does NOT control via children - instead, we set the
 * initial content imperatively once and let the DOM own the text while the
 * user is typing. This is critical: if React owned the text via children,
 * every keystroke would re-render the text node, which moves the cursor to
 * the start. We only sync state -> DOM if the element is not focused
 * (i.e., external update arrived while user is not actively editing).
 */
export default function Editable({ path, as = "span", className, multiline = false, children }: Props) {
  const { content, editable, set } = useContentCtx();
  const value = readPath(content as unknown as Record<string, unknown>, path) ?? "";
  const valueStr = String(value);
  const ref = useRef<HTMLElement | null>(null);
  const initialized = useRef(false);

  // Sync state -> DOM:
  //   * Once on first mount (so the editable element shows the saved text)
  //   * Subsequently only when the element is NOT focused (so external
  //     updates can arrive, but we never touch the text while user is typing)
  useEffect(() => {
    if (!editable) return;
    const el = ref.current;
    if (!el) return;

    if (!initialized.current) {
      el.innerText = valueStr;
      initialized.current = true;
      return;
    }

    if (document.activeElement !== el && el.innerText !== valueStr) {
      el.innerText = valueStr;
    }
  }, [valueStr, editable]);

  // Reset the "initialized" flag when toggling out of editable mode so a
  // future re-entry picks up the latest value cleanly.
  useEffect(() => {
    if (!editable) {
      initialized.current = false;
    }
  }, [editable]);

  const Tag = as as React.ElementType;

  if (!editable) {
    if (multiline) {
      return (
        <Tag className={className}>
          {valueStr
            .split(/\n\n+/)
            .map((para, i) => (
              <span key={i} className="block whitespace-pre-line [&:not(:first-child)]:mt-4">
                {para}
              </span>
            ))}
          {children}
        </Tag>
      );
    }
    return (
      <Tag className={`${className ?? ""} whitespace-pre-line`}>
        {valueStr}
        {children}
      </Tag>
    );
  }

  // Editable mode: render an empty element, fill it imperatively in useEffect.
  // No React children - that's the whole point. React must NOT manage the
  // text node during typing, or every keystroke moves the cursor home.
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${className ?? ""} whitespace-pre-wrap outline-none focus:bg-yellow-50/40 hover:bg-yellow-50/20 rounded-sm transition-colors`}
      data-editable={path}
      contentEditable
      suppressContentEditableWarning
      onInput={(e: React.FormEvent<HTMLElement>) => set(path, (e.target as HTMLElement).innerText)}
      spellCheck
    />
  );
}

function readPath(obj: Record<string, unknown>, path: string): string | undefined {
  // Accepts "a.b.c", "a.b[0].c", and "a.b.[0].c".
  const tokens = path
    .split(".")
    .flatMap((seg) => {
      const out: string[] = [];
      const re = /([^[\]]+)|\[(\d+)\]/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(seg)) !== null) {
        out.push(m[1] !== undefined ? m[1] : `[${m[2]}]`);
      }
      return out;
    });
  let cur: unknown = obj;
  for (const t of tokens) {
    if (cur == null) return undefined;
    const arrMatch = /^\[(\d+)\]$/.exec(t);
    if (arrMatch) {
      cur = (cur as unknown[])[Number(arrMatch[1])];
    } else {
      cur = (cur as Record<string, unknown>)[t];
    }
  }
  return cur == null ? undefined : String(cur);
}
