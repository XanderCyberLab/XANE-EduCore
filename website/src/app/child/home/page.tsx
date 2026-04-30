import Link from "next/link";
import { SubjectCardGrid, TodayTaskList, TokenJarCard } from "@/components/child-ui";
import { ChildPageIntro } from "@/components/shells";
import { requireChildSession } from "@/lib/auth/guards";
import { getChildDashboardData } from "@/lib/child-dashboard";

export default async function ChildHomePage() {
  const session = await requireChildSession();
  const childDailyPlan = await getChildDashboardData(session.childProfileId);

  if (!childDailyPlan) {
    return null;
  }

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[calc(var(--radius-card)+0.75rem)] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(244,248,255,0.92))] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <ChildPageIntro
              badge="Home"
              title={`Hi ${childDailyPlan.childName}`}
              description={`${childDailyPlan.greeting} ${childDailyPlan.aiHint}`}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/90 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Today</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--child-text)]">{childDailyPlan.totalTasks}</p>
                <p className="mt-1 text-sm text-[var(--child-muted)]">little learning steps</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/90 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Done</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--child-text)]">{childDailyPlan.completedTasks}</p>
                <p className="mt-1 text-sm text-[var(--child-muted)]">already finished</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/90 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Left</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--child-text)]">{childDailyPlan.remainingTasks}</p>
                <p className="mt-1 text-sm text-[var(--child-muted)]">one at a time</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/child/today" className="rounded-full bg-[var(--child-text)] px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:opacity-90">
                Start today&apos;s tasks
              </Link>
              <Link href="/child/rewards" className="rounded-full bg-white/90 px-6 py-4 text-center text-base font-semibold text-[var(--child-text)] shadow-sm transition hover:bg-white">
                See my stars
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[linear-gradient(180deg,rgba(109,124,255,0.12),rgba(255,255,255,0.8))] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Today&apos;s focus</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--child-text)]">{childDailyPlan.focusTitle}</h2>
            <p className="mt-3 text-base leading-7 text-[var(--child-muted)]">{childDailyPlan.focusNote}</p>
            {childDailyPlan.nextTask ? (
              <div className="mt-5 rounded-[1.75rem] bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Do now</p>
                <p className="mt-2 text-xl font-semibold text-[var(--child-text)]">{childDailyPlan.nextTask.title}</p>
                <p className="mt-1 text-sm text-[var(--child-muted)]">{childDailyPlan.nextTask.subject} • {childDailyPlan.nextTask.tokenValue} {childDailyPlan.nextTask.tokenValue === 1 ? "star" : "stars"}</p>
              </div>
            ) : null}
            <div className="mt-5 rounded-[1.75rem] bg-white/80 p-4 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Reward path</p>
              <p className="mt-2 text-xl font-semibold text-[var(--child-text)]">{childDailyPlan.reward.title}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Next up</p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--child-text)]">Today&apos;s learning steps</h2>
            </div>
            <Link href="/child/today" className="rounded-full bg-[var(--child-surface-soft)] px-4 py-3 text-sm font-semibold text-[var(--child-text)]">
              View all
            </Link>
          </div>
          <div className="mt-5">
            <TodayTaskList compact tasks={childDailyPlan.tasks} />
          </div>
        </div>
        <TokenJarCard tokensEarned={childDailyPlan.tokensEarned} tokenGoal={childDailyPlan.tokenGoal} reward={childDailyPlan.reward} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Subjects</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--child-text)]">Choose your learning lane</h2>
        </div>
        <SubjectCardGrid subjects={childDailyPlan.subjectCards} />
      </section>
    </main>
  );
}
