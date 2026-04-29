import { hashSecret, normalizeEmail, normalizePin, normalizeUsername } from "../src/lib/auth/crypto.ts";
import {
  ChildAgeBand,
  PlanItemType,
  PlanStatus,
  SubjectArea,
  TaskCompletionStatus,
  createDbClient,
  createId,
  getArg,
  hasFlag,
  requireDatabaseUrl,
  startOfDay,
  startOfWeek,
} from "./_shared.ts";

function parsePositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function toDateOnly(value: Date) {
  return value.toISOString().slice(0, 10);
}

function buildWeekItems(today: Date) {
  const weekStart = startOfWeek(today);
  const days = Array.from({ length: 5 }, (_, index) => {
    const date = startOfDay(new Date(weekStart));
    date.setDate(weekStart.getDate() + index);
    return toDateOnly(date);
  });

  return [
    { assignedDate: days[0], subject: SubjectArea.READING, title: "Story sounds warm-up", details: "Read one short story together, then spot two words that start with the same sound.", itemType: PlanItemType.LESSON, sortOrder: 1, tokenValue: 2, isPrintable: false, isOffline: false },
    { assignedDate: days[0], subject: SubjectArea.MATH, title: "Counting tray check-in", details: "Count small objects into groups of five and say which group has more.", itemType: PlanItemType.ACTIVITY, sortOrder: 2, tokenValue: 2, isPrintable: false, isOffline: true },
    { assignedDate: days[0], subject: SubjectArea.CRITICAL_THINKING, title: "Pattern picture puzzle", details: "Finish a simple pattern row, then pick which picture comes next.", itemType: PlanItemType.PRINTABLE, sortOrder: 3, tokenValue: 1, isPrintable: true, isOffline: false },
    { assignedDate: days[1], subject: SubjectArea.READING, title: "Favorite book reread", details: "Revisit a familiar book and ask the child to retell the beginning, middle, and end.", itemType: PlanItemType.LESSON, sortOrder: 1, tokenValue: 2, isPrintable: false, isOffline: false },
    { assignedDate: days[1], subject: SubjectArea.MATH, title: "Shape hunt", details: "Find circles, squares, and triangles around the room or outside.", itemType: PlanItemType.OFFLINE, sortOrder: 2, tokenValue: 1, isPrintable: false, isOffline: true },
    { assignedDate: days[1], subject: SubjectArea.CRITICAL_THINKING, title: "Sorting basket", details: "Sort a small pile of objects by color, size, or texture.", itemType: PlanItemType.ACTIVITY, sortOrder: 3, tokenValue: 1, isPrintable: false, isOffline: true },
    { assignedDate: days[2], subject: SubjectArea.READING, title: "Letter hunt page", details: "Circle the target letter on a printable page, then say its sound out loud.", itemType: PlanItemType.PRINTABLE, sortOrder: 1, tokenValue: 2, isPrintable: true, isOffline: false },
    { assignedDate: days[2], subject: SubjectArea.MATH, title: "Number match cards", details: "Match number cards to the right number of objects.", itemType: PlanItemType.PRACTICE, sortOrder: 2, tokenValue: 1, isPrintable: true, isOffline: false },
    { assignedDate: days[2], subject: SubjectArea.CRITICAL_THINKING, title: "What comes next?", details: "Choose the next shape or picture in a short repeating sequence.", itemType: PlanItemType.PRACTICE, sortOrder: 3, tokenValue: 1, isPrintable: false, isOffline: false },
    { assignedDate: days[3], subject: SubjectArea.READING, title: "Story card retell", details: "Use three picture cards to retell a simple story in order.", itemType: PlanItemType.PRINTABLE, sortOrder: 1, tokenValue: 2, isPrintable: true, isOffline: false },
    { assignedDate: days[3], subject: SubjectArea.MATH, title: "Build and count towers", details: "Make two small block towers and compare which one is taller.", itemType: PlanItemType.ACTIVITY, sortOrder: 2, tokenValue: 2, isPrintable: false, isOffline: true },
    { assignedDate: days[3], subject: SubjectArea.CRITICAL_THINKING, title: "Big and small sort", details: "Group household objects into big and small piles.", itemType: PlanItemType.OFFLINE, sortOrder: 3, tokenValue: 1, isPrintable: false, isOffline: true },
    { assignedDate: days[4], subject: SubjectArea.READING, title: "Read and celebrate", details: "Read one calm favorite together and talk about the best part.", itemType: PlanItemType.LESSON, sortOrder: 1, tokenValue: 2, isPrintable: false, isOffline: false },
    { assignedDate: days[4], subject: SubjectArea.MATH, title: "Snack count review", details: "Count out a small snack and practice one more, one less.", itemType: PlanItemType.OFFLINE, sortOrder: 2, tokenValue: 1, isPrintable: false, isOffline: true },
    { assignedDate: days[4], subject: SubjectArea.CRITICAL_THINKING, title: "Reward reflection", details: "Talk through what felt easy, what felt tricky, and celebrate effort.", itemType: PlanItemType.ACTIVITY, sortOrder: 3, tokenValue: 1, isPrintable: false, isOffline: false },
  ];
}

async function main() {
  requireDatabaseUrl();

  const parentEmail = normalizeEmail(getArg("--parent-email") ?? "parent@example.com");
  const parentPassword = (getArg("--parent-password") ?? "change-me-now").trim();
  const parentTimezone = (getArg("--timezone") ?? "America/Chicago").trim() || "America/Chicago";
  const childNickname = (getArg("--child-nickname") ?? "Sunny").trim() || "Sunny";
  const childUsername = normalizeUsername(getArg("--child-username") ?? "sunny-star");
  const childPin = normalizePin(getArg("--child-pin") ?? "1234");
  const rewardTitle = (getArg("--reward-title") ?? "Story basket picnic").trim() || "Story basket picnic";
  const rewardDescription = (getArg("--reward-description") ?? "A calm family reward for finishing the starter week.").trim();
  const tokenGoal = parsePositiveInt(getArg("--token-goal"), 12);
  const ageBandArg = (getArg("--age-band") ?? "LOWER_ELEMENTARY").trim().toUpperCase();
  const ageBand = ChildAgeBand[ageBandArg as keyof typeof ChildAgeBand] ?? ChildAgeBand.LOWER_ELEMENTARY;
  const resetPlan = hasFlag("--reset-plan");
  const markFirstTaskComplete = hasFlag("--mark-first-task-complete");

  if (!parentPassword) {
    throw new Error("--parent-password is required.");
  }

  if (!childUsername || childPin.length < 4) {
    throw new Error("Child bootstrap needs a username and a PIN with at least 4 digits.");
  }

  const client = await createDbClient();

  try {
    await client.query("BEGIN");

    const parentResult = await client.query(
      `INSERT INTO "ParentUser" ("id", "email", "passwordHash", "timezone", "sessionVersion", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, 1, NOW(), NOW())
       ON CONFLICT ("email") DO UPDATE
       SET "passwordHash" = EXCLUDED."passwordHash",
           "timezone" = EXCLUDED."timezone",
           "sessionVersion" = "ParentUser"."sessionVersion" + 1,
           "updatedAt" = NOW()
       RETURNING "id", "email"`,
      [createId(), parentEmail, hashSecret(parentPassword), parentTimezone],
    );
    const parent = parentResult.rows[0];

    const childResult = await client.query(
      `INSERT INTO "ChildProfile" ("id", "parentUserId", "nickname", "username", "pinHash", "ageBand", "isArchived", "sessionVersion", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, $6, false, 1, NOW(), NOW())
       ON CONFLICT ("username") DO UPDATE
       SET "parentUserId" = EXCLUDED."parentUserId",
           "nickname" = EXCLUDED."nickname",
           "pinHash" = EXCLUDED."pinHash",
           "ageBand" = EXCLUDED."ageBand",
           "isArchived" = false,
           "sessionVersion" = "ChildProfile"."sessionVersion" + 1,
           "updatedAt" = NOW()
       RETURNING "id", "nickname", "username"`,
      [createId(), parent.id, childNickname, childUsername, hashSecret(childPin), ageBand],
    );
    const child = childResult.rows[0];

    await client.query(
      `INSERT INTO "RewardPlan" ("id", "childProfileId", "title", "description", "tokenGoal", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, true, NOW(), NOW())
       ON CONFLICT ("childProfileId") DO UPDATE
       SET "title" = EXCLUDED."title",
           "description" = EXCLUDED."description",
           "tokenGoal" = EXCLUDED."tokenGoal",
           "isActive" = true,
           "updatedAt" = NOW()`,
      [createId(), child.id, rewardTitle, rewardDescription || null, tokenGoal],
    );

    const today = new Date();
    const weekStart = toDateOnly(startOfWeek(today));
    const weekItems = buildWeekItems(today);

    const planResult = await client.query(
      `INSERT INTO "WeeklyPlan" ("id", "childProfileId", "weekStart", "status", "summary", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       ON CONFLICT ("childProfileId", "weekStart") DO UPDATE
       SET "status" = EXCLUDED."status",
           "summary" = EXCLUDED."summary",
           "updatedAt" = NOW()
       RETURNING "id"`,
      [createId(), child.id, weekStart, PlanStatus.ACTIVE, "Starter local plan for reviewing auth, planner, and child task flow."],
    );
    const planId = planResult.rows[0].id;

    if (resetPlan) {
      await client.query(
        `DELETE FROM "TaskCompletion"
         WHERE "childProfileId" = $1
           AND "weeklyPlanItemId" IN (
             SELECT "id" FROM "WeeklyPlanItem" WHERE "weeklyPlanId" = $2
           )`,
        [child.id, planId],
      );
      await client.query(`DELETE FROM "WeeklyPlanItem" WHERE "weeklyPlanId" = $1`, [planId]);
    }

    const itemCountResult = await client.query(`SELECT COUNT(*)::int AS count FROM "WeeklyPlanItem" WHERE "weeklyPlanId" = $1`, [planId]);
    const existingItemCount = itemCountResult.rows[0]?.count ?? 0;

    if (existingItemCount === 0) {
      for (const item of weekItems) {
        await client.query(
          `INSERT INTO "WeeklyPlanItem" ("id", "weeklyPlanId", "subject", "assignedDate", "title", "details", "itemType", "sortOrder", "tokenValue", "isPrintable", "isOffline", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
          [createId(), planId, item.subject, item.assignedDate, item.title, item.details, item.itemType, item.sortOrder, item.tokenValue, item.isPrintable, item.isOffline],
        );
      }
    }

    const todayTasksResult = await client.query(
      `SELECT "id", "title", "tokenValue"
       FROM "WeeklyPlanItem"
       WHERE "weeklyPlanId" = $1 AND "assignedDate" = $2
       ORDER BY "sortOrder" ASC, "createdAt" ASC
       LIMIT 3`,
      [planId, toDateOnly(startOfDay(today))],
    );
    const todayItems = todayTasksResult.rows;

    if (markFirstTaskComplete && todayItems[0]) {
      await client.query(
        `INSERT INTO "TaskCompletion" ("id", "childProfileId", "weeklyPlanItemId", "status", "awardedTokens", "completedAt", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), NOW())
         ON CONFLICT ("childProfileId", "weeklyPlanItemId") DO UPDATE
         SET "status" = EXCLUDED."status",
             "awardedTokens" = EXCLUDED."awardedTokens",
             "completedAt" = EXCLUDED."completedAt",
             "updatedAt" = NOW()`,
        [createId(), child.id, todayItems[0].id, TaskCompletionStatus.COMPLETED, todayItems[0].tokenValue],
      );
    }

    await client.query("COMMIT");

    console.log("Local EduCore bootstrap is ready.\n");
    console.log(`Parent login: ${parent.email}`);
    console.log(`Parent password: ${parentPassword}`);
    console.log(`Child login: @${child.username}`);
    console.log(`Child PIN: ${childPin}`);
    console.log(`Starter reward: ${rewardTitle} (${tokenGoal} stars)`);
    console.log(`Weekly plan: ${weekItems.length} starter items for the current week`);
    console.log(`Today's tasks: ${todayItems.length} ready on /child/home and /child/today`);
    console.log(resetPlan ? "Plan reset: yes" : "Plan reset: no (existing plan reused if present)");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
