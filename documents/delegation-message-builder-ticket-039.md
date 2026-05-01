# Delegation Message - Builder Ticket 039

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Remove the remaining non-blocking Prisma/OpenSSL warning from the Docker dev path so local setup output is cleaner and more trustworthy.

Retrieved context summary:
- Local Docker setup/bootstrap now works again.
- A remaining warning still appears during setup in the container: Prisma/OpenSSL detection warning.
- This does not currently block setup, but it creates noisy output and lowers operator confidence.
- This should be treated as a small Docker hygiene cleanup.

Likely files/areas:
- `Dockerfile`
- possibly `README.md` if setup notes should be adjusted

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve current Docker/local setup behavior.
- Remove or materially reduce the OpenSSL warning during normal setup flows.
- Update docs as part of completion.

Out of scope:
- Docker architecture redesign
- production container hardening
- unrelated dependency upgrades
- broader Prisma refactor

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
1. `docker compose up --build -d`
2. `docker compose exec web npm run db:setup`
3. whether the Prisma/OpenSSL warning is removed or materially reduced

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-039-docker-openssl-warning-cleanup.md`
