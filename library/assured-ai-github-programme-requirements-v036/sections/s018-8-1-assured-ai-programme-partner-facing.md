---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s018-8-1-assured-ai-programme-partner-facing
section_title: "8.1 Assured AI Programme (partner-facing)"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 232-249
source_sha256: a0519ae9be127861
granularity: heading
---
### 8.1 Assured AI Programme (partner-facing)

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| V1 | Master programme | Table | Epics | Group by Workstream; sort by Start date | Title, Programme status, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress |
| V2 | Roadmap | Roadmap | Epics and milestone issues with dates | Group by Workstream; zoom to quarter | Start date, Target date, Programme status |
| V3 | Milestones | Table | Milestone issues, plus items with any `gates:` label | Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, Target date |
| V4 | Research questions | Table | Research question issues, plus items with any `rq:` label | Group by Primary research question. One saved filter per research question on its `rq:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, `rq:` and `route:` labels |
| V5 | Pipeline stages | Board | Epics, plus anything labelled `thin-slice` | Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately rather than as the final sequential stage. Saved filter for `label:thin-slice` | Title, Workstream, Programme status |
| V6 | Integration readiness | Table | Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed | Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate | Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress |
| V7 | Sprint review | Table | Items labelled `sprint-demo` | Group by Workstream | Title, Workstream, Programme status, linked epic |
| V8 | Next 30 days | Table | Open programme epics, milestone issues and selected cross-workstream deliverables with Target date in the next 30 days | Group by Workstream; sort by Target date | Title, Workstream, Programme status, assignee, Target date |

Notes:

- V6 answers "are we ready to integrate it?", while V5 answers "where is the work?". The "Awaiting validation" filter is the Technical Integration Lead's work queue.
- V7 depends on workstream items labelled `sprint-demo` being added to this project automatically (AUTO-01). After each review the label is removed by the workstream lead, not by automation.
