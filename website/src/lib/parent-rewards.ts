import { TaskCompletionStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function percent(tokens: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((tokens / goal) * 100)));
}

function rewardStatus(tokens: number, goal: number) {
  if (goal <= 0) return "steady" as const;
  if (tokens >= goal) return "ready" as const;
  if (tokens / goal >= 0.75) return "close" as const;
  return "steady" as const;
}

function nextStep(tokens: number, goal: number) {
  const remaining = Math.max(goal - tokens, 0);

  if (remaining === 0) {
    return "This reward is ready for a parent decision. You can mark it redeemed and begin a fresh cycle when the family is ready.";
  }

  if (remaining <= 3) {
    return `Only ${remaining} more token${remaining === 1 ? "" : "s"} remain. A calm parent check-in may be enough.`;
  }

  return `${remaining} more token${remaining === 1 ? "" : "s"} until this cycle is complete.`;
}

export async function getParentRewardPageData(parentUserId: string) {
  const children = await prisma.childProfile.findMany({
    where: {
      parentUserId,
      isArchived: false,
    },
    orderBy: { createdAt: "asc" },
    include: {
      rewardPlan: {
        select: {
          id: true,
          title: true,
          description: true,
          tokenGoal: true,
          isActive: true,
          cycleStartedAt: true,
          cycleCount: true,
          lastRedeemedAt: true,
          lastRedeemedNote: true,
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

  const rewardPlans = children
    .filter((child) => child.rewardPlan?.isActive)
    .map((child) => {
      const rewardPlan = child.rewardPlan!;
      const cycleTokens = child.taskCompletions
        .filter((completion) => (completion.completedAt ?? completion.createdAt) >= rewardPlan.cycleStartedAt)
        .reduce((sum, completion) => sum + completion.awardedTokens, 0);

      const weeklyEarned = child.taskCompletions
        .filter((completion) => Date.now() - (completion.completedAt ?? completion.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000)
        .reduce((sum, completion) => sum + completion.awardedTokens, 0);

      return {
        id: rewardPlan.id,
        childId: child.id,
        childName: child.nickname,
        rewardTitle: rewardPlan.title,
        rewardDescription: rewardPlan.description,
        tokens: cycleTokens,
        goal: rewardPlan.tokenGoal,
        progress: percent(cycleTokens, rewardPlan.tokenGoal),
        status: rewardStatus(cycleTokens, rewardPlan.tokenGoal),
        nextStep: nextStep(cycleTokens, rewardPlan.tokenGoal),
        weeklyEarned,
        cycleCount: rewardPlan.cycleCount,
        cycleStartedAt: rewardPlan.cycleStartedAt,
        lastRedeemedAt: rewardPlan.lastRedeemedAt,
        lastRedeemedNote: rewardPlan.lastRedeemedNote,
      };
    });

  const childrenWithoutRewardPlan = children
    .filter((child) => !child.rewardPlan || !child.rewardPlan.isActive)
    .map((child) => ({
      id: child.id,
      childName: child.nickname,
    }));

  const totalTokens = rewardPlans.reduce((sum, plan) => sum + plan.tokens, 0);
  const totalGoals = rewardPlans.reduce((sum, plan) => sum + plan.goal, 0);
  const readyCount = rewardPlans.filter((plan) => plan.status === "ready").length;
  const closeCount = rewardPlans.filter((plan) => plan.status === "close").length;

  return {
    rewardPlans,
    childrenWithoutRewardPlan,
    surfaceSummary: [
      {
        label: "Active reward plans",
        value: String(rewardPlans.length),
        note: "One visible reward path per child keeps the system readable.",
      },
      {
        label: "Current cycle tokens",
        value: `${totalTokens}/${totalGoals}`,
        note: "Each total reflects only the active reward cycle.",
      },
      {
        label: "Parent decisions",
        value: readyCount > 0 ? String(readyCount) : String(closeCount),
        note:
          readyCount > 0
            ? `${readyCount} reward${readyCount === 1 ? " is" : "s are"} ready for redemption.`
            : closeCount > 0
              ? `${closeCount} reward${closeCount === 1 ? " is" : "s are"} close to ready.`
              : "No reward decisions are pressing right now.",
      },
    ],
  };
}
