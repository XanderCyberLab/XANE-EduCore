# Builder Ticket 009 - Data Model and Persistence Foundation

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Establish the first real data model and persistence foundation for EduCore.

This ticket should introduce the backend data-layer groundwork needed for V1 without attempting to implement the entire product. The result should create a durable base for future auth, planning, rewards, and task-tracking work.

## Why this ticket exists
EduCore now has enough mocked product shape that backend structure can be designed with more confidence.

The next step is not full feature completion. The next step is building a clean foundation that supports:
- parent accounts
- child profiles
- weekly plans
- daily task assignments
- reward setup
- task completion tracking

This should remain disciplined and incremental.

## Scope

### In scope
- add Prisma to the website application if not already present
- establish initial Prisma configuration
- scaffold PostgreSQL-oriented persistence setup
- create an initial schema for core EduCore entities
- create initial migration(s) if appropriate for the environment
- keep implementation focused on data-layer setup, not feature completion
- document assumptions briefly if needed

### Out of scope
- full auth implementation
- full planner implementation
- AI generation logic
- real task completion UX
- route protection
- full CRUD flows
- production deployment setup beyond what is minimally needed for local development foundation

## Product constraints

This work must respect EduCore's product direction:
- child identity should remain nickname-first and privacy-conscious
- do not model unnecessary child personal data
- preserve parent-controlled system assumptions
- keep the schema extensible without overbuilding for speculative scale
- support self-hosted and local-first direction
- favor clarity and maintainability over clever abstraction

## Required schema direction

At minimum, the schema should establish a thoughtful first pass for entities such as:

### ParentUser
Should support:
- parent identity/account
- minimal necessary authentication-related fields
- timestamps

### ChildProfile
Should support:
- parent ownership relationship
- nickname/display identity
- username for child login
- PIN hash field or placeholder auth-ready field
- age or age-band support if useful
- reward and planning relevance
- timestamps

### RewardPlan or RewardSettings
Should support:
- child relationship
- reward text/title
- token goal
- active reward state

### WeeklyPlan
Should support:
- child relationship
- week start reference
- planning status if useful
- timestamps

### WeeklyPlanItem
Should support:
- parent weekly plan relationship
- subject
- assigned date
- task title or summary
- mode/type cues if useful
- printable/offline relevance where appropriate
- ordering or sequence where helpful

### TaskCompletion
Should support:
- relationship to child and/or plan item
- completion state
- completed timestamp
- token award relevance if needed

## Modeling guidance

- keep child data minimal
- avoid real-name assumptions
- avoid institutional-school complexity
- avoid designing for dozens of edge-case entities too early
- include timestamps on core records
- keep future auth and planner evolution in mind
- if uncertainty exists, choose the simpler schema that still preserves growth room

## Technical expectations

Builder should:
- work inside `/home/xander/projects/xane-educore/website`
- use Prisma in a standard maintainable way
- prepare for PostgreSQL usage
- add only the minimal config necessary for the foundation ticket
- avoid adding secrets to tracked files
- keep `.env` usage safe and public-repo-friendly

## Expected output

Builder should deliver:
- Prisma setup in the website application
- initial schema file(s)
- any required package/config updates
- migration or migration-ready foundation if appropriate
- a short explanation of schema choices and assumptions

## Review criteria

The work will be considered successful if:
- the website project now has a clean persistence foundation
- core EduCore entities are represented sensibly
- privacy-first child modeling is preserved
- schema is clear and not overbuilt
- foundation supports future work on auth, planner, rewards, and task tracking
- no secrets or unsafe config patterns are introduced

## Notes for Builder

This is a foundation ticket, not a full backend ticket.

Favor:
- simple, extensible schema design
- privacy-first modeling
- readable relations
- minimal config surface
- future usefulness without premature complexity

## Suggested next ticket after completion
Likely next directions:
- auth groundwork
- parent/child account linkage implementation
- planner persistence wiring
- or reward persistence wiring
depending on review results.
