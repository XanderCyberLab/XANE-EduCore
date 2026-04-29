# Builder Ticket 023 - Docker Bootstrap Script Fix

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Project
`/home/xander/projects/xane-educore/website`

## Goal
Fix the Docker-local setup/bootstrap script failures so the existing dev Docker workflow can successfully initialize and seed the app.

## Problem observed
Current Docker setup starts the web and db containers correctly, but these commands fail inside the web container:
- `docker compose exec web npm run db:setup`
- `docker compose exec web npm run db:bootstrap`

Observed errors indicate import resolution failures in Node ESM/strip-types mode:
- `Cannot find module '/app/scripts/_shared'`
- `Cannot find module '/app/src/lib/auth/crypto'`

## Scope

### In scope
- fix import/path resolution for the local setup/bootstrap scripts inside Docker
- keep the existing Docker architecture intact
- keep the existing setup/bootstrap workflow intact
- verify the two failing commands work in-container after the fix

### Out of scope
- redesign Docker setup
- change auth behavior
- change seeding behavior beyond what is required to fix execution
- expand deployment scope
- unrelated refactors

## Constraints
- make the smallest safe change
- do not rewrite unrelated files
- preserve current Docker workflow
- preserve public-repo safety
- keep README/doc changes minimal and only if required by the fix

## Likely files
- `website/scripts/setup-local.ts`
- `website/scripts/bootstrap-local.ts`
- `website/scripts/_shared.ts`
- possibly related imported files if path extensions or import style must change

## Required process
Before coding:
1. Inspect the failing scripts and confirm the exact files to modify
2. State the implementation plan
3. Then proceed

## Expected output
- `npm run db:setup` works inside the Docker web container
- `npm run db:bootstrap` works inside the Docker web container
- brief explanation of what changed

## Final report must include
- what changed
- files changed
- assumptions made
- anything needing project-lead review
- How to test
