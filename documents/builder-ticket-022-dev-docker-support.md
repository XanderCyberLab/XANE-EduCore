# Builder Ticket 022 - Dev Docker Support

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Project
`/home/xander/projects/xane-educore/website`

## Goal
Add dev-only Docker support so the EduCore website and PostgreSQL can run locally and the site can be viewed after changes.

## Retrieved context summary
- EduCore is self-host-friendly and local-dev oriented.
- The website depends on Next.js, Prisma, PostgreSQL, `DATABASE_URL`, and `AUTH_SECRET`.
- No Docker support exists yet, so this must be created from scratch.
- The safest first pass is development-only Docker, not production deployment setup.

## Likely files/areas
- `Dockerfile`
- `.dockerignore`
- `docker-compose.yml`
- `README.md`
- `.env.example`
- `package.json` only if needed

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Keep this dev-only, not production-oriented.
- Do not add reverse proxy, cloud deployment, or production hardening.
- Keep Prisma setup/bootstrap as explicit documented steps, not automatic container-boot orchestration.

## Out of scope
- production Docker hardening
- reverse proxy setup
- cloud deployment
- automatic migration orchestration at container boot
- full deployment architecture decisions

## Required Builder process
Before coding:
1. Inspect files first
2. Confirm expected files to modify
3. State implementation plan
4. Wait for approval before coding

After coding, final report must include:
- what was changed
- files changed
- assumptions made
- anything needing project-lead review
- How to test
