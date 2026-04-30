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

function parseWeekStart(value: string) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getDay() !== 1) return null;
  return startOfWeek(parsed);
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
  const readingPlan = String(formData.get("readingPlan") ?? "").trim();
  const mathPlan = String(formData.get("mathPlan") ?? "").trim();
  const thinkingPlan = String(formData.get("thinkingPlan") ?? "").trim();
  const intent = String(formData.get("intent") ?? "save").trim();

  const fields: PlannerFormFields = {};
  const values: PlannerFormFields = {
    childId,
    weekOf: weekOfInput,
    summary,
    readingPlan,
    mathPlan,
    thinkingPlan,
  };
  const weekStart = parseWeekStart(weekOfInput);

  if (!childId) fields.childId = "Choose a child for this weekly plan.";
  if (!weekStart) fields.weekOf = "Pick a valid Monday date for the week you want to plan.";
  if (summary.length > 280) fields.summary = "Keep the weekly note under 280 characters so it stays readable.";
  if (countPlanLines(readingPlan) > 5) fields.readingPlan = "Keep reading to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(mathPlan) > 5) fields.mathPlan = "Keep math to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(thinkingPlan) > 5) fields.thinkingPlan = "Keep thinking to 5 non-empty lines so each weekday stays clear.";

  const providedLines = {
    reading: splitPlanLines(readingPlan),
    math: splitPlanLines(mathPlan),
    thinking: splitPlanLines(thinkingPlan),
  };

  if (intent === "save" && providedLines.reading.length + providedLines.math.length + providedLines.thinking.length === 0) {
    fields.readingPlan = "Add at least one plan line, or use Generate starter week instead.";
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

  if (!child || !weekStart) {
    return {
      error: "That child profile could not be found for this parent.",
      values,
    };
  }

  const readingLines = providedLines.reading.length > 0 ? providedLines.reading : defaultPlanLines(SubjectArea.READING, child.ageBand);
  const mathLines = providedLines.math.length > 0 ? providedLines.math : defaultPlanLines(SubjectArea.MATH, child.ageBand);
  const thinkingLines = providedLines.thinking.length > 0 ? providedLines.thinking : defaultPlanLines(SubjectArea.CRITICAL_THINKING, child.ageBand);

  const plansBySubject: Array<{ subject: SubjectArea; lines: string[] }> = [
    { subject: SubjectArea.READING, lines: readingLines },
    { subject: SubjectArea.MATH, lines: mathLines },
    { subject: SubjectArea.CRITICAL_THINKING, lines: thinkingLines },
  ];

  const items = plansBySubject.flatMap(({ subject, lines }) =>
    lines.map((title, index) => {
      const assignedDate = new Date(weekStart);
      assignedDate.setDate(weekStart.getDate() + index);
      const itemType = itemTypeForDay(subject, index);

      return {
        subject,
        assignedDate,
        title,
        details: itemDetails(subject, title, index),
        itemType,
        sortOrder: index,
        tokenValue: 1,
        isPrintable: itemType === PlanItemType.PRINTABLE,
        isOffline: itemType === PlanItemType.OFFLINE,
      };
    }),
  );

  const existing = await prisma.weeklyPlan.findUnique({
    where: {
      childProfileId_weekStart: {
        childProfileId: child.id,
        weekStart,
      },
    },
    select: {
      id: true,
      items: {
        select: {
          _count: {
            select: {
              completions: true,
            },
          },
        },
      },
    },
  });

  const existingCompletionCount = existing?.items.reduce((sum, item) => sum + item._count.completions, 0) ?? 0;

  if (existing && existingCompletionCount > 0) {
    return {
      error:
        existingCompletionCount === 1
          ? `${child.nickname} already has 1 recorded completion linked to that saved week. EduCore did not overwrite it, because replacing the week would also replace the completion-linked plan item.`
          : `${child.nickname} already has ${existingCompletionCount} recorded completions linked to that saved week. EduCore did not overwrite it, because replacing the week would also replace those completion-linked plan items.`,
      values,
    };
  }

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
          summary: summary || (intent === "generate" ? `A calm starter week for ${child.nickname}.` : `A parent-made weekly plan for ${child.nickname}.`),
          items: {
            create: items,
          },
        },
      });
    } else {
      await tx.weeklyPlan.create({
        data: {
          childProfileId: child.id,
          weekStart,
          status: PlanStatus.ACTIVE,
          summary: summary || (intent === "generate" ? `A calm starter week for ${child.nickname}.` : `A parent-made weekly plan for ${child.nickname}.`),
          items: {
            create: items,
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

  return {
    success:
      intent === "generate"
        ? `${child.nickname}'s starter week was generated and saved.`
        : `${child.nickname}'s weekly plan was saved.`,
  };
}
