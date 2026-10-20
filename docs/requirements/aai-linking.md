---
id: req:aai-linking
title: "Assured AI programme: linking to workstream projects"
description: How the programme project and the workstream projects link (section 10). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s024-10-linking-to-workstream-projects
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: LINK-01
    label: Create a pinned issue in `aai-programme` titled "Workstream…
    conformance: SHALL
    requirement: Create a pinned issue in `aai-programme` titled "Workstream directory". For each workstream it lists the lead, the repository and the project URL. Leave entries blank until leads supply them.
  - key: LINK-02
    label: The programme project README links to the directory…
    conformance: SHALL
    requirement: The programme project README links to the directory issue and to the Roadmap view (V2). Do not add a separate static roadmap or Gantt chart to the README; V2 is the roadmap, kept current from the epic dates.
  - key: LINK-03
    label: The template README tells leads to link back…
    conformance: SHALL
    requirement: The template README tells leads to link back to Assured AI Programme.
  - key: LINK-04
    label: Workstream features and stories are sub-issues of the…
    conformance: SHALL
    requirement: Workstream features and stories are sub-issues of the relevant epic, so sub-issue progress shows in V1. The pilot must confirm that sub-issues from another repository roll up correctly.
  - key: LINK-05
    label: A workstream item, including a WS5 feature or…
    conformance: SHALL
    requirement: A workstream item, including a WS5 feature or task in `aai-programme`, enters the programme project only if it is labelled `thin-slice` or `sprint-demo`, has Delivery health At risk or Blocked, or is a cross-workstream deliverable. Anything else stays in its workstream project.
  - key: LINK-06
    label: Every item in the programme project must have…
    conformance: SHALL
    requirement: Every item in the programme project must have a Workstream value.
  - key: LINK-07
    label: Epics are programme-level and owned by the PM.…
    conformance: SHALL
    requirement: Epics are programme-level and owned by the PM. A workstream lead who needs a new or changed epic opens an issue in `aai-programme` proposing it; the PM accepts or declines it. Leads create features, stories and spikes under epics freely. The programme README explains this.
---

# Linking to workstream projects

How the programme project and the workstream projects link (section 10). Generated from [requirements v0.5](https://github.com/litlfred/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-linking#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `LINK-01` | SHALL | Create a pinned issue in `aai-programme` titled "Workstream directory". For each workstream it lists the lead, the repository and the project URL. Leave entries blank until leads supply them. |
| `LINK-02` | SHALL | The programme project README links to the directory issue and to the Roadmap view (V2). Do not add a separate static roadmap or Gantt chart to the README; V2 is the roadmap, kept current from the epic dates. |
| `LINK-03` | SHALL | The template README tells leads to link back to Assured AI Programme. |
| `LINK-04` | SHALL | Workstream features and stories are sub-issues of the relevant epic, so sub-issue progress shows in V1. The pilot must confirm that sub-issues from another repository roll up correctly. |
| `LINK-05` | SHALL | A workstream item, including a WS5 feature or task in `aai-programme`, enters the programme project only if it is labelled `thin-slice` or `sprint-demo`, has Delivery health At risk or Blocked, or is a cross-workstream deliverable. Anything else stays in its workstream project. |
| `LINK-06` | SHALL | Every item in the programme project must have a Workstream value. |
| `LINK-07` | SHALL | Epics are programme-level and owned by the PM. A workstream lead who needs a new or changed epic opens an issue in `aai-programme` proposing it; the PM accepts or declines it. Leads create features, stories and spikes under epics freely. The programme README explains this. |
