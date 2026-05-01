import { createDbClient, createId, getArg, requireDatabaseUrl } from "./_shared";
import { hashSecret, normalizeEmail } from "../src/lib/auth/crypto";

async function main() {
  const email = normalizeEmail(getArg("--email") ?? "");
  const password = getArg("--password") ?? "";
  const timezone = getArg("--timezone") ?? "America/Chicago";

  requireDatabaseUrl();

  if (!email || !password.trim()) {
    throw new Error("Usage: npm run parent:create -- --email parent@example.com --password 'strong-password' [--timezone America/Chicago]");
  }

  const client = await createDbClient();

  try {
    const result = await client.query(
      `INSERT INTO "ParentUser" ("id", "email", "passwordHash", "timezone", "sessionVersion", "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, 1, NOW(), NOW())
       ON CONFLICT ("email") DO UPDATE
       SET "passwordHash" = EXCLUDED."passwordHash",
           "timezone" = EXCLUDED."timezone",
           "sessionVersion" = "ParentUser"."sessionVersion" + 1,
           "updatedAt" = NOW()
       RETURNING "id", "email"`,
      [createId(), email, hashSecret(password.trim()), timezone],
    );

    const parent = result.rows[0];
    console.log(`Parent account ready: ${parent.email} (${parent.id})`);
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
