import { getArg, runLocalCommand, requireDatabaseUrl } from "./_shared.ts";

function main() {
  requireDatabaseUrl();

  const migrationName = getArg("--name") ?? "local_setup";

  console.log("\n==> Generating Prisma client\n");
  runLocalCommand("npx", ["prisma", "generate"]);

  console.log("\n==> Applying local Prisma migrations\n");
  runLocalCommand("npx", ["prisma", "migrate", "dev", "--name", migrationName]);

  console.log("\nLocal database setup is ready.\n");
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
