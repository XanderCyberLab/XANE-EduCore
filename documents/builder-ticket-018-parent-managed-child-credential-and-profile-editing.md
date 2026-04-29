# Builder Ticket 018 - Parent-Managed Child Credential and Profile Editing

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Implement an in-product parent flow for editing child profile details and rotating child login credentials.

This ticket should build on the new child-creation flow and make child management more complete inside the product, reducing the need for script-based credential changes.

## Why this ticket exists
EduCore now supports in-product parent creation of child profiles.

The next natural step is giving parents a practical way to:
- adjust nickname or age band
- update username if needed
- rotate/reset a child PIN
- manage those changes in a calm, privacy-first, parent-controlled way

## Scope

### In scope
- implement parent-facing child profile editing for practical V1 fields
- support updating nickname and age band
- support updating username
- support rotating/resetting child PIN
- keep the flow aligned with the parent/children surface
- preserve calm, simple, family-first parent UX

### Out of scope
- advanced audit history
- multi-admin approval flows
- full account recovery system
- child self-service account management
- reward or planner editing logic
- broader settings architecture

## Product constraints

This work must respect EduCore's product direction:
- parent remains the clear controller of child setup and credential management
- child profiles remain nickname-first and privacy-first
- avoid exposing child credentials more than necessary
- setup/editing should feel lightweight and safe, not bureaucratic
- implementation should stay V1-scoped and understandable

## Technical expectations

Builder should:
- build on the existing child profile creation/auth foundations
- use server-side handling for credential/profile updates
- hash/store updated child PIN values appropriately
- preserve username uniqueness behavior unless there is a compelling reason not to
- avoid introducing secrets into tracked files
- preserve public-repo safety
- keep implementation maintainable and readable

## Expected output

Builder should deliver:
- in-product parent child profile editing flow
- in-product child credential rotation/update flow
- persisted update behavior
- parent/children surface updated as needed to support the flow
- a short explanation of what was implemented and any assumptions made

## Review criteria

The work will be considered successful if:
- a signed-in parent can edit child profile details in the app
- a signed-in parent can update child username/PIN in the app
- editing flow remains privacy-first and lightweight
- implementation fits the calm parent-control model
- the app becomes less dependent on scripts for child management
- public-repo safety is preserved

## Notes for Builder

This is a real product capability ticket, but it should remain V1-scoped.

Favor:
- simple and trustworthy editing flow
- privacy-first handling of credential changes
- calm parent UX
- maintainable server-side update logic
- minimalism over settings sprawl
