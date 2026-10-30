---
id: req:aai-design-principles
title: "Assured AI programme: design principles"
description: The principles every part of the build follows (section 2). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s006-2-design-principles
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: DP-01
    label: Create once, show many times
    conformance: SHALL
    requirement: Create once, show many times. One issue can appear in several projects. Never clone an issue to report its status somewhere else.
  - key: DP-02
    label: Workstream leads own their delivery
    conformance: SHALL
    requirement: Workstream leads own their delivery. The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories.
  - key: DP-03
    label: Programme work is not sprint work
    conformance: SHALL
    requirement: Programme work is not sprint work. Sprints are managed inside the workstream projects. The programme project tracks dates, milestones, delivery health and readiness, not sprints.
  - key: DP-04
    label: Open by default, and public
    conformance: SHALL
    requirement: Open by default, and public. Everything on GitHub is public. What must not be public (section 6) is not put on GitHub.
  - key: DP-05
    label: Technical integration judgements sit with the Technical Integration Lead
    conformance: SHALL
    requirement: Technical integration judgements sit with the Technical Integration Lead. The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. The PM manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements.
  - key: DP-06
    label: Automation must not make judgements
    conformance: SHALL
    requirement: Automation must not make judgements. Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and flags raised from labels. It never makes readiness, approval, risk-acceptance or decision judgements.
  - key: DP-07
    label: Keep it simple
    conformance: SHALL
    requirement: Keep it simple. Delivery health, risk category, impact and dates only. No probability or impact scoring model.
  - key: DP-08
    label: Prove it small before building it big
    conformance: SHALL
    requirement: Prove it small before building it big. A pilot build (section 12) must pass before any bulk import.
  - key: DP-09
    label: Plain language
    conformance: SHALL
    requirement: Plain language. All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written.
---

# Design principles

The principles every part of the build follows (section 2). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-design-principles#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `DP-01` | SHALL | Create once, show many times. One issue can appear in several projects. Never clone an issue to report its status somewhere else. |
| `DP-02` | SHALL | Workstream leads own their delivery. The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories. |
| `DP-03` | SHALL | Programme work is not sprint work. Sprints are managed inside the workstream projects. The programme project tracks dates, milestones, delivery health and readiness, not sprints. |
| `DP-04` | SHALL | Open by default, and public. Everything on GitHub is public. What must not be public (section 6) is not put on GitHub. |
| `DP-05` | SHALL | Technical integration judgements sit with the Technical Integration Lead. The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. The PM manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements. |
| `DP-06` | SHALL | Automation must not make judgements. Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and flags raised from labels. It never makes readiness, approval, risk-acceptance or decision judgements. |
| `DP-07` | SHALL | Keep it simple. Delivery health, risk category, impact and dates only. No probability or impact scoring model. |
| `DP-08` | SHALL | Prove it small before building it big. A pilot build (section 12) must pass before any bulk import. |
| `DP-09` | SHALL | Plain language. All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written. |
