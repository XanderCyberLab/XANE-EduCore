import Link from "next/link";
import type { ReactNode } from "react";
import { parentNav } from "@/lib/site";

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parent-bg)] text-[var(--parent-text)]">
      <div className="shell-page flex min-h-screen flex-col gap-6 py-4 md:py-6">
        <header className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] px-5 py-4 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">
                EduCore
              </Link>
              <p className="mt-2 text-xl font-semibold">Parent space</p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {parentNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--parent-text)] transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
