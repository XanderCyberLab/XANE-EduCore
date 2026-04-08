# X.A.N.E EduCore - V1 Implementation Roadmap

## Purpose

This roadmap turns the current EduCore product direction into a practical execution sequence for implementation work.

It is intentionally scoped for a family-first V1. The goal is to build a usable homeschool product for Xander's family before expanding toward broader platform ambitions.

## Delivery strategy

Build EduCore in narrow, testable chunks.

Do not begin with full AI complexity.
Start by proving the core parent-child learning loop works with a calm, reliable interface.
Then add planning, printable support, and lightweight AI assistance in layers.

## V1 target outcome

A parent can create a child profile, configure a reward, and review learning progress.
A child can log in, see today's tasks, complete them, earn tokens, and understand their progress.
The product should feel simple, calm, visual, and useful in a real homeschool routine.

## Recommended implementation phases

### Phase 0 - Foundation and alignment
Goal: remove ambiguity before substantial coding begins.

Deliverables:
- product brief
- roadmap
- repo structure
- design guardrails
- scoped implementation tickets

Exit criteria:
- product shape is clear enough to delegate build work confidently

---

### Phase 1 - Application scaffold and route shell
Goal: create the structural skeleton of the app.

Scope:
- initialize website project in `/home/xander/projects/xane-educore/website`
- configure Next.js, TypeScript, TailwindCSS
- establish app routing structure
- create placeholder parent and child layouts
- set up shared design tokens, color mapping, and basic component primitives

Suggested routes:
- `/`
- `/parent/login`
- `/parent/dashboard`
- `/parent/children`
- `/parent/planner`
- `/parent/rewards`
- `/child/login`
- `/child/home`
- `/child/today`
- `/child/subject/reading`
- `/child/subject/math`
- `/child/subject/thinking`
- `/child/rewards`

Exit criteria:
- route shell exists
- parent and child layouts render
- app can be run locally

---

### Phase 2 - Mocked V1 UX prototype
Goal: prove the experience before backend complexity.

Scope:
- build parent dashboard UI with mock data
- build child home UI with mock data
- implement subject lanes
- implement today's task cards
- implement token jar visual
- create a calm responsive layout with tablet-first behavior

Important constraints:
- minimal animation
- large touch targets
- low text burden
- no noisy gamification

Exit criteria:
- parent and child UI flows are demoable with mock data
- child home clearly supports the 3-task daily pattern
- basic UX can be reviewed against product principles

---

### Phase 3 - Core data model and persistence
Goal: establish the real product foundation.

Scope:
- set up PostgreSQL + Prisma
- define core models
- migrate from mock data to persisted development data

Minimum model set:
- ParentUser
- ChildProfile
- WeeklyPlan
- WeeklyPlanItem
- TaskCompletion
- RewardSettings or equivalent

Notes:
- keep child identity nickname-based
- hash passwords and PINs properly
- avoid collecting unnecessary child data

Exit criteria:
- app reads and writes core family data successfully
- schema supports the V1 task loop without major gaps

---

### Phase 4 - Authentication and child access flow
Goal: make the system usable by real parent and child accounts.

Scope:
- parent email + password auth
- child username + PIN auth
- session handling
- route protection
- sign-in and sign-out flows

Important constraints:
- child login must be fast and simple
- parent flow must feel trustworthy and straightforward
- auth design must not add unnecessary friction for family use

Exit criteria:
- parent can sign in
- child can sign in separately
- correct dashboards load per role

---

### Phase 5 - Core family learning loop
Goal: make EduCore genuinely useful day to day.

Scope:
- create and manage child profiles
- define token goals and reward text
- display weekly plan
- show today's 3 tasks
- complete tasks
- update tokens and progress
- show parent progress summaries by subject

This is the true V1 core.

Exit criteria:
- parent can set up child + reward
- child can complete today's tasks
- token jar updates reliably
- parent can review progress meaningfully

---

### Phase 6 - Printable support and planner controls
Goal: support real homeschool workflows beyond the screen.

Scope:
- printable activity export for selected task types
- parent-accessible printable download flow
- planner refresh/regenerate controls
- support manual completion for offline activities if needed

Important constraints:
- printable flow should be practical, not overengineered
- parents should stay in control of regenerated content

Exit criteria:
- at least one printable activity type works end to end
- planner controls exist at a simple but useful level

---

### Phase 7 - Lightweight AI planning layer
Goal: add AI where it clearly improves usefulness.

Scope:
- generate weekly plans from a constrained subject/task framework
- keep prompts/rules controlled and reviewable
- avoid uncontrolled or overly open-ended content generation
- preserve a future path toward limited child-safe AI interaction
- preserve a future path toward self-hosted local model usage

Recommended approach:
- start with a template-backed generator
- generate structured weekly output
- defer deep adaptation until real usage feedback exists
- keep interfaces modular enough to support models hosted on Xander's own hardware later

Exit criteria:
- weekly plan generation produces useful, reviewable output
- generated plans fit the calm V1 experience
- architecture does not block later local-model integration or parent-bounded child AI access

---

### Phase 8 - Family testing and iteration
Goal: validate against real usage.

Scope:
- test with Xander's family routine
- identify friction points in parent setup, child comprehension, and task completion
- refine pacing, UI clarity, rewards, and planner behavior

Exit criteria:
- product is stable enough for repeat real-world use
- next-phase priorities come from real family feedback rather than guesswork

## Builder delegation strategy

Implementation work should be handed to XANE EduCore Builder in scoped chunks, not as one large vague request.

### Recommended delegation chunks

1. scaffold and route shell
2. parent dashboard mock UI
3. child dashboard mock UI
4. Prisma schema and persistence layer
5. auth flows
6. task completion and token logic
7. planner and printable support
8. first AI planning pass

Each delegation should define:
- target repository: `/home/xander/projects/xane-educore`
- working app path: `/home/xander/projects/xane-educore/website`
- exact feature goal
- product constraints
- expected output
- review criteria

## Product constraints for all implementation work

Every build task should respect these constraints:
- family-first usefulness over scale-first architecture
- calm, low-stimulation child experience
- parent-controlled flows
- privacy-first data choices
- minimal typing for children
- tablet-friendly responsive design
- avoid feature bloat in V1
- preserve a strong AI-forward future path even when current implementation is mocked or limited
- support a subtle futuristic visual identity without drifting into noisy overstimulation

## Recommended first implementation ticket

### Ticket 1 - Website scaffold and route shell

Target repository:
`/home/xander/projects/xane-educore`

Goal:
Create the initial Next.js website application in `/website` with route skeletons for parent and child experiences.

Constraints:
- use Next.js App Router
- use TypeScript and TailwindCSS
- create route placeholders only, no deep business logic yet
- establish calm design foundation with clear separation between parent and child layouts
- keep the child layout visually simple and tablet-friendly

Expected output:
- working app scaffold
- route structure in place
- placeholder pages rendering
- shared layout foundation ready for UI implementation

Review criteria:
- project runs locally
- routes match roadmap expectations
- structure is clean and ready for feature work
- child-facing UI foundation is not overly busy

## Definition of done for V1

EduCore V1 is done when:
- parent account flow works
- child profile setup works
- child username + PIN login works
- daily tasks display reliably
- task completion updates tokens and progress
- parent can monitor progress by subject
- printable support exists in a useful form
- weekly planning exists at least in a simple controlled form
- the product feels calm, clear, and practical for real family use

## What should wait until after V1

- avatar progression systems
- advanced animations
- deep adaptive AI
- voice-first interaction
- coding puzzle curriculum
- broad multi-family SaaS concerns
- heavy public platform infrastructure

## Closing guidance

The main risk is not lack of features. The main risk is losing the product's shape.

Protect the simple daily loop:
- parent sets up the learning context
- child sees today's work clearly
- child completes a few meaningful tasks
- progress and rewards update simply
- parent stays informed and in control

If this loop works well, EduCore has a strong foundation.
