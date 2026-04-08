import { PlanItemType, PlanStatus, SubjectArea, TaskCompletionStatus } from "@/generated/prisma/client";
import type { PlannerBlock, PlannerControl, PlannerHeaderStat, PlannerPrintable, PlannerWeekDay, SubjectKey } from "@/lib/mock-parent";
import { prisma } from "@/lib/prisma";

const subjectMeta: Record<SubjectArea, { label: SubjectKey; color: string; childHref: string; icon: string; note: string }> = {
  READING: {
    label: "Reading",
    color: "var(--accent-reading)",
    childHref: "/child/subject/reading",
    icon: "Aa",
    note: "Stories, sounds, and letter play",
  },
  MATH: {
    label: "Math",
    color: "var(--accent-math)",
    childHref: "/child/subject/math",
    icon: "123",
    note: "Counting, shapes, and number fun",
  },
  CRITICAL_THINKING: {
    label: "Thinking",
    color: "var(--accent-thinking)",
    childHref: "/child/subject/thinking",
    icon: "?",
    note: "Patterns, choices, and tiny puzzles",
  },
};

export function startOfDay(value: Date) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function endOfDay(value: Date) {
  const date = new Date(value);
  date.setHours(23, 59, 59, 999);
  return date;
}

export function startOfWeek(value: Date) {
  const date = startOfDay(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

export function endOfWeek(value: Date) {
  const date = startOfWeek(value);
  date.setDate(date.getDate() + 6);
  return endOfDay(date);
}

function formatDateLabel(value: Date) {
  return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatWeekLabel(value: Date) {
  return `Week of ${value.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
}

function itemTypeLabel(itemType: PlanItemType) {
  switch (itemType) {
    case PlanItemType.ACTIVITY:
      return "activity";
    case PlanItemType.PRACTICE:
      return "practice";
    case PlanItemType.OFFLINE:
      return "offline";
    case PlanItemType.PRINTABLE:
      return "printable";
    default:
      return "guided";
  }
}

function modeFromItem(itemType: PlanItemType, isOffline: boolean, isPrintable: boolean): PlannerBlock["mode"] {
  if (isPrintable || itemType === PlanItemType.PRINTABLE) return "printable";
  if (isOffline || itemType === PlanItemType.OFFLINE) return "offline";
  if (itemType === PlanItemType.ACTIVITY) return "together";
  return "guided";
}

function guidanceTag(blockCount: number, printableCount: number, offlineCount: number) {
  if (blockCount === 0) return "open day";
  if (printableCount > 0) return "printable support";
  if (offlineCount > 0) return "offline-friendly";
  if (blockCount <= 2) return "light day";
  return "steady rhythm";
}

function rhythmLabel(blockCount: number) {
  if (blockCount === 0) return "No plan blocks yet";
  if (blockCount === 1) return "One calm learning block";
  if (blockCount === 2) return "A light, manageable day";
  return "A steady family learning rhythm";
}

function parentNote(blockCount: number, printableCount: number, offlineCount: number) {
  if (blockCount === 0) return "No plan is stored for this day yet. The space stays open until you are ready.";
  if (printableCount > 0 && offlineCount > 0) return "A mix of printable and hands-on steps keeps the day flexible at home.";
  if (printableCount > 0) return "Printable support is visible here early so prep can stay light.";
  if (offlineCount > 0) return "Hands-on and offline moments are part of the real plan, not extras.";
  return "Short, readable blocks help the day stay calm and followable.";
}

function formatDuration(itemType: PlanItemType, details: string | null, isOffline: boolean) {
  if (isOffline || itemType === PlanItemType.OFFLINE) return "Hands-on";
  if (details && details.length > 140) return "Medium";
  return "Quick";
}

export function getSubjectMeta(subject: SubjectArea) {
  return subjectMeta[subject];
}

export function formatRewardNote(tokensEarned: number, tokenGoal: number) {
  const remaining = Math.max(tokenGoal - tokensEarned, 0);
  if (remaining === 0) {
    return "Your jar is full. Time to check in with your parent for reward time.";
  }

  return `${remaining} more ${remaining === 1 ? "star" : "stars"} until reward time`;
}

export async function getParentPlannerData(parentUserId: string) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const plans = await prisma.weeklyPlan.findMany({
    where: {
      childProfile: {
        parentUserId,
        isArchived: false,
      },
      weekStart,
      status: {
        in: [PlanStatus.ACTIVE, PlanStatus.DRAFT],
      },
    },
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
    include: {
      childProfile: {
        select: {
          nickname: true,
        },
      },
      items: {
        where: {
          assignedDate: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
        orderBy: [{ assignedDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });

  const allItems = plans.flatMap((plan) =>
    plan.items.map((item) => ({
      ...item,
      childName: plan.childProfile.nickname,
      planStatus: plan.status,
    })),
  );

  const completedCount = await prisma.taskCompletion.count({
    where: {
      childProfile: {
        parentUserId,
      },
      status: TaskCompletionStatus.COMPLETED,
      weeklyPlanItem: {
        weeklyPlan: {
          weekStart,
        },
      },
    },
  });

  const printableItems: PlannerPrintable[] = allItems
    .filter((item) => item.isPrintable || item.itemType === PlanItemType.PRINTABLE)
    .map((item) => ({
      title: item.title,
      forChild: item.childName,
      subject: getSubjectMeta(item.subject).label,
      note: item.details ?? "Prepared for flexible offline or printable use.",
    }));

  const controls: PlannerControl[] = [
    { label: "Regenerate week", detail: "Planner editing and generation will land in a later ticket." },
    { label: "Refresh today", detail: "Today stays readable now, even before editing controls exist." },
    { label: "Adjust pacing", detail: "Future pacing controls can build on this persisted weekly plan data." },
  ];

  const headerStats: PlannerHeaderStat[] = [
    {
      label: "Planned blocks",
      value: String(allItems.length),
      note: allItems.length > 0 ? "Stored weekly plan items across the family for this week." : "No stored blocks for this week yet.",
    },
    {
      label: "Printable supports",
      value: String(printableItems.length),
      note: printableItems.length > 0 ? "Printable items stay visible for parent prep." : "No printable items are stored yet.",
    },
    {
      label: "Completed blocks",
      value: String(completedCount),
      note: allItems.length > 0 ? "Completion display is read from saved task records where available." : "Completion will appear here once plan items and task records exist.",
    },
  ];

  const days: PlannerWeekDay[] = Array.from({ length: 7 }, (_, index) => {
    const date = startOfDay(new Date(weekStart));
    date.setDate(weekStart.getDate() + index);

    const dayItems = allItems.filter((item) => startOfDay(item.assignedDate).getTime() === date.getTime());
    const printableCount = dayItems.filter((item) => item.isPrintable || item.itemType === PlanItemType.PRINTABLE).length;
    const offlineCount = dayItems.filter((item) => item.isOffline || item.itemType === PlanItemType.OFFLINE).length;

    return {
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      dateLabel: formatDateLabel(date),
      rhythm: rhythmLabel(dayItems.length),
      parentNote: parentNote(dayItems.length, printableCount, offlineCount),
      guidanceTag: guidanceTag(dayItems.length, printableCount, offlineCount),
      blocks: dayItems.map((item) => ({
        title: item.title,
        childName: item.childName,
        subject: getSubjectMeta(item.subject).label,
        duration: formatDuration(item.itemType, item.details, item.isOffline),
        mode: modeFromItem(item.itemType, item.isOffline, item.isPrintable),
        note: item.details ?? `A ${itemTypeLabel(item.itemType)} block for ${item.childName}.`,
        printable: item.isPrintable || item.itemType === PlanItemType.PRINTABLE,
      })),
    };
  });

  const childrenCovered = new Set(plans.map((plan) => plan.childProfile.nickname));
  const summary =
    allItems.length > 0
      ? `This week is being read from saved weekly plans for ${childrenCovered.size} ${childrenCovered.size === 1 ? "child" : "children"}, keeping parent oversight and child tasks connected through the same stored plan items.`
      : "No weekly plan is stored for this week yet. The planner stays calm and readable until a plan is created.";

  const aiNote =
    allItems.length > 0
      ? "This planner view is now backed by persisted weekly plan data. Editing and regeneration can build on this same structure later."
      : "Once a weekly plan is saved, this view will show each day’s stored learning blocks and printable visibility here.";

  return {
    weekLabel: formatWeekLabel(weekStart),
    title: allItems.length > 0 ? "Your saved family week" : "No saved weekly plan yet",
    summary,
    aiNote,
    headerStats,
    controls,
    printables: printableItems,
    days,
  };
}
