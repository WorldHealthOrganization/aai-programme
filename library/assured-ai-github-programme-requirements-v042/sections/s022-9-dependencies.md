---
doc_id: assured-ai-github-programme-requirements-v042
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s022-9-dependencies
section_title: "9. Dependencies"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.2.md"
lines: 319-335
source_sha256: 74634ec34e62b978
granularity: heading
---
## 9. Dependencies

- **DEP-01.** Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves.
- **DEP-02.** A dependency becomes a D-number issue in `aai-programme` if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences.
- **DEP-03.** Each D-number issue links to the waiting epic and to what it waits on. Where that is another epic and the relationship is a true blocking dependency, the agent also creates a native "blocked by" relationship between the two epics. Where the dependency is on a review, an external decision or a shared platform item, no native relationship is created.
- **DEP-04.** The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-programme`.
- **DEP-05.** Do not create extra fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses Workstream (the waiting workstream), Target date (the needed-by date), Delivery health, Risk category, Impact and Assignee. Its issue body follows this template:

  - Waiting workstream
  - Waiting epic
  - Depends on workstream
  - Depends on epic
  - Needed by
  - Consequence if late
  - Next action
  - Owner
