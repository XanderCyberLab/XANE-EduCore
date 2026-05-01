# Delegation Message - Builder Ticket 037

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Fix the current script import compatibility regression so local Docker/script flows work again while preserving the recent build fix.

Retrieved context summary:
- A recent cleanup fixed `npm run build` by removing explicit `.ts` import extensions.
- That change regressed `npm run db:setup` in Docker/local script execution.
- Current reported error: `Cannot find module '/app/scripts/_shared' imported from /app/scripts/setup-local.ts`.
- We need a compatibility-safe fix that restores script execution without rebreaking build behavior.

Likely files/areas:
- `scripts/setup-local.ts`
- `scripts/bootstrap-local.ts`
- likely supporting:
  - `scripts/_shared.ts`
  - `package.json` if script runner strategy needs adjustment

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current build behavior.
- Restore `db:setup` and `db:bootstrap` compatibility in Docker/local use.
- Update docs as part of completion.

Out of scope:
- broader script refactor
- auth redesign
- Docker redesign
- unrelated build optimization work

Required process:
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

Required verification:
1. `npm run build`
2. `npm run db:setup`
3. `npm run db:bootstrap`

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-037-script-import-compatibility-fix.md`
