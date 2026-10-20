---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s015-7-1-organisation-issue-fields
section_title: "7.1 Organisation issue fields"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 203-236
source_sha256: 6be31bf530ba67cf
granularity: heading
---
### 7.1 Organisation issue fields

Shared values. Each one is set once on the issue and shows the same value in every project.

| Field | Type | Options or format |
|---|---|---|
| Workstream | Single select | WS1 Knowledge graph, WS2 Authoring, WS3 Evaluation, WS4 Localization, WS5 Governance and stewardship, Platform, Cross-workstream |
| Programme status | Single select | Not started, In progress, In review, Done, Cancelled |
| Delivery health | Single select | On track, At risk, Blocked |
| Risk category | Single select | Dependency, Schedule, Technical, Resource, Review, External, Governance |
| Impact | Single select | Low, Medium, High |
| Pipeline stage | Single select | L1 Corpus, KG Knowledge graph, L2 Operational (DAK), L3 Computable (FHIR/CQL), L5 Health skills + MCP, EVAL Evaluation, LOC Localization, Cross-cutting / N/A |
| Integration readiness | Single select | Not assessed, Not ready, Partly ready, Ready to integrate, Validated |
| Review type | Single select | Not needed, SME sign-off, Validation packet adjudication, Science Division publication clearance |
| Review status | Single select | Not submitted, Submitted, Under WHO review, Feedback issued, Resubmitted, Approved, Closed |
| Gates output | Single select | One option per Gates output from the input list, plus None |
| Primary research question | Single select | R1 to R7, plus None |
| Start date | Date | |
| Target date | Date | For a review item, the date the review is due. For a dependency, the date it is needed by |
| Backlog ref | Text | Epic code, for example WS1-E2 |

That uses up to 14 organisation issue fields. Before creating any of them, the agent must inspect the organisation's existing issue fields, reuse any compatible fields, and confirm that creating the remainder will not exceed the organisation limit or consume unreasonable shared capacity. If headroom is short, the PM decides which fields to drop; the agent does not choose.

Each project has a limit of 50 fields in total, including system fields and issue fields. Workstream leads can add fields to their own projects, so pre-flight and validation must check both limits.

Notes on meaning:

- **Delivery health** describes where the work stands. It is not a WHO judgement of a partner. Risk category and Impact are set only when Delivery health is At risk or Blocked.
- **Next action.** When Delivery health is At risk or Blocked, the issue body carries a short "Next action" line: what will happen, who will do it, and by when. It is kept in the body rather than as a field, to save field capacity.
- **Integration readiness** is a shared technical delivery status, not an internal WHO assurance judgement.
- **Review status** is public, so partners can see where a review stands. Reviewer details, comments and adjudication reasoning are kept off GitHub (section 6).
- **Pipeline stage** describes the end-to-end technical flow. Governance and stewardship are cross-cutting; WS5 work uses `Cross-cutting / N/A` where no pipeline stage applies.
- **Programme status.** Programme views use Programme status, not the built-in Status field. The built-in Status is stored separately in each project, so it will differ between projects. Workstream projects keep the built-in Status for their own boards. Do not automatically mirror a workstream project's built-in Status into Programme status.
