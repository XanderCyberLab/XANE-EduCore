# Delegation Message - Builder Ticket 011

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement the real parent auth flow on top of the auth groundwork already established.

This task should make parent account login function end-to-end in a disciplined V1 way, without yet trying to finish all future account-management features.

In scope:
- wire up real parent login against the current auth/data foundation
- ensure password verification flow works through the chosen auth approach
- make protected parent routes behave correctly for logged-in vs logged-out users
- add parent sign-out behavior if not already fully working
- preserve calm, practical parent UX
- keep implementation focused on login/session behavior, not every future account feature

Out of scope:
- registration/signup flow unless minimally required
- password reset flow
- email verification
- account recovery
- full settings/account-management UI
- child auth implementation
- broader permissions/admin systems

Relevant constraints:
- parent is the primary controller of the system
- parent auth should feel trustworthy and straightforward
- parent auth should be more robust than child auth, but not burdensome
- avoid enterprise-style auth complexity in V1
- preserve self-hosted friendliness
- keep implementation understandable and maintainable

Technical expectations:
- build on the existing auth groundwork rather than replacing it wholesale
- integrate with the current Prisma/auth model direction
- avoid introducing secrets into tracked files
- keep `.env.example` safe and public-friendly
- make the implementation work cleanly for future parent-side protected routes

Expected output:
- functioning parent login flow
- functioning parent session behavior
- working route protection for parent routes
- sign-out support if needed

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- parent login works end to end in a sensible V1 way
- protected parent routes behave correctly
- parent session behavior is clean and understandable
- implementation builds cleanly on the groundwork ticket
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-011-parent-auth-flow-implementation.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
