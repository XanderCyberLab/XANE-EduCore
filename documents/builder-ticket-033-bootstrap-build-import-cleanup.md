# Builder Ticket 033 - Bootstrap Build Import Cleanup

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Fix the pre-existing local bootstrap/build import issue so normal build and setup flows stay reliable alongside current product work.

## Retrieved context summary
- Recent child-task refinement work passed lint, but `npm run build` still failed for a pre-existing unrelated issue.
- Reported issue: `scripts/bootstrap-local.ts` imports `../src/lib/auth/crypto.ts` with a `.ts` extension.
- This should be treated as build/setup hygiene work, not product-surface redesign.
- Reliable bootstrap/build behavior matters for local development and validation.

## Likely files/areas
- `scripts/bootstrap-local.ts`
- likely supporting:
  - `scripts/setup-local.ts`
  - shared script imports if relevant

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current local bootstrap/setup behavior.
- Fix the build/bootstrap import issue cleanly.
- Update docs as part of completion.

## Out of scope
- auth redesign
- broader script refactor
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

## Completion note
- Fixed explicit `.ts` import extensions in local setup/bootstrap scripts.
- Updated `scripts/bootstrap-local.ts` to import `../src/lib/auth/crypto` and `./_shared` without `.ts` extensions.
- Updated `scripts/setup-local.ts` to import `./_shared` without the `.ts` extension.
