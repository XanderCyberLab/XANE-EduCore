import Link from "next/link";
import { SubjectArea } from "@/generated/prisma/client";
import { completeChildTask } from "@/app/child/actions";
import { TaskCompleteButton } from "@/components/task-complete-button";
import { ChildPageIntro } from "@/components/shells";
import { requireChildSession } from "@/lib/auth/guards";
import { getChildSubjectSpotlight } from "@/lib/child-dashboard";

export default async function ChildThinkingPage() {
  const session = await requireChildSession();
  const spotlight = await getChildSubjectSpotlight(session.childProfileId, SubjectArea.CRITICAL_THINKING);

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
          <p className="mt-4 text-2xl font-semibold text-[var(--child-text)]">{spotlight.title}</p>
          <p className="mt-2 text-base leading-7 text-[var(--child-muted)]">{spotlight.description}</p>
          {spotlight.id ? (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">{spotlight.completed ? `${spotlight.awardedTokens} star${spotlight.awardedTokens === 1 ? "" : "s"} saved` : `${spotlight.tokenValue} star${spotlight.tokenValue === 1 ? "" : "s"} ready`}</p>
              <form action={completeChildTask}>
                <input type="hidden" name="weeklyPlanItemId" value={spotlight.id} />
                <TaskCompleteButton completed={spotlight.completed} />
              </form>
            </div>
          ) : null}
        </div>
      </section>
      <Link href="/child/today" className="inline-flex rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white">
        Go to today&apos;s tasks
      </Link>
    </main>
  );
}
