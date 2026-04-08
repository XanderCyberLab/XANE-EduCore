# Delegation Message - Builder Ticket 009

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Establish the first real data model and persistence foundation for EduCore.

This task should introduce the backend data-layer groundwork needed for V1 without attempting to implement the entire product. The result should create a durable base for future auth, planning, rewards, and task-tracking work.

In scope:
- add Prisma to the website application if not already present
- establish initial Prisma configuration
- scaffold PostgreSQL-oriented persistence setup
- create an initial schema for core EduCore entities
- create initial migration(s) if appropriate for the environment
- keep implementation focused on data-layer setup, not feature completion
- document assumptions briefly if needed

Out of scope:
- full auth implementation
- full planner implementation
- AI generation logic
- real task completion UX
- route protection
- full CRUD flows
- production deployment setup beyond what is minimally needed for local development foundation

Relevant constraints:
- child identity should remain nickname-first and privacy-conscious
- do not model unnecessary child personal data
- preserve parent-controlled system assumptions
- keep the schema extensible without overbuilding for speculative scale
- support self-hosted and local-first direction
- favor clarity and maintainability over clever abstraction

Required schema direction:
- ParentUser
- ChildProfile
- RewardPlan or RewardSettings
- WeeklyPlan
- WeeklyPlanItem
- TaskCompletion

Modeling guidance:
- keep child data minimal
- avoid real-name assumptions
- avoid institutional-school complexity
- avoid designing for too many edge-case entities too early
- include timestamps on core records
- keep future auth and planner evolution in mind
- if uncertain, choose the simpler schema that still preserves growth room

Technical expectations:
- work inside `/home/xander/projects/xane-educore/website`
- use Prisma in a standard maintainable way
- prepare for PostgreSQL usage
- add only minimal config necessary for this foundation ticket
- avoid adding secrets to tracked files
- keep `.env` usage safe and public-repo-friendly

Expected output:
- Prisma setup in the website application
- initial schema file(s)
- any required package/config updates
- migration or migration-ready foundation if appropriate

Please return:
- summary of what was created
- files changed
- schema choices and assumptions
- anything needing project-lead review before the next ticket

Success criteria:
- website project has a clean persistence foundation
- core EduCore entities are represented sensibly
- privacy-first child modeling is preserved
- schema is clear and not overbuilt
- foundation supports future work on auth, planner, rewards, and task tracking
- no secrets or unsafe config patterns are introduced

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-009-data-model-and-persistence-foundation.md`
