# X.A.N.E EduCore — Developer Handoff Document

## Project Overview
X.A.N.E EduCore is a family-first, AI-assisted homeschool platform designed for children ages 4–7 and their parents. The system provides structured yet flexible learning paths, interactive activities, printable worksheets, and a reward-based motivation system.

The platform is privacy-first, requiring minimal data (parent email + child nickname) and supports self-hosted deployment on a Proxmox-based homelab.

Primary goal: Build a polished V1 for personal family use within weeks, then expand into a scalable public platform.

---

# Core Objectives
- Provide daily guided learning tasks for children
- Allow parents to monitor progress
- Use AI to generate weekly learning plans
- Offer interactive on-screen activities
- Provide printable PDF worksheets
- Implement token-based reward system
- Maintain privacy-first design
- Support responsive UI (desktop/tablet/mobile)

---

# Target Users
## Parent Users
Responsibilities:
- Create account
- Add children
- View progress
- Configure rewards
- Regenerate weekly plans
- Monitor subject completion

## Child Users
Capabilities:
- Login via username + PIN
- View "Today’s Tasks"
- Explore subject paths
- Complete activities
- Earn tokens
- View rewards

---

# V1 Feature Set
## Authentication
Parent:
- Email + password login

Child:
- Username + PIN login

## Subjects (V1)
- Reading
- Math
- Critical Thinking

## Daily Tasks
- Default: 3 tasks per day
- AI-generated weekly plan
- Parent can regenerate tasks
- Difficulty levels:
  - Easy
  - Medium
  - Challenge

## Reward System
- 1 token per completed task
- Configurable token goal
- Parent-defined reward text
- Token jar UI visible on child screens

## Activities
- Interactive click/tap tasks
- Minimal typing
- Suitable for ages 4–7
- Printable PDF support

## Progress Tracking
Parent can view:
- Tasks completed per subject
- Tokens earned
- Weekly completion

---

# UI / UX Layout

## Landing Page
Routes:
- Parent login
- Child login

## Parent Area (Dark Theme)
Primary route:
- /parent/dashboard

Dashboard includes:
- Child overview cards
- Weekly planner widget
- Progress summary

Secondary routes:
- /parent/children
- /parent/planner
- /parent/rewards

## Child Area (Light Theme)
Primary route:
- /child/home

Child home layout:
1. Welcome header
2. Today’s Tasks (top section)
3. Subject lanes (Reading, Math, Thinking)

Token jar:
- Top-right header
- Visible across child screens

Subject lanes:
- Rounded rectangular task cards
- Horizontal rows (desktop/tablet)
- Vertical stack (mobile)

---

# Navigation Structure

Parent Routes
- /parent/dashboard
- /parent/children
- /parent/planner
- /parent/rewards

Child Routes
- /child/login
- /child/home
- /child/today
- /child/subject/reading
- /child/subject/math
- /child/subject/thinking
- /child/rewards

---

# Visual Design System

Parent UI
- Dark dashboard style
- Cyan accent
- Clean analytics layout

Child UI
- Light playful design
- Strong subject colors:
  - Reading: Blue
  - Math: Green
  - Thinking: Purple
- Large touch targets
- Rounded cards

---

# AI Architecture (3-Layer)

Layer 1 — Weekly Plan Generator
- Generates weekly subject tasks
- Runs Sunday night

Layer 2 — Activity Builder
- Creates activity content
- Generates printable worksheets

Layer 3 — Adaptive Engine (future)
- Adjusts difficulty
- Learns from progress

---

# Database Models (Conceptual)

ParentUser
- id
- email
- passwordHash

ChildProfile
- id
- nickname
- username
- pinHash
- tokenCount
- tokenGoal
- rewardText

WeeklyPlan
- childId
- weekStart

WeeklyPlanItem
- activityTemplateId
- assignedDate
- status

ActivityTemplate
- subject
- difficulty
- printablePath

---

# Tech Stack
Frontend:
- Next.js (App Router)
- TypeScript
- TailwindCSS

Backend:
- Next.js API routes
- Prisma ORM
- PostgreSQL

Deployment:
- Docker Compose
- Nginx reverse proxy
- Proxmox hosting

---

# Deployment Architecture

Services:
- Next.js app container
- PostgreSQL container

Reverse Proxy:
- Nginx routes to app

Storage:
- PostgreSQL volume
- Optional NAS backup

---

# Responsive Behavior

Desktop / Tablet
- Horizontal subject lanes

Mobile
- Vertical stacked layout

Tablet Priority
- Landscape-first

---

# Printable System
- Activities generate PDF
- Downloadable by parent
- Printable offline tasks

---

# Privacy Requirements
- No child real names
- No location data
- Parent email only
- Self-hosted compatible

---

# Future Features (Not V1)
- Avatar system
- Animations
- Drag-drop activities
- Voice interaction
- Coding puzzles
- Multi-family accounts
- Public SaaS version
- Local AI integration (llama3)

---

# V1 Milestone Definition
The initial milestone is complete when:
- Landing page renders
- Parent dashboard renders
- Child home renders
- Tasks display
- Token jar displays
- Subject lanes display

---

# Build Order
1. Project scaffold
2. Route structure
3. Parent dashboard UI
4. Child home UI
5. Mock data
6. Prisma integration
7. Auth
8. Planner
9. Rewards
10. AI generator

---

# End Goal
A scalable AI-powered homeschool platform integrated into the X.A.N.E ecosystem.

Supports:
- Families
- Self-hosting
- Public SaaS expansion
- AI adaptive learning

---

# One Sentence Summary
X.A.N.E EduCore is a privacy-first, AI-powered homeschool platform that generates personalized learning adventures for children while giving parents simple control and progress tracking.

