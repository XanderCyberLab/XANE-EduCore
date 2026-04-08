import Link from "next/link";
import { ChildPageIntro } from "@/components/shells";

export default function ChildThinkingPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <ChildPageIntro
          badge="Thinking"
          title="Thinking adventures"
          description="Tiny puzzles and pattern play help children practice noticing, choosing, and reasoning calmly."
        />
        <div className="mt-6 rounded-[1.75rem] bg-[var(--child-surface-soft)] p-5">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: "var(--accent-thinking)" }} />
          <p className="mt-4 text-2xl font-semibold text-[var(--child-text)]">Today&apos;s thinking spark</p>
          <p className="mt-2 text-base leading-7 text-[var(--child-muted)]">Finish a moon-and-star pattern, then choose which picture does not belong.</p>
        </div>
      </section>
      <Link href="/child/today" className="inline-flex rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white">
        Go to today&apos;s tasks
      </Link>
    </main>
  );
}
