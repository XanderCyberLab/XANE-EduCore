import Link from "next/link";
import { childDailyPlan, childSubjectCards, childTodayTasks } from "@/lib/mock-child";

export function TokenJarCard() {
  const progress = `${Math.round((childDailyPlan.tokensEarned / childDailyPlan.tokenGoal) * 100)}%`;

  return (
    <section className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Token jar</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--child-text)]">{childDailyPlan.tokensEarned} of {childDailyPlan.tokenGoal} stars</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--child-muted)]">{childDailyPlan.reward.note}</p>
        </div>
        <div className="rounded-full bg-[rgba(109,124,255,0.08)] px-4 py-2 text-sm font-semibold text-[var(--child-text)]">
          {progress} full
        </div>
      </div>
      <div className="mt-5 rounded-[2rem] bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0.72))] p-5">
        <div className="mx-auto flex h-56 w-40 items-end justify-center overflow-hidden rounded-[2.5rem] border-[5px] border-[#f2d98a] bg-[#fff9e8] px-4 pb-4 shadow-inner">
          <div className="flex w-full flex-wrap justify-center gap-2 rounded-[2rem_2rem_1.5rem_1.5rem] bg-[linear-gradient(180deg,rgba(255,214,102,0.95),rgba(255,193,71,0.9))] px-3 py-4" style={{ minHeight: progress }}>
            {Array.from({ length: childDailyPlan.tokensEarned }).map((_, index) => (
              <span key={index} className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-sm shadow-sm">
                ✦
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TodayTaskList({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-4">
      {childTodayTasks.map((task, index) => (
        <article
          key={task.id}
          className="rounded-[calc(var(--radius-card)+0.35rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-lg font-bold text-white shadow-sm"
                style={{ backgroundColor: task.color }}
              >
                {index + 1}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 text-sm font-semibold text-[var(--child-muted)]">
                  <span>{task.stepLabel}</span>
                  <span>•</span>
                  <span>{task.subject}</span>
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--child-text)]">{task.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--child-muted)]">{task.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:max-w-[12rem] md:justify-end">
              <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-[var(--child-text)] shadow-sm">{task.type}</span>
              <span className="rounded-full bg-[var(--child-surface-soft)] px-3 py-2 text-sm font-semibold text-[var(--child-text)]">{task.effort}</span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-[1.5rem] bg-[var(--child-surface-soft)] p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[var(--child-text)]">{task.encouragement}</p>
            {compact ? (
              <Link href="/child/today" className="rounded-full bg-[var(--child-text)] px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90">
                Open today
              </Link>
            ) : (
              <button className="rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Start task
              </button>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export function SubjectCardGrid() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {childSubjectCards.map((subject) => (
        <Link
          key={subject.href}
          href={subject.href}
          className="rounded-[calc(var(--radius-card)+0.25rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: subject.color }}>
                {subject.label}
              </span>
              <h3 className="text-2xl font-semibold text-[var(--child-text)]">{subject.note}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-lg font-bold text-[var(--child-text)] shadow-sm">
              {subject.icon}
            </div>
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-[var(--child-surface-soft)] p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Today inside</p>
            <p className="mt-2 text-base font-medium text-[var(--child-text)]">{subject.todayFocus}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
