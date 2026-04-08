# Builder Ticket 015 - Setup and Seed Workflow Polish

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Polish the local setup, migration, and seed/bootstrap workflow so EduCore's new real foundations are easier to stand up and test consistently.

This ticket should reduce friction around getting a usable local environment running with parent auth, child auth, starter plan data, and reward/task loop foundations.

## Why this ticket exists
EduCore now has real foundations for:
- persistence
- parent auth
- child auth
- planner-backed data
- task completion and token accumulation

The next useful step is making it easier to boot and test that system reliably.

## Scope

### In scope
- improve migration application workflow for local development
- polish safe seed/bootstrap workflow for local testing
- make it easier to create a parent, a child, and starter planning data consistently
- improve local-dev instructions where needed
- keep everything public-repo-safe and self-host-friendly

### Out of scope
- production deployment automation
- cloud environment setup
- advanced fixture systems
- full onboarding UI
- large-scale seeding complexity

## Product constraints

This work must respect EduCore's product direction:
- local/self-hosted friendliness matters
- setup should stay understandable for a hands-on operator
- seed data should remain safe, fake, and public-repo-friendly
- avoid embedding sensitive defaults
- keep the workflow pragmatic and low-friction

## Technical expectations

Builder should:
- work inside `/home/xander/projects/xane-educore/website`
- keep `.env.example` safe and generic
- use safe local defaults or instructions
- avoid introducing secrets or private infra assumptions
- keep setup steps readable and maintainable

## Expected output

Builder should deliver:
- improved local setup path for applying migrations and generating client
- better seed/bootstrap workflow for parent + child + starter plan data
- any needed scripts or docs updates
- a short explanation of what was improved and any assumptions made

## Review criteria

The work will be considered successful if:
- local setup is easier and clearer
- it is practical to get to a usable test state quickly
- seed/bootstrap flow supports real review of auth, planner, and child loop behavior
- implementation remains safe for a public repository

## Notes for Builder

This is a workflow-polish ticket, not a major new feature ticket.

Favor:
- operator clarity
- simple scripts
- safe fake data
- reproducible local setup
- minimalism over clever setup automation
