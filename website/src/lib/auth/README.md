# EduCore auth groundwork

## Direction

- Parent auth is the primary control layer.
- Child auth is intentionally simpler and separate from parent credentials.
- Both roles use signed HTTP-only session cookies, but they do **not** share the same cookie or claim shape.

## Current foundation

- `parent.ts`: email-or-username + password parent sign-in, with email-based parent account creation that assigns a login username automatically
- `child.ts`: username + PIN authentication path
- `session.ts`: signed cookie creation, reading, and clearing
- `guards.ts`: server-side route/data guard helpers for protected work
- `crypto.ts`: secret hashing and verification helpers
- `middleware.ts`: lightweight route gate for `/parent/*` and `/child/*`

## Session model

- Parent cookie: `educore_parent_session`
- Child cookie: `educore_child_session`
- Parent sessions last longer than child sessions
- Prisma models include `sessionVersion` so future logout-all / credential-reset invalidation is straightforward

## V1 assumptions

- Parent sign-in uses normalized email or username + password
- Parent onboarding can create parent accounts in-product with immediate sign-in while still requiring email and auto-assigning a parent username
- Child sign-in uses normalized username + numeric PIN
- Child identity remains nickname-based in the product, with username as a practical login handle
- Final UX, rate limits, password reset, recovery, and stricter production hardening are later tickets
