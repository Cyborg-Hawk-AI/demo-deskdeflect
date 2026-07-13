"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className="flex items-center gap-3 rounded-lg border border-brand-600/30 bg-surface-700 px-4 py-3 shadow-2xl">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
          <svg
            className="h-3.5 w-3.5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <span className="text-sm text-slate-200">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-500 transition hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
