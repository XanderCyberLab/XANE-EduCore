# X.A.N.E EduCore

X.A.N.E EduCore is a family-first, privacy-first, AI-powered homeschool platform designed to help parents guide calm, joyful daily learning for young children.

EduCore is being built first for real family use, with a strong focus on:
- calm daily learning flows
- parent-controlled planning
- privacy-first child profiles
- tablet-friendly child UX
- AI-assisted weekly planning and activity generation
- long-term local/self-hosted AI support

## Current state

This repository currently contains:
- product planning and roadmap documents
- a Next.js website scaffold
- mocked parent and child experience flows
- early UX foundations for:
  - child home and daily tasks
  - parent dashboard
  - parent planner
  - child profile management

The project is still in an early shaping phase. Current UI and data are mock-only unless explicitly documented otherwise.

## Repository structure

- `documents/` - product docs, roadmap docs, implementation tickets, and project planning materials
- `website/` - the EduCore website application

## Local development

From the website directory:

```bash
cd website
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Public repository safety

This repository is intended to stay safe for public development.

Do not commit:
- secrets or API keys
- `.env` files
- internal IPs, domains, or hostnames
- real child data
- real usernames or PINs
- private deployment configuration
- homelab-specific sensitive details

Use mock/sample data only unless and until a clearly safe public approach is defined.

See:
- `documents/public-repo-safety-checklist.md`

## Vision summary

EduCore is not meant to become a generic LMS.
It is meant to become a calm, caring, AI-forward homeschool companion that supports both parent guidance and child learning in a real family rhythm.
