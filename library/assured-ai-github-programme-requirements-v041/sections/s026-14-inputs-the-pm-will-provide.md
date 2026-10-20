---
doc_id: assured-ai-github-programme-requirements-v041
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s026-14-inputs-the-pm-will-provide
section_title: "14. Inputs the PM will provide"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.1.md"
lines: 389-401
source_sha256: bba5ea9ca2d3cff7
granularity: heading
---
## 14. Inputs the PM will provide

| Input | Used for |
|---|---|
| Epics import CSV, with columns for title, epic code, workstream, start date, target date, Gates outputs, research questions and routes. Each workstream lead reviews their workstream's epics before the bulk import | Epics, and the dates that drive the Roadmap view (V2) |
| Gates outputs list with output months | Milestone issues and Gates output options |
| Research questions R1 to R7, with sub-questions | Research question issues |
| Dependency register D01 to D29 | D-number issues in `aai-programme` |
| Workstream directory details | Directory issue, filled in as leads create their projects |
| GitHub usernames of the Gates Foundation contacts and the Technical Integration Lead | Access (BD-04) and the AUTO-10 setting |

The agent must not invent users, teams, repositories, dates or field values. Where a value is missing, leave it empty and list it in the build report. Before importing the dependency register, the PM removes any restricted content from it (section 6).
