# Builder Ticket 011 - Parent Auth Flow Implementation

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement the real parent auth flow on top of the auth groundwork already established.

This ticket should make parent account login function end-to-end in a disciplined V1 way, without yet trying to finish all future account-management features.

## Why this ticket exists
The auth groundwork is now in place.

The next step is to make parent access real so the parent side of EduCore can begin moving from prototype into functioning application behavior.

This should establish:
- parent login flow
- password verification path
- route protection behavior
- parent session behavior
- sign-out capability

## Scope

### In scope
- wire up real parent login against the current auth/data foundation
- ensure password verification flow works through the chosen auth approach
- make protected parent routes behave correctly for logged-in vs logged-out users
- add parent sign-out behavior if not already fully working
- preserve calm, practical parent UX
- keep implementation focused on login/session behavior, not every future account feature

### Out of scope
- registration/signup flow unless minimally required
- password reset flow
- email verification
- account recovery
- full settings/account-management UI
- child auth implementation
- broader permissions/admin systems

## Product constraints

This work must respect EduCore's product direction:
- parent is the primary controller of the system
- parent auth should feel trustworthy and straightforward
- parent auth should be more robust than child auth, but not burdensome
- avoid enterprise-style auth complexity in V1
- preserve self-hosted friendliness
- keep implementation understandable and maintainable

## Technical expectations

Builder should:
- build on the existing auth groundwork rather than replacing it wholesale
- integrate with the current Prisma/auth model direction
- avoid introducing secrets into tracked files
- keep `.env.example` safe and public-friendly
- make the implementation work cleanly for future parent-side protected routes

## Expected output

Builder should deliver:
- functioning parent login flow
- functioning parent session behavior
- working route protection for parent routes
- sign-out support if needed
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- parent login works end to end in a sensible V1 way
- protected parent routes behave correctly
- parent session behavior is clean and understandable
- the implementation builds cleanly on the groundwork ticket
- public-repo safety is preserved

## Notes for Builder

This ticket is about making parent auth real, not making the whole account system feature-complete.

Favor:
- reliability over flourish
- simple, clear login behavior
- maintainable auth flow
- clean product fit with the EduCore parent-control model
