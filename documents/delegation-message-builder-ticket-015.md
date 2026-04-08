# Delegation Message - Builder Ticket 015

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Polish the local setup, migration, and seed/bootstrap workflow so EduCore's new real foundations are easier to stand up and test consistently.

This task should reduce friction around getting a usable local environment running with parent auth, child auth, starter plan data, and reward/task loop foundations.

In scope:
- improve migration application workflow for local development
- polish safe seed/bootstrap workflow for local testing
- make it easier to create a parent, a child, and starter planning data consistently
- improve local-dev instructions where needed
- keep everything public-repo-safe and self-host-friendly

Out of scope:
- production deployment automation
- cloud environment setup
- advanced fixture systems
- full onboarding UI
- large-scale seeding complexity

Relevant constraints:
- local/self-hosted friendliness matters
- setup should stay understandable for a hands-on operator
- seed data should remain safe, fake, and public-repo-friendly
- avoid embedding sensitive defaults
- keep the workflow pragmatic and low-friction

Technical expectations:
- work inside `/home/xander/projects/xane-educore/website`
- keep `.env.example` safe and generic
- use safe local defaults or instructions
- avoid introducing secrets or private infra assumptions
- keep setup steps readable and maintainable

Expected output:
- improved local setup path for applying migrations and generating client
- better seed/bootstrap workflow for parent + child + starter plan data
- any needed scripts or docs updates

Please return:
- summary of what was improved
- files changed
- assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- local setup is easier and clearer
- it is practical to get to a usable test state quickly
- seed/bootstrap flow supports real review of auth, planner, and child loop behavior
- implementation remains safe for a public repository

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-015-setup-and-seed-workflow-polish.md`
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
