import Link from "next/link";
import { completeChildTask } from "@/app/child/actions";
import { TaskCompleteButton } from "@/components/task-complete-button";

type RewardData = {
  note: string;
};

type TokenJarCardProps = {
  tokensEarned: number;
  tokenGoal: number;
  reward: RewardData;
};

type TaskItem = {
  id: string;
  stepLabel: string;
  subject: string;
  title: string;
  description: string;
  type: string;
  effort: string;
  encouragement: string;
  color: string;
  href: string;
  completed: boolean;
  tokenValue: number;
};

type SubjectCard = {
  href: string;
  label: string;
  color: string;
  icon: string;
  note: string;
  todayFocus: string;
};

export function TokenJarCard({ tokensEarned, tokenGoal, reward }: TokenJarCardProps) {
  const ratio = tokenGoal > 0 ? tokensEarned / tokenGoal : 0;
  const progress = `${Math.min(Math.round(ratio * 100), 100)}%`;

  return (
    <section className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Token jar</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--child-text)]">{tokensEarned} of {tokenGoal} stars</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--child-muted)]">{reward.note}</p>
        </div>
        <div className="rounded-full bg-[rgba(109,124,255,0.08)] px-4 py-2 text-sm font-semibold text-[var(--child-text)]">{progress} full</div>
      </div>
      <div className="mt-5 rounded-[2rem] bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0.72))] p-5">
        <div className="mx-auto flex h-56 w-40 items-end justify-center overflow-hidden rounded-[2.5rem] border-[5px] border-[#f2d98a] bg-[#fff9e8] px-4 pb-4 shadow-inner">
          <div className="flex w-full flex-wrap justify-center gap-2 rounded-[2rem_2rem_1.5rem_1.5rem] bg-[linear-gradient(180deg,rgba(255,214,102,0.95),rgba(255,193,71,0.9))] px-3 py-4" style={{ minHeight: progress }}>
            {Array.from({ length: tokensEarned }).map((_, index) => (
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

export function TodayTaskList({ compact = false, tasks }: { compact?: boolean; tasks: TaskItem[] }) {
  if (tasks.length === 0) {
    return (
      <section className="rounded-[calc(var(--radius-card)+0.35rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6">
        <p className="text-lg font-semibold text-[var(--child-text)]">No tasks yet</p>
        <p className="mt-2 max-w-xl text-base leading-7 text-[var(--child-muted)]">A parent can add today&apos;s calm learning steps, and they&apos;ll show up here when ready.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {tasks.map((task, index) => {
        const actionLabel = task.completed ? "Open again" : "Start this task";
        const stateLabel = task.completed ? "All done" : "Ready now";

        return (
          <article
            key={task.id}
            className="rounded-[calc(var(--radius-card)+0.35rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] text-lg font-bold text-white shadow-sm"
                  style={{ backgroundColor: task.color }}
                >
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                    <span className="rounded-full px-3 py-1.5 text-[var(--child-text)] shadow-sm" style={{ backgroundColor: `${task.color}22` }}>
                      {task.subject}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-[var(--child-muted)] shadow-sm">{task.stepLabel}</span>
                    <span
                      className="rounded-full px-3 py-1.5 shadow-sm"
                      style={{
                        backgroundColor: task.completed ? "rgba(134, 239, 172, 0.35)" : "var(--child-surface-soft)",
                        color: "var(--child-text)",
                      }}
                    >
                      {stateLabel}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-[var(--child-text)] md:text-[2rem]">{task.title}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--child-muted)]">{task.description}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Kind</p>
                  <p className="mt-1 text-base font-semibold text-[var(--child-text)]">{task.type}</p>
                </div>
                <div className="rounded-[1.25rem] bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Feel</p>
                  <p className="mt-1 text-base font-semibold text-[var(--child-text)]">{task.effort}</p>
                </div>
                <div className="rounded-[1.25rem] bg-white p-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Stars</p>
                  <p className="mt-1 text-base font-semibold text-[var(--child-text)]">{task.tokenValue} {task.tokenValue === 1 ? "star" : "stars"}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[var(--child-surface-soft)] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--child-muted)]">Next step</p>
                    <p className="mt-1 text-base font-semibold text-[var(--child-text)]">{task.encouragement}</p>
                  </div>
                  {compact ? (
                    <Link
                      href="/child/today"
                      className="rounded-full bg-[var(--child-text)] px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      See today&apos;s list
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                      <Link
                        href={task.href}
                        className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[var(--child-text)] shadow-sm transition hover:bg-white/90"
                      >
                        {actionLabel}
                      </Link>
                      <form action={completeChildTask}>
                        <input type="hidden" name="weeklyPlanItemId" value={task.id} />
                        <TaskCompleteButton completed={task.completed} />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function SubjectCardGrid({ subjects }: { subjects: SubjectCard[] }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Link key={subject.href} href={subject.href} className="rounded-[calc(var(--radius-card)+0.25rem)] border border-white/70 bg-[var(--child-surface)] p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: subject.color }}>
                {subject.label}
              </span>
              <h3 className="text-2xl font-semibold text-[var(--child-text)]">{subject.note}</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-lg font-bold text-[var(--child-text)] shadow-sm">{subject.icon}</div>
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
