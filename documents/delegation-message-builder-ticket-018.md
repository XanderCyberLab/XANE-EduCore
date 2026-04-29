# Delegation Message - Builder Ticket 018

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Implement an in-product parent flow for editing child profile details and rotating child login credentials.

This task should build on the new child-creation flow and make child management more complete inside the product, reducing the need for script-based credential changes.

In scope:
- implement parent-facing child profile editing for practical V1 fields
- support updating nickname and age band
- support updating username
- support rotating/resetting child PIN
- keep the flow aligned with the parent/children surface
- preserve calm, simple, family-first parent UX

Out of scope:
- advanced audit history
- multi-admin approval flows
- full account recovery system
- child self-service account management
- reward or planner editing logic
- broader settings architecture

Relevant constraints:
- parent remains the clear controller of child setup and credential management
- child profiles remain nickname-first and privacy-first
- avoid exposing child credentials more than necessary
- setup/editing should feel lightweight and safe, not bureaucratic
- implementation should stay V1-scoped and understandable

Technical expectations:
- build on the existing child profile creation/auth foundations
- use server-side handling for credential/profile updates
- hash/store updated child PIN values appropriately
- preserve username uniqueness behavior unless there is a compelling reason not to
- avoid introducing secrets into tracked files
- preserve public-repo safety
- keep implementation maintainable and readable

Expected output:
- in-product parent child profile editing flow
- in-product child credential rotation/update flow
- persisted update behavior
- parent/children surface updated as needed to support the flow

Please return:
- summary of what was implemented
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- a signed-in parent can edit child profile details in the app
- a signed-in parent can update child username/PIN in the app
- editing flow remains privacy-first and lightweight
- implementation fits the calm parent-control model
- app becomes less dependent on scripts for child management
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-018-parent-managed-child-credential-and-profile-editing.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
