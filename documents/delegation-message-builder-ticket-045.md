# Delegation Message - Builder Ticket 045

Use the following message when delegating to XANE EduCore Builder.

---

You are XANE EduCore Builder.

Project:
- `/home/xander/projects/xane-educore/website`

Goal:
Add an AI provider adapter boundary for planner generation so future AI-assisted planning does not directly couple planner logic to any single model/runtime implementation.

Retrieved context summary:
- EduCore now has planner prep inputs and draft-first planner storage.
- Product direction includes later local/self-hosted AI support.
- Planner logic should not call Ollama or any provider directly.
- The next safe backend step is a provider/service boundary layer before deeper generation workflow work.

Likely files/areas:
- planner/backend service files
- `src/app/parent/planner/actions.ts`
- `src/lib/planner-data.ts`
- likely new service modules for generation interfaces/adapters
- supporting docs/copy only if needed

Constraints:
- Make the smallest safe change.
- Do not rewrite unrelated files.
- Do not add full live provider integration yet unless a minimal stub/mock boundary is needed.
- Preserve current planner and draft behavior.
- Introduce a clean service boundary for later AI generation.
- Update docs as part of completion.

Out of scope:
- full Ollama integration
- production inference orchestration
- autonomous planner writes
- child-facing AI integration

Required process:
Before coding:
1. Inspect relevant files.
2. Confirm files you expect to modify.
3. State implementation plan.

After coding:
1. List files changed.
2. Explain what changed.
3. Explain how to test.
4. List assumptions made.
5. List docs updated.

Reference doc:
- `/home/xander/projects/xane-educore/documents/builder-ticket-045-ai-provider-adapter-boundary.md`
