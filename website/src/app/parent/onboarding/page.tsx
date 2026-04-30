import Link from "next/link";
import { ParentChildCreateForm } from "@/components/parent-child-create-form";
import { ParentPageIntro, PlaceholderList } from "@/components/shells";
import { requireParentSession } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

export default async function ParentOnboardingPage() {
  const session = await requireParentSession();
  const childCount = await prisma.childProfile.count({
    where: {
      parentUserId: session.parentUserId,
      isArchived: false,
    },
  });

  if (childCount > 0) {
    return (
      <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
        <ParentPageIntro
          eyebrow="Family setup"
          title="Your family already has a child profile"
          description="You can head into the dashboard, or open the children space if you want to add another profile before planning the week."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/parent/dashboard"
            className="rounded-3xl border border-white/10 bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Go to dashboard
          </Link>
          <Link
            href="/parent/children"
            className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Manage children
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 md:p-8">
      <ParentPageIntro
        eyebrow="Family setup"
        title="Add your first child when you are ready"
        description="Your parent account is ready. The next small step is creating one child profile so daily plans, rewards, and login can start from a real family setup."
      />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <ParentChildCreateForm
          eyebrow="First child setup"
          title="Start with one simple child profile"
          description="Use the nickname your child recognizes, choose a simple username, and set a parent-managed PIN. You can add more details later without turning this into a big setup flow."
          redirectTo="/parent/dashboard?onboarding=child-created"
          submitLabel="Create first child"
          pendingLabel="Creating first child..."
        />

        <section className="space-y-4 rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface-soft)] p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Why this handoff stays light</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Enough setup to move forward, not a full wizard</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--parent-muted)]">
              EduCore only asks for the child details needed to support login, planning, and rewards. Everything else can wait until it proves useful.
            </p>
          </div>

          <PlaceholderList
            items={[
              "Create one child profile now, add more later",
              "Go straight to the dashboard if you want to look around first",
              "Return to the children page anytime to edit profile basics",
            ]}
          />

          <Link
            href="/parent/dashboard?onboarding=skipped"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Skip for now and open dashboard
          </Link>
        </section>
      </div>
    </main>
  );
}
