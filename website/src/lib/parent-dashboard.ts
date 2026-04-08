import { ChildAgeBand, PlanStatus, SubjectArea, TaskCompletionStatus } from "@/generated/prisma/client";
import type { ChildDashboardProfile, PlannerDay, RewardHighlight } from "@/lib/mock-parent";
import { endOfDay, getSubjectMeta, startOfDay, startOfWeek } from "@/lib/planner-data";
import { prisma } from "@/lib/prisma";

function ageBandLabel(ageBand: ChildAgeBand | null) {
  switch (ageBand) {
    case ChildAgeBand.EARLY_YEARS:
      return "Early years";
    case ChildAgeBand.LOWER_ELEMENTARY:
      return "Lower elementary";
    case ChildAgeBand.UPPER_ELEMENTARY:
      return "Upper elementary";
    default:
      return "Age band open";
  }
}

function welcomeLabel(date: Date) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function toPercent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((value / total) * 100)));
}

function relativeLastActive(value: Date | null) {
  if (!value) return "No activity yet";

  const diffMs = Date.now() - value.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) return "Active today";
  if (diffDays === 1) return "Active yesterday";
  return `Active ${diffDays} days ago`;
}

function subjectStatus(completed: number, total: number) {
  if (total > 0 && completed >= total) return "completed today" as const;
  if (total > 0 && completed / total < 0.5) return "needs attention" as const;
  return "on track" as const;
}

function summarizeFocus(completedToday: number, totalToday: number, weeklyCompletion: number) {
  if (totalToday === 0) return "No tasks are scheduled for today yet, so the day can stay open and low-pressure.";
  if (completedToday >= totalToday) return "Today’s plan is already complete, which gives the rest of the day room to breathe.";
  if (weeklyCompletion >= 70) return "The week is moving steadily, with just a few gentle follow-ups left.";
  return "A smaller, steadier rhythm should help the week feel manageable.";
}

function summarizeNextStep(totalToday: number, remainingToday: number, mathNeedsAttention: boolean, hasPlan: boolean) {
  if (!hasPlan) return "Save a weekly plan when ready so this child’s dashboard can show a clear daily path.";
  if (totalToday === 0) return "Add or refresh a daily plan only if you want more structure today.";
  if (mathNeedsAttention) return "Keep the next math block short and hands-on rather than stretching the session.";
  if (remainingToday > 0) return `There ${remainingToday === 1 ? "is" : "are"} ${remainingToday} small ${remainingToday === 1 ? "step" : "steps"} left for today.`;
  return "Use the extra space for a calm check-in or reward moment, not more load.";
}

function supportTags(hasPlan: boolean, hasReward: boolean, hasPin: boolean) {
  const strengths = [hasPlan ? "Weekly plan connected" : "Ready for a saved plan", hasReward ? "Reward path visible" : "Reward can be added later"];
  const gentleSupport = [hasPin ? "Parent-managed PIN is set" : "PIN still needs setup", "Nickname-first family profile"];
  return { strengths, gentleSupport };
}

function rewardNote(tokens: number, goal: number) {
  if (goal <= 0) return "Reward goal can be set when the family is ready.";
  const remaining = Math.max(goal - tokens, 0);
  if (remaining === 0) return "This reward is ready for a parent check-in.";
  if (remaining <= 3) return "Close enough that a small, calm finish line is visible.";
  return `${remaining} more token${remaining === 1 ? "" : "s"} to go.`;
}

export async function getParentDashboardData(parentUserId: string, parentEmail?: string) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const dayStart = startOfDay(today);
  const dayEnd = endOfDay(today);

  const children = await prisma.childProfile.findMany({
    where: {
      parentUserId,
      isArchived: false,
    },
    orderBy: { createdAt: "asc" },
    include: {
      rewardPlan: {
        select: {
          title: true,
          description: true,
          tokenGoal: true,
          isActive: true,
          createdAt: true,
        },
      },
      weeklyPlans: {
        where: {
          weekStart,
          status: {
            in: [PlanStatus.ACTIVE, PlanStatus.DRAFT],
          },
        },
        orderBy: [{ status: "asc" }, { createdAt: "asc" }],
        include: {
          items: {
            orderBy: [{ assignedDate: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
            include: {
              completions: {
                where: { childProfile: { parentUserId } },
                select: {
                  status: true,
                  awardedTokens: true,
                  completedAt: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      },
      taskCompletions: {
        where: {
          status: TaskCompletionStatus.COMPLETED,
        },
        orderBy: [{ completedAt: "desc" }, { createdAt: "desc" }],
        select: {
          awardedTokens: true,
          completedAt: true,
          createdAt: true,
        },
      },
    },
  });

  const childProfiles: ChildDashboardProfile[] = children.map((child) => {
    const plan = child.weeklyPlans[0];
    const planItems = plan?.items ?? [];
    const todayItems = planItems.filter((item) => item.assignedDate >= dayStart && item.assignedDate <= dayEnd);
    const completedToday = todayItems.filter((item) => item.completions.some((completion) => completion.status === TaskCompletionStatus.COMPLETED)).length;
    const weeklyCompleted = planItems.filter((item) => item.completions.some((completion) => completion.status === TaskCompletionStatus.COMPLETED)).length;
    const activeRewardPlan = child.rewardPlan?.isActive ? child.rewardPlan : null;
    const rewardCreatedAt = activeRewardPlan?.createdAt;
    const rewardTokens = child.taskCompletions
      .filter((completion) => !rewardCreatedAt || (completion.completedAt ?? completion.createdAt) >= rewardCreatedAt)
      .reduce((sum, completion) => sum + completion.awardedTokens, 0);
    const rewardGoal = activeRewardPlan?.tokenGoal ?? 10;
    const rewardProgress = toPercent(rewardTokens, rewardGoal);
    const lastActiveAt = child.taskCompletions[0]?.completedAt ?? child.taskCompletions[0]?.createdAt ?? null;

    const subjects = [SubjectArea.READING, SubjectArea.MATH, SubjectArea.CRITICAL_THINKING].map((subject) => {
      const meta = getSubjectMeta(subject);
      const subjectItems = planItems.filter((item) => item.subject === subject);
      const subjectCompleted = subjectItems.filter((item) => item.completions.some((completion) => completion.status === TaskCompletionStatus.COMPLETED)).length;

      return {
        subject: meta.label,
        completed: subjectCompleted,
        total: subjectItems.length,
        minutes: subjectItems.length * 10,
        status: subjectStatus(subjectCompleted, subjectItems.length),
        color: meta.color,
      };
    });

    const mathNeedsAttention = subjects.some((subject) => subject.subject === "Math" && subject.status === "needs attention");
    const { strengths, gentleSupport } = supportTags(planItems.length > 0, Boolean(activeRewardPlan), Boolean(child.pinHash));

    return {
      id: child.id,
      name: child.nickname,
      ageLabel: ageBandLabel(child.ageBand),
      weeklyCompletion: toPercent(weeklyCompleted, planItems.length),
      completedToday,
      totalToday: todayItems.length,
      focus: summarizeFocus(completedToday, todayItems.length, toPercent(weeklyCompleted, planItems.length)),
      nextStep: summarizeNextStep(todayItems.length, Math.max(todayItems.length - completedToday, 0), mathNeedsAttention, planItems.length > 0),
      rewardName: activeRewardPlan?.title ?? "Reward still open",
      rewardProgress,
      rewardTokens,
      rewardGoal,
      mood:
        completedToday >= todayItems.length && todayItems.length > 0
          ? "Calm momentum"
          : mathNeedsAttention
            ? "Needs a gentle reset"
            : planItems.length > 0
              ? "Steady family rhythm"
              : "Ready for setup",
      username: child.username,
      loginStatus: "Username prepared",
      pinStatus: child.pinHash ? "Parent-managed PIN active" : "PIN setup still needed",
      privacyNote: "Nickname-first profile, parent-managed login, and intentionally minimal child identity details.",
      setupState: planItems.length > 0 ? "Connected to saved plans" : "Waiting for first saved plan",
      lastActive: relativeLastActive(lastActiveAt),
      pacingNote:
        planItems.length > 0
          ? "This child view is now anchored to saved weekly plan items, completion records, and reward progress so parent review stays grounded in real use."
          : "The profile is ready, and the parent experience will fill in naturally once a weekly plan and task activity are saved.",
      strengths,
      gentleSupport,
      parentActions: {
        addLabel: "Add child",
        editLabel: "Edit profile",
        loginLabel: "Adjust login",
        rewardLabel: "Review reward setup",
        learningLabel: "Review learning profile",
      },
      subjects,
    };
  });

  const totalWeeklyBlocks = childProfiles.reduce((sum, child) => sum + child.subjects.reduce((subjectSum, subject) => subjectSum + subject.total, 0), 0);
  const totalCompletedBlocks = childProfiles.reduce((sum, child) => sum + child.subjects.reduce((subjectSum, subject) => subjectSum + subject.completed, 0), 0);
  const completedToday = childProfiles.reduce((sum, child) => sum + child.completedToday, 0);
  const plannedToday = childProfiles.reduce((sum, child) => sum + child.totalToday, 0);
  const rewardHighlights: RewardHighlight[] = childProfiles.map((child) => ({
    childName: child.name,
    rewardName: child.rewardName,
    progress: child.rewardProgress,
    tokens: child.rewardTokens,
    goal: child.rewardGoal,
    note: rewardNote(child.rewardTokens, child.rewardGoal),
  }));

  const plannerPreview: PlannerDay[] = plannedToday > 0
    ? [
        {
          day: "Today",
          tone: completedToday >= plannedToday ? "Wrapped up" : "Active day",
          items: childProfiles.flatMap((child) => {
            if (child.totalToday === 0) {
              return [`${child.name}: no tasks scheduled yet`];
            }
            return [`${child.name}: ${child.completedToday}/${child.totalToday} completed today`];
          }),
        },
        {
          day: "Rewards",
          tone: "Visible progress",
          items: rewardHighlights.map((reward) => `${reward.childName}: ${reward.tokens}/${reward.goal} tokens toward ${reward.rewardName}`),
        },
        {
          day: "Next steps",
          tone: "Gentle follow-up",
          items: childProfiles.map((child) => `${child.name}: ${child.nextStep}`),
        },
      ]
    : [
        {
          day: "Today",
          tone: "Quiet space",
          items: ["No saved tasks are scheduled for today yet."],
        },
        {
          day: "Children",
          tone: "Profiles ready",
          items: childProfiles.length > 0 ? childProfiles.map((child) => `${child.name}: profile is ready for planning`) : ["Add a child profile to get started."],
        },
        {
          day: "Next step",
          tone: "When ready",
          items: ["Save a weekly plan to connect parent review with child learning flow."],
        },
      ];

  const parentName = parentEmail ? parentEmail.split("@")[0] : "Parent";
  const plannerReadyChildren = childProfiles.filter((child) => child.setupState === "Connected to saved plans").length;
  const attentionNames = childProfiles.filter((child) => child.mood === "Needs a gentle reset").map((child) => child.name);

  return {
    parentName,
    welcomeLabel: welcomeLabel(today),
    familySummary: {
      activeChildren: childProfiles.length,
      completedBlocks: totalCompletedBlocks,
      weeklyBlocks: totalWeeklyBlocks,
      plannerReadiness:
        plannerReadyChildren > 0
          ? `${plannerReadyChildren} ${plannerReadyChildren === 1 ? "child is" : "children are"} connected to saved plans`
          : "No saved weekly plans yet",
      attentionNote:
        attentionNames.length > 0
          ? `${attentionNames.join(", ")} could use a lighter math or pacing check-in.`
          : childProfiles.length > 0
            ? "The family week looks calm. Keep the rhythm small and readable."
            : "Add a child profile to begin shaping the family learning rhythm.",
    },
    weeklySnapshot: {
      completedToday,
      plannedToday,
      weeklyCompletion: toPercent(totalCompletedBlocks, totalWeeklyBlocks),
      streakDays: completedToday > 0 ? 1 : 0,
      calmNote:
        plannedToday > 0
          ? completedToday >= plannedToday
            ? "Today’s saved tasks are finished, so the dashboard can stay quiet."
            : `${Math.max(plannedToday - completedToday, 0)} small ${plannedToday - completedToday === 1 ? "task remains" : "tasks remain"} today.`
          : "No tasks are stored for today yet, and that is okay.",
    },
    children: childProfiles,
    plannerPreview,
    rewardHighlights,
  };
}
