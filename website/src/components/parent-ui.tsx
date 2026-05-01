import Link from "next/link";
import { ParentChildEditForm } from "@/components/parent-child-edit-form";
import { ParentPlannerCreateForm } from "@/components/parent-planner-create-form";
import { applyPlannerDraftAction } from "@/app/parent/planner/actions";
import type {
  ChildDashboardProfile,
  PlannerControl,
  PlannerDay,
  PlannerPrintable,
  PlannerWeekDay,
  RewardHighlight,
  SubjectKey,
  SubjectProgress,
} from "@/lib/mock-parent";

function progressWidth(value: number) {
  return `${Math.max(6, Math.min(100, value))}%`;
}

function subjectColor(subject: SubjectKey) {
  if (subject === "Reading") return "var(--accent-reading)";
  if (subject === "Math") return "var(--accent-math)";
  return "var(--accent-thinking)";
}

function modeLabel(mode: PlannerWeekDay["blocks"][number]["mode"]) {
  if (mode === "printable") return "Printable";
  if (mode === "offline") return "Offline";
  if (mode === "together") return "Shared";
  return "Guided";
}

export function ParentHero({
  title,
  description,
  plannerReadiness,
  attentionNote,
}: {
  title: string;
  description: string;
  plannerReadiness: string;
  attentionNote: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.16),rgba(36,49,71,0.94)_42%,rgba(17,24,39,1))] p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(109,124,255,0.22),transparent_32%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--parent-muted)]">Dashboard</p>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-3xl font-semibold text-white md:text-5xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/parent/planner" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Review planner
            </Link>
            <Link href="/parent/children" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
              View children
            </Link>
          </div>
        </div>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Planner status</p>
            <p className="mt-2 text-lg font-semibold text-white">{plannerReadiness}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">AI-guided note</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{attentionNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SummaryCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
      <p className="text-sm text-[var(--parent-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-[var(--parent-text)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">{note}</p>
    </div>
  );
}

export function ParentSurfaceSummary({
  items,
  columns = "md:grid-cols-3",
}: {
  items: Array<{ label: string; value: string; note: string }>;
  columns?: string;
}) {
  return (
    <section className={`grid gap-4 ${columns}`}>
      {items.map((item) => (
        <SummaryCard key={item.label} label={item.label} value={item.value} note={item.note} />
      ))}
    </section>
  );
}

export function ChildOverviewCard({ child }: { child: ChildDashboardProfile }) {
  return (
    <article className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-[var(--parent-text)]">{child.name}</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
              {child.ageLabel}
            </span>
          </div>
          <p className="mt-2 text-sm text-[var(--parent-muted)]">{child.mood}</p>
        </div>
        <div className="min-w-44 rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Weekly completion</p>
          <p className="mt-2 text-2xl font-semibold text-white">{child.weeklyCompletion}%</p>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-white" style={{ width: progressWidth(child.weeklyCompletion) }} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Today</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {child.completedToday}/{child.totalToday} blocks finished
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">{child.focus}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {child.subjects.map((subject) => (
              <SubjectPill key={subject.subject} subject={subject} />
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Reward status</p>
            <p className="mt-2 text-lg font-semibold text-white">{child.rewardName}</p>
            <p className="mt-1 text-sm text-[var(--parent-muted)]">
              {child.rewardTokens}/{child.rewardGoal} tokens collected
            </p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-[var(--accent-reward)]" style={{ width: progressWidth(child.rewardProgress) }} />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Next best step</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{child.nextStep}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ChildManagementCard({ child }: { child: ChildDashboardProfile }) {
  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] shadow-[var(--shadow-soft)]">
      <div className="border-b border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.12),rgba(36,49,71,0.72),rgba(27,36,53,1))] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold text-white">{child.name}</h2>
              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">{child.ageLabel}</span>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">{child.setupState}</span>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">{child.privacyNote}</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{child.loginStatus}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{child.pinStatus}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{child.lastActive}</span>
            </div>
          </div>

          <div className="lg:w-[25rem] rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Parent controls</p>
            <p className="mt-2">Edit the nickname and age band here, or rotate login details without revealing the current PIN back to the screen.</p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 p-6">
        <ParentChildEditForm child={{ id: child.id, name: child.name, ageLabel: child.ageLabel, username: child.username, parentNotes: child.parentNotes }} />
      </div>

      <div className="grid gap-5 p-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-4">
            <QuickStat label="Profile status" value={child.mood} note={child.nextStep} />
            <QuickStat label="Login" value={child.username} note={child.pinStatus} />
            <QuickStat label="Today" value={`${child.completedToday}/${child.totalToday} done`} note={child.focus} />
            <QuickStat label="Reward target" value={`${child.rewardTokens}/${child.rewardGoal} tokens`} note={child.rewardName} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Planning context</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{child.pacingNote}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <TagList title="Strengths showing up" items={child.strengths} tone="good" />
                <TagList title="Gentle support areas" items={child.gentleSupport} tone="soft" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Subject focus</p>
                  <p className="mt-2 text-lg font-semibold text-white">Weekly learning picture</p>
                </div>
                <span className="rounded-full border border-white/10 bg-slate-950/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">{child.weeklyCompletion}% complete</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {child.subjects.map((subject) => (
                  <SubjectPill key={subject.subject} subject={subject} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Child login basics</p>
                <p className="mt-2 text-lg font-semibold text-white">Simple, parent-managed access</p>
              </div>
              <span className="rounded-full border border-white/10 bg-slate-950/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Parent-managed</span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3">
                <p className="font-semibold text-white">Username</p>
                <p className="mt-1 text-[var(--parent-muted)]">{child.username}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3">
                <p className="font-semibold text-white">PIN status</p>
                <p className="mt-1 text-[var(--parent-muted)]">{child.pinStatus}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3">
                <p className="font-semibold text-white">Privacy stance</p>
                <p className="mt-1 text-[var(--parent-muted)]">Parent controls access, identity stays nickname-first, and setup avoids collecting extra details.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">Reward and planning relevance</p>
            <p className="mt-2 text-lg font-semibold text-white">{child.rewardName}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">Current reward progress can shape motivation while learning notes help future weekly planning stay realistic and calm.</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-[var(--accent-reward)]" style={{ width: progressWidth(child.rewardProgress) }} />
            </div>
            <p className="mt-3 text-sm text-slate-200">{child.nextStep}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function SubjectPill({ subject }: { subject: SubjectProgress }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-4">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: subject.color }} />
        <p className="text-sm font-semibold text-white">{subject.subject}</p>
      </div>
      <p className="mt-3 text-xl font-semibold text-[var(--parent-text)]">
        {subject.completed}/{subject.total}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--parent-muted)]">{subject.status}</p>
      <p className="mt-2 text-sm text-[var(--parent-muted)]">{subject.minutes} min this week</p>
    </div>
  );
}

function QuickStat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">{label}</p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--parent-muted)]">{note}</p>
    </div>
  );
}

function TagList({ title, items, tone }: { title: string; items: string[]; tone: "good" | "soft" }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full border px-3 py-2 text-sm ${tone === "good" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-white/10 bg-slate-950/25 text-slate-200"}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PlannerPreviewCard({ days }: { days: PlannerDay[] }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Weekly planner</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--parent-text)]">A simple preview of the family rhythm</h2>
        </div>
        <Link href="/parent/planner" className="text-sm font-medium text-slate-200 transition hover:text-white">
          Open planner
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {days.map((day) => (
          <div key={day.day} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
            <p className="text-sm font-semibold text-white">{day.day}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--parent-muted)]">{day.tone}</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {day.items.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-slate-950/20 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PlannerDetailBoard({
  weekLabel,
  title,
  summary,
  aiNote,
  headerStats,
  controls,
  printables,
  days,
  plannerChildren,
  defaultWeekOf,
  parentGuidance,
  savedPlans,
}: {
  weekLabel: string;
  title: string;
  summary: string;
  aiNote: string;
  headerStats: { label: string; value: string; note: string }[];
  controls: PlannerControl[];
  printables: PlannerPrintable[];
  days: PlannerWeekDay[];
  plannerChildren: Array<{ id: string; nickname: string; ageLabel: string; hasPlan: boolean }>;
  defaultWeekOf: string;
  parentGuidance: string[];
  savedPlans: Array<{
    id: string;
    childName: string;
    summary: string;
    blockCount: number;
    completionCount: number;
    printableCount: number;
    subjectLabels: string[];
    status: "draft" | "active";
    draftImpact?: {
      liveBlockCount: number;
      wouldAddCount: number;
      wouldReplaceCount: number;
      unchangedCount: number;
      affectedDays: string[];
      notes: string[];
      previewItems: Array<{ dayLabel: string; subjectLabel: string; draftTitle: string; liveTitle: string | null; changeType: "add" | "replace" | "unchanged" }>;
    };
  }>;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-[var(--radius-card)] border border-white/10 bg-[linear-gradient(135deg,rgba(109,124,255,0.12),rgba(18,24,37,0.96)_58%,rgba(14,19,29,1))] p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--parent-muted)]">{weekLabel}</p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-white md:text-5xl">{title}</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{summary}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:w-[34rem] xl:grid-cols-1">
            {controls.map((control) => (
              <button
                key={control.label}
                type="button"
                className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
              >
                <p className="text-sm font-semibold text-white">{control.label}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--parent-muted)]">{control.detail}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-3">
            {headerStats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{stat.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">AI-guided planning note</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{aiNote}</p>
          </div>
        </div>
      </div>

      <ParentPlannerCreateForm plannerChildren={plannerChildren} defaultWeekOf={defaultWeekOf} />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          {days.some((day) => day.blocks.length > 0) ? (
            days.map((day) => (
              <article key={day.day} className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)] md:p-6">
                <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold text-white">{day.day}</h2>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
                        {day.dateLabel}
                      </span>
                      <span className="rounded-full border border-[rgba(109,124,255,0.28)] bg-[rgba(109,124,255,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                        {day.guidanceTag}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-200">{day.rhythm}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--parent-muted)]">{day.parentNote}</p>
                  </div>
                  <p className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--parent-muted)]">
                    {day.blocks.length} planned blocks
                  </p>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  {day.blocks.map((block) => (
                    <div key={`${day.day}-${block.childName}-${block.title}`} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: subjectColor(block.subject) }} />
                        <p className="text-sm font-semibold text-white">{block.subject}</p>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
                          {modeLabel(block.mode)}
                        </span>
                        {block.printable ? (
                          <span className="rounded-full border border-[rgba(244,199,79,0.28)] bg-[rgba(244,199,79,0.12)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f6dda0]">
                            Printable
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-white">{block.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
                        <span className="rounded-full border border-white/10 bg-slate-950/20 px-2.5 py-1">{block.childName}</span>
                        <span className="rounded-full border border-white/10 bg-slate-950/20 px-2.5 py-1">{block.duration}</span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300">{block.note}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <section className="rounded-[var(--radius-card)] border border-dashed border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">No saved planner yet</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">This week is still open</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--parent-muted)]">When a weekly plan is saved, each day will show up here with readable blocks for parent oversight and child clarity.</p>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Saved week management</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">See what is already stored</h2>
            <div className="mt-5 space-y-3">
              {savedPlans.length > 0 ? (
                savedPlans.map((plan) => (
                  <div key={plan.id} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white">{plan.childName}</p>
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${plan.status === "draft" ? "border-sky-300/20 bg-sky-300/10 text-sky-100" : "border-white/10 bg-slate-950/20 text-[var(--parent-muted)]"}`}>
                        {plan.status === "draft" ? "Draft" : "Live week"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
                        {plan.blockCount} blocks
                      </span>
                      {plan.completionCount > 0 ? (
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100">
                          {plan.completionCount} completion{plan.completionCount === 1 ? "" : "s"}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{plan.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
                      {plan.subjectLabels.map((label) => (
                        <span key={`${plan.id}-${label}`} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                          {label}
                        </span>
                      ))}
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                        {plan.printableCount} printable{plan.printableCount === 1 ? "" : "s"}
                      </span>
                    </div>
                    {plan.status === "draft" && plan.draftImpact ? (
                      <div className="mt-4 space-y-4">
                        <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-3 text-xs leading-6 text-sky-100">
                          <p className="font-semibold uppercase tracking-[0.14em]">Before approval</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full border border-sky-200/20 bg-slate-950/20 px-2.5 py-1">{plan.draftImpact.wouldAddCount} add</span>
                            <span className="rounded-full border border-sky-200/20 bg-slate-950/20 px-2.5 py-1">{plan.draftImpact.wouldReplaceCount} replace</span>
                            <span className="rounded-full border border-sky-200/20 bg-slate-950/20 px-2.5 py-1">{plan.draftImpact.unchangedCount} unchanged</span>
                            <span className="rounded-full border border-sky-200/20 bg-slate-950/20 px-2.5 py-1">{plan.draftImpact.affectedDays.join(", ")}</span>
                          </div>
                          <div className="mt-3 space-y-2">
                            {plan.draftImpact.notes.map((note) => (
                              <p key={`${plan.id}-${note}`}>{note}</p>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {plan.draftImpact.previewItems.map((item) => (
                            <div key={`${plan.id}-${item.dayLabel}-${item.subjectLabel}-${item.draftTitle}`} className="rounded-2xl border border-white/10 bg-slate-950/20 p-3">
                              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--parent-muted)]">
                                <span>{item.dayLabel}</span>
                                <span>•</span>
                                <span>{item.subjectLabel}</span>
                                <span className={`rounded-full border px-2 py-0.5 ${item.changeType === "replace" ? "border-amber-300/20 bg-amber-300/10 text-amber-100" : item.changeType === "add" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100" : "border-white/10 bg-white/5 text-[var(--parent-muted)]"}`}>
                                  {item.changeType}
                                </span>
                              </div>
                              <p className="mt-2 text-sm font-semibold text-white">Draft: {item.draftTitle}</p>
                              <p className="mt-1 text-sm leading-6 text-[var(--parent-muted)]">
                                {item.liveTitle ? `Live now: ${item.liveTitle}` : "Live now: no block in this slot"}
                              </p>
                            </div>
                          ))}
                        </div>

                        <form action={applyPlannerDraftAction} className="space-y-2">
                          <input type="hidden" name="draftId" value={plan.id} />
                          <button type="submit" className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 transition hover:bg-sky-300/20">
                            Approve draft and update live week
                          </button>
                          <p className="text-xs leading-5 text-[var(--parent-muted)]">Approval applies this draft into the live child week, then removes the stored draft.</p>
                        </form>
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-[var(--parent-surface-soft)] p-4 text-sm leading-6 text-[var(--parent-muted)]">
                  No child has a saved plan for this week yet.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Printable visibility</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Prep once, then keep the week moving</h2>
            <div className="mt-5 space-y-3">
              {printables.length > 0 ? (
                printables.map((item) => (
                  <div key={`${item.forChild}-${item.title}`} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--parent-muted)]">
                          {item.forChild} • {item.subject}
                        </p>
                      </div>
                      <span className="rounded-full border border-[rgba(244,199,79,0.28)] bg-[rgba(244,199,79,0.12)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f6dda0]">
                        Printable
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-[var(--parent-surface-soft)] p-4 text-sm leading-6 text-[var(--parent-muted)]">
                  No printable plan items are stored for this week yet.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-5 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Parent guidance</p>
            <div className="mt-4 space-y-3">
              {parentGuidance.map((note) => (
                <div key={note} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-300">
                  {note}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

export function RewardOverviewCard({ rewards }: { rewards: RewardHighlight[] }) {
  return (
    <section className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--parent-surface)] p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--parent-muted)]">Rewards</p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--parent-text)]">Visible motivation, without too much noise</h2>
        </div>
        <Link href="/parent/rewards" className="text-sm font-medium text-slate-200 transition hover:text-white">
          Open rewards
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {rewards.map((reward) => (
          <div key={reward.childName} className="rounded-3xl border border-white/10 bg-[var(--parent-surface-soft)] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">{reward.childName}</p>
                <p className="text-sm text-[var(--parent-muted)]">{reward.rewardName}</p>
              </div>
              <p className="text-sm text-slate-200">
                {reward.tokens}/{reward.goal} tokens
              </p>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-[var(--accent-reward)]" style={{ width: progressWidth(reward.progress) }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--parent-muted)]">{reward.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
