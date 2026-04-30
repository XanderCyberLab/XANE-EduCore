# Builder Ticket 028 - Open Multi-Parent Signup

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Project
- `/home/xander/projects/xane-educore/website`

## Goal
Change parent onboarding/auth behavior so EduCore supports open creation of multiple parent accounts from the parent login surface, with each account stored in the database and able to sign in later.

## Retrieved context summary
- Current Ticket 027 implementation restricts parent creation to a single parent account per install.
- Product direction has now changed.
- EduCore V1 should allow multiple parent accounts to be created from the login/account creation surface.
- Each parent account should persist in the database and be reusable for later sign-in.
- Security hardening can come later; this ticket should make the smallest safe behavior correction now.

## Likely files/areas
- `src/app/parent/login/actions.ts`
- `src/app/parent/login/page.tsx`
- `src/components/parent-login-form.tsx`
- `src/lib/auth/parent.ts`
- likely supporting docs:
  - `src/lib/auth/README.md`
  - `README.md`

## Constraints
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Preserve the current auth/session architecture.
- Allow new parent account creation even when other parent accounts already exist.
- Keep sign-in behavior intact for existing parents.
- Update docs as part of completion.

## Out of scope
- invite-only flows
- parent role hierarchy
- account recovery
- email verification
- password reset
- broader account management redesign

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
