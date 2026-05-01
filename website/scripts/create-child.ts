import { createDbClient, createId, getArg, requireDatabaseUrl } from "./_shared";
import { hashSecret, normalizeEmail, normalizePin, normalizeUsername } from "../src/lib/auth/crypto";

async function main() {
  const parentEmail = normalizeEmail(getArg("--parent-email") ?? "");
  const nickname = (getArg("--nickname") ?? "").trim();
  const username = normalizeUsername(getArg("--username") ?? "");
  const pin = normalizePin(getArg("--pin") ?? "");
  const rewardTitle = (getArg("--reward-title") ?? "Choose a cozy reward").trim();
  const tokenGoal = Number(getArg("--token-goal") ?? "12");

  requireDatabaseUrl();

  if (!parentEmail || !nickname || !username || pin.length < 4) {
    throw new Error(
      "Usage: npm run child:create -- --parent-email parent@example.com --nickname Sunny --username sunny-star --pin 1234 [--reward-title 'Story basket'] [--token-goal 12]",
    );
  }

  const client = await createDbClient();

  try {
    const parentResult = await client.query(`SELECT "id" FROM "ParentUser" WHERE "email" = $1 LIMIT 1`, [parentEmail]);
    const parent = parentResult.rows[0];

    if (!parent) {
      throw new Error(`No parent found for ${parentEmail}`);
    }

    const childResult = await client.query(
      `INSERT INTO "ChildProfile" ("id", "parentUserId", "nickname", "username", "pinHash", "isArchived", "sessionVersion", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, false, 1, NOW(), NOW())
       ON CONFLICT ("username") DO UPDATE
       SET "nickname" = EXCLUDED."nickname",
           "parentUserId" = EXCLUDED."parentUserId",
           "pinHash" = EXCLUDED."pinHash",
           "isArchived" = false,
           "sessionVersion" = "ChildProfile"."sessionVersion" + 1,
           "updatedAt" = NOW()
       RETURNING "id", "nickname", "username"`,
      [createId(), parent.id, nickname, username, hashSecret(pin)],
    );

    const child = childResult.rows[0];
    const safeTokenGoal = Number.isFinite(tokenGoal) && tokenGoal > 0 ? tokenGoal : 12;

    await client.query(
      `INSERT INTO "RewardPlan" ("id", "childProfileId", "title", "tokenGoal", "isActive", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, true, NOW(), NOW())
       ON CONFLICT ("childProfileId") DO UPDATE
       SET "title" = EXCLUDED."title",
           "tokenGoal" = EXCLUDED."tokenGoal",
           "isActive" = true,
           "updatedAt" = NOW()`,
      [createId(), child.id, rewardTitle, safeTokenGoal],
    );

    console.log(`Child profile ready: ${child.nickname} (@${child.username})`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
