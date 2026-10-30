---
id: req:aai-pilot
title: "Assured AI programme: pilot tests"
description: "What the pilot build must prove before any bulk import (section 12). From requirements v0.5. Removed in v0.5: PIL-04."
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s026-12-pilot-build
actors:
  - build-agent
  - technical-integration-lead
tags:
  - aai-programme
  - v0.5
statements:
  - key: PIL-01
    label: An organisation issue field changed on a `thin-slice`…
    conformance: SHALL
    requirement: An organisation issue field changed on a `thin-slice` workstream item shows the same value in its workstream project and the programme project
    successCriteria:
      - key: SC-1
        criterion: An organisation issue field changed on a `thin-slice` workstream item shows the same value in its workstream project and the programme project
        verification: test
  - key: PIL-02
    label: Sub-issue progress from two repositories rolls up into…
    conformance: SHALL
    requirement: Sub-issue progress from two repositories rolls up into the epic in V1
    successCriteria:
      - key: SC-1
        criterion: Sub-issue progress from two repositories rolls up into the epic in V1
        verification: test
  - key: PIL-03
    label: an issue with a note kept off GitHub…
    conformance: SHALL
    requirement: an issue with a note kept off GitHub says so in neutral words only (SEC-02)
    successCriteria:
      - key: SC-1
        criterion: an issue with a note kept off GitHub says so in neutral words only (SEC-02)
        verification: test
  - key: PIL-05
    label: A `blocked` label on a feature sets Delivery…
    conformance: SHALL
    requirement: A `blocked` label on a feature sets Delivery health to Blocked on the epic within one run of the Action, and the epic appears in V10
    successCriteria:
      - key: SC-1
        criterion: A `blocked` label on a feature sets Delivery health to Blocked on the epic within one run of the Action, and the epic appears in V10
        verification: test
  - key: PIL-06
    label: Every view in section 8.1 returns the right…
    conformance: SHALL
    requirement: Every view in section 8.1 returns the right pilot items
    successCriteria:
      - key: SC-1
        criterion: Every view in section 8.1 returns the right pilot items
        verification: test
  - key: PIL-07
    label: The test partner account sets Integration readiness to…
    conformance: SHALL
    requirement: The test partner account sets Integration readiness to Validated on a pilot item with no confirmation comment. AUTO-10 adds the `validation-exception` label and one comment. Running it again adds nothing more. When the Technical Integration Lead adds the confirmation comment, the label is removed
    successCriteria:
      - key: SC-1
        criterion: The test partner account sets Integration readiness to Validated on a pilot item with no confirmation comment. AUTO-10 adds the `validation-exception` label and one comment. Running it again adds nothing more. When the Technical Integration Lead adds the confirmation comment, the label is removed
        verification: test
  - key: PIL-08
    label: Closing a pilot epic as completed sets Programme…
    conformance: SHALL
    requirement: Closing a pilot epic as completed sets Programme status to Done through AUTO-03
    successCriteria:
      - key: SC-1
        criterion: Closing a pilot epic as completed sets Programme status to Done through AUTO-03
        verification: test
  - key: PIL-09
    label: Closing a pilot item as not planned sets…
    conformance: SHALL
    requirement: Closing a pilot item as not planned sets Programme status to Cancelled, and reopening it sets In progress
    successCriteria:
      - key: SC-1
        criterion: Closing a pilot item as not planned sets Programme status to Cancelled, and reopening it sets In progress
        verification: test
  - key: PIL-10
    label: The pinned fields in section 5.3 appear on…
    conformance: SHALL
    requirement: The pinned fields in section 5.3 appear on the issue form for each pilot issue type
    successCriteria:
      - key: SC-1
        criterion: The pinned fields in section 5.3 appear on the issue form for each pilot issue type
        verification: test
  - key: PIL-11
    label: Charts M1 to M5 show the pilot items…
    conformance: SHALL
    requirement: Charts M1 to M5 show the pilot items correctly, or the report records which cannot be built natively
    successCriteria:
      - key: SC-1
        criterion: Charts M1 to M5 show the pilot items correctly, or the report records which cannot be built natively
        verification: test
---

# Pilot tests

What the pilot build must prove before any bulk import (section 12). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-pilot#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `PIL-01` | SHALL | An organisation issue field changed on a `thin-slice` workstream item shows the same value in its workstream project and the programme project |
| `PIL-02` | SHALL | Sub-issue progress from two repositories rolls up into the epic in V1 |
| `PIL-03` | SHALL | an issue with a note kept off GitHub says so in neutral words only (SEC-02) |
| `PIL-05` | SHALL | A `blocked` label on a feature sets Delivery health to Blocked on the epic within one run of the Action, and the epic appears in V10 |
| `PIL-06` | SHALL | Every view in section 8.1 returns the right pilot items |
| `PIL-07` | SHALL | The test partner account sets Integration readiness to Validated on a pilot item with no confirmation comment. AUTO-10 adds the `validation-exception` label and one comment. Running it again adds nothing more. When the Technical Integration Lead adds the confirmation comment, the label is removed |
| `PIL-08` | SHALL | Closing a pilot epic as completed sets Programme status to Done through AUTO-03 |
| `PIL-09` | SHALL | Closing a pilot item as not planned sets Programme status to Cancelled, and reopening it sets In progress |
| `PIL-10` | SHALL | The pinned fields in section 5.3 appear on the issue form for each pilot issue type |
| `PIL-11` | SHALL | Charts M1 to M5 show the pilot items correctly, or the report records which cannot be built natively |
