---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s003-and-from-v0-4-2-to-v0-5
section_title: "And from v0.4.2 to v0.5"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 27-38
source_sha256: 6be31bf530ba67cf
granularity: heading
---
### And from v0.4.2 to v0.5

The owner, 20 October 2026, on the original request (litlfred/smart-ra#76, moved to litlfred/folio-assistant#2605): **all of it is now public, with no private layer.** This finishes the direction of v0.4 (one shared project, at-risk work visible to everyone) and removes what v0.4.1 kept back.

| # | Change | Sections |
|---|---|---|
| 8 | **No `aai-pm`.** The restricted repository, its access rules and its pilot tests (PIL-03, PIL-04, AUTO-02) are gone | 1, 4, 5.1, 11, 12, 13 |
| 9 | **Every repository and project is public.** SEC-04 now says so instead of forbidding it | 6 |
| 10 | **Sensitive material is never put on GitHub.** The six kinds v0.4.1 restricted stay in WHO's own systems with the PM. An issue may say only that a note exists, in neutral words. *This is the agent's reading of "no private"; the PM & Architecture Integration to confirm* | 6, 7.1 |

**Staging.** Until the owner syncs to the WHO organisation, `litlfred/aai-programme` (renamed from `litlfred/aai-platform` on 20 October 2026) stands in for `aai-programme`. A Platform repository named `aai-platform` is still needed (section 4).
