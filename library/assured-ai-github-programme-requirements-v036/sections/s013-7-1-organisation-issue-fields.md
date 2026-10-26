---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s013-7-1-organisation-issue-fields
section_title: "7.1 Organisation issue fields"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 163-190
source_sha256: a0519ae9be127861
granularity: heading
---
### 7.1 Organisation issue fields

Shared values. Each one is set once on the issue and shows the same value in every project. All are Partner-visible.

| Field | Type | Options or format |
|---|---|---|
| Workstream | Single select | WS1 Knowledge graph, WS2 Authoring, WS3 Evaluation, WS4 Localization, WS5 Governance and stewardship, Platform, Cross-workstream |
| Programme status | Single select | Not started, In progress, In review, Done, Cancelled |
| Pipeline stage | Single select | L1 Corpus, KG Knowledge graph, L2 Operational (DAK), L3 Computable (FHIR/CQL), L5 Health skills + MCP, EVAL Evaluation, LOC Localization, Cross-cutting / N/A |
| Integration readiness | Single select | Not assessed, Not ready, Partly ready, Ready to integrate, Validated |
| Gates output | Single select | One option per Gates output from the input list, plus None |
| Primary research question | Single select | R1 to R7, plus None |
| Start date | Date | |
| Target date | Date | |
| Backlog ref | Text | Epic code, for example WS1-E2 |

That uses up to 9 organisation issue fields. Before creating any of them, the agent must inspect the organisation's existing issue fields, reuse any compatible fields, and confirm that creating the remainder will not exceed the organisation limit or consume unreasonable shared capacity.

Each project has a limit of 50 fields in total, including system fields and issue fields. Workstream leads can add fields to their own projects, so pre-flight and validation must check both limits: organisation issue-field headroom and the total field count of each project.

Integration readiness is a shared technical delivery status, not an internal WHO assurance judgement. It is partner-visible by design. A value such as Not ready describes where the work stands; it is not a WHO assessment of a partner.

`Pipeline stage` describes the end-to-end technical flow. Governance and stewardship are cross-cutting rather than a final sequential pipeline stage; WS5 work is represented primarily through the `Workstream` field and uses `Cross-cutting / N/A` where no pipeline stage applies.

Programme views must use **Programme status**, not the built-in Status field. The built-in Status is stored separately in each project, so it will differ between projects. Workstream projects keep the built-in Status for their own boards.

When a programme epic, milestone or research-question issue is created, set `Programme status` to `Not started` unless the import explicitly supplies another valid value. Do not automatically mirror a workstream project's built-in Status into Programme status.
