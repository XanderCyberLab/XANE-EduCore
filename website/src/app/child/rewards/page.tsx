import Link from "next/link";
import { TokenJarCard } from "@/components/child-ui";
import { ChildPageIntro } from "@/components/shells";
import { requireChildSession } from "@/lib/auth/guards";
import { getChildDashboardData } from "@/lib/child-dashboard";

export default async function ChildRewardsPage() {
  const session = await requireChildSession();
  const childDailyPlan = await getChildDashboardData(session.childProfileId);

  if (!childDailyPlan) {
    return null;
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[calc(var(--radius-card)+0.5rem)] border border-white/70 bg-[var(--child-surface)] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <ChildPageIntro
          badge="Rewards"
          title="Your calm reward path"
          description="Stars grow a little at a time. When the jar is full, you get a parent-chosen real world reward."
        />
        <div className="mt-6 rounded-[1.75rem] bg-[var(--child-surface-soft)] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--child-muted)]">Next reward</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--child-text)]">{childDailyPlan.reward.title}</p>
          <p className="mt-2 text-base leading-7 text-[var(--child-muted)]">{childDailyPlan.reward.note}</p>
        </div>
        <div className="mt-5">
          <Link href="/child/today" className="inline-flex rounded-full bg-[var(--child-text)] px-5 py-3 text-sm font-semibold text-white">
            Keep going today
          </Link>
        </div>
      </section>
      <TokenJarCard tokensEarned={childDailyPlan.tokensEarned} tokenGoal={childDailyPlan.tokenGoal} reward={childDailyPlan.reward} />
    </main>
  );
}
