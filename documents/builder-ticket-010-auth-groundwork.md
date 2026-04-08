# Builder Ticket 010 - Auth Groundwork

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Establish the authentication groundwork for EduCore without fully implementing all final auth flows.

This ticket should create the architectural foundation needed for both parent auth and child auth, while staying disciplined and avoiding premature full-feature completion.

## Why this ticket exists
EduCore now has:
- strong mock UX foundations
- child and parent product-shape clarity
- initial persistence foundation

The next logical step is creating the auth foundation that later tickets can build on for:
- parent email/password login
- child username + PIN login
- protected routes
- parent-controlled account access

## Scope

### In scope
- choose and set up the initial auth approach/library if appropriate
- establish auth architecture direction for parent and child flows
- create auth-ready utilities or scaffolding
- prepare session strategy for the app
- define how parent and child auth contexts differ
- add minimal route protection groundwork if useful
- keep implementation focused on foundation, not full final auth completion

### Out of scope
- fully finished parent auth UX
- fully finished child auth UX
- full production security hardening
- final password reset flows
- full account recovery flows
- full permissions/admin systems

## Product constraints

This work must respect EduCore's product direction:
- parent remains primary controller of the system
- child auth must remain simpler than parent auth
- child auth should support username + PIN direction
- privacy-first child identity assumptions must remain intact
- do not overcomplicate V1 auth architecture
- keep future self-hosted deployment in mind
- prefer clarity and maintainability over clever auth complexity

## Technical expectations

Builder should:
- work inside `/home/xander/projects/xane-educore/website`
- integrate with the existing data model foundation where relevant
- avoid introducing secrets into tracked files
- keep `.env.example` safe and public-friendly
- keep auth groundwork modular enough for parent and child divergence

## Expected output

Builder should deliver:
- auth groundwork in the website app
- any package/config updates needed
- clear architectural direction for parent and child auth paths
- minimal implementation necessary to support the next auth tickets
- a short explanation of auth choices and assumptions

## Review criteria

The work will be considered successful if:
- the app has a clear auth foundation to build on
- parent and child auth paths are sensibly distinguished
- implementation is not overbuilt
- future parent auth and child PIN auth tickets are clearly unblocked
- public-repo safety is preserved

## Notes for Builder

This is a groundwork ticket, not a full auth-completion ticket.

Favor:
- simple, understandable auth scaffolding
- compatibility with the current schema direction
- support for later child PIN auth without forcing everything into one parent-style flow
- minimalism over feature sprawl
