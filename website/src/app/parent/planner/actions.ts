"use server";

import { PlanItemType, PlanStatus, SubjectArea } from "@/generated/prisma/client";
import { requireParentSession } from "@/lib/auth/guards";
import { startOfWeek } from "@/lib/planner-data";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type PlannerFormFields = {
  childId?: string;
  weekOf?: string;
  summary?: string;
  scopeMode?: string;
  scopeStartDay?: string;
  scopeEndDay?: string;
  readingPlan?: string;
  mathPlan?: string;
  thinkingPlan?: string;
};

export type SaveWeeklyPlanState = {
  error?: string;
  success?: string;
  fields?: PlannerFormFields;
  values?: PlannerFormFields;
};

const weekdayLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const weekdayIndexes = Object.fromEntries(weekdayLabels.map((label, index) => [label, index])) as Record<(typeof weekdayLabels)[number], number>;

type ScopeMode = "full-week" | "single-day" | "day-range";

function parseWeekStart(value: string) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getDay() !== 1) return null;
  return startOfWeek(parsed);
}

function parseScopeMode(value: string): ScopeMode {
  if (value === "single-day" || value === "day-range") return value;
  return "full-week";
}

function normalizeScopeDays(scopeMode: ScopeMode, startDay: string, endDay: string) {
  const startIndex = weekdayIndexes[startDay as keyof typeof weekdayIndexes];
  const endIndex = weekdayIndexes[endDay as keyof typeof weekdayIndexes];

  if (scopeMode === "full-week") {
    return { startIndex: 0, endIndex: weekdayLabels.length - 1 };
  }

  if (startIndex === undefined) return null;
  if (scopeMode === "single-day") return { startIndex, endIndex: startIndex };
  if (endIndex === undefined || endIndex < startIndex) return null;

  return { startIndex, endIndex };
}

function countPlanLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean).length;
}

function splitPlanLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function ageBandLabel(ageBand: string | null | undefined) {
  switch (ageBand) {
    case "EARLY_YEARS":
      return "early years";
    case "UPPER_ELEMENTARY":
      return "upper elementary";
    default:
      return "lower elementary";
  }
}

function defaultPlanLines(subject: SubjectArea, ageBand: string | null | undefined) {
  const band = ageBandLabel(ageBand);

  switch (subject) {
    case SubjectArea.READING:
      return [
        `Warm up with a short ${band} reading moment`,
        "Read together and retell the story",
        "Light phonics or word play review",
        "Printable reading practice and confidence check",
        "Favorite book reread and calm wrap-up",
      ];
    case SubjectArea.MATH:
      return [
        "Hands-on counting or number warm-up",
        "Short guided math practice",
        "Keep math tactile and low-pressure",
        "Printable or table-top math review",
        "Shape or pattern hunt to finish the week",
      ];
    case SubjectArea.CRITICAL_THINKING:
      return [
        "Pattern or sorting prompt",
        "Question-of-the-day thinking block",
        "Light puzzle or comparison activity",
        "Shared observation walk or family challenge",
        "Reflect on the week and notice progress",
      ];
  }
}

function itemTypeForDay(subject: SubjectArea, index: number) {
  if (subject === SubjectArea.CRITICAL_THINKING && (index === 3 || index === 4)) return PlanItemType.OFFLINE;
  if (index === 3) return PlanItemType.PRINTABLE;
  if (subject === SubjectArea.MATH && (index === 0 || index === 2)) return PlanItemType.ACTIVITY;
  return PlanItemType.LESSON;
}

function itemDetails(subject: SubjectArea, title: string, index: number) {
  const day = weekdayLabels[index] ?? `Day ${index + 1}`;
  if (subject === SubjectArea.READING) return `${day} reading focus: ${title}. Keep it short, warm, and confidence-building.`;
  if (subject === SubjectArea.MATH) return `${day} math focus: ${title}. Prefer tactile steps over long seat-time.`;
  return `${day} thinking focus: ${title}. Shared and offline moments still count as real learning.`;
}

export async function saveWeeklyPlanAction(_: SaveWeeklyPlanState, formData: FormData): Promise<SaveWeeklyPlanState> {
  const session = await requireParentSession();

  const childId = String(formData.get("childId") ?? "").trim();
  const weekOfInput = String(formData.get("weekOf") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const scopeMode = parseScopeMode(String(formData.get("scopeMode") ?? "full-week").trim());
  const scopeStartDay = String(formData.get("scopeStartDay") ?? "Monday").trim();
  const scopeEndDay = String(formData.get("scopeEndDay") ?? "Friday").trim();
  const readingPlan = String(formData.get("readingPlan") ?? "").trim();
  const mathPlan = String(formData.get("mathPlan") ?? "").trim();
  const thinkingPlan = String(formData.get("thinkingPlan") ?? "").trim();
  const intent = String(formData.get("intent") ?? "save").trim();

  const fields: PlannerFormFields = {};
  const values: PlannerFormFields = {
    childId,
    weekOf: weekOfInput,
    summary,
    scopeMode,
    scopeStartDay,
    scopeEndDay,
    readingPlan,
    mathPlan,
    thinkingPlan,
  };
  const weekStart = parseWeekStart(weekOfInput);
  const scopeDays = normalizeScopeDays(scopeMode, scopeStartDay, scopeEndDay);

  if (!childId) fields.childId = "Choose a child for this weekly plan.";
  if (!weekStart) fields.weekOf = "Pick a valid Monday date for the week you want to plan.";
  if (summary.length > 280) fields.summary = "Keep the weekly note under 280 characters so it stays readable.";
  if (!scopeDays) fields.scopeStartDay = "Choose a valid planner day scope.";
  if (countPlanLines(readingPlan) > 5) fields.readingPlan = "Keep reading to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(mathPlan) > 5) fields.mathPlan = "Keep math to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(thinkingPlan) > 5) fields.thinkingPlan = "Keep thinking to 5 non-empty lines so each weekday stays clear.";

  const providedLines = {
    reading: splitPlanLines(readingPlan),
    math: splitPlanLines(mathPlan),
    thinking: splitPlanLines(thinkingPlan),
  };

  if (intent === "save" && providedLines.reading.length + providedLines.math.length + providedLines.thinking.length === 0) {
    fields.readingPlan = "Add at least one plan line in the subjects you want to change, or use Generate starter week instead.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please adjust the weekly plan details and try again.",
      fields,
      values,
    };
  }

  const child = await prisma.childProfile.findFirst({
    where: {
      id: childId,
      parentUserId: session.parentUserId,
      isArchived: false,
    },
    select: {
      id: true,
      nickname: true,
      ageBand: true,
    },
  });

  if (!child || !weekStart || !scopeDays) {
    return {
      error: "That child profile could not be found for this parent.",
      values,
    };
  }

  const defaultLinesBySubject = {
    reading: defaultPlanLines(SubjectArea.READING, child.ageBand),
    math: defaultPlanLines(SubjectArea.MATH, child.ageBand),
    thinking: defaultPlanLines(SubjectArea.CRITICAL_THINKING, child.ageBand),
  };

  const existing = await prisma.weeklyPlan.findUnique({
    where: {
      childProfileId_weekStart: {
        childProfileId: child.id,
        weekStart,
      },
    },
    select: {
      id: true,
      summary: true,
      items: {
        orderBy: [{ assignedDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          subject: true,
          assignedDate: true,
          title: true,
          details: true,
          itemType: true,
          sortOrder: true,
          tokenValue: true,
          isPrintable: true,
          isOffline: true,
          _count: {
            select: {
              completions: true,
            },
          },
        },
      },
    },
  });

  const scopeItemCount = scopeDays.endIndex - scopeDays.startIndex + 1;
  const subjectConfigs: Array<{ key: keyof typeof providedLines; subject: SubjectArea }> = [
    { key: "reading", subject: SubjectArea.READING },
    { key: "math", subject: SubjectArea.MATH },
    { key: "thinking", subject: SubjectArea.CRITICAL_THINKING },
  ];

  const shouldReplaceSubject = (key: keyof typeof providedLines) => intent === "generate" || providedLines[key].length > 0;

  const scopedItems = subjectConfigs.flatMap(({ key, subject }) => {
    if (!shouldReplaceSubject(key)) return [];

    const sourceLines = providedLines[key].length > 0 ? providedLines[key] : defaultLinesBySubject[key];
    const scopedLines = sourceLines.slice(0, scopeItemCount);

    return scopedLines.map((title, scopedIndex) => {
      const dayIndex = scopeDays.startIndex + scopedIndex;
      const assignedDate = new Date(weekStart);
      assignedDate.setDate(weekStart.getDate() + dayIndex);
      const itemType = itemTypeForDay(subject, dayIndex);

      return {
        subject,
        assignedDate,
        title,
        details: itemDetails(subject, title, dayIndex),
        itemType,
        sortOrder: dayIndex,
        tokenValue: 1,
        isPrintable: itemType === PlanItemType.PRINTABLE,
        isOffline: itemType === PlanItemType.OFFLINE,
      };
    });
  });

  if (scopedItems.length === 0 && existing) {
    return {
      error: "Choose at least one subject to update in the selected scope.",
      values,
    };
  }

  const targetedSubjects = new Set(scopedItems.map((item) => item.subject));
  const existingItems = existing?.items ?? [];
  const targetedExistingItems = existingItems.filter((item) => {
    const dayIndex = Math.round((new Date(item.assignedDate).getTime() - weekStart.getTime()) / 86400000);
    return dayIndex >= scopeDays.startIndex && dayIndex <= scopeDays.endIndex && targetedSubjects.has(item.subject);
  });

  const targetedCompletionCount = targetedExistingItems.reduce((sum, item) => sum + item._count.completions, 0);

  if (existing && targetedCompletionCount > 0) {
    const scopeLabel =
      scopeMode === "single-day"
        ? scopeStartDay
        : scopeMode === "day-range"
          ? `${scopeStartDay} to ${scopeEndDay}`
          : "that saved week scope";

    return {
      error:
        targetedCompletionCount === 1
          ? `${child.nickname} already has 1 recorded completion linked to ${scopeLabel}. EduCore did not replace that scoped plan item.`
          : `${child.nickname} already has ${targetedCompletionCount} recorded completions linked to ${scopeLabel}. EduCore did not replace those scoped plan items.`,
      values,
    };
  }

  const preservedItems = existingItems
    .filter((item) => !targetedExistingItems.some((targeted) => targeted.id === item.id))
    .map((item) => ({
      subject: item.subject,
      assignedDate: item.assignedDate,
      title: item.title,
      details: item.details,
      itemType: item.itemType,
      sortOrder: item.sortOrder,
      tokenValue: item.tokenValue,
      isPrintable: item.isPrintable,
      isOffline: item.isOffline,
    }));

  const nextItems = [...preservedItems, ...scopedItems].sort((a, b) => {
    const dateDiff = a.assignedDate.getTime() - b.assignedDate.getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.sortOrder - b.sortOrder;
  });

  const nextSummary = summary || existing?.summary || (intent === "generate" ? `A calm starter week for ${child.nickname}.` : `A parent-made weekly plan for ${child.nickname}.`);

  await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.weeklyPlanItem.deleteMany({
        where: {
          weeklyPlanId: existing.id,
        },
      });

      await tx.weeklyPlan.update({
        where: { id: existing.id },
        data: {
          status: PlanStatus.ACTIVE,
          summary: nextSummary,
          items: {
            create: nextItems,
          },
        },
      });
    } else {
      await tx.weeklyPlan.create({
        data: {
          childProfileId: child.id,
          weekStart,
          status: PlanStatus.ACTIVE,
          summary: nextSummary,
          items: {
            create: nextItems,
          },
        },
      });
    }
  });

  revalidatePath("/parent/planner");
  revalidatePath("/parent/dashboard");
  revalidatePath("/parent/children");
  revalidatePath("/child/home");
  revalidatePath("/child/today");
  revalidatePath("/child/subject/reading");
  revalidatePath("/child/subject/math");
  revalidatePath("/child/subject/thinking");

  const scopeMessage =
    scopeMode === "single-day"
      ? ` for ${scopeStartDay}`
      : scopeMode === "day-range"
        ? ` for ${scopeStartDay} to ${scopeEndDay}`
        : "";

  return {
    success:
      intent === "generate"
        ? `${child.nickname}'s starter plan${scopeMessage} was generated and saved.`
        : `${child.nickname}'s weekly plan${scopeMessage} was saved.`,
  };
}
