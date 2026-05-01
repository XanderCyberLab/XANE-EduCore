import Link from "next/link";
import {
  ChildOverviewCard,
  ParentHero,
  ParentSurfaceSummary,
  PlannerPreviewCard,
  RewardOverviewCard,
} from "@/components/parent-ui";
import { requireParentSession } from "@/lib/auth/guards";
import { getParentDashboardData } from "@/lib/parent-dashboard";

export default async function ParentDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ onboarding?: string }>;
}) {
  const session = await requireParentSession();
  const { familySummary, weeklySnapshot, children, plannerPreview, rewardHighlights, parentName, welcomeLabel } = await getParentDashboardData(
    session.parentUserId,
    session.email,
  );
  const resolvedSearchParams = (await searchParams) ?? {};
  const onboardingState = resolvedSearchParams.onboarding;
  const missingRewardCount = rewardHighlights.filter((reward) => reward.rewardName === "Reward still open").length;

  return (
    <main className="space-y-6 pb-8">
      <ParentHero
        title={`${welcomeLabel}, ${parentName}. The family week looks steady.`}
        description="EduCore keeps the parent view calm and practical: what is moving well, where a gentle nudge helps, and how rewards and planning are shaping the week."
        plannerReadiness={familySummary.plannerReadiness}
        attentionNote={familySummary.attentionNote}
      />

      <ParentSurfaceSummary
        items={[
          {
            label: "Family summary",
            value: `${familySummary.completedBlocks}/${familySummary.weeklyBlocks}`,
            note: "Learning blocks completed this week across Reading, Math, and Thinking.",
          },
          {
            label: "Today",
            value: `${weeklySnapshot.completedToday}/${weeklySnapshot.plannedToday}`,
            note:
              weeklySnapshot.plannedToday > 0
                ? `${Math.max(weeklySnapshot.plannedToday - weeklySnapshot.completedToday, 0)} gentle ${weeklySnapshot.plannedToday - weeklySnapshot.completedToday === 1 ? "follow-up remains" : "follow-ups remain"} today.`
                : "No tasks are stored for today yet.",
          },
          {
            label: "Active children",
            value: String(familySummary.activeChildren),
            note: weeklySnapshot.calmNote,
          },
        ]}
      />

      {onboardingState === "child-created" ? (
        <section className="rounded-[var(--radius-card)] border border-emerald-400/20 bg-emerald-400/10 p-5 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">First child ready</p>
          <div className="mt-3 flex flex-col gap-4">
            <p className="max-w-3xl text-sm leading-7 text-emerald-50">
              Your family setup is now grounded in a real child profile. The next useful step is usually saving a first weekly plan, then checking that rewards and login details feel right for the family rhythm.
            </p>
            <div className="grid gap-3 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-3xl border border-emerald-300/20 bg-slate-950/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100">Recommended next steps</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">
                    <p className="font-semibold text-white">1. Review the child profile</p>
                    <p className="mt-1 leading-6 text-emerald-50/90">Confirm nickname, age band, username, and PIN basics.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">
                    <p className="font-semibold text-white">2. Save a first week</p>
                    <p className="mt-1 leading-6 text-emerald-50/90">Give the dashboard and child flow a real plan to read from.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100">
                    <p className="font-semibold text-white">3. Set the first reward</p>
                    <p className="mt-1 leading-6 text-emerald-50/90">Give each child a simple reward path so tokens and motivation are visible before the first learning rhythm starts.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:items-start lg:justify-center">
                <Link href="/parent/planner" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                  Plan the first week
                </Link>
                <Link href="/parent/children" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                  Review child profile
                </Link>
                <Link href="/parent/rewards" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                  Open rewards
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {children.length === 0 ? (
        <section className="grid gap-4 rounded-[var(--radius-card)] border border-dashed border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">First family setup</p>
            <h2 className="text-2xl font-semibold text-white">
              {onboardingState === "child-created" ? "Your first child profile is ready" : "Add your first child to unlock the family flow"}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">
              {onboardingState === "child-created"
                ? "You can review the dashboard now, then head into children or planning whenever you want to shape the next step."
                : onboardingState === "skipped"
                  ? "You skipped setup for now, which is fine. When you are ready, adding one child profile is the smallest step that connects login, planning, and rewards."
                  : "A single child profile gives EduCore enough context to make daily plans, rewards, and child login feel grounded without turning setup into a long wizard."}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-start lg:justify-center">
            <Link href="/parent/onboarding" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Add first child
            </Link>
            <Link href="/parent/children" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
              Open children space
            </Link>
          </div>
        </section>
      ) : children.length > 0 ? (
        <section className="grid gap-4 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)] xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Next useful parent steps</p>
            <h2 className="text-2xl font-semibold text-white">Keep setup momentum without turning it into a bigger flow</h2>
            <p className="max-w-3xl text-sm leading-7 text-[var(--parent-muted)]">
              Once a child exists, the clearest next moves are to save a weekly plan, review reward visibility, and only then come back for profile edits if something feels off.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            <Link href="/parent/planner" className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4 transition hover:bg-white/10">
              <p className="text-sm font-semibold text-white">Planner</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Save or generate the first week so daily tasks become real.</p>
            </Link>
            <Link href="/parent/rewards" className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4 transition hover:bg-white/10">
              <p className="text-sm font-semibold text-white">Rewards</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">
                {missingRewardCount > 0
                  ? `${missingRewardCount === 1 ? "Create the first reward path" : `Create ${missingRewardCount} reward paths`} so motivation is visible for each child.`
                  : "Review token goals and make sure each reward path still feels clear and reachable."}
              </p>
            </Link>
            <Link href="/parent/children" className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4 transition hover:bg-white/10">
              <p className="text-sm font-semibold text-white">Children</p>
              <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Return here if you want to tighten profile or login details.</p>
            </Link>
          </div>
        </section>
      ) : null}

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
