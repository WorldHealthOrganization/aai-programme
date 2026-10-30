---
id: req:aai-metrics
title: "Assured AI programme: metrics"
description: The programme's simple metrics, from the project's built-in charts (section 8.2). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s021-8-2-metrics
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: M1
    label: Share of epics On track, At risk and Blocked
    conformance: SHALL
    requirement: Share of epics On track, At risk and Blocked, built from Delivery health, epics only.
  - key: M2
    label: Blocked items by workstream
    conformance: SHALL
    requirement: Blocked items by workstream, built from Delivery health = Blocked, grouped by Workstream.
  - key: M3
    label: At-risk or blocked dependencies
    conformance: SHALL
    requirement: At-risk or blocked dependencies, built from Dependency issues with Delivery health At risk or Blocked.
  - key: M4
    label: Overdue deliverables
    conformance: SHALL
    requirement: Overdue deliverables, built from Same filter as V13.
  - key: M5
    label: Integration readiness by pipeline stage
    conformance: SHALL
    requirement: Integration readiness by pipeline stage, built from Integration readiness, grouped by Pipeline stage.
  - key: M6
    label: Average age of blocked items (optional)
    conformance: SHALL
    requirement: Average age of blocked items (optional), built from A script (AUTO-12) reads the issue timeline to find when Delivery health became Blocked.
---

# Metrics

The programme's simple metrics, from the project's built-in charts (section 8.2). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-metrics#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `M1` | SHALL | Share of epics On track, At risk and Blocked, built from Delivery health, epics only. |
| `M2` | SHALL | Blocked items by workstream, built from Delivery health = Blocked, grouped by Workstream. |
| `M3` | SHALL | At-risk or blocked dependencies, built from Dependency issues with Delivery health At risk or Blocked. |
| `M4` | SHALL | Overdue deliverables, built from Same filter as V13. |
| `M5` | SHALL | Integration readiness by pipeline stage, built from Integration readiness, grouped by Pipeline stage. |
| `M6` | SHALL | Average age of blocked items (optional), built from A script (AUTO-12) reads the issue timeline to find when Delivery health became Blocked. |
