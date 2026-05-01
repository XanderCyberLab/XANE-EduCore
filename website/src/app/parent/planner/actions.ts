"use server";

import { PlanItemType, PlanStatus, SubjectArea } from "@/generated/prisma/client";
import { requireParentSession } from "@/lib/auth/guards";
import { getPlannerGenerationProvider } from "@/lib/planner-generation";
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
  learningGoals?: string;
  pacingNotes?: string;
  supportNotes?: string;
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
type PlannerItemInput = {
  subject: SubjectArea;
  assignedDate: Date;
  title: string;
  details: string;
  itemType: PlanItemType;
  sortOrder: number;
  tokenValue: number;
  isPrintable: boolean;
  isOffline: boolean;
};

function revalidatePlannerSurfaces() {
  revalidatePath("/parent/planner");
  revalidatePath("/parent/dashboard");
  revalidatePath("/parent/children");
  revalidatePath("/child/home");
  revalidatePath("/child/today");
  revalidatePath("/child/subject/reading");
  revalidatePath("/child/subject/math");
  revalidatePath("/child/subject/thinking");
}

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

  if (scopeMode === "full-week") return { startIndex: 0, endIndex: weekdayLabels.length - 1 };
  if (startIndex === undefined) return null;
  if (scopeMode === "single-day") return { startIndex, endIndex: startIndex };
  if (endIndex === undefined || endIndex < startIndex) return null;

  return { startIndex, endIndex };
}

function countPlanLines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).length;
}

function normalizeSingleLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizePlanLine(value: string) {
  return normalizeSingleLine(value.replace(/^[-*\d.)\s]+/, ""));
}

function splitPlanLines(value: string) {
  return value.split(/\r?\n/).map((line) => normalizePlanLine(line)).filter(Boolean).slice(0, 5);
}

function hasLongPlanLine(lines: string[]) {
  return lines.some((line) => line.length > 90);
}

function buildPlanningContext(input: { learningGoals: string; pacingNotes: string; supportNotes: string }) {
  return {
    learningGoals: normalizeSingleLine(input.learningGoals).slice(0, 180),
    pacingNotes: normalizeSingleLine(input.pacingNotes).slice(0, 180),
    supportNotes: normalizeSingleLine(input.supportNotes).slice(0, 180),
  };
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


async function applyWeeklyPlanFromItems(input: {
  child: { id: string; nickname: string };
  weekStart: Date;
  summary: string;
  scopeMode: ScopeMode;
  scopeStartDay: string;
  scopeEndDay: string;
  scopeDays: { startIndex: number; endIndex: number };
  scopedItems: PlannerItemInput[];
}) {
  const existing = await prisma.weeklyPlan.findUnique({
    where: {
      childProfileId_weekStart: {
        childProfileId: input.child.id,
        weekStart: input.weekStart,
      },
    },
    select: {
      id: true,
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
          _count: { select: { completions: true } },
        },
      },
    },
  });

  const targetedSubjects = new Set(input.scopedItems.map((item) => item.subject));
  const existingItems = existing?.items ?? [];
  const targetedExistingItems = existingItems.filter((item) => {
    const dayIndex = Math.round((new Date(item.assignedDate).getTime() - input.weekStart.getTime()) / 86400000);
    return dayIndex >= input.scopeDays.startIndex && dayIndex <= input.scopeDays.endIndex && targetedSubjects.has(item.subject);
  });

  const targetedCompletionCount = targetedExistingItems.reduce((sum, item) => sum + item._count.completions, 0);
  if (existing && targetedCompletionCount > 0) {
    const scopeLabel =
      input.scopeMode === "single-day"
        ? input.scopeStartDay
        : input.scopeMode === "day-range"
          ? `${input.scopeStartDay} to ${input.scopeEndDay}`
          : "that saved week scope";

    return {
      error:
        targetedCompletionCount === 1
          ? `${input.child.nickname} already has 1 recorded completion linked to ${scopeLabel}. EduCore did not replace that scoped plan item.`
          : `${input.child.nickname} already has ${targetedCompletionCount} recorded completions linked to ${scopeLabel}. EduCore did not replace those scoped plan items.`,
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

  const nextItems = [...preservedItems, ...input.scopedItems].sort((a, b) => {
    const dateDiff = a.assignedDate.getTime() - b.assignedDate.getTime();
    if (dateDiff !== 0) return dateDiff;
    return a.sortOrder - b.sortOrder;
  });

  await prisma.$transaction(async (tx) => {
    if (existing) {
      await tx.weeklyPlanItem.deleteMany({ where: { weeklyPlanId: existing.id } });
      await tx.weeklyPlan.update({
        where: { id: existing.id },
        data: {
          status: PlanStatus.ACTIVE,
          summary: input.summary,
          items: { create: nextItems },
        },
      });
    } else {
      await tx.weeklyPlan.create({
        data: {
          childProfileId: input.child.id,
          weekStart: input.weekStart,
          status: PlanStatus.ACTIVE,
          summary: input.summary,
          items: { create: nextItems },
        },
      });
    }
  });

  return { success: true };
}

export async function saveWeeklyPlanAction(_: SaveWeeklyPlanState, formData: FormData): Promise<SaveWeeklyPlanState> {
  const session = await requireParentSession();

  const childId = String(formData.get("childId") ?? "").trim();
  const weekOfInput = String(formData.get("weekOf") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const scopeMode = parseScopeMode(String(formData.get("scopeMode") ?? "full-week").trim());
  const scopeStartDay = String(formData.get("scopeStartDay") ?? "Monday").trim();
  const scopeEndDay = String(formData.get("scopeEndDay") ?? "Friday").trim();
  const learningGoals = String(formData.get("learningGoals") ?? "").trim();
  const pacingNotes = String(formData.get("pacingNotes") ?? "").trim();
  const supportNotes = String(formData.get("supportNotes") ?? "").trim();
  const readingPlan = String(formData.get("readingPlan") ?? "").trim();
  const mathPlan = String(formData.get("mathPlan") ?? "").trim();
  const thinkingPlan = String(formData.get("thinkingPlan") ?? "").trim();
  const intent = String(formData.get("intent") ?? "save").trim();

  const fields: PlannerFormFields = {};
  const values: PlannerFormFields = { childId, weekOf: weekOfInput, summary, scopeMode, scopeStartDay, scopeEndDay, learningGoals, pacingNotes, supportNotes, readingPlan, mathPlan, thinkingPlan };
  const weekStart = parseWeekStart(weekOfInput);
  const scopeDays = normalizeScopeDays(scopeMode, scopeStartDay, scopeEndDay);

  if (!childId) fields.childId = "Choose a child for this weekly plan.";
  if (!weekStart) fields.weekOf = "Pick a valid Monday date for the week you want to plan.";
  if (summary.length > 280) fields.summary = "Keep the weekly note under 280 characters so it stays readable.";
  if (!scopeDays) fields.scopeStartDay = "Choose a valid planner day scope.";
  if (learningGoals.length > 180) fields.learningGoals = "Keep the learning focus under 180 characters so it stays reusable later.";
  if (pacingNotes.length > 180) fields.pacingNotes = "Keep pacing notes under 180 characters so they stay actionable.";
  if (supportNotes.length > 180) fields.supportNotes = "Keep support notes under 180 characters so they stay easy to review.";
  if (countPlanLines(readingPlan) > 5) fields.readingPlan = "Keep reading to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(mathPlan) > 5) fields.mathPlan = "Keep math to 5 non-empty lines so each weekday stays clear.";
  if (countPlanLines(thinkingPlan) > 5) fields.thinkingPlan = "Keep thinking to 5 non-empty lines so each weekday stays clear.";

  const providedLines = { reading: splitPlanLines(readingPlan), math: splitPlanLines(mathPlan), thinking: splitPlanLines(thinkingPlan) };

  if (hasLongPlanLine(providedLines.reading)) fields.readingPlan = "Keep each reading line under 90 characters so future generated output stays clean.";
  if (hasLongPlanLine(providedLines.math)) fields.mathPlan = "Keep each math line under 90 characters so future generated output stays clean.";
  if (hasLongPlanLine(providedLines.thinking)) fields.thinkingPlan = "Keep each thinking line under 90 characters so future generated output stays clean.";
  if (intent === "save" && providedLines.reading.length + providedLines.math.length + providedLines.thinking.length === 0) fields.readingPlan = "Add at least one plan line in the subjects you want to change, or use Generate starter draft instead.";

  if (Object.keys(fields).length > 0) return { error: "Please adjust the weekly plan details and try again.", fields, values };

  const child = await prisma.childProfile.findFirst({
    where: { id: childId, parentUserId: session.parentUserId, isArchived: false },
    select: { id: true, nickname: true, ageBand: true },
  });

  if (!child || !weekStart || !scopeDays) return { error: "That child profile could not be found for this parent.", values };

  const planningContext = buildPlanningContext({ learningGoals, pacingNotes, supportNotes });
  const scopeItemCount = scopeDays.endIndex - scopeDays.startIndex + 1;
  const subjectConfigs: Array<{ key: keyof typeof providedLines; subject: SubjectArea }> = [
    { key: "reading", subject: SubjectArea.READING },
    { key: "math", subject: SubjectArea.MATH },
    { key: "thinking", subject: SubjectArea.CRITICAL_THINKING },
  ];
  const shouldReplaceSubject = (key: keyof typeof providedLines) => intent === "generate" || providedLines[key].length > 0;
  const generatedDraft = intent === "generate"
    ? await getPlannerGenerationProvider().generateStarterDraft({
        childNickname: child.nickname,
        childAgeBand: child.ageBand,
        context: planningContext,
        scopeItemCount,
        subjects: subjectConfigs.filter(({ key }) => shouldReplaceSubject(key)).map(({ subject }) => subject),
      })
    : null;

  const scopedItems: PlannerItemInput[] = subjectConfigs.flatMap(({ key, subject }) => {
    if (!shouldReplaceSubject(key)) return [];
    const sourceLines = providedLines[key].length > 0
      ? providedLines[key]
      : generatedDraft?.linesBySubject[subject] ?? [];

    return sourceLines.slice(0, scopeItemCount).map((title, scopedIndex) => {
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

  if (scopedItems.length === 0) return { error: "Choose at least one subject to update in the selected scope.", values };

  const nextSummary = summary || (intent === "generate" ? generatedDraft?.summary ?? `A calm starter week for ${child.nickname}.` : `A parent-made weekly plan for ${child.nickname}.`);
  const scopeMessage = scopeMode === "single-day" ? ` for ${scopeStartDay}` : scopeMode === "day-range" ? ` for ${scopeStartDay} to ${scopeEndDay}` : "";

  if (intent === "generate") {
    await prisma.$transaction(async (tx) => {
      const existingDraft = await tx.plannerDraft.findUnique({
        where: { childProfileId_weekStart: { childProfileId: child.id, weekStart } },
        select: { id: true },
      });

      if (existingDraft) {
        await tx.plannerDraftItem.deleteMany({ where: { plannerDraftId: existingDraft.id } });
        await tx.plannerDraft.update({
          where: { id: existingDraft.id },
          data: {
            summary: nextSummary,
            source: generatedDraft?.source ?? "starter-template",
            learningGoals: planningContext.learningGoals || null,
            pacingNotes: planningContext.pacingNotes || null,
            supportNotes: planningContext.supportNotes || null,
            items: { create: scopedItems },
          },
        });
      } else {
        await tx.plannerDraft.create({
          data: {
            childProfileId: child.id,
            weekStart,
            summary: nextSummary,
            source: generatedDraft?.source ?? "starter-template",
            learningGoals: planningContext.learningGoals || null,
            pacingNotes: planningContext.pacingNotes || null,
            supportNotes: planningContext.supportNotes || null,
            items: { create: scopedItems },
          },
        });
      }
    });

    revalidatePlannerSurfaces();
    return { success: `${child.nickname}'s starter draft${scopeMessage} was saved for parent review.` };
  }

  const result = await applyWeeklyPlanFromItems({ child, weekStart, summary: nextSummary, scopeMode, scopeStartDay, scopeEndDay, scopeDays, scopedItems });
  if ("error" in result) return { error: result.error, values };

  revalidatePlannerSurfaces();
  return { success: `${child.nickname}'s weekly plan${scopeMessage} was saved.` };
}

export async function applyPlannerDraftAction(formData: FormData) {
  const session = await requireParentSession();
  const draftId = String(formData.get("draftId") ?? "").trim();
  if (!draftId) return;

  const draft = await prisma.plannerDraft.findFirst({
    where: {
      id: draftId,
      childProfile: { parentUserId: session.parentUserId, isArchived: false },
    },
    include: {
      childProfile: { select: { id: true, nickname: true } },
      items: { orderBy: [{ assignedDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  if (!draft) return;

  const scopeDays = { startIndex: 0, endIndex: 4 };
  const result = await applyWeeklyPlanFromItems({
    child: draft.childProfile,
    weekStart: draft.weekStart,
    summary: draft.summary || `A parent-approved weekly plan for ${draft.childProfile.nickname}.`,
    scopeMode: "full-week",
    scopeStartDay: "Monday",
    scopeEndDay: "Friday",
    scopeDays,
    scopedItems: draft.items.map((item) => ({
      subject: item.subject,
      assignedDate: item.assignedDate,
      title: item.title,
      details: item.details ?? item.title,
      itemType: item.itemType,
      sortOrder: item.sortOrder,
      tokenValue: item.tokenValue,
      isPrintable: item.isPrintable,
      isOffline: item.isOffline,
    })),
  });

  if ("error" in result) return;

  await prisma.plannerDraft.delete({ where: { id: draft.id } });
  revalidatePlannerSurfaces();
}
