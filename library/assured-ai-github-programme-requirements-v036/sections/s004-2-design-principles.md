---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s004-2-design-principles
section_title: "2. Design principles"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 45-58
source_sha256: a0519ae9be127861
granularity: heading
---
## 2. Design principles

| ID | Principle |
|---|---|
| DP-01 | **Create once, show many times.** One issue can appear in several projects. Never clone an issue to report its status somewhere else. |
| DP-02 | **Workstream leads own their delivery.** The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories. |
| DP-03 | **Programme work is not sprint work.** Sprints are managed inside the workstream projects. Programme projects track dates, milestones and readiness, not sprints. |
| DP-04 | **Sensitivity decides visibility, not where the information came from.** Every piece of information is Partner-visible, WHO internal, or Restricted (section 6). |
| DP-05 | **Exceptions should be easy to find.** Blocked, at-risk, overdue, waiting for review and decision-needed items should each be one click away in PM Control. |
| DP-05a | **Technical integration judgements sit with the Technical Integration Lead.** The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. PM & Architecture Integration manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements. |
| DP-06 | **Automation must not make judgements.** Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and risk flags. It never makes readiness, approval, risk-acceptance or decision judgements. |
| DP-07 | **Prove it small before building it big.** A pilot build (section 12) must pass before any bulk import. |
| DP-08 | **Plain language.** All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written. |
