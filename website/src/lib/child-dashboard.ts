import { PlanStatus, SubjectArea, TaskCompletionStatus } from "@/generated/prisma/client";
import { endOfDay, formatRewardNote, getSubjectMeta, startOfDay, startOfWeek } from "@/lib/planner-data";
import { prisma } from "@/lib/prisma";

async function getRewardProgress(childProfileId: string) {
  const rewardPlan = await prisma.rewardPlan.findFirst({
    where: {
      childProfileId,
      isActive: true,
    },
    select: {
      title: true,
      tokenGoal: true,
      description: true,
      cycleStartedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const tokenSummary = await prisma.taskCompletion.aggregate({
    where: {
      childProfileId,
      status: TaskCompletionStatus.COMPLETED,
      ...(rewardPlan
        ? {
            completedAt: {
              gte: rewardPlan.cycleStartedAt,
            },
          }
        : {}),
    },
    _sum: {
      awardedTokens: true,
    },
  });

  return {
    rewardPlan,
    tokensEarned: tokenSummary._sum.awardedTokens ?? 0,
  };
}

function taskTypeLabel(itemType: string) {
  switch (itemType) {
    case "ACTIVITY":
      return "Activity";
    case "PRACTICE":
      return "Practice";
    case "OFFLINE":
      return "Offline";
    case "PRINTABLE":
      return "Printable";
    default:
      return "Lesson";
  }
}

function effortLabel(details: string | null, isOffline: boolean) {
  if (isOffline) {
    return "Hands-on";
  }

  if (details && details.length > 110) {
    return "Medium";
  }

  return "Quick";
}

export async function listLoginChildren() {
  const children = await prisma.childProfile.findMany({
    where: {
      isArchived: false,
      pinHash: { not: null },
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      nickname: true,
      username: true,
    },
    take: 6,
  });

  return children;
}

export async function getChildDashboardData(childProfileId: string) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const [child, tasks, weeklyItems, rewardProgress] = await Promise.all([
    prisma.childProfile.findUnique({
      where: { id: childProfileId },
      select: {
        nickname: true,
        rewardPlan: {
          where: { isActive: true },
          select: {
            id: true,
          },
        },
      },
    }),
    prisma.weeklyPlanItem.findMany({
      where: {
        weeklyPlan: {
          childProfileId,
          status: PlanStatus.ACTIVE,
        },
        assignedDate: {
          gte: startOfDay(today),
          lte: endOfDay(today),
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        completions: {
          where: { childProfileId },
          select: {
            status: true,
            awardedTokens: true,
          },
        },
      },
      take: 3,
    }),
    prisma.weeklyPlanItem.findMany({
      where: {
        weeklyPlan: {
          childProfileId,
          status: PlanStatus.ACTIVE,
          weekStart,
        },
      },
      orderBy: [{ assignedDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
      include: {
        completions: {
          where: { childProfileId },
          select: {
            status: true,
            awardedTokens: true,
          },
        },
      },
    }),
    getRewardProgress(childProfileId),
  ]);

  if (!child) {
    return null;
  }

  const tasksWithCompletion = tasks.map((task, index) => {
    const completion = task.completions[0];
    const meta = getSubjectMeta(task.subject);

    return {
      id: task.id,
      stepLabel: ["First", "Next", "Then"][index] ?? `Step ${index + 1}`,
      subject: meta.label,
      subjectValue: task.subject,
      title: task.title,
      description: task.details ?? "A calm little step for today.",
      type: taskTypeLabel(task.itemType),
      effort: effortLabel(task.details, task.isOffline),
      encouragement: completion?.status === TaskCompletionStatus.COMPLETED ? "You finished this one already. Nice work." : "One small step at a time.",
      color: meta.color,
      href: meta.childHref,
      completed: completion?.status === TaskCompletionStatus.COMPLETED,
      tokenValue: task.tokenValue,
      awardedTokens: completion?.awardedTokens ?? 0,
    };
  });

  const totalTasks = tasksWithCompletion.length;
  const completedTasks = tasksWithCompletion.filter((task) => task.completed).length;
  const remainingTasks = Math.max(totalTasks - completedTasks, 0);
  const nextTask = tasksWithCompletion.find((task) => !task.completed) ?? tasksWithCompletion[0] ?? null;
  const tokensEarned = rewardProgress.tokensEarned;
  const tokenGoal = rewardProgress.rewardPlan?.tokenGoal ?? Math.max(totalTasks, 1) * 3;
  const rewardTitle = rewardProgress.rewardPlan?.title ?? "A parent-picked reward";
  const rewardNote = rewardProgress.rewardPlan?.description ?? formatRewardNote(tokensEarned, tokenGoal);

  const subjectCards = [SubjectArea.READING, SubjectArea.MATH, SubjectArea.CRITICAL_THINKING].map((subject) => {
    const meta = getSubjectMeta(subject);
    const task = weeklyItems.find((item) => item.subject === subject);

    return {
      href: meta.childHref,
      label: meta.label,
      color: meta.color,
      icon: meta.icon,
      note: meta.note,
      todayFocus: task?.title ?? "A calm learning moment will appear here soon.",
    };
  });

  return {
    childName: child.nickname,
    greeting: totalTasks > 0 ? "Ready for your calm learning day?" : "Your learning space is ready when your parent adds today’s plan.",
    focusTitle: totalTasks > 0 ? `${totalTasks} little ${totalTasks === 1 ? "win" : "wins"} for today` : "Today is clear and quiet",
    focusNote:
      totalTasks === 0
        ? "There are no tasks here yet. A parent can add today’s plan when ready."
        : remainingTasks === 0
          ? "You finished your learning steps for today. You can look back or check your stars."
          : `Your main job right now is ${nextTask?.title ?? "the next calm step"}.`,
    completedTasks,
    totalTasks,
    remainingTasks,
    nextTask,
    tokensEarned,
    tokenGoal,
    streakLabel: completedTasks > 0 ? `${completedTasks} done today` : "Fresh start",
    aiHint:
      totalTasks === 0
        ? "When a plan is ready, your next steps will show up here."
        : remainingTasks === 0
          ? "Your reward jar is ready for a happy check-in."
          : `${remainingTasks} ${remainingTasks === 1 ? "step is" : "steps are"} still waiting, one at a time.`,
    reward: {
      title: rewardTitle,
      note: rewardNote,
    },
    tasks: tasksWithCompletion,
    subjectCards,
  };
}

export async function getChildSubjectSpotlight(childProfileId: string, subject: SubjectArea) {
  const today = new Date();
  const task = await prisma.weeklyPlanItem.findFirst({
    where: {
      weeklyPlan: {
        childProfileId,
        status: PlanStatus.ACTIVE,
      },
      subject,
      assignedDate: {
        gte: startOfDay(today),
        lte: endOfDay(today),
      },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      completions: {
        where: { childProfileId },
        select: {
          status: true,
          awardedTokens: true,
        },
      },
    },
  });

  const completion = task?.completions[0];

  return {
    meta: getSubjectMeta(subject),
    id: task?.id ?? null,
    title: task?.title ?? "A gentle learning moment is waiting here.",
    description: task?.details ?? "Today’s subject plan will show up here when it is ready.",
    completed: completion?.status === TaskCompletionStatus.COMPLETED,
    tokenValue: task?.tokenValue ?? 0,
    awardedTokens: completion?.awardedTokens ?? 0,
  };
}
