"use client";

import { useState } from "react";

interface DevNoteProps {
  text: string;
}

export default function DevNote({ text }: DevNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600/20 text-[10px] font-bold text-brand-400 transition hover:bg-brand-600/40"
        aria-label="Developer note"
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-6 z-50 w-72 animate-fade-in rounded-lg border border-brand-600/30 bg-surface-700 p-3 text-left shadow-xl">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-400">
              DEV NOTE
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{text}</p>
          </div>
        </>
      )}
    </span>
  );
}
