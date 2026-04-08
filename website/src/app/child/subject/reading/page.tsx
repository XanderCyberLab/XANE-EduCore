import Link from "next/link";
import { ChildPageIntro } from "@/components/shells";

export default function ChildReadingPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <ChildPageIntro
          badge="Reading"
          title="Reading adventures"
          description="Letters, sounds, and story time live here. Everything is built to feel gentle and easy to start."
        />
        <div className="mt-6 rounded-[1.75rem] bg-[var(--child-surface-soft)] p-5">
          <div className="h-3 w-24 rounded-full" style={{ backgroundColor: "var(--accent-reading)" }} />
          <p className="mt-4 text-2xl font-semibold text-[var(--child-text)]">Today&apos;s reading spark</p>
          <p className="mt-2 text-base leading-7 text-[var(--child-muted)]">Match the letter S with sun, sock, and snake, then sound out one tiny word with help.</p>
        </div>
      </section>
      <Link href="/child/today" className="inline-flex rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white">
        Go to today&apos;s tasks
      </Link>
    </main>
  );
}
