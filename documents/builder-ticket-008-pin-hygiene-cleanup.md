# Builder Ticket 008 - PIN Hygiene Cleanup

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Clean up the mock child login implementation so the public repository does not normalize explicit sample PIN values in mock data.

This is a small hygiene and repo-safety refinement ticket, not a product redesign.

## Why this ticket exists
The current child login prototype includes explicit mock PIN arrays in code.

They are fake and not a security incident, but they are not a pattern we want to normalize in a public repository.

EduCore should demonstrate cleaner public-facing auth mock patterns from the start.

## Scope

### In scope
- remove explicit mock PIN values from public-facing mock data
- preserve the current mock login experience as closely as possible
- keep the child login route functioning as a prototype
- update code so the prototype still communicates PIN-style login without storing example PINs directly in mock profile data
- keep the change small and focused

### Out of scope
- real authentication
- new auth architecture
- redesign of the child login flow
- backend changes
- broader refactors unrelated to PIN hygiene

## Primary target files
Likely includes:
- `/home/xander/projects/xane-educore/website/src/lib/mock-child.ts`
- `/home/xander/projects/xane-educore/website/src/app/child/login/page.tsx`

## Product constraints

This work must respect EduCore's public-repo and product direction:
- preserve child-friendly login feel
- preserve mock-only prototype behavior
- improve public-facing code hygiene
- avoid implying that real or sample credentials belong in source data

## Expected output

Builder should deliver:
- removal of explicit sample PIN arrays from mock profile data
- a still-working mock child login prototype
- a short explanation of what was changed and why

## Review criteria

The work will be considered successful if:
- no explicit example PIN arrays remain in mock child data
- login prototype still feels the same from a user-review standpoint
- change is small, focused, and does not create unnecessary complexity
- public-repo hygiene is improved

## Notes for Builder

Prefer the simplest safe mock approach.
This is a cleanup ticket, not a redesign ticket.
