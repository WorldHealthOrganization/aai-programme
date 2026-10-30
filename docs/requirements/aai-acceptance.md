---
id: req:aai-acceptance
title: "Assured AI programme: acceptance criteria"
description: What the finished build is checked against (section 15). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s029-15-acceptance-criteria
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: AC-01
    label: The programme project and the template exist in…
    conformance: SHALL
    requirement: The programme project and the template exist in the agreed organisation, with the agreed access for partners, Gates Foundation contacts and WHO staff
    successCriteria:
      - key: SC-1
        criterion: The programme project and the template exist in the agreed organisation, with the agreed access for partners, Gates Foundation contacts and WHO staff
        verification: inspection
  - key: AC-02
    label: Every view in section 8.1 exists and shows…
    conformance: SHALL
    requirement: Every view in section 8.1 exists and shows the intended items
    successCriteria:
      - key: SC-1
        criterion: Every view in section 8.1 exists and shows the intended items
        verification: inspection
  - key: AC-03
    label: The section 7.1 fields are organisation issue fields,…
    conformance: SHALL
    requirement: The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used)
    successCriteria:
      - key: SC-1
        criterion: The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used)
        verification: inspection
  - key: AC-04
    label: Every epic from the CSV appears once in…
    conformance: SHALL
    requirement: Every epic from the CSV appears once in V1
    successCriteria:
      - key: SC-1
        criterion: Every epic from the CSV appears once in V1
        verification: inspection
  - key: AC-05
    label: Every Gates output has exactly one milestone issue…
    conformance: SHALL
    requirement: Every Gates output has exactly one milestone issue and one saved filter in V3
    successCriteria:
      - key: SC-1
        criterion: Every Gates output has exactly one milestone issue and one saved filter in V3
        verification: inspection
  - key: AC-06
    label: All seven research questions exist, and every epic…
    conformance: SHALL
    requirement: All seven research questions exist, and every epic has a Primary research question, which may be None
    successCriteria:
      - key: SC-1
        criterion: All seven research questions exist, and every epic has a Primary research question, which may be None
        verification: inspection
  - key: AC-07
    label: Every D-number from the register exists once in…
    conformance: SHALL
    requirement: Every D-number from the register exists once in `aai-programme` and links to the waiting epic and what it waits on; native "blocked by" relationships exist only where DEP-03 calls for them
    successCriteria:
      - key: SC-1
        criterion: Every D-number from the register exists once in `aai-programme` and links to the waiting epic and what it waits on; native "blocked by" relationships exist only where DEP-03 calls for them
        verification: inspection
  - key: AC-08
    label: Nothing section 6 keeps off GitHub appears in…
    conformance: SHALL NOT
    requirement: Nothing section 6 keeps off GitHub appears in any repository, issue, comment, commit or attachment
    successCriteria:
      - key: SC-1
        criterion: Nothing section 6 keeps off GitHub appears in any repository, issue, comment, commit or attachment
        verification: inspection
  - key: AC-09
    label: No automation sets readiness, approval, risk category, impact,…
    conformance: SHALL NOT
    requirement: No automation sets readiness, approval, risk category, impact, a decision or risk acceptance
    successCriteria:
      - key: SC-1
        criterion: No automation sets readiness, approval, risk category, impact, a decision or risk acceptance
        verification: inspection
  - key: AC-10
    label: The READMEs explain each field, how items enter…
    conformance: SHALL
    requirement: The READMEs explain each field, how items enter the project, who owns what, what is kept off GitHub and why, and how the projects link
    successCriteria:
      - key: SC-1
        criterion: The READMEs explain each field, how items enter the project, who owns what, what is kept off GitHub and why, and how the projects link
        verification: inspection
  - key: AC-11
    label: All pilot tests PIL-01 to PIL-11 passed before…
    conformance: SHALL
    requirement: All pilot tests PIL-01 to PIL-11 passed before the bulk import
    successCriteria:
      - key: SC-1
        criterion: All pilot tests PIL-01 to PIL-11 passed before the bulk import
        verification: inspection
  - key: AC-12
    label: No `aai-ws5` repository or WS5 project exists. Every…
    conformance: SHALL NOT
    requirement: No `aai-ws5` repository or WS5 project exists. Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to the programme project
    successCriteria:
      - key: SC-1
        criterion: No `aai-ws5` repository or WS5 project exists. Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to the programme project
        verification: inspection
  - key: AC-13
    label: WS5 Governance and stewardship is not represented as…
    conformance: SHALL
    requirement: WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Pipeline stage = Cross-cutting / N/A where appropriate
    successCriteria:
      - key: SC-1
        criterion: WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Pipeline stage = Cross-cutting / N/A where appropriate
        verification: inspection
  - key: AC-14
    label: Every D-number and DEC-number issue title starts with…
    conformance: SHALL
    requirement: Every D-number and DEC-number issue title starts with its number
    successCriteria:
      - key: SC-1
        criterion: Every D-number and DEC-number issue title starts with its number
        verification: inspection
  - key: AC-15
    label: Organisation issue-field headroom and every project's total field…
    conformance: SHALL
    requirement: Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report
    successCriteria:
      - key: SC-1
        criterion: Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report
        verification: inspection
  - key: AC-16
    label: Every item with a Gates output value also…
    conformance: SHALL
    requirement: Every item with a Gates output value also carries the matching `gates:` label
    successCriteria:
      - key: SC-1
        criterion: Every item with a Gates output value also carries the matching `gates:` label
        verification: inspection
  - key: AC-17
    label: Every item with a Primary research question other…
    conformance: SHALL
    requirement: Every item with a Primary research question other than None also carries the matching `rq:` label
    successCriteria:
      - key: SC-1
        criterion: Every item with a Primary research question other than None also carries the matching `rq:` label
        verification: inspection
  - key: AC-18
    label: Charts M1 to M5 exist, or the report…
    conformance: SHALL
    requirement: Charts M1 to M5 exist, or the report records which cannot be built natively
    successCriteria:
      - key: SC-1
        criterion: Charts M1 to M5 exist, or the report records which cannot be built natively
        verification: inspection
  - key: AC-19
    label: Every pilot item in V10 carries a "Next…
    conformance: SHALL
    requirement: Every pilot item in V10 carries a "Next action" line in its issue body
    successCriteria:
      - key: SC-1
        criterion: Every pilot item in V10 carries a "Next action" line in its issue body
        verification: inspection
---

# Acceptance criteria

What the finished build is checked against (section 15). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-acceptance#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `AC-01` | SHALL | The programme project and the template exist in the agreed organisation, with the agreed access for partners, Gates Foundation contacts and WHO staff |
| `AC-02` | SHALL | Every view in section 8.1 exists and shows the intended items |
| `AC-03` | SHALL | The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used) |
| `AC-04` | SHALL | Every epic from the CSV appears once in V1 |
| `AC-05` | SHALL | Every Gates output has exactly one milestone issue and one saved filter in V3 |
| `AC-06` | SHALL | All seven research questions exist, and every epic has a Primary research question, which may be None |
| `AC-07` | SHALL | Every D-number from the register exists once in `aai-programme` and links to the waiting epic and what it waits on; native "blocked by" relationships exist only where DEP-03 calls for them |
| `AC-08` | SHALL NOT | Nothing section 6 keeps off GitHub appears in any repository, issue, comment, commit or attachment |
| `AC-09` | SHALL NOT | No automation sets readiness, approval, risk category, impact, a decision or risk acceptance |
| `AC-10` | SHALL | The READMEs explain each field, how items enter the project, who owns what, what is kept off GitHub and why, and how the projects link |
| `AC-11` | SHALL | All pilot tests PIL-01 to PIL-11 passed before the bulk import |
| `AC-12` | SHALL NOT | No `aai-ws5` repository or WS5 project exists. Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to the programme project |
| `AC-13` | SHALL | WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Pipeline stage = Cross-cutting / N/A where appropriate |
| `AC-14` | SHALL | Every D-number and DEC-number issue title starts with its number |
| `AC-15` | SHALL | Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report |
| `AC-16` | SHALL | Every item with a Gates output value also carries the matching `gates:` label |
| `AC-17` | SHALL | Every item with a Primary research question other than None also carries the matching `rq:` label |
| `AC-18` | SHALL | Charts M1 to M5 exist, or the report records which cannot be built natively |
| `AC-19` | SHALL | Every pilot item in V10 carries a "Next action" line in its issue body |
