---
id: req:aai-dependencies
title: "Assured AI programme: dependencies"
description: How dependencies are recorded (section 9). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s023-9-dependencies
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: DEP-01
    label: Ordinary technical dependencies use GitHub's native "blocked by"…
    conformance: SHALL
    requirement: Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves.
  - key: DEP-02
    label: A dependency becomes a D-number issue in `aai-programme`…
    conformance: SHALL
    requirement: "A dependency becomes a D-number issue in `aai-programme` if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences."
  - key: DEP-03
    label: Each D-number issue links to the waiting epic…
    conformance: SHALL
    requirement: Each D-number issue links to the waiting epic and to what it waits on. Where that is another epic and the relationship is a true blocking dependency, the agent also creates a native "blocked by" relationship between the two epics. Where the dependency is on a review, an external decision or a shared platform item, no native relationship is created.
  - key: DEP-04
    label: The agent imports the existing dependency register (D01…
    conformance: SHALL
    requirement: The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-programme`.
  - key: DEP-05
    label: Do not create extra fields for waiting epic,…
    conformance: SHALL NOT
    requirement: "Do not create extra fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses Workstream (the waiting workstream), Target date (the needed-by date), Delivery health, Risk category, Impact and Assignee. Its issue body follows this template:"
---

# Dependencies

How dependencies are recorded (section 9). Generated from [requirements v0.5](https://github.com/litlfred/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-dependencies#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `DEP-01` | SHALL | Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves. |
| `DEP-02` | SHALL | A dependency becomes a D-number issue in `aai-programme` if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences. |
| `DEP-03` | SHALL | Each D-number issue links to the waiting epic and to what it waits on. Where that is another epic and the relationship is a true blocking dependency, the agent also creates a native "blocked by" relationship between the two epics. Where the dependency is on a review, an external decision or a shared platform item, no native relationship is created. |
| `DEP-04` | SHALL | The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-programme`. |
| `DEP-05` | SHALL NOT | Do not create extra fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses Workstream (the waiting workstream), Target date (the needed-by date), Delivery health, Risk category, Impact and Assignee. Its issue body follows this template: |
