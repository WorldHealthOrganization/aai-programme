---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s020-8-1-assured-ai-programme-views
section_title: "8.1 Assured AI Programme views"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 268-295
source_sha256: 6be31bf530ba67cf
granularity: heading
---
### 8.1 Assured AI Programme views

Each view lists its layout, which items it shows, how they are grouped and sorted, and the columns to display.

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| V1 | Master programme | Table | Epics | Group by Workstream; sort by Start date | Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress |
| V2 | Roadmap | Roadmap | Epics and milestone issues with dates | Group by Workstream; zoom to quarter | Start date, Target date, Programme status, Delivery health |
| V3 | Milestones | Table | Milestone issues, plus items with any `gates:` label | Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, Delivery health, Target date |
| V4 | Research questions | Table | Research question issues, plus items with any `rq:` label | Group by Primary research question. One saved filter per research question on its `rq:` label | Title, Workstream, Programme status, `rq:` and `route:` labels |
| V5 | Pipeline stages | Board | Epics, plus anything labelled `thin-slice` | Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice` | Title, Workstream, Programme status, Delivery health |
| V6 | Integration readiness | Table | Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed | Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate | Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress |
| V7 | Sprint review | Table | Items labelled `sprint-demo` | Group by Workstream | Title, Workstream, Programme status, linked epic |
| V8 | Next 30 days | Table | Open epics, milestones, dependencies and cross-workstream deliverables with Target date in the next 30 days | Group by Workstream; sort by Target date | Title, Workstream, Programme status, Delivery health, assignee, Target date |
| V9 | Dependencies | Table | Dependency issues | Group by Workstream (the waiting workstream); sort by Target date | Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee |
| V10 | Blocked and at risk | Table | Delivery health At risk or Blocked, or label `blocked`, `at-risk` or `validation-exception` | Group by Delivery health, then Workstream; sort by Impact, then Target date | Title, Workstream, Risk category, Impact, Target date, assignee |
| V11 | WHO review | Board | Items with Review type other than Not needed | Columns by Review status; sort by Target date | Title, Workstream, Review type, Target date |
| V12 | Decisions | Table | Decision issues | Group by open or closed; sort by Target date | Title (starts with DEC-number), Workstream, Programme status, Target date |
| V13 | Overdue | Table | Target date before today and Programme status not Done or Cancelled | Group by Workstream | Title, Target date, Delivery health, assignee |

Notes:

- V6 answers "are we ready to integrate it?", while V5 answers "where is the work?". The "Awaiting validation" filter is the Technical Integration Lead's work queue.
- V7 depends on workstream items labelled `sprint-demo` being added to the project automatically (AUTO-01). After each review the workstream lead removes the label.
- V10 exists so workstreams can act, not just see. Every item in it must carry a "Next action" line in its issue body (section 7.1). The view description tells readers to open the item for it.
- In V11, Science Division items appear only when Review type is Science Division publication clearance.
- V12 makes the DEC issues the decision record from the build onward. Decisions made before the build stay in the PM's existing decision log, and the agent does not import them.
