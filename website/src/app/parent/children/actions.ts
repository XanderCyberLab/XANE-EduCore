"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ChildAgeBand } from "@/generated/prisma/client";
import { requireParentSession } from "@/lib/auth/guards";
import { hashSecret, normalizePin, normalizeUsername } from "@/lib/auth/crypto";
import { prisma } from "@/lib/prisma";

type ChildProfileFields = {
  childId?: string;
  nickname?: string;
  username?: string;
  pin?: string;
  pinConfirm?: string;
  ageBand?: string;
};

export type CreateChildProfileState = {
  error?: string;
  success?: string;
  fields?: ChildProfileFields;
};

export type UpdateChildProfileState = {
  error?: string;
  success?: string;
  fields?: ChildProfileFields;
};

export type UpdateChildCredentialsState = {
  error?: string;
  success?: string;
  fields?: ChildProfileFields;
};

const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,22}[a-z0-9])?$/;

function optionalAgeBand(value: string): ChildAgeBand | null {
  if (!value) return null;
  if (value in ChildAgeBand) {
    return value as ChildAgeBand;
  }
  return null;
}

export async function createChildProfileAction(_: CreateChildProfileState, formData: FormData): Promise<CreateChildProfileState> {
  const session = await requireParentSession();

  const nickname = String(formData.get("nickname") ?? "").trim();
  const usernameInput = String(formData.get("username") ?? "");
  const pinInput = String(formData.get("pin") ?? "");
  const pinConfirmInput = String(formData.get("pinConfirm") ?? "");
  const ageBandInput = String(formData.get("ageBand") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "").trim();

  const username = normalizeUsername(usernameInput);
  const pin = normalizePin(pinInput);
  const pinConfirm = normalizePin(pinConfirmInput);
  const ageBand = optionalAgeBand(ageBandInput);

  const fields: ChildProfileFields = {};

  if (!nickname || nickname.length < 2) {
    fields.nickname = "Add a short nickname the child will recognize.";
  }

  if (!USERNAME_PATTERN.test(username)) {
    fields.username = "Use 3 to 24 lowercase letters, numbers, or hyphens.";
  }

  if (pin.length < 4 || pin.length > 8) {
    fields.pin = "Use a 4 to 8 digit PIN.";
  }

  if (pin !== pinConfirm) {
    fields.pinConfirm = "The PIN entries need to match.";
  }

  if (ageBandInput && !ageBand) {
    fields.ageBand = "Choose one of the listed age bands.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please fix the child setup details and try again.",
      fields,
    };
  }

  const existingChild = await prisma.childProfile.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existingChild) {
    return {
      error: "That username is already in use for another child profile.",
      fields: {
        username: "Choose a different username so child login stays simple.",
      },
    };
  }

  await prisma.childProfile.create({
    data: {
      parentUserId: session.parentUserId,
      nickname,
      username,
      pinHash: hashSecret(pin),
      ageBand,
    },
  });

  revalidateParentChildrenSurfaces();

  if (redirectTo && redirectTo.startsWith("/parent/")) {
    redirect(redirectTo);
  }

  return {
    success: `${nickname} is ready for child login.`,
  };
}

function revalidateParentChildrenSurfaces() {
  revalidatePath("/parent/children");
  revalidatePath("/parent/dashboard");
  revalidatePath("/child/login");
}

async function findOwnedChildProfile(parentUserId: string, childId: string) {
  return prisma.childProfile.findFirst({
    where: {
      id: childId,
      parentUserId,
      isArchived: false,
    },
    select: {
      id: true,
      username: true,
    },
  });
}

export async function updateChildProfileAction(_: UpdateChildProfileState, formData: FormData): Promise<UpdateChildProfileState> {
  const session = await requireParentSession();
  const childId = String(formData.get("childId") ?? "").trim();
  const nickname = String(formData.get("nickname") ?? "").trim();
  const ageBandInput = String(formData.get("ageBand") ?? "").trim();
  const ageBand = optionalAgeBand(ageBandInput);
  const fields: ChildProfileFields = {};

  if (!childId) {
    fields.childId = "Child profile is required.";
  }

  if (!nickname || nickname.length < 2) {
    fields.nickname = "Add a short nickname the child will recognize.";
  }

  if (ageBandInput && !ageBand) {
    fields.ageBand = "Choose one of the listed age bands.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please fix the child profile details and try again.",
      fields,
    };
  }

  const child = await findOwnedChildProfile(session.parentUserId, childId);

  if (!child) {
    return {
      error: "That child profile could not be found.",
    };
  }

  await prisma.childProfile.update({
    where: { id: child.id },
    data: {
      nickname,
      ageBand,
    },
  });

  revalidateParentChildrenSurfaces();

  return {
    success: `${nickname}'s profile was updated.`,
  };
}

export async function updateChildCredentialsAction(_: UpdateChildCredentialsState, formData: FormData): Promise<UpdateChildCredentialsState> {
  const session = await requireParentSession();
  const childId = String(formData.get("childId") ?? "").trim();
  const usernameInput = String(formData.get("username") ?? "");
  const pinInput = String(formData.get("pin") ?? "");
  const pinConfirmInput = String(formData.get("pinConfirm") ?? "");

  const username = normalizeUsername(usernameInput);
  const pin = normalizePin(pinInput);
  const pinConfirm = normalizePin(pinConfirmInput);
  const fields: ChildProfileFields = {};

  if (!childId) {
    fields.childId = "Child profile is required.";
  }

  if (!USERNAME_PATTERN.test(username)) {
    fields.username = "Use 3 to 24 lowercase letters, numbers, or hyphens.";
  }

  if (pinInput && (pin.length < 4 || pin.length > 8)) {
    fields.pin = "Use a 4 to 8 digit PIN.";
  }

  if (!pinInput && pinConfirmInput) {
    fields.pin = "Enter a new PIN before confirming it.";
  }

  if (pinInput && pin !== pinConfirm) {
    fields.pinConfirm = "The PIN entries need to match.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      error: "Please fix the login details and try again.",
      fields,
    };
  }

  const child = await findOwnedChildProfile(session.parentUserId, childId);

  if (!child) {
    return {
      error: "That child profile could not be found.",
    };
  }

  const usernameChanged = child.username !== username;
  const pinChanged = Boolean(pinInput);

  if (usernameChanged) {
    const existingChild = await prisma.childProfile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingChild && existingChild.id !== child.id) {
      return {
        error: "That username is already in use for another child profile.",
        fields: {
          username: "Choose a different username so child login stays simple.",
        },
      };
    }
  }

  if (!usernameChanged && !pinChanged) {
    return {
      success: "No login changes were needed.",
    };
  }

  await prisma.childProfile.update({
    where: { id: child.id },
    data: {
      username,
      ...(pinChanged ? { pinHash: hashSecret(pin) } : {}),
      ...(usernameChanged || pinChanged ? { sessionVersion: { increment: 1 } } : {}),
    },
  });

  revalidateParentChildrenSurfaces();

  return {
    success: usernameChanged && pinChanged ? "Username and PIN details were updated." : pinChanged ? "PIN was rotated successfully." : "Username was updated.",
  };
}
