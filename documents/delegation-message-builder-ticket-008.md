# Delegation Message - Builder Ticket 008

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Target repository:
`/home/xander/projects/xane-educore`

Working application path:
`/home/xander/projects/xane-educore/website`

Task goal:
Clean up the mock child login implementation so the public repository does not normalize explicit sample PIN values in mock data.

This is a small hygiene and repo-safety refinement ticket, not a product redesign.

In scope:
- remove explicit mock PIN values from public-facing mock data
- preserve the current mock login experience as closely as possible
- keep the child login route functioning as a prototype
- update code so the prototype still communicates PIN-style login without storing example PINs directly in mock profile data
- keep the change small and focused

Out of scope:
- real authentication
- new auth architecture
- redesign of the child login flow
- backend changes
- broader refactors unrelated to PIN hygiene

Likely target files:
- `/home/xander/projects/xane-educore/website/src/lib/mock-child.ts`
- `/home/xander/projects/xane-educore/website/src/app/child/login/page.tsx`

Relevant constraints:
- preserve child-friendly login feel
- preserve mock-only prototype behavior
- improve public-facing code hygiene
- avoid implying that real or sample credentials belong in source data

Expected output:
- removal of explicit sample PIN arrays from mock child data
- still-working mock child login prototype

Please return:
- summary of what changed
- files changed
- any assumptions made

Success criteria:
- no explicit example PIN arrays remain in mock child data
- login prototype still feels the same from a reviewer standpoint
- change stays small and focused
- public-repo hygiene improves

Reference docs:
- `/home/xander/projects/xane-educore/documents/builder-ticket-008-pin-hygiene-cleanup.md`
