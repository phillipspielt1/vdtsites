"use client";

import { useState } from "react";
import { useContentCtx } from "./content-context";

type Props<T> = {
  path: string;                              // e.g. "home.services.items"
  template: T;                               // default item shape used when inserting
  className?: string;                        // applied to the outer wrapper
  itemClassName?: string;                    // applied to each item wrapper (so the toolbar can hover-target)
  children: (item: T, index: number) => React.ReactNode;
  // Optional: minimum number of items the list must keep. Prevents removing the last item.
  minItems?: number;
  // When true, lays the items out as the parent's children rather than wrapping
  // each in a relative <div>. Use this when the items need direct grid/flex
  // participation.
  inline?: boolean;
  // Hide the "+ add below" button entirely (use for fixed-cardinality lists
  // like a page's sections - admin should only reorder, not add new ones).
  disableInsert?: boolean;
  // Hide the "✕ remove" button entirely.
  disableRemove?: boolean;
  // "anywhere" (default): the whole item wrapper is draggable - admin can drag
  //   from any non-text area to reorder.
  // "handle-only": only the grip icon in the toolbar starts a drag. Use this
  //   when the item contains things you don't want competing with drag
  //   (whole sections, long text fields, nested layout).
  dragMode?: "anywhere" | "handle-only";
  // Where to anchor the floating toolbar. Defaults to "-top-3 right-3" which
  // works for cards; for full-width sections use "top-4 right-4".
  toolbarPosition?: string;
};

/**
 * EditableList — Tier 1 inline-editor primitive.
 *
 * In editable mode each rendered child gets:
 *   - A floating toolbar with reorder/insert/delete buttons
 *   - A drag handle ("⋮⋮") that lets the admin drag-and-drop the whole item
 *
 * The drag uses native HTML5 drag-and-drop. The drop semantic is: "drop on
 * target N" inserts the dragged item at index N (and everything past it
 * shifts down). That matches the up/down button behaviour so the two ways of
 * reordering are consistent.
 *
 * Item paths inside `children` are the caller's responsibility - typically:
 *   <EditableList path="home.services.items" template={...}>
 *     {(item, i) => <Editable path={`home.services.items[${i}].label`} />}
 *   </EditableList>
 *
 * To drop into another project: copy this file. No project-specific code here.
 */
export default function EditableList<T>({
  path,
  template,
  className,
  itemClassName,
  children,
  minItems = 0,
  inline = false,
  disableInsert = false,
  disableRemove = false,
  dragMode = "anywhere",
  toolbarPosition = "-top-10 right-3",
}: Props<T>) {
  void className; // currently unused - reserved for future wrapper styling
  const { content, editable, insertAt, removeAt, move } = useContentCtx();
  const items = (readPath(content as unknown as Record<string, unknown>, path) as T[] | undefined) ?? [];
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  // Hover state is tracked in React (not via Tailwind named-groups) because
  // nested EditableLists using the same CSS group name would otherwise
  // bleed - hovering anywhere inside a section would activate every inner
  // item's toolbar too. Each EditableList owns its own state, so toolbars
  // only appear for the specific item the cursor is on.
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  // Suppress the toolbar entirely while the user is actively editing text
  // inside the item (a descendant contenteditable has focus). This keeps the
  // toolbar from sitting on top of the words they're trying to type on.
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  if (!editable) {
    return (
      <>
        {items.map((item, i) => (
          <div key={i} className={itemClassName}>
            {children(item, i)}
          </div>
        ))}
      </>
    );
  }

  const baseCls = inline ? itemClassName : `${itemClassName ?? ""} relative`;

  function handleDrop(targetIndex: number) {
    if (dragIndex == null) return;
    if (dragIndex !== targetIndex) move(path, dragIndex, targetIndex);
    setDragIndex(null);
    setOverIndex(null);
  }

  const wholeDraggable = dragMode === "anywhere";

  return (
    <>
      {items.map((item, i) => {
        const isDragging = dragIndex === i;
        const isOver = overIndex === i && dragIndex !== null && dragIndex !== i;
        const isHovered = hoverIndex === i;
        const stateCls = [
          isDragging ? "opacity-40" : "",
          isOver ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-transparent" : "",
        ].join(" ");
        return (
          <div
            key={i}
            data-editable-list-item={i}
            className={`${baseCls} ${stateCls} transition-[opacity,box-shadow] duration-150`}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex((prev) => (prev === i ? null : prev))}
            onFocusCapture={(e) => {
              if ((e.target as HTMLElement).getAttribute?.("contenteditable") === "true") {
                setFocusedIndex(i);
              }
            }}
            onBlurCapture={(e) => {
              if ((e.target as HTMLElement).getAttribute?.("contenteditable") !== "true") return;
              const wrapper = e.currentTarget as HTMLElement;
              // After blur, check on the next tick whether any editable in
              // this item is still focused (e.g. user shifted between fields
              // inside the same item).
              window.setTimeout(() => {
                if (!wrapper.querySelector('[contenteditable="true"]:focus')) {
                  setFocusedIndex((prev) => (prev === i ? null : prev));
                }
              }, 0);
            }}
            draggable={wholeDraggable}
            onDragStart={
              wholeDraggable
                ? (e) => {
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", String(i));
                    setDragIndex(i);
                  }
                : undefined
            }
            onDragOver={(e) => {
              if (dragIndex == null || dragIndex === i) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (overIndex !== i) setOverIndex(i);
            }}
            onDragLeave={() => {
              if (overIndex === i) setOverIndex(null);
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(i);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
          >
            {children(item, i)}
            <ItemToolbar
              visible={(isHovered || isDragging) && focusedIndex !== i}
              positionCls={toolbarPosition}
              canRemove={!disableRemove && items.length > minItems}
              hideInsert={disableInsert}
              hideRemove={disableRemove}
              isFirst={i === 0}
              isLast={i === items.length - 1}
              dragHandleOnly={!wholeDraggable}
              onGripDragStart={
                !wholeDraggable
                  ? (e) => {
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", String(i));
                      // Use the parent item as the drag image so the user
                      // sees the WHOLE section being dragged, not just the
                      // tiny grip icon.
                      const parent = (e.currentTarget as HTMLElement).closest("[data-editable-list-item]") as HTMLElement | null;
                      if (parent && e.dataTransfer.setDragImage) {
                        const r = parent.getBoundingClientRect();
                        e.dataTransfer.setDragImage(parent, r.width / 2, 20);
                      }
                      setDragIndex(i);
                    }
                  : undefined
              }
              onGripDragEnd={
                !wholeDraggable
                  ? () => {
                      setDragIndex(null);
                      setOverIndex(null);
                    }
                  : undefined
              }
              onUp={() => move(path, i, i - 1)}
              onDown={() => move(path, i, i + 1)}
              onRemove={() => removeAt(path, i)}
              onInsertBelow={() => insertAt(path, i + 1, deepClone(template))}
            />
          </div>
        );
      })}
      {items.length === 0 && !disableInsert && (
        <button
          type="button"
          onClick={() => insertAt(path, 0, deepClone(template))}
          className="col-span-full self-stretch min-h-[120px] rounded-2xl border-2 border-dashed border-black/15 text-[#999] text-sm hover:border-black/35 hover:text-[#1a1a1a] transition-colors"
        >
          + Add first item
        </button>
      )}
    </>
  );
}

function ItemToolbar({
  visible,
  positionCls,
  canRemove,
  hideInsert,
  hideRemove,
  isFirst,
  isLast,
  dragHandleOnly,
  onGripDragStart,
  onGripDragEnd,
  onUp,
  onDown,
  onRemove,
  onInsertBelow,
}: {
  visible: boolean;
  positionCls: string;
  canRemove: boolean;
  hideInsert: boolean;
  hideRemove: boolean;
  isFirst: boolean;
  isLast: boolean;
  dragHandleOnly: boolean;
  onGripDragStart?: (e: React.DragEvent<HTMLSpanElement>) => void;
  onGripDragEnd?: () => void;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  onInsertBelow: () => void;
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`absolute ${positionCls} z-30 flex items-center gap-px rounded-full bg-[#1a1a1a] text-white shadow-lg shadow-black/15 border border-white/10 px-1 py-0.5 transition-opacity duration-150 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onDragStart={(e) => {
        // For handle-only mode, the grip's own onDragStart starts the drag.
        // For anywhere mode, the parent's onDragStart fires; stop the
        // toolbar from accidentally initiating its own drag.
        if (!dragHandleOnly) e.stopPropagation();
      }}
    >
      <span
        title={dragHandleOnly ? "Drag to reorder" : "Drag anywhere on this item to reorder"}
        aria-hidden="true"
        draggable={dragHandleOnly}
        onDragStart={dragHandleOnly ? onGripDragStart : undefined}
        onDragEnd={dragHandleOnly ? onGripDragEnd : undefined}
        className={`w-5 h-7 inline-flex items-center justify-center text-[13px] text-white/55 select-none ${
          dragHandleOnly ? "cursor-grab active:cursor-grabbing" : "cursor-grab"
        }`}
      >
        ⋮⋮
      </span>
      <ToolbarBtn label="Move up" disabled={isFirst} onClick={onUp}>↑</ToolbarBtn>
      <ToolbarBtn label="Move down" disabled={isLast} onClick={onDown}>↓</ToolbarBtn>
      {!hideInsert && (
        <ToolbarBtn label="Add below" onClick={onInsertBelow}>＋</ToolbarBtn>
      )}
      {!hideRemove && (
        <ToolbarBtn label="Remove" disabled={!canRemove} onClick={onRemove} danger>✕</ToolbarBtn>
      )}
    </div>
  );
}

function ToolbarBtn({
  children,
  onClick,
  label,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`
        w-7 h-7 rounded-full inline-flex items-center justify-center text-[13px]
        ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white/15 cursor-pointer"}
        ${danger && !disabled ? "hover:bg-red-500/80" : ""}
        transition-colors
      `}
    >
      {children}
    </button>
  );
}

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

function readPath(obj: Record<string, unknown>, path: string): unknown {
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
    cur = arrMatch ? (cur as unknown[])[Number(arrMatch[1])] : (cur as Record<string, unknown>)[t];
  }
  return cur;
}
