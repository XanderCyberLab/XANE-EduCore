# Delegation Message - Builder Ticket 010

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Establish the authentication groundwork for EduCore without fully implementing all final auth flows.

This task should create the architectural foundation needed for both parent auth and child auth, while staying disciplined and avoiding premature full-feature completion.

In scope:
- choose and set up the initial auth approach/library if appropriate
- establish auth architecture direction for parent and child flows
- create auth-ready utilities or scaffolding
- prepare session strategy for the app
- define how parent and child auth contexts differ
- add minimal route protection groundwork if useful
- keep implementation focused on foundation, not full final auth completion

Out of scope:
- fully finished parent auth UX
- fully finished child auth UX
- full production security hardening
- final password reset flows
- full account recovery flows
- full permissions/admin systems

Relevant constraints:
- parent remains primary controller of the system
- child auth must remain simpler than parent auth
- child auth should support username + PIN direction
- privacy-first child identity assumptions must remain intact
- do not overcomplicate V1 auth architecture
- keep future self-hosted deployment in mind
- prefer clarity and maintainability over clever auth complexity

Technical expectations:
- work inside `/home/xander/projects/xane-educore/website`
- integrate with the existing data model foundation where relevant
- avoid introducing secrets into tracked files
- keep `.env.example` safe and public-friendly
- keep auth groundwork modular enough for parent and child divergence

Expected output:
- auth groundwork in the website app
- any package/config updates needed
- clear architectural direction for parent and child auth paths
- minimal implementation necessary to support the next auth tickets

Please return:
- summary of what was created
- files changed
- auth choices and assumptions
- anything needing project-lead review before the next ticket

Success criteria:
- app has a clear auth foundation to build on
- parent and child auth paths are sensibly distinguished
- implementation is not overbuilt
- future parent auth and child PIN auth tickets are clearly unblocked
- public-repo safety is preserved

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-010-auth-groundwork.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
