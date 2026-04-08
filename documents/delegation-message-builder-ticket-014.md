# Delegation Message - Builder Ticket 014

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement task completion persistence and token accumulation for EduCore.

This task should make the child daily loop meaningfully interactive by allowing task completion to be stored durably and token progress to update from persisted completion data.

In scope:
- implement persistence for task completion against current plan items
- update token accumulation based on persisted completions
- reflect stored completion state in child task/daily views
- keep reward progress aligned with cumulative token behavior
- maintain calm UX behavior when tasks are completed
- keep the solution disciplined and V1-appropriate

Out of scope:
- AI generation
- full reward redemption workflow
- advanced progress analytics
- planner editing
- badge systems
- animation-heavy feedback systems
- multi-attempt/history beyond the current one-completion-record model unless minimally required

Relevant constraints:
- reward/token behavior should be cumulative across the active reward cycle, not just today's tasks
- completion flow should stay simple and clear for children
- avoid turning the child experience into a noisy gamification loop
- preserve parent-controlled reward meaning
- keep child daily interaction understandable and calm
- maintain privacy-first and family-first assumptions

Technical expectations:
- build on the current Prisma/task completion model
- use persisted TaskCompletion records sensibly
- keep token accumulation logic readable and maintainable
- preserve route/session assumptions already established
- avoid introducing unsafe config or public-repo issues

Expected output:
- functioning task completion persistence
- token accumulation updated from persisted completions
- child daily/task UI reflecting stored completion state
- any necessary supporting server actions or data utilities

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- child task completion now persists meaningfully
- token totals reflect stored cumulative progress
- child daily flow feels more like a real product loop
- implementation remains restrained and understandable
- system is better positioned for later reward configuration and richer progress features
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-014-task-completion-and-token-persistence.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
