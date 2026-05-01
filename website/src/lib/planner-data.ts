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

function ageBandLabel(ageBand: string | null | undefined) {
  switch (ageBand) {
    case "EARLY_YEARS":
      return "Early years";
    case "UPPER_ELEMENTARY":
      return "Upper elementary";
    default:
      return "Lower elementary";
  }
}

export async function getParentPlannerData(parentUserId: string) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const [plans, drafts, children] = await Promise.all([
    prisma.weeklyPlan.findMany({
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
    }),
    prisma.plannerDraft.findMany({
      where: {
        childProfile: {
          parentUserId,
          isArchived: false,
        },
        weekStart,
      },
      orderBy: [{ createdAt: "asc" }],
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
    }),
    prisma.childProfile.findMany({
      where: {
        parentUserId,
        isArchived: false,
      },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        nickname: true,
        ageBand: true,
      },
    }),
  ]);

  const allItems = plans.flatMap((plan) =>
    plan.items.map((item) => ({
      ...item,
      childName: plan.childProfile.nickname,
      planStatus: plan.status,
      weeklyPlanSummary: plan.summary,
      weeklyPlanId: plan.id,
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

  const completionCountByPlanId = new Map<string, number>();
  const itemIds = allItems.map((item) => item.id);

  if (itemIds.length > 0) {
    const completionsByItem = await prisma.taskCompletion.groupBy({
      by: ["weeklyPlanItemId"],
      where: {
        status: TaskCompletionStatus.COMPLETED,
        weeklyPlanItemId: {
          in: itemIds,
        },
      },
      _count: {
        weeklyPlanItemId: true,
      },
    });

    const completionCountByItemId = new Map(
      completionsByItem.map((row) => [row.weeklyPlanItemId, row._count.weeklyPlanItemId]),
    );

    for (const item of allItems) {
      const count = completionCountByItemId.get(item.id) ?? 0;
      completionCountByPlanId.set(item.weeklyPlanId, (completionCountByPlanId.get(item.weeklyPlanId) ?? 0) + count);
    }
  }

  const plansByChildId = new Map(plans.map((plan) => [plan.childProfileId, plan]));

  type DraftImpactPreviewItem = {
    dayLabel: string;
    subjectLabel: SubjectKey;
    draftTitle: string;
    liveTitle: string | null;
    changeType: "add" | "replace" | "unchanged";
  };

  const savedPlans: Array<{
    id: string;
    childName: string;
    summary: string;
    blockCount: number;
    completionCount: number;
    printableCount: number;
    subjectLabels: SubjectKey[];
    status: "draft" | "active";
    draftImpact?: {
      liveBlockCount: number;
      wouldAddCount: number;
      wouldReplaceCount: number;
      unchangedCount: number;
      affectedDays: string[];
      notes: string[];
      previewItems: DraftImpactPreviewItem[];
    };
  }> = [
    ...drafts.map((draft) => {
      const draftItems = draft.items;
      const subjectLabels = Array.from(new Set(draftItems.map((item) => getSubjectMeta(item.subject).label)));
      const livePlan = plansByChildId.get(draft.childProfileId);
      const liveItems = livePlan?.items ?? [];
      const draftPreviewItems: DraftImpactPreviewItem[] = draftItems.map((item) => {
        const matchingLiveItem = liveItems.find((liveItem) =>
          liveItem.subject === item.subject && startOfDay(liveItem.assignedDate).getTime() === startOfDay(item.assignedDate).getTime(),
        );
        const liveTitle = matchingLiveItem?.title ?? null;
        const changeType = liveTitle === null ? "add" : liveTitle === item.title ? "unchanged" : "replace";

        return {
          dayLabel: new Date(item.assignedDate).toLocaleDateString("en-US", { weekday: "short" }),
          subjectLabel: getSubjectMeta(item.subject).label,
          draftTitle: item.title,
          liveTitle,
          changeType,
        };
      });
      const wouldAddCount = draftPreviewItems.filter((item) => item.changeType === "add").length;
      const wouldReplaceCount = draftPreviewItems.filter((item) => item.changeType === "replace").length;
      const unchangedCount = draftPreviewItems.filter((item) => item.changeType === "unchanged").length;
      const affectedDays = Array.from(new Set(draftItems.map((item) => new Date(item.assignedDate).toLocaleDateString("en-US", { weekday: "long" }))));
      const notes = [
        livePlan
          ? `This draft will review against ${liveItems.length} live block${liveItems.length === 1 ? "" : "s"} already saved for this child this week.`
          : "No live weekly plan exists for this child yet, so approval will publish this draft as the first saved week.",
        wouldReplaceCount > 0
          ? `${wouldReplaceCount} block${wouldReplaceCount === 1 ? "" : "s"} would replace live items in the same day and subject slots.`
          : "No live blocks would be replaced in matching day and subject slots.",
      ];

      return {
        id: draft.id,
        childName: draft.childProfile.nickname,
        summary: draft.summary || `A reviewable draft for ${draft.childProfile.nickname}.`,
        blockCount: draftItems.length,
        completionCount: 0,
        printableCount: draftItems.filter((item) => item.isPrintable || item.itemType === PlanItemType.PRINTABLE).length,
        subjectLabels,
        status: "draft" as const,
        draftImpact: {
          liveBlockCount: liveItems.length,
          wouldAddCount,
          wouldReplaceCount,
          unchangedCount,
          affectedDays,
          notes,
          previewItems: draftPreviewItems,
        },
      };
    }),
    ...plans.map((plan) => {
    const planItems = allItems.filter((item) => item.weeklyPlanId === plan.id);
    const subjectLabels = Array.from(new Set(planItems.map((item) => getSubjectMeta(item.subject).label)));

    return {
      id: plan.id,
      childName: plan.childProfile.nickname,
      summary: plan.summary || `A saved week for ${plan.childProfile.nickname}.`,
      blockCount: planItems.length,
      completionCount: completionCountByPlanId.get(plan.id) ?? 0,
      printableCount: planItems.filter((item) => item.isPrintable || item.itemType === PlanItemType.PRINTABLE).length,
      subjectLabels,
      status: "active" as const,
    };
  }),
  ];

  const controls: PlannerControl[] = [
    { label: "Generate starter draft", detail: "Create a calm starter plan for a full week, one day, or a smaller day range." },
    { label: "Review before approval", detail: "Starter drafts now save separately from the live child week until a parent approves them." },
    { label: "Keep parent control", detail: "Nothing auto-publishes here. Parents still review, approve, edit, and save the real week." },
  ];

  const draftCount = drafts.length;

  const headerStats: PlannerHeaderStat[] = [
    {
      label: "Planned blocks",
      value: String(allItems.length),
      note: allItems.length > 0 ? "Stored weekly plan items across the family for this week." : "No stored blocks for this week yet.",
    },
    {
      label: "Saved drafts",
      value: String(draftCount),
      note: draftCount > 0 ? "Reviewable planner drafts waiting outside the live child week." : "No separate planner drafts are waiting for review.",
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
    draftCount > 0
      ? "Starter drafts are now stored separately from the live child week. Parents can review draft blocks first, then approve them into the real weekly planner when ready."
      : allItems.length > 0
        ? "This planner view is backed by persisted weekly plan data, while future AI help still stays behind parent review before any live planner mutation."
        : "Create a parent-made week or generate a calm starter draft. Future AI help will still depend on parent review before anything reaches the live planner.";

  const childrenWithPlans = new Set(plans.map((plan) => plan.childProfileId)).size;
  const daysWithPlans = days.filter((day) => day.blocks.length > 0).length;

  return {
    children,
    defaultWeekOf: weekStart.toISOString().slice(0, 10),
    weekLabel: formatWeekLabel(weekStart),
    title: allItems.length > 0 ? "Your saved family week" : "No saved weekly plan yet",
    summary,
    aiNote,
    headerStats,
    controls,
    printables: printableItems,
    days,
    surfaceSummary: [
      {
        label: "Children covered",
        value: `${childrenWithPlans}/${children.length}`,
        note: children.length > 0 ? "Saved weekly plans connected to child profiles." : "Add a child profile to begin planning.",
      },
      {
        label: "Days with saved blocks",
        value: String(daysWithPlans),
        note: allItems.length > 0 ? "Visible daily structure across the current week." : "No saved day structure yet for this week.",
      },
      {
        label: "Printable supports",
        value: String(printableItems.length),
        note: printableItems.length > 0 ? "Prep items stay visible beside the weekly plan." : "Printable prep will show up here when used.",
      },
    ],
    parentGuidance:
      allItems.length > 0
        ? [
            "Keep Wednesday or another midweek day lighter so the rhythm stays sustainable.",
            "Printable prompts are there to reduce prep, not add pressure.",
            "Hands-on and shared blocks still count as real school at home.",
            "This structure is ready for future AI help, while keeping the parent in charge now.",
            "Use short focus notes and title-style lines so later drafts stay easy to review.",
          ]
        : [
            "Start with one calm week for one child rather than planning everything at once.",
            "Use generation for a gentle draft, then adjust only the days or subjects that matter.",
            "Short readable titles are enough for V1, detail can stay light.",
            "Aim for a family rhythm, not a school-admin schedule.",
            "Treat generated drafts as editable suggestions, not automatic final plans.",
          ],
    plannerChildren: children.map((child) => ({
      id: child.id,
      nickname: child.nickname,
      ageLabel: ageBandLabel(child.ageBand),
      hasPlan: plans.some((plan) => plan.childProfileId === child.id),
    })),
    savedPlans,
  };
}
