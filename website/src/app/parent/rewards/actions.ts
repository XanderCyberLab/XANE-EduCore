"use server";

import { revalidatePath } from "next/cache";
import { requireParentSession } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";

type RewardPlanFields = {
  childId?: string;
  rewardPlanId?: string;
  title?: string;
  description?: string;
  tokenGoal?: string;
};

type RewardCycleActionState = {
  error?: string;
  success?: string;
};

export type SaveRewardPlanState = {
  error?: string;
  success?: string;
  fields?: RewardPlanFields;
};

function revalidateRewardSurfaces() {
  revalidatePath("/parent/rewards");
  revalidatePath("/parent/dashboard");
  revalidatePath("/parent/children");
  revalidatePath("/child/home");
  revalidatePath("/child/rewards");
  revalidatePath("/child/today");
}

async function findOwnedChild(parentUserId: string, childId: string) {
  return prisma.childProfile.findFirst({
    where: {
      id: childId,
      parentUserId,
      isArchived: false,
    },
    select: {
      id: true,
      nickname: true,
      rewardPlan: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function saveRewardPlanAction(_: SaveRewardPlanState, formData: FormData): Promise<SaveRewardPlanState> {
  const session = await requireParentSession();
  const childId = String(formData.get("childId") ?? "").trim();
  const rewardPlanId = String(formData.get("rewardPlanId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tokenGoalInput = String(formData.get("tokenGoal") ?? "").trim();
  const tokenGoal = Number.parseInt(tokenGoalInput, 10);
  const fields: RewardPlanFields = {};

  if (!childId) {
    fields.childId = "Child profile is required.";
  }

  if (!title || title.length < 2) {
    fields.title = "Add a short reward title the family will recognize.";
  }

  if (description.length > 300) {
    fields.description = "Keep the reward note to 300 characters or fewer.";
  }

  if (!Number.isInteger(tokenGoal) || tokenGoal < 1 || tokenGoal > 500) {
    fields.tokenGoal = "Choose a token goal between 1 and 500.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please fix the reward plan details and try again.",
      fields,
    };
  }

  const child = await findOwnedChild(session.parentUserId, childId);

  if (!child) {
    return { error: "That child profile could not be found." };
  }

  if (rewardPlanId) {
    if (!child.rewardPlan || child.rewardPlan.id !== rewardPlanId) {
      return { error: "That reward plan is not available." };
    }

    await prisma.rewardPlan.update({
      where: { id: rewardPlanId },
      data: {
        title,
        description: description || null,
        tokenGoal,
      },
    });

    revalidateRewardSurfaces();

    return {
      success: `${child.nickname}'s reward plan was updated.`,
    };
  }

  if (child.rewardPlan) {
    return {
      error: "This child already has an active reward plan.",
    };
  }

  await prisma.rewardPlan.create({
    data: {
      childProfileId: child.id,
      title,
      description: description || null,
      tokenGoal,
    },
  });

  revalidateRewardSurfaces();

  return {
    success: `${child.nickname}'s reward plan was created.`,
  };
}

export async function redeemRewardCycleAction(_: RewardCycleActionState, formData: FormData): Promise<RewardCycleActionState> {
  const session = await requireParentSession();
  const rewardPlanId = String(formData.get("rewardPlanId") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (!rewardPlanId) {
    return { error: "Reward cycle could not be found." };
  }

  const rewardPlan = await prisma.rewardPlan.findFirst({
    where: {
      id: rewardPlanId,
      childProfile: {
        parentUserId: session.parentUserId,
      },
      isActive: true,
    },
    select: {
      id: true,
      title: true,
      childProfile: {
        select: {
          nickname: true,
        },
      },
    },
  });

  if (!rewardPlan) {
    return { error: "That reward plan is not available." };
  }

  await prisma.rewardPlan.update({
    where: { id: rewardPlan.id },
    data: {
      cycleStartedAt: new Date(),
      cycleCount: { increment: 1 },
      lastRedeemedAt: new Date(),
      lastRedeemedNote: note || null,
    },
  });

  revalidateRewardSurfaces();

  return {
    success: `${rewardPlan.childProfile.nickname}'s reward cycle for ${rewardPlan.title} was reset for a fresh start.`,
  };
}
