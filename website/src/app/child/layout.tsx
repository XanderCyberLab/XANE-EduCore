import Link from "next/link";
import type { ReactNode } from "react";
import { signOutChild } from "@/app/auth-actions";
import { readChildSession } from "@/lib/auth/session";
import { childNav, childSubjects } from "@/lib/site";

export default async function ChildLayout({ children }: { children: ReactNode }) {
  const session = await readChildSession();
  const isLoginRoute = !session;

  return (
    <div className="min-h-screen bg-[var(--child-bg)] text-[var(--child-text)]">
      <div className="shell-page flex min-h-screen flex-col gap-5 py-4 md:gap-6 md:py-6">
        <header className="rounded-[calc(var(--radius-card)+0.75rem)] border border-white/70 bg-[linear-gradient(135deg,rgba(255,253,248,0.96),rgba(243,247,255,0.9))] px-5 py-5 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--child-muted)]">
                  EduCore
                </Link>
                <p className="mt-2 text-3xl font-semibold">Child space</p>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--child-muted)]">
                  {session ? `Hello ${session.nickname}. Warm, clear, and ready for one small step at a time.` : "Warm, clear, and ready for one small step at a time."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!isLoginRoute ? (
                  <nav className="flex flex-wrap gap-2">
                    {childNav.map((item) => (
                      <Link key={item.href} href={item.href} className="rounded-full bg-white/85 px-4 py-3 text-sm font-semibold text-[var(--child-text)] shadow-sm transition hover:bg-white">
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                ) : null}
                {session ? (
                  <form action={signOutChild}>
                    <button type="submit" className="rounded-full bg-white/85 px-4 py-3 text-sm font-semibold text-[var(--child-text)] shadow-sm transition hover:bg-white">
                      Sign out
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
            {!isLoginRoute ? (
              <div className="grid gap-3 md:grid-cols-3">
                {childSubjects.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.5rem] px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span aria-hidden="true">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </header>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
