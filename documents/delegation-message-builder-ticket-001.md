# Delegation Message - Builder Ticket 001

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Create the initial EduCore website scaffold and route shell for the parent and child experiences.

This task is intentionally limited to structural setup only. Do not implement deep business logic yet.

Required stack:
- Next.js with App Router
- TypeScript
- TailwindCSS

In scope:
- initialize the website app in `/website`
- configure the project to run locally
- establish route shell and folder structure
- create placeholder pages for parent and child routes
- create separate layout foundations for parent and child experiences
- add shared base styling and simple design tokens if useful
- create simple placeholder navigation or headers where appropriate

Out of scope:
- database integration
- Prisma schema
- authentication logic
- session management
- planner logic
- task completion logic
- reward logic
- AI generation
- polished final UI details

Required routes:

General:
- `/`

Parent routes:
- `/parent/login`
- `/parent/dashboard`
- `/parent/children`
- `/parent/planner`
- `/parent/rewards`

Child routes:
- `/child/login`
- `/child/home`
- `/child/today`
- `/child/subject/reading`
- `/child/subject/math`
- `/child/subject/thinking`
- `/child/rewards`

Relevant constraints:
- family-first usefulness over scale-first complexity
- calm, low-stimulation child experience
- parent-controlled structure
- privacy-first mindset
- low text burden for children
- large touch-friendly child UI foundation
- tablet-friendly responsive behavior
- avoid noisy or arcade-like styling

Design guidance:

Parent area:
- clean, practical, readable
- can use darker styling if soft and legible
- should feel like a calm control surface

Child area:
- bright, welcoming, simple
- clear visual hierarchy
- minimal reading burden
- game-like in warmth, calm in execution
- no flashy motion or overstimulation

Expected output:
- a working Next.js app in `/website`
- required route structure in place
- placeholder pages rendering for all required routes
- clear separation between parent and child layout foundations
- clean project structure ready for later feature tickets

Please return:
- a short summary of what was created
- files/folders added
- any assumptions made
- anything needing project-lead review before the next ticket

Success criteria:
- app runs locally
- all required routes render
- structure is easy to extend
- parent and child areas are clearly separated
- child-facing foundation feels calm and tablet-friendly
- no unnecessary backend complexity was added

Reference docs:
- `/home/xander/projects/xane-educore/documents/product-brief.md`
- `/home/xander/projects/xane-educore/documents/v1-implementation-roadmap.md`
- `/home/xander/projects/xane-educore/documents/builder-ticket-001-website-scaffold-and-route-shell.md`
