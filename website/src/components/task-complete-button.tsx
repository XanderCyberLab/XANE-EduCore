"use client";

import { useFormStatus } from "react-dom";

export function TaskCompleteButton({ completed }: { completed: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || completed}
      className="rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {completed ? "Completed" : pending ? "Saving..." : "Mark complete"}
    </button>
  );
}
