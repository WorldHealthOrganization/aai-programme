---
id: req:aai-automation
title: "Assured AI programme: automation"
description: "What the automations do, and what they never do (section 11). From requirements v0.5. Removed in v0.5: AUTO-02."
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s025-11-automation
actors:
  - build-agent
  - who-github-owner
  - technical-integration-lead
tags:
  - aai-programme
  - v0.5
statements:
  - key: AUTO-01
    label: "Auto-add to the programme project: `aai-programme` issues of…"
    conformance: SHALL
    requirement: "Auto-add to the programme project: `aai-programme` issues of type Epic, Milestone, Research question, Dependency, Decision or Assumption, and workstream issues (including WS5 items in `aai-programme`) labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`. Other WS5 items stay off the board and still roll up into their epics through sub-issues. The pilot confirms that the auto-add filter can select by issue type; if it cannot, use a GitHub Action and record this. GitHub limits the number of auto-add workflows per project depending on the plan. If the limit is reached, use a GitHub Action instead and record this."
  - key: AUTO-03
    label: A GitHub Action, using the BD-08 credentials. When…
    conformance: SHALL
    requirement: A GitHub Action, using the BD-08 credentials. When a programme epic, milestone, research question, dependency or decision issue is created, set Programme status to Not started unless a value was supplied. When a programme-tracked issue is closed as completed, set Done. When it is closed as not planned, set Cancelled. When it is reopened, set In progress. Built-in project workflows can only set a project's own Status field, so they cannot do this.
  - key: AUTO-04
    label: Delivery health roll-up. A scheduled Action finds `blocked`…
    conformance: SHALL
    requirement: Delivery health roll-up. A scheduled Action finds `blocked` or `at-risk` labels on sub-issues and sets Delivery health on the parent epic to the worst signal found, in the order Blocked, then At risk, then On track. It never lowers or clears Delivery health; the epic's owner does that. The PM has approved this rule.
  - key: AUTO-05
    label: No automation sets Integration readiness, Review status, Risk…
    conformance: SHALL NOT
    requirement: No automation sets Integration readiness, Review status, Risk category, Impact, a decision or risk acceptance.
  - key: AUTO-06
    label: Where a saved view or chart can do…
    conformance: SHALL
    requirement: Where a saved view or chart can do the job, use it instead of an Action.
  - key: AUTO-07
    label: Document every automation in the programme project README:…
    conformance: SHALL
    requirement: "Document every automation in the programme project README: what triggers it, what it does, its scope and who owns it."
  - key: AUTO-08
    label: All scripts are safe to rerun without creating…
    conformance: SHALL
    requirement: All scripts are safe to rerun without creating duplicates and have a `--dry-run` mode. They live in `aai-programme/scripts`.
  - key: AUTO-09
    label: If an automation needs a token or raised…
    conformance: SHALL
    requirement: If an automation needs a token or raised permissions, stop before creating the secret and report exactly what permission is needed. The BD-08 credentials are expected; any others are not.
  - key: AUTO-10
    label: Validation check. The Technical Integration Lead confirms validation…
    conformance: SHALL
    requirement: "Validation check. The Technical Integration Lead confirms validation by adding a comment to the item that starts with `Validation confirmed:` followed by a short note or evidence link. A scheduled Action checks every item whose Integration readiness is Validated. If there is no confirmation comment from the Technical Integration Lead, it adds the `validation-exception` label and one comment explaining why. It is idempotent: it never adds a second comment for the same exception. When the confirmation comment appears, or the value moves off Validated, it removes the label. It never changes Integration readiness. The Technical Integration Lead's GitHub username is a setting in `aai-programme/scripts`, not hard-coded."
  - key: AUTO-11
    label: Backfill. Auto-add workflows only catch items created or…
    conformance: SHALL
    requirement: Backfill. Auto-add workflows only catch items created or updated after they are switched on. A one-off script, run in build step 8, adds existing qualifying items to the programme project.
  - key: AUTO-12
    label: Optional. A weekly script calculates M6 (average age…
    conformance: MAY
    requirement: Optional. A weekly script calculates M6 (average age of blocked items) from the issue timelines and posts it as a comment on a pinned "Programme metrics" issue in `aai-programme`. Not part of the pilot. Build it only after the pilot passes, and only if there is capacity; M1 to M5 are enough to start with.
---

# Automation

What the automations do, and what they never do (section 11). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-automation#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `AUTO-01` | SHALL | Auto-add to the programme project: `aai-programme` issues of type Epic, Milestone, Research question, Dependency, Decision or Assumption, and workstream issues (including WS5 items in `aai-programme`) labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`. Other WS5 items stay off the board and still roll up into their epics through sub-issues. The pilot confirms that the auto-add filter can select by issue type; if it cannot, use a GitHub Action and record this. GitHub limits the number of auto-add workflows per project depending on the plan. If the limit is reached, use a GitHub Action instead and record this. |
| `AUTO-03` | SHALL | A GitHub Action, using the BD-08 credentials. When a programme epic, milestone, research question, dependency or decision issue is created, set Programme status to Not started unless a value was supplied. When a programme-tracked issue is closed as completed, set Done. When it is closed as not planned, set Cancelled. When it is reopened, set In progress. Built-in project workflows can only set a project's own Status field, so they cannot do this. |
| `AUTO-04` | SHALL | Delivery health roll-up. A scheduled Action finds `blocked` or `at-risk` labels on sub-issues and sets Delivery health on the parent epic to the worst signal found, in the order Blocked, then At risk, then On track. It never lowers or clears Delivery health; the epic's owner does that. The PM has approved this rule. |
| `AUTO-05` | SHALL NOT | No automation sets Integration readiness, Review status, Risk category, Impact, a decision or risk acceptance. |
| `AUTO-06` | SHALL | Where a saved view or chart can do the job, use it instead of an Action. |
| `AUTO-07` | SHALL | Document every automation in the programme project README: what triggers it, what it does, its scope and who owns it. |
| `AUTO-08` | SHALL | All scripts are safe to rerun without creating duplicates and have a `--dry-run` mode. They live in `aai-programme/scripts`. |
| `AUTO-09` | SHALL | If an automation needs a token or raised permissions, stop before creating the secret and report exactly what permission is needed. The BD-08 credentials are expected; any others are not. |
| `AUTO-10` | SHALL | Validation check. The Technical Integration Lead confirms validation by adding a comment to the item that starts with `Validation confirmed:` followed by a short note or evidence link. A scheduled Action checks every item whose Integration readiness is Validated. If there is no confirmation comment from the Technical Integration Lead, it adds the `validation-exception` label and one comment explaining why. It is idempotent: it never adds a second comment for the same exception. When the confirmation comment appears, or the value moves off Validated, it removes the label. It never changes Integration readiness. The Technical Integration Lead's GitHub username is a setting in `aai-programme/scripts`, not hard-coded. |
| `AUTO-11` | SHALL | Backfill. Auto-add workflows only catch items created or updated after they are switched on. A one-off script, run in build step 8, adds existing qualifying items to the programme project. |
| `AUTO-12` | MAY | Optional. A weekly script calculates M6 (average age of blocked items) from the issue timelines and posts it as a comment on a pinned "Programme metrics" issue in `aai-programme`. Not part of the pilot. Build it only after the pilot passes, and only if there is capacity; M1 to M5 are enough to start with. |
