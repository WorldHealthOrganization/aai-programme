---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s021-9-dependencies
section_title: "9. Dependencies"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 276-293
source_sha256: a0519ae9be127861
granularity: heading
---
## 9. Dependencies

- **DEP-01.** Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves. They are visible to partners.
- **DEP-02.** A dependency becomes a D-number issue in `aai-pm` only if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences.
- **DEP-03.** Each D-number issue links to the waiting epic and the epic it waits on. A pilot test (section 12) must confirm that a mention from `aai-pm` does not appear to people without access to `aai-pm`.
- **DEP-04.** The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-pm`. It does not create native relationships for them.

- **DEP-05.** Do not create extra custom fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses the standard fields `Workstream` (the waiting workstream), `Target date` (the needed-by date), `Risk status` and `Assignee`. Its issue body follows this template:

  - Waiting workstream
  - Waiting epic
  - Depends on workstream
  - Depends on epic
  - Needed by
  - Consequence if late
  - Resolution / next action
  - Owner
