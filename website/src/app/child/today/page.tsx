import Link from "next/link";
import { TodayTaskList } from "@/components/child-ui";
import { ChildPageIntro } from "@/components/shells";
import { requireChildSession } from "@/lib/auth/guards";
import { getChildDashboardData } from "@/lib/child-dashboard";

export default async function ChildTodayPage() {
  const session = await requireChildSession();
  const childDailyPlan = await getChildDashboardData(session.childProfileId);

  if (!childDailyPlan) {
    return null;
  }

  const progressWidth = `${childDailyPlan.totalTasks > 0 ? (childDailyPlan.completedTasks / childDailyPlan.totalTasks) * 100 : 0}%`;

  return (
    <main className="space-y-6">
      <section className="rounded-[calc(var(--radius-card)+0.75rem)] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,241,207,0.9))] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <ChildPageIntro
            badge="Today"
            title="Your learning steps for today"
            description="Nice and clear, one calm step at a time."
          />
          <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Progress</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--child-text)]">
              {childDailyPlan.completedTasks} of {childDailyPlan.totalTasks} done
            </p>
            <div className="mt-4 h-4 rounded-full bg-[var(--child-surface-soft)] p-1">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-reading),var(--accent-math),var(--accent-thinking))]" style={{ width: progressWidth }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--child-muted)]">Finish the next two tasks to earn more stars for your jar.</p>
          </div>
        </div>
      </section>

      <TodayTaskList tasks={childDailyPlan.tasks} />

      <section className="grid gap-4 md:grid-cols-2">
        <Link href="/child/home" className="rounded-[calc(var(--radius-card)+0.25rem)] border border-white/70 bg-[var(--child-surface)] p-5 text-center text-base font-semibold text-[var(--child-text)] shadow-[var(--shadow-soft)]">
          Back to home
        </Link>
        <Link href="/child/rewards" className="rounded-[calc(var(--radius-card)+0.25rem)] border border-white/70 bg-[var(--child-surface)] p-5 text-center text-base font-semibold text-[var(--child-text)] shadow-[var(--shadow-soft)]">
          See reward stars
        </Link>
      </section>
    </main>
  );
}
