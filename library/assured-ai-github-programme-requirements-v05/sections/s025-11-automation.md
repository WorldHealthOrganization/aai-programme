---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s025-11-automation
section_title: "11. Automation"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 350-368
source_sha256: 6be31bf530ba67cf
granularity: heading
---
## 11. Automation

| ID | Requirement |
|---|---|
| AUTO-01 | Auto-add to the programme project: `aai-programme` issues of type Epic, Milestone, Research question, Dependency, Decision or Assumption, and workstream issues (including WS5 items in `aai-programme`) labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`. Other WS5 items stay off the board and still roll up into their epics through sub-issues. The pilot confirms that the auto-add filter can select by issue type; if it cannot, use a GitHub Action and record this. GitHub limits the number of auto-add workflows per project depending on the plan. If the limit is reached, use a GitHub Action instead and record this. |
| AUTO-02 | Removed in v0.5: there is no `aai-pm`. |
| AUTO-03 | A GitHub Action, using the BD-08 credentials. When a programme epic, milestone, research question, dependency or decision issue is created, set Programme status to Not started unless a value was supplied. When a programme-tracked issue is closed as completed, set Done. When it is closed as not planned, set Cancelled. When it is reopened, set In progress. Built-in project workflows can only set a project's own Status field, so they cannot do this. |
| AUTO-04 | Delivery health roll-up. A scheduled Action finds `blocked` or `at-risk` labels on sub-issues and sets Delivery health on the parent epic to the worst signal found, in the order Blocked, then At risk, then On track. It never lowers or clears Delivery health; the epic's owner does that. The PM has approved this rule. |
| AUTO-05 | No automation sets Integration readiness, Review status, Risk category, Impact, a decision or risk acceptance. |
| AUTO-06 | Where a saved view or chart can do the job, use it instead of an Action. |
| AUTO-07 | Document every automation in the programme project README: what triggers it, what it does, its scope and who owns it. |
| AUTO-08 | All scripts are safe to rerun without creating duplicates and have a `--dry-run` mode. They live in `aai-programme/scripts`. |
| AUTO-09 | If an automation needs a token or raised permissions, stop before creating the secret and report exactly what permission is needed. The BD-08 credentials are expected; any others are not. |
| AUTO-10 | Validation check. The Technical Integration Lead confirms validation by adding a comment to the item that starts with `Validation confirmed:` followed by a short note or evidence link. A scheduled Action checks every item whose Integration readiness is Validated. If there is no confirmation comment from the Technical Integration Lead, it adds the `validation-exception` label and one comment explaining why. It is idempotent: it never adds a second comment for the same exception. When the confirmation comment appears, or the value moves off Validated, it removes the label. It never changes Integration readiness. The Technical Integration Lead's GitHub username is a setting in `aai-programme/scripts`, not hard-coded. |
| AUTO-11 | Backfill. Auto-add workflows only catch items created or updated after they are switched on. A one-off script, run in build step 8, adds existing qualifying items to the programme project. |
| AUTO-12 | Optional. A weekly script calculates M6 (average age of blocked items) from the issue timelines and posts it as a comment on a pinned "Programme metrics" issue in `aai-programme`. Not part of the pilot. Build it only after the pilot passes, and only if there is capacity; M1 to M5 are enough to start with. |

Integration readiness is proposed by the relevant workstream lead, who sets Ready to integrate. The Technical Integration Lead then posts the `Validation confirmed:` comment with the supporting evidence and sets Validated (DP-05). Automation never sets Validated. The confirmation comment is the authoritative validation record because it captures an explicit approval and lets the Technical Integration Lead point to the evidence. GitHub records issue field changes in the issue timeline, and that history may be used as additional audit information, but changing the field alone does not count as validation. Validation is never inferred from closed sub-issues.
