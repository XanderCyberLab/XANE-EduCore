import { existsSync } from "node:fs";
import { hasFlag, runLocalCommand, requireDatabaseUrl } from "./_shared";

function main() {
  const databaseUrl = requireDatabaseUrl();
  const skipGenerate = hasFlag("--skip-generate");
  const generatedClientExists = existsSync("src/generated/prisma/client.ts");
  const commandEnv = {
    ...process.env,
    DATABASE_URL: databaseUrl,
  };

  if (!skipGenerate) {
    console.log("\n==> Generating Prisma client\n");

    try {
      runLocalCommand("npx", ["prisma", "generate"], { env: commandEnv });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isPermissionIssue = message.includes("EACCES") || message.includes("permission denied");

      if (!isPermissionIssue || !generatedClientExists) {
        throw error;
      }

      console.warn("\nPrisma client generation hit a permissions error, but an existing generated client was found. Continuing with migrations only.\n");
    }
  }

  console.log("\n==> Applying local Prisma migrations\n");
  runLocalCommand("npx", ["prisma", "migrate", "deploy"], { env: commandEnv });

  console.log("\nLocal database setup is ready.\n");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
