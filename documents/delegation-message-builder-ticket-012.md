# Delegation Message - Builder Ticket 012

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement the real child auth flow on top of the auth groundwork already established.

This task should make child login function in a disciplined V1 way using the username + PIN direction already chosen, while preserving the calm, low-friction child experience shaped in the earlier mock work.

In scope:
- wire up real child login against the current auth/data foundation
- implement real username + PIN verification behavior
- make protected child routes behave correctly for logged-in vs logged-out children
- preserve the child-friendly login feel as much as practical
- keep the implementation disciplined and V1-appropriate

Out of scope:
- parent auth work
- parent onboarding flow
- full child account-management UI
- advanced login recovery flows
- multi-step security challenges
- deeper account linking flows beyond what is needed for V1 child login

Relevant constraints:
- child auth must remain simpler than parent auth
- username + PIN remains the chosen direction for V1
- nickname stays the visible child identity, even if username is used under the hood
- child login must stay low-text and touch-friendly
- implementation must not turn the child login flow into a generic web form
- preserve privacy-first assumptions and parent-controlled setup
- keep the solution understandable and maintainable

Technical expectations:
- build on the existing auth groundwork rather than replacing it
- integrate with the current Prisma/auth model direction
- preserve the child session separation from parent sessions
- use the existing child auth/session architecture cleanly
- avoid introducing secrets into tracked files
- keep public-repo safety intact

Expected output:
- functioning child login flow using username + PIN
- functioning child session behavior
- working route protection for child routes

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- child login works end to end in a sensible V1 way
- child-protected routes behave correctly
- child login still feels aligned with the calm child UX direction
- implementation builds cleanly on the groundwork ticket
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-012-child-auth-flow-implementation.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
