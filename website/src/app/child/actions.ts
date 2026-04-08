"use server";

import { TaskCompletionStatus } from "@/generated/prisma/client";
import { requireChildSession } from "@/lib/auth/guards";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeChildTask(formData: FormData) {
  const session = await requireChildSession();
  const weeklyPlanItemId = formData.get("weeklyPlanItemId");

  if (typeof weeklyPlanItemId !== "string" || !weeklyPlanItemId) {
    return;
  }

  const task = await prisma.weeklyPlanItem.findFirst({
    where: {
      id: weeklyPlanItemId,
      weeklyPlan: {
        childProfileId: session.childProfileId,
      },
    },
    select: {
      id: true,
      tokenValue: true,
    },
  });

  if (!task) {
    return;
  }

  await prisma.taskCompletion.upsert({
    where: {
      childProfileId_weeklyPlanItemId: {
        childProfileId: session.childProfileId,
        weeklyPlanItemId: task.id,
      },
    },
    update: {
      status: TaskCompletionStatus.COMPLETED,
      awardedTokens: task.tokenValue,
      completedAt: new Date(),
    },
    create: {
      childProfileId: session.childProfileId,
      weeklyPlanItemId: task.id,
      status: TaskCompletionStatus.COMPLETED,
      awardedTokens: task.tokenValue,
      completedAt: new Date(),
    },
  });

  revalidatePath("/child/home");
  revalidatePath("/child/today");
  revalidatePath("/child/rewards");
  revalidatePath("/child/subject/reading");
  revalidatePath("/child/subject/math");
  revalidatePath("/child/subject/thinking");
}
