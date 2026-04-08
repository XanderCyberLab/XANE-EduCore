# Builder Ticket 016 - Parent Data Surfaces Persistence Alignment

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Align the parent-facing dashboard and child-management surfaces more closely with the real persisted data layer.

This ticket should reduce the current mismatch where some parent surfaces still rely heavily on mock data while planner, auth, and child task flows are already drawing from real persistence.

## Why this ticket exists
EduCore now has real foundations for:
- persistence
- auth
- planner data
- child task completion and token accumulation
- local setup/bootstrap workflow

The parent-facing overview surfaces should now catch up so the system feels more internally coherent.

## Scope

### In scope
- wire `/parent/dashboard` more meaningfully to persisted data where practical
- wire `/parent/children` more meaningfully to persisted data where practical
- preserve calm empty states if data is partial or missing
- keep the implementation restrained and readable
- avoid trying to fully complete every parent feature at once

### Out of scope
- major redesign of parent UI
- full planner editing system
- full reward configuration overhaul
- advanced analytics
- admin-level permissions or organization features
- deep reporting systems

## Product constraints

This work must respect EduCore's product direction:
- parent surfaces should feel calm, readable, and trustworthy
- parent should be able to understand child status without dashboard overload
- privacy-first child modeling must remain visible in the parent experience
- the UI should stay family-first, not institution-first
- keep the implementation practical and V1-scoped

## Technical expectations

Builder should:
- build on the current Prisma/auth/planner/task foundation
- use persisted data where it materially improves product coherence
- keep mapping/query logic maintainable
- preserve public-repo safety
- avoid overengineering parent-side aggregation too early

## Expected output

Builder should deliver:
- parent dashboard and/or child-management surfaces more meaningfully connected to persisted data
- sensible empty states and fallback behavior
- any needed supporting data utilities
- a short explanation of what was aligned and any assumptions made

## Review criteria

The work will be considered successful if:
- parent surfaces feel less mock-isolated and more connected to the live system
- implementation remains clear and restrained
- the app feels more internally coherent across parent and child experiences
- public-repo safety is preserved

## Notes for Builder

This is an alignment ticket, not a full parent-system completion ticket.

Favor:
- coherence over breadth
- readable data shaping
- calm parent presentation
- minimalism over analytic sprawl
