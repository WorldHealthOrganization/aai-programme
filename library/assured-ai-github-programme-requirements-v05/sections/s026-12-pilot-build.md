---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s026-12-pilot-build
section_title: "12. Pilot build"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 369-402
source_sha256: 6be31bf530ba67cf
granularity: heading
---
## 12. Pilot build

Before any bulk import, the agent builds and tests this small set. Use representative Assured AI work items that reflect genuine planned activities, each clearly marked as a pilot. Do not create artificial dependencies between unrelated technical tasks, and do not move or change existing operational work (for example the project 110 items) to test the configuration. After the pilot passes, the project 110 items are reviewed with Ritika and agreed work is brought into the right repositories; where technical work stays in an external repository, the WHO coordination issue links to it.

- 1 epic in `aai-programme`
- 2 features in two different workstream repositories, as sub-issues of the epic
- 1 native "blocked by" relationship between the two features
- 1 D-number issue in `aai-programme`
- 1 decision issue in `aai-programme`
- 1 research question issue
- 1 milestone issue
- 1 item with Review type set
- 1 item labelled `thin-slice`
- 1 item labelled `sprint-demo`
- 1 workstream issue linking to an external partner repository (BD-02a)

The pilot must prove each of these:

| ID | Test |
|---|---|
| PIL-01 | An organisation issue field changed on a `thin-slice` workstream item shows the same value in its workstream project and the programme project |
| PIL-02 | Sub-issue progress from two repositories rolls up into the epic in V1 |
| PIL-03 | Removed in v0.5: there is no restricted note to test. Instead: an issue with a note kept off GitHub says so in neutral words only (SEC-02) |
| PIL-04 | Removed in v0.5: there is no `aai-pm` |
| PIL-05 | A `blocked` label on a feature sets Delivery health to Blocked on the epic within one run of the Action, and the epic appears in V10 |
| PIL-06 | Every view in section 8.1 returns the right pilot items |
| PIL-07 | The test partner account sets Integration readiness to Validated on a pilot item with no confirmation comment. AUTO-10 adds the `validation-exception` label and one comment. Running it again adds nothing more. When the Technical Integration Lead adds the confirmation comment, the label is removed |
| PIL-08 | Closing a pilot epic as completed sets Programme status to Done through AUTO-03 |
| PIL-09 | Closing a pilot item as not planned sets Programme status to Cancelled, and reopening it sets In progress |
| PIL-10 | The pinned fields in section 5.3 appear on the issue form for each pilot issue type |
| PIL-11 | Charts M1 to M5 show the pilot items correctly, or the report records which cannot be built natively |

If any test fails, stop and report. Delete or close the pilot items once the bulk import is complete.
