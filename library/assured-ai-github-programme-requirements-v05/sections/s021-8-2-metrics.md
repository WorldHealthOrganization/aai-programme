---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s021-8-2-metrics
section_title: "8.2 Metrics"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 296-308
source_sha256: 6be31bf530ba67cf
granularity: heading
---
### 8.2 Metrics

Use the project's built-in Insights charts for these. Where a chart cannot be built natively, record that in the build report rather than building a workaround, except for M6.

| ID | Measure | Built from |
|---|---|---|
| M1 | Share of epics On track, At risk and Blocked | Delivery health, epics only |
| M2 | Blocked items by workstream | Delivery health = Blocked, grouped by Workstream |
| M3 | At-risk or blocked dependencies | Dependency issues with Delivery health At risk or Blocked |
| M4 | Overdue deliverables | Same filter as V13 |
| M5 | Integration readiness by pipeline stage | Integration readiness, grouped by Pipeline stage |
| M6 | Average age of blocked items (optional) | A script (AUTO-12) reads the issue timeline to find when Delivery health became Blocked |
