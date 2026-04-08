# Delegation Message - Builder Ticket 017

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement an in-product parent flow for creating child profiles.

This task should move EduCore away from relying primarily on scripts for child setup and toward a real parent-managed child creation flow inside the product.

In scope:
- implement a parent-facing child creation flow in-product
- allow parent to create a child profile with privacy-first fields
- support child login essentials such as username and PIN setup
- keep the flow aligned with the existing parent/children surface where practical
- preserve calm, simple, family-first parent UX

Out of scope:
- advanced child editing workflows
- full onboarding wizard complexity
- multi-step credential recovery
- reward redemption logic
- planner generation logic
- heavy settings architecture

Relevant constraints:
- child profiles remain nickname-first and privacy-first
- avoid collecting unnecessary child information
- parent remains the clear controller of child setup
- setup should feel lightweight and safe, not bureaucratic
- child login details should be practical but not overexposed
- implementation should stay V1-scoped and understandable

Technical expectations:
- build on the existing Prisma/auth foundations
- create a sensible server action or equivalent flow for child creation
- hash/store child PIN data appropriately within the current auth model
- avoid introducing secrets into tracked files
- preserve public-repo safety
- keep implementation maintainable and readable

Expected output:
- in-product parent child-creation flow
- persisted child creation behavior
- practical handling of username + PIN setup
- parent/children surface updated as needed to support the flow

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- a signed-in parent can create a child profile inside the app
- child setup remains privacy-first and lightweight
- username + PIN setup is practical for V1
- implementation fits the calm parent-control model
- app feels more complete and less script-dependent
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-017-parent-created-child-profile-setup.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
