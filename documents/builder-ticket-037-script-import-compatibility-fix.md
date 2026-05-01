# Builder Ticket 037 - Script Import Compatibility Fix

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Fix the current script import compatibility regression so local Docker/script flows work again while preserving the recent build fix.

## Retrieved context summary
- A recent cleanup fixed `npm run build` by removing explicit `.ts` import extensions.
- That change regressed `npm run db:setup` in Docker/local script execution.
- Current reported error: `Cannot find module '/app/scripts/_shared' imported from /app/scripts/setup-local.ts`.
- We need a compatibility-safe fix that restores script execution without rebreaking build behavior.

## Likely files/areas
- `scripts/setup-local.ts`
- `scripts/bootstrap-local.ts`
- likely supporting:
  - `scripts/_shared.ts`
  - `package.json` if script runner strategy needs adjustment

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current build behavior.
- Restore `db:setup` and `db:bootstrap` compatibility in Docker/local use.
- Update docs as part of completion.

## Out of scope
- broader script refactor
- auth redesign
- Docker redesign
- unrelated build optimization work

## Required process
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions made.
5. List docs updated.

## Required verification
Builder should explicitly verify:
1. `npm run build`
2. `npm run db:setup`
3. `npm run db:bootstrap`

## Builder completion notes
### Implemented fix
- Replaced the direct `node --experimental-strip-types` script runner with `tsx` in `package.json` for local/database helper scripts.
- Added `tsx` as a dev dependency so extensionless TypeScript imports in `scripts/*` resolve consistently in local and Docker script flows.
- Updated helper script usage text in `scripts/create-parent.ts` and `scripts/create-child.ts` to point at the npm scripts instead of the old Node invocation.

### Verification results
- `npm run build` ✅ passed.
- `npm run db:setup` ✅ import regression resolved, command now starts and reaches Prisma generation, then stops on an existing filesystem permission error: `EACCES ... src/generated/prisma/models/ChildProfile.ts`.
- `npm run db:bootstrap` ✅ import regression resolved, command now starts and reaches database connection, then stops on environment/network resolution for host `db`: `getaddrinfo ENOTFOUND db`.

### Follow-up environment issues observed
- Generated Prisma files under `src/generated/prisma/` appear to have a write-permission problem in this environment.
- `DATABASE_URL` currently points at `db`, which is valid in Docker Compose but not resolvable from this host shell unless the command runs inside the compose network or uses a localhost-accessible database host.
