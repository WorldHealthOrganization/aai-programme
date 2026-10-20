---
doc_id: assured-ai-github-programme-requirements-v042
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s010-5-2-hierarchy
section_title: "5.2 Hierarchy"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.2.md"
lines: 155-160
source_sha256: 74634ec34e62b978
granularity: heading
---
### 5.2 Hierarchy

- Sub-issues represent work breakdown only: Epic, then Feature, then Story or Spike.
- Research questions are **not** parents of epics. An item links to research questions through the `rq:` labels, which list every question it contributes to, including its primary one. The Primary research question field records the main question only, for grouping. The research question issue holds the question, its sub-questions, the rationale and any narrative summary. View V4 is the authoritative list of contributing items; nobody keeps a second list by hand.
- Milestone issues are not parents of epics either. Items link to Gates outputs through the `gates:` labels (the complete record) and the Gates output field (the primary output).
