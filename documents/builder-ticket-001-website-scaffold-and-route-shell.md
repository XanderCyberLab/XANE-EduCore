# Builder Ticket 001 - Website Scaffold and Route Shell

## Owner
XANE EduCore, project lead

## Implementation agent
XANE EduCore Builder

## Target repository
`/home/xander/projects/xane-educore`

## Working application path
`/home/xander/projects/xane-educore/website`

## Goal
Create the initial EduCore website application scaffold and route shell for the parent and child experiences.

This ticket is intended to establish the foundational app structure only. It should not attempt to implement full business logic, database integration, or AI behavior.

## Why this ticket exists
EduCore needs a clean, calm, extensible UI foundation before deeper feature work begins.

This scaffold should make later implementation easier by:
- separating parent and child experiences clearly
- establishing route structure early
- setting a tablet-friendly design baseline
- preventing rushed or messy feature-first architecture

## Required stack
- Next.js with App Router
- TypeScript
- TailwindCSS

## Scope

### In scope
- initialize the website app in `/website`
- configure the project to run locally
- establish route shell and folder structure
- create placeholder pages for parent and child routes
- create separate layout foundations for parent and child experiences
- add shared base styling and design tokens if useful
- create simple placeholder navigation or headers where appropriate

### Out of scope
- database integration
- Prisma schema
- authentication logic
- session management
- real planner logic
- task completion logic
- reward logic
- AI generation
- polished final UI details

## Required routes

### General
- `/`

### Parent routes
- `/parent/login`
- `/parent/dashboard`
- `/parent/children`
- `/parent/planner`
- `/parent/rewards`

### Child routes
- `/child/login`
- `/child/home`
- `/child/today`
- `/child/subject/reading`
- `/child/subject/math`
- `/child/subject/thinking`
- `/child/rewards`

## Product constraints

This work must respect EduCore's product direction:
- family-first, not scale-first
- calm and low-stimulation child experience
- parent-controlled product structure
- privacy-first mindset
- low text burden for children
- large touch-friendly child UI foundation
- tablet-friendly responsive behavior
- avoid noisy or arcade-like styling

## Design guidance

### Parent experience
- should feel clean, practical, and readable
- can use a darker theme if legible and soft
- should feel like a calm control surface, not a corporate analytics product

### Child experience
- should feel bright, welcoming, and simple
- should use clear visual hierarchy
- should avoid dense text
- should feel game-like in warmth, but calm in execution
- should not rely on flashy motion or overstimulation

## Expected output

The builder should deliver:
- a working Next.js app in `/website`
- route structure matching this ticket
- placeholder pages that render for each route
- a clear split between parent and child layout foundations
- a clean project structure ready for later feature tickets

## Deliverable notes

Please include:
- a brief summary of what was created
- any notable architectural choices
- any assumptions made while scaffolding
- anything that may need product-lead review before Ticket 002

## Review criteria

The work will be considered successful if:
- the website runs locally without obvious setup issues
- all required routes render
- structure is clean and easy to extend
- parent and child areas are clearly separated
- child-facing foundation feels calm and tablet-friendly
- no unnecessary backend or feature complexity was added

## Implementation notes

Prefer a simple, understandable project structure over a heavily abstracted one.

If a design-system foundation is added, keep it light.
This ticket is about clarity and structure, not overengineering.

## Suggested next ticket after completion
Ticket 002 should likely focus on mocked parent dashboard UI or mocked child home UI, depending on which surface gives the best product feedback first.
