"use client";

import { useFormStatus } from "react-dom";

export function AuthSubmitButton({
  label,
  pendingLabel,
  className,
}: {
  label: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? "bg-[var(--child-text)] text-white"}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
