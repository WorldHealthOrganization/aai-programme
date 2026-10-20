---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s023-11-automation
section_title: "11. Automation"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 305-322
source_sha256: a0519ae9be127861
granularity: heading
---
## 11. Automation

| ID | Requirement |
|---|---|
| AUTO-01 | Auto-add to Assured AI Programme: all issues in `aai-programme`, and workstream issues labelled `thin-slice` or `sprint-demo`. GitHub limits the number of auto-add workflows per project depending on the plan. If the limit is reached, use a GitHub Action instead and record this. |
| AUTO-02 | Auto-add to PM Control: all issues in `aai-programme` and `aai-pm`. |
| AUTO-03 | A GitHub Action, using the BD-08 credentials. When a programme epic, milestone or research-question issue is created, set Programme status to Not started unless a value was supplied. When a programme-tracked issue is closed as completed, set Done. When it is closed as not planned, set Cancelled. When it is reopened, set In progress. Built-in project workflows can only set a project's own Status field, so they cannot do this. Do not mirror workstream built-in Status automatically. |
| AUTO-04 | Risk roll-up. A scheduled Action finds `blocked` or `at-risk` labels on sub-issues and sets Risk status on the parent epic in PM Control only. It never clears Risk status; the PM does that. The PM has approved this rule. |
| AUTO-05 | No automation sets Integration readiness, Review status, a decision or risk acceptance. |
| AUTO-06 | Where a saved view can do the job, use a view instead of an Action. |
| AUTO-07 | Document every automation in the PM Control README: what triggers it, what it does, its scope and who owns it. |
| AUTO-08 | All scripts are safe to rerun without creating duplicates and have a `--dry-run` mode. They live in `aai-pm/scripts`. |
| AUTO-09 | If an automation needs a token or raised permissions, stop before creating the secret and report exactly what permission is needed. The BD-08 token is expected; any other is not. |
| AUTO-10 | Validation check. The Technical Integration Lead confirms validation by adding a comment to the item that starts with `Validation confirmed:` followed by a short note or evidence link. A scheduled Action checks every item whose Integration readiness is Validated. If there is no confirmation comment from the Technical Integration Lead, the Action creates or updates **one** validation exception issue in `aai-pm` for that item. It is idempotent: there is never more than one open exception per item, and later changes update it. When the confirmation comment appears, or the value moves off Validated, the Action closes the exception with a note. The Action never changes Integration readiness. The Technical Integration Lead's GitHub username is a setting in `aai-pm/scripts`, not hard-coded. |
| AUTO-11 | Backfill. Auto-add workflows only catch items created or updated after they are switched on. A one-off script, run in build step 8, adds existing qualifying items to both projects. |

Integration readiness is proposed by the relevant workstream lead, who sets Ready to integrate. The Technical Integration Lead then posts the `Validation confirmed:` comment with the supporting evidence and sets Validated (DP-05a). Automation never sets Validated. The confirmation comment is the authoritative validation record because it captures an explicit approval and lets the Technical Integration Lead point to the evidence. GitHub records issue field changes in the issue timeline, and that history may be used as additional audit information, but changing the field alone does not count as validation. Validation is never inferred from closed sub-issues.
