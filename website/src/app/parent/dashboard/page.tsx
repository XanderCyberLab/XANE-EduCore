import {
  ChildOverviewCard,
  ParentHero,
  PlannerPreviewCard,
  RewardOverviewCard,
  SummaryCard,
} from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { getParentDashboardData } from "@/lib/parent-dashboard";

export default async function ParentDashboardPage() {
  const session = await requireParentSession();
  const { familySummary, weeklySnapshot, children, plannerPreview, rewardHighlights, parentName, welcomeLabel } = await getParentDashboardData(
    session.parentUserId,
    session.email,
  );

  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title={`${welcomeLabel}, ${parentName}. The family week looks steady.`}
        description="EduCore keeps the parent view calm and practical: what is moving well, where a gentle nudge helps, and how rewards and planning are shaping the week."
        plannerReadiness={familySummary.plannerReadiness}
        attentionNote={familySummary.attentionNote}
      />

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          label="Family summary"
          value={`${familySummary.completedBlocks}/${familySummary.weeklyBlocks}`}
          note="Learning blocks completed this week across Reading, Math, and Thinking."
        />
        <SummaryCard
          label="Today"
          value={`${weeklySnapshot.completedToday}/${weeklySnapshot.plannedToday}`}
          note={
            weeklySnapshot.plannedToday > 0
              ? `${Math.max(weeklySnapshot.plannedToday - weeklySnapshot.completedToday, 0)} gentle ${weeklySnapshot.plannedToday - weeklySnapshot.completedToday === 1 ? "follow-up remains" : "follow-ups remain"} today.`
              : "No tasks are stored for today yet."
          }
        />
        <SummaryCard
          label="Active children"
          value={String(familySummary.activeChildren)}
          note={weeklySnapshot.calmNote}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          {children.map((child) => (
            <ChildOverviewCard key={child.id} child={child} />
          ))}
        </div>
        <div className="space-y-6">
          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">This week at a glance</p>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--parent-text)]">Progress stays readable</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                <p className="text-sm text-[var(--parent-muted)]">Weekly completion</p>
                <p className="mt-2 text-3xl font-semibold text-white">{weeklySnapshot.weeklyCompletion}%</p>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-white" style={{ width: `${weeklySnapshot.weeklyCompletion}%` }} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-[var(--parent-muted)]">Streak</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{weeklySnapshot.streakDays} calm days</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-[var(--parent-muted)]">Parent note</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{familySummary.attentionNote}</p>
                </div>
              </div>
            </div>
          </section>
          <RewardOverviewCard rewards={rewardHighlights} />
        </div>
      </section>

      <PlannerPreviewCard days={plannerPreview} />
    </main>
  );
}
