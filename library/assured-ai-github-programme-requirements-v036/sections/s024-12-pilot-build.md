---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s024-12-pilot-build
section_title: "12. Pilot build"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 323-355
source_sha256: a0519ae9be127861
granularity: heading
---
## 12. Pilot build

Before any bulk import, the agent builds and tests this small set, each item clearly marked as a pilot:

- 1 epic in `aai-programme`
- 2 features in two different workstream repositories, as sub-issues of the epic
- 1 native "blocked by" relationship between the two features
- 1 D-number issue in `aai-pm`
- 1 research question issue
- 1 milestone issue
- 1 item with Review type set
- 1 item labelled `thin-slice`
- 1 item labelled `sprint-demo`
- 1 workstream issue linking to an external partner repository (BD-02a)

The pilot must prove each of these:

| ID | Test |
|---|---|
| PIL-01a | An organisation issue field changed on a programme epic shows the same value in both Assured AI Programme and Assured AI PM Control |
| PIL-01b | An organisation issue field changed on a `thin-slice` workstream item shows the same value in its workstream project and Assured AI Programme |
| PIL-02 | Sub-issue progress from two repositories rolls up into the epic in V1 and P1 |
| PIL-03 | The D-number mention from `aai-pm` cannot be seen by a test user with partner access |
| PIL-04 | A test user with partner access cannot open PM Control, and cannot see any PM Control field |
| PIL-05 | A `blocked` label on a feature sets Risk status on the epic in PM Control within one run of the Action |
| PIL-06 | Every view in section 8 returns the right pilot items |
| PIL-07 | The test partner account sets Integration readiness to Validated on a pilot item with no confirmation comment. AUTO-10 opens one validation exception, which appears in P4. Setting the value again does not open a second exception. When the Technical Integration Lead adds the confirmation comment, the exception closes |
| PIL-08 | Closing a pilot epic as completed sets Programme status to Done through AUTO-03 |
| PIL-09 | Closing a pilot item as not planned sets Programme status to Cancelled, and reopening it sets In progress |
| PIL-10 | The pinned fields in section 5.3 appear on the issue form for each pilot issue type |

If any test fails, stop and report. Delete or close the pilot items once the bulk import is complete.
