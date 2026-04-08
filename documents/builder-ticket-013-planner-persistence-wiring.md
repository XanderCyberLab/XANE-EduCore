# Builder Ticket 013 - Planner Persistence Wiring

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Wire the planner experience to real persisted weekly plan data.

This ticket should move EduCore further from mocked planning surfaces into real planner-backed behavior by connecting the planner and child daily views to stored weekly plans and plan items.

## Why this ticket exists
EduCore now has:
- real persistence foundation
- parent auth
- child auth
- mocked planner and child daily UX foundations

The next major bridge is real weekly plan data.

This should establish a durable connection between:
- parent planner view
- child daily task view
- stored weekly plan records

## Scope

### In scope
- connect planner-related pages to real persisted weekly plan data
- load weekly plans and weekly plan items from Prisma-backed data
- make parent planner surfaces reflect stored plans where appropriate
- make child daily/task surfaces reflect stored plan items more consistently
- preserve calm empty states when no plan exists yet
- keep implementation focused on data wiring, not full planner editing or generation

### Out of scope
- AI plan generation
- full planner CRUD UI
- planner editing UX
- task completion persistence logic beyond what is already needed for display
- reward accumulation logic implementation
- printable generation implementation

## Product constraints

This work must respect EduCore's product direction:
- planner should remain calm and family-first
- weekly plans should support readable parent oversight and child clarity
- do not turn the planner into a heavy scheduling system
- preserve printable/offline task visibility where possible
- keep child daily flow simple and understandable
- maintain privacy-first and parent-controlled system assumptions

## Technical expectations

Builder should:
- build on the current Prisma schema and auth foundation
- use the existing weekly plan models sensibly
- keep data-loading logic readable and maintainable
- avoid overengineering planner infrastructure at this stage
- preserve public-repo safety

## Expected output

Builder should deliver:
- planner and child daily/task views wired to persisted weekly plan data
- sensible empty-state behavior when no plans exist
- any necessary supporting query or data-mapping utilities
- a short explanation of what was wired and any assumptions made

## Review criteria

The work will be considered successful if:
- stored weekly plans now drive planner and/or child task views meaningfully
- parent and child surfaces feel more connected through real data
- implementation remains restrained and understandable
- the system is better positioned for later task completion and token accumulation work
- public-repo safety is preserved

## Notes for Builder

This is a wiring ticket, not a full planning-system completion ticket.

Favor:
- clean data flow
- stable plan loading
- readable mapping from plan records to UI
- minimalism over premature planner complexity
