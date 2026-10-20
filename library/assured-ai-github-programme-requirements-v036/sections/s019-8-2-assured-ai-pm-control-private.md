---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s019-8-2-assured-ai-pm-control-private
section_title: "8.2 Assured AI PM Control (private)"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 250-265
source_sha256: a0519ae9be127861
granularity: heading
---
### 8.2 Assured AI PM Control (private)

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| P1 | Master programme (PM) | Table | Same as V1 | Same as V1 | V1 columns, plus Risk status, Dependency refs, Review status, Decision ref |
| P2 | Programme dependencies | Table | Dependency issues from `aai-pm` | Group by Workstream of the waiting epic; sort by Target date (used as needed-by date) | Title (starts with D-number), Workstream, Target date, Programme status, Risk status, assignee |
| P3 | WHO review queue | Board | Items with Review type other than Not needed | Columns by Review status; sort by Review due | Title, Workstream, Review type, Reviewer, Review due |
| P4 | Blocked and at risk | Table | Risk status At risk or Blocked, or label `blocked` or `at-risk`, plus open Assumption issues flagged at risk, plus open validation exceptions from AUTO-10 | Group by Risk status; sort by Target date | Title, Workstream, Risk note, Dependency refs, Target date |
| P5 | Open decisions | Table | Open Decision issues | Group by Workstream; sort by Target date | DEC-number, title, Workstream, Target date, linked epics |
| P6 | Overdue | Table | Target date before today and Programme status not Done or Cancelled | Group by Workstream | Title, Target date, Risk status, assignee |

Notes:

- In P3, Science Division items appear only when Review type is Science Division publication clearance.
- P5 makes the open DEC issues in `aai-pm` the live list of open decisions. Closed DEC issues form the decision record from the build onward. Decisions made before the build stay in the PM's existing decision log, and the agent does not import them.
