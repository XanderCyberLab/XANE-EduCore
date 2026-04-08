import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Client } from "pg";

export const ChildAgeBand = {
  EARLY_YEARS: "EARLY_YEARS",
  LOWER_ELEMENTARY: "LOWER_ELEMENTARY",
  UPPER_ELEMENTARY: "UPPER_ELEMENTARY",
} as const;

export const PlanStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const;

export const SubjectArea = {
  READING: "READING",
  MATH: "MATH",
  CRITICAL_THINKING: "CRITICAL_THINKING",
} as const;

export const PlanItemType = {
  LESSON: "LESSON",
  ACTIVITY: "ACTIVITY",
  PRACTICE: "PRACTICE",
  OFFLINE: "OFFLINE",
  PRINTABLE: "PRINTABLE",
} as const;

export const TaskCompletionStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  SKIPPED: "SKIPPED",
} as const;

export function createId() {
  return randomUUID().replace(/-/g, "");
}

export function getArg(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function hasFlag(name: string) {
  return process.argv.includes(name);
}

export function requireDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required.");
  }

  return connectionString;
}

export async function createDbClient() {
  const client = new Client({
    connectionString: requireDatabaseUrl(),
  });

  await client.connect();
  return client;
}

export function runLocalCommand(command: string, args: string[]) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });
}

export function startOfDay(value: Date) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfWeek(value: Date) {
  const date = startOfDay(value);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}
