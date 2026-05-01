# Delegation Message - Builder Ticket 038

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Resolve the remaining local setup/runtime environment issues surfaced after the script compatibility fix so `db:setup` and `db:bootstrap` work more reliably in real Docker/local workflows.

Retrieved context summary:
- The recent script compatibility regression is fixed.
- `npm run build` passes.
- The scripts now start correctly, but remaining runtime/env issues were surfaced:
  - `EACCES: permission denied, unlink '.../src/generated/prisma/models/ChildProfile.ts'`
  - `getaddrinfo ENOTFOUND db`
- This task should focus on practical local reliability, not unrelated product-surface work.

Likely files/areas:
- `package.json`
- `scripts/setup-local.ts`
- `scripts/bootstrap-local.ts`
- `docker-compose.yml`
- Prisma/client generation flow if needed
- other local setup helpers only if necessary

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current working product behavior.
- Improve real local/Docker setup reliability.
- Update docs as part of completion.

Out of scope:
- product auth redesign
- planner/reward/child UI work
- broader Docker architecture redesign
- production deployment work

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
2. `docker compose exec web npm run db:setup`
3. `docker compose exec web npm run db:bootstrap`

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-038-local-setup-runtime-environment-cleanup.md`
