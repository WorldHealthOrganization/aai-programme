---
doc_id: assured-ai-github-programme-requirements-v041
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s008-5-1-issue-types
section_title: "5.1 Issue types"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.1.md"
lines: 114-131
source_sha256: bba5ea9ca2d3cff7
granularity: heading
---
### 5.1 Issue types

**Shared organisation rule.** The World Health Organization organisation is shared with other WHO teams. Every organisation issue field and every new issue type created for this project is prefixed `AAI`, for example `AAI Workstream` or `AAI Decision`, so it cannot be confused with or collide with another team's. Existing generic issue types (such as Epic, Feature or Task) may be reused if the owners agree. Fields are pinned only to `AAI` issue types, never to shared generic ones, because pinning shows the field on every team's issues of that type. If the owners do not allow `AAI` issue types, do not pin; set the fields through the project views instead and record this in the build report. The rest of this document uses the short names without the prefix.

These are created at organisation level (BD-05). If the organisation already has issue types with the same meaning, reuse them.

| Issue type | Lives in | Used for |
|---|---|---|
| Epic | `aai-programme` | Programme-level work. One per row in the epics import CSV (section 14) |
| Milestone | `aai-programme` | Gates outputs and internal gates |
| Research question | `aai-programme` | R1 to R7 |
| Dependency | `aai-programme` | Programme-significant dependencies (section 9) |
| Decision | `aai-programme` | Programme decisions, open and closed. The decision and its outcome are shared; deliberation stays in `aai-pm` |
| Assumption | `aai-programme` | Material programme assumptions |
| Feature, Story, Spike | Workstream repositories | Created by workstream teams, as sub-issues of epics |

Issues in `aai-pm` need no issue type.
