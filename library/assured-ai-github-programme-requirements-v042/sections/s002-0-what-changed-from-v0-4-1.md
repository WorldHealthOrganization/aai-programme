---
doc_id: assured-ai-github-programme-requirements-v042
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s002-0-what-changed-from-v0-4-1
section_title: "0. What changed from v0.4.1"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.2.md"
lines: 13-28
source_sha256: 74634ec34e62b978
granularity: heading
---
## 0. What changed from v0.4.1

From the PM & Architecture Integration's decisions of 20 October 2026 on [litlfred/folio-assistant#2605](https://github.com/litlfred/folio-assistant/issues/2605#issuecomment-6291128158):

| # | Change | Sections |
|---|---|---|
| 1 | **WS5 has no repository or project of its own.** WS5 Governance and stewardship is led by the PM & Architecture Integration and managed in the programme project. WS5 features and tasks live in `aai-programme` | 1, 1.1, 4, 5.1 |
| 2 | **New `aai-platform` repository** for Platform: a cross-cutting technical delivery function supporting WS1 to WS5, not a sixth research workstream. Same rules as the workstream repositories. Lead to be confirmed | 1.1, 4, 17 |
| 3 | **AUTO-01 adds `aai-programme` issues by issue type only** (Epic, Milestone, Research question, Dependency, Decision, Assumption), so routine WS5 tasks stay off the shared board but still roll up into their epics | 11, LINK-05 |
| 4 | **The pilot uses representative Assured AI items**, marked as pilot, with no artificial dependencies. Project 110 items are not moved for the pilot; they are reviewed with Ritika after it passes | 12 |
| 5 | **Project 110 stays separate.** Its views and iteration setup may be reused for the workstream template, without changing 110 | 8.3, 17 |
| 6 | The Technical Integration Lead role is held by the WHO WS1 lead; the authority comes from the role | 1.1 |
| 7 | **`aai-programme` is public**, by owner decision, as an exception to SEC-04. To be accepted by the PM & Architecture Integration | 6 |

**Staging.** Until the owner syncs to the WHO organisation, `litlfred/aai-programme` (renamed from `litlfred/aai-platform` on 20 October 2026) stands in for `aai-programme`. A Platform repository named `aai-platform` is still needed (section 4).
