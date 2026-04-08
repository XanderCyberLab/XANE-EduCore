# Delegation Message - Builder Ticket 013

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Wire the planner experience to real persisted weekly plan data.

This task should move EduCore further from mocked planning surfaces into real planner-backed behavior by connecting the planner and child daily views to stored weekly plans and plan items.

In scope:
- connect planner-related pages to real persisted weekly plan data
- load weekly plans and weekly plan items from Prisma-backed data
- make parent planner surfaces reflect stored plans where appropriate
- make child daily/task surfaces reflect stored plan items more consistently
- preserve calm empty states when no plan exists yet
- keep implementation focused on data wiring, not full planner editing or generation

Out of scope:
- AI plan generation
- full planner CRUD UI
- planner editing UX
- task completion persistence logic beyond what is already needed for display
- reward accumulation logic implementation
- printable generation implementation

Relevant constraints:
- planner should remain calm and family-first
- weekly plans should support readable parent oversight and child clarity
- do not turn the planner into a heavy scheduling system
- preserve printable/offline task visibility where possible
- keep child daily flow simple and understandable
- maintain privacy-first and parent-controlled system assumptions

Technical expectations:
- build on the current Prisma schema and auth foundation
- use the existing weekly plan models sensibly
- keep data-loading logic readable and maintainable
- avoid overengineering planner infrastructure at this stage
- preserve public-repo safety

Expected output:
- planner and child daily/task views wired to persisted weekly plan data
- sensible empty-state behavior when no plans exist
- any necessary supporting query or data-mapping utilities

Please return:
- summary of what was wired
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- stored weekly plans now drive planner and/or child task views meaningfully
- parent and child surfaces feel more connected through real data
- implementation remains restrained and understandable
- system is better positioned for later task completion and token accumulation work
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-013-planner-persistence-wiring.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
