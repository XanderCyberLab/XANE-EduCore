# Builder Ticket 017 - Parent-Created Child Profile Setup

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement an in-product parent flow for creating child profiles.

This ticket should move EduCore away from relying primarily on scripts for child setup and toward a real parent-managed child creation flow inside the product.

## Why this ticket exists
EduCore now has:
- real parent auth
- real child auth
- real planner/task persistence
- parent and child surfaces increasingly connected to persisted data

The next important step is enabling parents to create child profiles through the product itself.

That will reduce setup friction and make the system feel much more like a usable family tool.

## Scope

### In scope
- implement a parent-facing child creation flow in-product
- allow parent to create a child profile with privacy-first fields
- support child login essentials such as username and PIN setup
- keep the flow aligned with the existing parent/children surface where practical
- preserve calm, simple, family-first parent UX

### Out of scope
- advanced child editing workflows
- full onboarding wizard complexity
- multi-step credential recovery
- reward redemption logic
- planner generation logic
- heavy settings architecture

## Product constraints

This work must respect EduCore's product direction:
- child profiles remain nickname-first and privacy-first
- avoid collecting unnecessary child information
- parent remains the clear controller of child setup
- setup should feel lightweight and safe, not bureaucratic
- child login details should be practical but not overexposed
- implementation should stay V1-scoped and understandable

## Technical expectations

Builder should:
- build on the existing Prisma/auth foundations
- create a sensible server action or equivalent flow for child creation
- hash/store child PIN data appropriately within the current auth model
- avoid introducing secrets into tracked files
- preserve public-repo safety
- keep implementation maintainable and readable

## Expected output

Builder should deliver:
- in-product parent child-creation flow
- persisted child creation behavior
- practical handling of username + PIN setup
- parent/children surface updated as needed to support the flow
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- a signed-in parent can create a child profile inside the app
- child setup remains privacy-first and lightweight
- username + PIN setup is practical for V1
- implementation fits the calm parent-control model
- the app feels more complete and less script-dependent
- public-repo safety is preserved

## Notes for Builder

This is a real product capability ticket, but still V1-scoped.

Favor:
- simple and trustworthy setup flow
- privacy-first field selection
- calm parent UX
- maintainable server-side handling
- minimalism over onboarding sprawl
