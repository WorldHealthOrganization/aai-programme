---
id: req:aai-views
title: "Assured AI programme: programme project views"
description: The views of the Assured AI Programme project (section 8.1). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s020-8-1-assured-ai-programme-views
actors:
  - build-agent
tags:
  - aai-programme
  - v0.5
statements:
  - key: V1
    label: Master programme
    conformance: SHALL
    requirement: 'The view "Master programme": layout Table; items: Epics; Group by Workstream; sort by Start date; columns: Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Master programme": layout Table; items: Epics; Group by Workstream; sort by Start date; columns: Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress.'
        verification: inspection
  - key: V2
    label: Roadmap
    conformance: SHALL
    requirement: 'The view "Roadmap": layout Roadmap; items: Epics and milestone issues with dates; Group by Workstream; zoom to quarter; columns: Start date, Target date, Programme status, Delivery health.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Roadmap": layout Roadmap; items: Epics and milestone issues with dates; Group by Workstream; zoom to quarter; columns: Start date, Target date, Programme status, Delivery health.'
        verification: inspection
  - key: V3
    label: Milestones
    conformance: SHALL
    requirement: 'The view "Milestones": layout Table; items: Milestone issues, plus items with any `gates:` label; Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions; columns: Title, Workstream, Programme status, Delivery health, Target date.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Milestones": layout Table; items: Milestone issues, plus items with any `gates:` label; Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions; columns: Title, Workstream, Programme status, Delivery health, Target date.'
        verification: inspection
  - key: V4
    label: Research questions
    conformance: SHALL
    requirement: 'The view "Research questions": layout Table; items: Research question issues, plus items with any `rq:` label; Group by Primary research question. One saved filter per research question on its `rq:` label; columns: Title, Workstream, Programme status, `rq:` and `route:` labels.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Research questions": layout Table; items: Research question issues, plus items with any `rq:` label; Group by Primary research question. One saved filter per research question on its `rq:` label; columns: Title, Workstream, Programme status, `rq:` and `route:` labels.'
        verification: inspection
  - key: V5
    label: Pipeline stages
    conformance: SHALL
    requirement: 'The view "Pipeline stages": layout Board; items: Epics, plus anything labelled `thin-slice`; Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice`; columns: Title, Workstream, Programme status, Delivery health.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Pipeline stages": layout Board; items: Epics, plus anything labelled `thin-slice`; Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice`; columns: Title, Workstream, Programme status, Delivery health.'
        verification: inspection
  - key: V6
    label: Integration readiness
    conformance: SHALL
    requirement: 'The view "Integration readiness": layout Table; items: Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed; Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate; columns: Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Integration readiness": layout Table; items: Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed; Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate; columns: Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress.'
        verification: inspection
  - key: V7
    label: Sprint review
    conformance: SHALL
    requirement: 'The view "Sprint review": layout Table; items: Items labelled `sprint-demo`; Group by Workstream; columns: Title, Workstream, Programme status, linked epic.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Sprint review": layout Table; items: Items labelled `sprint-demo`; Group by Workstream; columns: Title, Workstream, Programme status, linked epic.'
        verification: inspection
  - key: V8
    label: Next 30 days
    conformance: SHALL
    requirement: 'The view "Next 30 days": layout Table; items: Open epics, milestones, dependencies and cross-workstream deliverables with Target date in the next 30 days; Group by Workstream; sort by Target date; columns: Title, Workstream, Programme status, Delivery health, assignee, Target date.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Next 30 days": layout Table; items: Open epics, milestones, dependencies and cross-workstream deliverables with Target date in the next 30 days; Group by Workstream; sort by Target date; columns: Title, Workstream, Programme status, Delivery health, assignee, Target date.'
        verification: inspection
  - key: V9
    label: Dependencies
    conformance: SHALL
    requirement: 'The view "Dependencies": layout Table; items: Dependency issues; Group by Workstream (the waiting workstream); sort by Target date; columns: Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Dependencies": layout Table; items: Dependency issues; Group by Workstream (the waiting workstream); sort by Target date; columns: Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee.'
        verification: inspection
  - key: V10
    label: Blocked and at risk
    conformance: SHALL
    requirement: 'The view "Blocked and at risk": layout Table; items: Delivery health At risk or Blocked, or label `blocked`, `at-risk` or `validation-exception`; Group by Delivery health, then Workstream; sort by Impact, then Target date; columns: Title, Workstream, Risk category, Impact, Target date, assignee.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Blocked and at risk": layout Table; items: Delivery health At risk or Blocked, or label `blocked`, `at-risk` or `validation-exception`; Group by Delivery health, then Workstream; sort by Impact, then Target date; columns: Title, Workstream, Risk category, Impact, Target date, assignee.'
        verification: inspection
  - key: V11
    label: WHO review
    conformance: SHALL
    requirement: 'The view "WHO review": layout Board; items: Items with Review type other than Not needed; Columns by Review status; sort by Target date; columns: Title, Workstream, Review type, Target date.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "WHO review": layout Board; items: Items with Review type other than Not needed; Columns by Review status; sort by Target date; columns: Title, Workstream, Review type, Target date.'
        verification: inspection
  - key: V12
    label: Decisions
    conformance: SHALL
    requirement: 'The view "Decisions": layout Table; items: Decision issues; Group by open or closed; sort by Target date; columns: Title (starts with DEC-number), Workstream, Programme status, Target date.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Decisions": layout Table; items: Decision issues; Group by open or closed; sort by Target date; columns: Title (starts with DEC-number), Workstream, Programme status, Target date.'
        verification: inspection
  - key: V13
    label: Overdue
    conformance: SHALL
    requirement: 'The view "Overdue": layout Table; items: Target date before today and Programme status not Done or Cancelled; Group by Workstream; columns: Title, Target date, Delivery health, assignee.'
    successCriteria:
      - key: SC-1
        criterion: 'The view "Overdue": layout Table; items: Target date before today and Programme status not Done or Cancelled; Group by Workstream; columns: Title, Target date, Delivery health, assignee.'
        verification: inspection
---

# Programme project views

The views of the Assured AI Programme project (section 8.1). Generated from [requirements v0.5](https://github.com/litlfred/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-views#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `V1` | SHALL | The view "Master programme": layout Table; items: Epics; Group by Workstream; sort by Start date; columns: Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress. |
| `V2` | SHALL | The view "Roadmap": layout Roadmap; items: Epics and milestone issues with dates; Group by Workstream; zoom to quarter; columns: Start date, Target date, Programme status, Delivery health. |
| `V3` | SHALL | The view "Milestones": layout Table; items: Milestone issues, plus items with any `gates:` label; Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions; columns: Title, Workstream, Programme status, Delivery health, Target date. |
| `V4` | SHALL | The view "Research questions": layout Table; items: Research question issues, plus items with any `rq:` label; Group by Primary research question. One saved filter per research question on its `rq:` label; columns: Title, Workstream, Programme status, `rq:` and `route:` labels. |
| `V5` | SHALL | The view "Pipeline stages": layout Board; items: Epics, plus anything labelled `thin-slice`; Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice`; columns: Title, Workstream, Programme status, Delivery health. |
| `V6` | SHALL | The view "Integration readiness": layout Table; items: Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed; Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate; columns: Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress. |
| `V7` | SHALL | The view "Sprint review": layout Table; items: Items labelled `sprint-demo`; Group by Workstream; columns: Title, Workstream, Programme status, linked epic. |
| `V8` | SHALL | The view "Next 30 days": layout Table; items: Open epics, milestones, dependencies and cross-workstream deliverables with Target date in the next 30 days; Group by Workstream; sort by Target date; columns: Title, Workstream, Programme status, Delivery health, assignee, Target date. |
| `V9` | SHALL | The view "Dependencies": layout Table; items: Dependency issues; Group by Workstream (the waiting workstream); sort by Target date; columns: Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee. |
| `V10` | SHALL | The view "Blocked and at risk": layout Table; items: Delivery health At risk or Blocked, or label `blocked`, `at-risk` or `validation-exception`; Group by Delivery health, then Workstream; sort by Impact, then Target date; columns: Title, Workstream, Risk category, Impact, Target date, assignee. |
| `V11` | SHALL | The view "WHO review": layout Board; items: Items with Review type other than Not needed; Columns by Review status; sort by Target date; columns: Title, Workstream, Review type, Target date. |
| `V12` | SHALL | The view "Decisions": layout Table; items: Decision issues; Group by open or closed; sort by Target date; columns: Title (starts with DEC-number), Workstream, Programme status, Target date. |
| `V13` | SHALL | The view "Overdue": layout Table; items: Target date before today and Programme status not Done or Cancelled; Group by Workstream; columns: Title, Target date, Delivery health, assignee. |
