---
doc_id: assured-ai-github-programme-requirements-v041
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s004-2-design-principles
section_title: "2. Design principles"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.1.md"
lines: 48-61
source_sha256: bba5ea9ca2d3cff7
granularity: heading
---
## 2. Design principles

| ID | Principle |
|---|---|
| DP-01 | **Create once, show many times.** One issue can appear in several projects. Never clone an issue to report its status somewhere else. |
| DP-02 | **Workstream leads own their delivery.** The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories. |
| DP-03 | **Programme work is not sprint work.** Sprints are managed inside the workstream projects. The programme project tracks dates, milestones, delivery health and readiness, not sprints. |
| DP-04 | **Open by default, restricted by exception.** Anything that could affect another workstream's sequencing, dependencies or delivery plans is shared. Only the material listed in section 6 is restricted. |
| DP-05 | **Technical integration judgements sit with the Technical Integration Lead.** The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. The PM manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements. |
| DP-06 | **Automation must not make judgements.** Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and flags raised from labels. It never makes readiness, approval, risk-acceptance or decision judgements. |
| DP-07 | **Keep it simple.** Delivery health, risk category, impact and dates only. No probability or impact scoring model. |
| DP-08 | **Prove it small before building it big.** A pilot build (section 12) must pass before any bulk import. |
| DP-09 | **Plain language.** All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written. |
