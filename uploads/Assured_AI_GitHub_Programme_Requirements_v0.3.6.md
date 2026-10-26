# Assured AI: requirements for the programme GitHub projects

**Build specification for an AI agent**

| Document control | Detail |
|---|---|
| Purpose | Requirements for an AI agent to set up two organisation-level GitHub Projects for the WHO Assured AI project (Gates Foundation grant INV-108130): a partner-facing programme project and a private programme management (PM) project, both linked to the workstream projects |
| Version | 0.3.6, 15 October 2026 |
| Status | Approved for a pilot build. The build must not go beyond pre-flight (section 13, step 1) until the decisions in section 3 are confirmed |
| Owner | PM & Architecture Integration, Assured AI project, WHO |
| Audience | AI build agent, WHO GitHub organisation owners, workstream leads |

## 1. What the build must achieve

Workstream leads run their own delivery in their own projects. Partners and WHO see one shared programme picture. The PM keeps dependencies, reviews, risks and decisions in a private control layer. The same issue is never copied to make any of this work.

The principle the agent must follow: **issue fields hold the shared values; projects are different views of them.**

| Layer | GitHub object | Purpose | Main users |
|---|---|---|---|
| Programme (partner-facing) | Project: **Assured AI Programme** | What is planned, when, what it delivers, how ready it is to integrate, and which research question it answers | Partners, workstream leads, WHO team |
| PM control (private) | Project: **Assured AI PM Control** | Dependencies, WHO review, blocked and at-risk work, open decisions, overdue items | PM & Architecture Integration, and anyone the PM authorises |
| Workstream delivery | Projects built by each workstream lead from the template | Sprint work: features, stories, spikes | Each workstream's lead and team |


### 1.1 Terms used in this document

| Term | Meaning |
|---|---|
| PM & Architecture Integration | The programme manager role for the project. Referred to as "the PM" |
| Technical Integration Lead | The person who confirms that technical components are ready to integrate and validates them (DP-05a) |
| Workstream (WS1 to WS5) | The five delivery streams of the project, each with its own lead. "Platform" covers shared hosting and engineering |
| Epic code | The reference for each programme epic, for example WS1-E2 (workstream 1, epic 2) |
| Gates output | A contractual output of the Gates Foundation grant, due in a given month |
| Research questions (R1 to R7) | The seven questions the project is designed to answer |
| Routes | The four ways of producing the same product that the project compares: Control (today's human process), Route 0 (an AI model alone), Route A (model plus authoring skills), Route B (model plus skills plus the knowledge graph) |
| Pipeline stages | The steps from WHO guidance to finished products: L1 source guidance, KG knowledge graph, L2 operational content (DAK, the digital adaptation kit), L3 computable content (FHIR and CQL), L5 health skills for AI agents (served through MCP), EVAL evaluation, LOC localization for a country |
| Thin slice | A small piece of content taken through every pipeline stage to prove the end-to-end flow |
| D-number | A programme dependency record, D01 onward |
| DEC-number | A programme decision record, DEC-001 onward |
| SME sign-off | Review by a WHO subject-matter expert, for example from the HIV or immunization programme |
| Validation packet | The evidence pack submitted for review of a produced artefact |
| Science Division publication clearance | WHO's internal clearance before anything is published |

## 2. Design principles

| ID | Principle |
|---|---|
| DP-01 | **Create once, show many times.** One issue can appear in several projects. Never clone an issue to report its status somewhere else. |
| DP-02 | **Workstream leads own their delivery.** The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories. |
| DP-03 | **Programme work is not sprint work.** Sprints are managed inside the workstream projects. Programme projects track dates, milestones and readiness, not sprints. |
| DP-04 | **Sensitivity decides visibility, not where the information came from.** Every piece of information is Partner-visible, WHO internal, or Restricted (section 6). |
| DP-05 | **Exceptions should be easy to find.** Blocked, at-risk, overdue, waiting for review and decision-needed items should each be one click away in PM Control. |
| DP-05a | **Technical integration judgements sit with the Technical Integration Lead.** The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. PM & Architecture Integration manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements. |
| DP-06 | **Automation must not make judgements.** Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and risk flags. It never makes readiness, approval, risk-acceptance or decision judgements. |
| DP-07 | **Prove it small before building it big.** A pilot build (section 12) must pass before any bulk import. |
| DP-08 | **Plain language.** All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written. |

## 3. Decisions needed before the build

The agent may carry out step 1 of section 13 (pre-flight) at any time. It must not configure or create anything from step 2 onward until every decision relevant to that step is confirmed. Each decision has a recommended default.

| ID | Decision | Recommended default | Why it matters |
|---|---|---|---|
| BD-01 | GitHub organisation | **Decided: the existing World Health Organization organisation, shared with other WHO teams.** Login: `WorldHealthOrganization` (https://github.com/WorldHealthOrganization) | Everything sits in it. Because the organisation is shared, the safeguards in BD-01a apply |
| BD-01a | Shared organisation safeguards: (1) the current base permission for members. If it is anything other than "No permission", partners invited as members could read other WHO teams' repositories, and the build must not change it (SEC-06); (2) how many of the 25 organisation issue fields are already used by other teams; (3) which issue types already exist; (4) whether the owners will allow project-specific issue types, and pinning fields to them; (5) that the agent works through a named account with delegated rights, never a shared login | WHO GitHub owner to confirm before step 2. If (1) cannot be met, partners join as outside collaborators instead (see BD-03) | Organisation-wide settings, issue fields and issue types affect every WHO team using the organisation, not just this project |
| BD-02 | All Assured AI coordination repositories (programme, PM and workstream repositories holding issues, features, stories and spikes) sit in that organisation | **Decided: yes** | Issue fields only work on issues in repositories owned by the same organisation |
| BD-02a | Partner source-code repositories, models and other technical assets may stay in partners' own GitHub organisations | **Decided: yes, where partners need it** | Partners may have their own policies or existing repositories. Their work is still tracked through issues in the WHO workstream repositories, which link to the external repository. Issues held in external repositories are never added to the programme projects |
| BD-02b | Confirm how each workstream will link external technical assets, if any, to its WHO-hosted coordination issues | Workstream lead to confirm before bulk import | Each workstream needs a consistent way to point from a WHO issue to the partner's code, for example a link in the issue body or a pull request reference |
| BD-03 | Partners join as organisation members | **Decided: members, subject to BD-01a(1) and the checks in BD-03a.** If the base permission cannot be "No permission", fall back to outside collaborators with access granted per repository | Only organisation members can belong to GitHub teams |
| BD-03a | Checks before partners are invited: (1) whether the organisation uses SAML single sign-on or Enterprise Managed Users, and if so how partners get WHO identities; (2) seat cost per partner member; (3) base permission for members set to "No permission"; (4) members cannot create repositories or change visibility | WHO GitHub owner and WHO IT to confirm | With single sign-on, members must sign in through WHO's identity provider. With Enterprise Managed Users, WHO's identity system must create the accounts. Either could block or delay partner access |
| BD-03b | A test account with partner-level access for the pilot | WHO GitHub owner to provide one test member account, removed after the build | Pilot tests PIL-03, PIL-04 and PIL-07 need a real user with partner access. The agent cannot create GitHub accounts, and a test member may use a paid seat |
| BD-04 | Repository roles for partners | Read on `aai-programme`; Maintain for the workstream lead and Write for the team on their own workstream repository; Triage on other workstream repositories where they contribute | Triage lets people manage issues without changing code. Read alone may be too little for people expected to update status |
| BD-05 | Organisation owners willing to create issue fields and issue types | One named WHO owner to run step 2 of section 13 | Only organisation owners can create issue fields and issue types |
| BD-05a | Inspect the organisation's existing issue fields before creating any new ones | Reuse compatible existing fields; do not duplicate them | The organisation-level field limit is shared across the whole organisation. The build must preserve headroom and avoid duplicate fields such as separate versions of Target date or Workstream |
| BD-06 | Issue fields available on WHO's GitHub plan and permitted by WHO enterprise policy | Check and confirm | If they are unavailable or restricted, the fallback in section 7.4 applies |
| BD-07 | Who can see review status | PM Control only | Partners would learn the outcome through the review itself, not through a field |
| BD-08 | Credentials for the GitHub Actions in section 11 | Prefer a GitHub App with least-privilege permissions where WHO policy supports it; otherwise an approved fine-grained token. A WHO GitHub owner creates it and stores it as an organisation secret available only to `aai-pm` | AUTO-03, AUTO-04 and AUTO-10 write to issue fields and project fields across repositories, which the default Actions token cannot do. The agent must not design, create or embed credentials itself |

## 4. Structure

```
GitHub organisation: [BD-01]
│
├── repo  aai-programme   Partner-visible
│         Epics, milestone issues, research question issues,
│         workstream directory, roadmap docs
│
├── repo  aai-pm          Restricted (PM only)
│         Programme dependencies (D-numbers), decisions (DEC-numbers),
│         material assumptions, scripts and their settings
│
├── repo  aai-ws1 … aai-ws5    Created by the build once each lead is confirmed; the lead holds Maintain
│         Features, stories, spikes, as sub-issues of aai-programme epics;
│         may link to partner source-code repositories outside WHO GitHub
│
├── Project  Assured AI Programme     items from aai-programme, plus selected workstream items
├── Project  Assured AI PM Control    items from aai-programme and aai-pm
└── Project template  Assured AI Workstream Template    copied by each workstream lead
```

Use these repository names unless the PM gives others.

Workstream leads and partners cannot create repositories in the organisation (BD-03a), so the build creates the workstream repositories. It creates each `aai-wsN` only once that workstream's lead and repository name are confirmed, with the labels in section 7.3, and gives the lead Maintain access. For the pilot it creates only the two workstream repositories the pilot needs. Leads then create their projects from the template.

D-number and DEC-number issues in `aai-pm` start their title with the number, for example "D07: Validated HIV graph before route runs".

## 5. Work item taxonomy

### 5.1 Issue types

**Shared organisation rule.** The World Health Organization organisation is shared with other WHO teams. Every organisation issue field and every new issue type created for this project is prefixed `AAI`, for example `AAI Workstream` or `AAI Decision`, so it cannot be confused with or collide with another team's. Existing generic issue types (such as Epic, Feature or Task) may be reused if the owners agree. Fields are pinned only to `AAI` issue types, never to shared generic ones, because pinning shows the field on every team's issues of that type. If the owners do not allow `AAI` issue types, do not pin; set the fields through the project views instead and record this in the build report. The rest of this document uses the short names without the prefix.

These are created at organisation level (BD-05). If the organisation already has issue types with the same meaning, reuse them.

| Issue type | Lives in | Used for |
|---|---|---|
| Epic | `aai-programme` | Programme-level work. One per row in the epics import CSV (section 14) |
| Milestone | `aai-programme` | Gates outputs and internal gates |
| Research question | `aai-programme` | R1 to R7 |
| Feature, Story, Spike | Workstream repositories | Created by workstream teams, as sub-issues of epics |
| Dependency | `aai-pm` | Programme-significant dependencies only (section 9) |
| Decision | `aai-pm` | Open and closed programme decisions |
| Assumption | `aai-pm` | Material programme assumptions |

### 5.2 Hierarchy

- Sub-issues represent work breakdown only: Epic, then Feature, then Story or Spike.
- Research questions are **not** parents of epics. An item links to research questions through the `rq:` labels, which list every question it contributes to, including its primary one. The Primary research question field records the main question only, for grouping. The research question issue holds the question, its sub-questions, the rationale and any narrative summary. View V4 is the authoritative list of contributing items; nobody keeps a second list by hand.
- Milestone issues are not parents of epics either. Items link to Gates outputs through the `gates:` labels (the complete record) and the Gates output field (the primary output).

### 5.3 Fields shown on each issue type

Organisation issue fields must be pinned to issue types to appear on the issue form. GitHub allows up to 10 pinned fields per issue type. Pin only these:

| Issue type | Pinned fields |
|---|---|
| Epic | Workstream, Programme status, Pipeline stage, Integration readiness, Gates output, Primary research question, Start date, Target date, Backlog ref |
| Milestone | Programme status, Gates output, Start date, Target date |
| Research question | Programme status, Primary research question |
| Feature, Story, Spike | Workstream, Pipeline stage, Integration readiness, Primary research question, Start date, Target date |
| Dependency, Decision, Assumption | Workstream, Target date |

## 6. Information classification

| Class | Meaning | Where it may appear |
|---|---|---|
| Partner-visible | Fine for any partner on the project to read | Issues, comments, labels and issue fields in `aai-programme` and workstream repositories; Assured AI Programme |
| WHO internal | For WHO staff, not partners | `aai-pm` only, or fields that exist only in Assured AI PM Control |
| Restricted | PM & Architecture Integration and named people only | `aai-pm` only |

Rules:

- **SEC-01.** Treat everything on an issue in a partner-visible repository as partner-visible: title, body, comments, labels, issue fields and relationships. Organisation-only issue fields can be read by anyone with read access to the repository, and partners will have it.
- **SEC-02.** WHO internal and Restricted information must therefore never be stored in an issue field on an issue in a partner-visible repository. It goes in PM Control project fields or in `aai-pm` issues. Issue fields on `aai-pm` issues are fine, because only people with access to `aai-pm` can see them.
- **SEC-03.** Risk reasoning, escalation notes, review comments and decision deliberations are WHO internal at minimum.
- **SEC-04.** A deliverable or epic first recorded in an internal planning document is not internal just because of where it came from. Classify it by its content.
- **SEC-05.** Making any project or repository public is a separate governance decision with its own privacy review. The build must not assume it will happen, and must not prepare for it.
- **SEC-06.** Never weaken repository or project permissions to make linking easier, and never change organisation-wide security settings.

## 7. Fields

### 7.1 Organisation issue fields

Shared values. Each one is set once on the issue and shows the same value in every project. All are Partner-visible.

| Field | Type | Options or format |
|---|---|---|
| Workstream | Single select | WS1 Knowledge graph, WS2 Authoring, WS3 Evaluation, WS4 Localization, WS5 Governance and stewardship, Platform, Cross-workstream |
| Programme status | Single select | Not started, In progress, In review, Done, Cancelled |
| Pipeline stage | Single select | L1 Corpus, KG Knowledge graph, L2 Operational (DAK), L3 Computable (FHIR/CQL), L5 Health skills + MCP, EVAL Evaluation, LOC Localization, Cross-cutting / N/A |
| Integration readiness | Single select | Not assessed, Not ready, Partly ready, Ready to integrate, Validated |
| Gates output | Single select | One option per Gates output from the input list, plus None |
| Primary research question | Single select | R1 to R7, plus None |
| Start date | Date | |
| Target date | Date | |
| Backlog ref | Text | Epic code, for example WS1-E2 |

That uses up to 9 organisation issue fields. Before creating any of them, the agent must inspect the organisation's existing issue fields, reuse any compatible fields, and confirm that creating the remainder will not exceed the organisation limit or consume unreasonable shared capacity.

Each project has a limit of 50 fields in total, including system fields and issue fields. Workstream leads can add fields to their own projects, so pre-flight and validation must check both limits: organisation issue-field headroom and the total field count of each project.

Integration readiness is a shared technical delivery status, not an internal WHO assurance judgement. It is partner-visible by design. A value such as Not ready describes where the work stands; it is not a WHO assessment of a partner.

`Pipeline stage` describes the end-to-end technical flow. Governance and stewardship are cross-cutting rather than a final sequential pipeline stage; WS5 work is represented primarily through the `Workstream` field and uses `Cross-cutting / N/A` where no pipeline stage applies.

Programme views must use **Programme status**, not the built-in Status field. The built-in Status is stored separately in each project, so it will differ between projects. Workstream projects keep the built-in Status for their own boards.

When a programme epic, milestone or research-question issue is created, set `Programme status` to `Not started` unless the import explicitly supplies another valid value. Do not automatically mirror a workstream project's built-in Status into Programme status.

### 7.2 PM Control project fields (WHO internal)

| Field | Type | Options or format |
|---|---|---|
| Risk status | Single select | On track, At risk, Blocked |
| Risk note | Text | |
| Dependency refs | Text | D-numbers, comma separated |
| Review type | Single select | Not needed, SME sign-off (HIV or immunization), Validation packet adjudication, Science Division publication clearance |
| Review status | Single select | Not submitted, Submitted, Under WHO review, Feedback issued, Resubmitted, Approved, Closed |
| Reviewer | Text | |
| Review due | Date | |
| Decision ref | Text | DEC-numbers |

### 7.3 Labels

Create these in every repository listed in section 4. Workstream leads should keep them unchanged.

| Label | Meaning |
|---|---|
| `rq:R1` to `rq:R7` | Every research question the item contributes to, including the primary one also recorded in the Primary research question field. The labels are the complete record; the field is the main question only |
| `route:control`, `route:0`, `route:a`, `route:b` | Which comparison routes the item covers |
| `gates:` plus the output number, one per Gates output | Every Gates output the item contributes to, including the primary one also recorded in the Gates output field. The labels are the complete record; the field is the primary output only |
| `thin-slice` | Part of the end-to-end demo slice |
| `sprint-demo` | To be shown at the next fortnightly sprint review |
| `blocked`, `at-risk` | Raised by the workstream team |
| `needs-review` | Ready for WHO review |

### 7.4 Fallback if issue fields are unavailable

If BD-05 or BD-06 cannot be met:

1. Create the section 7.1 fields as project fields, with identical names and options, in both programme projects and in the template.
2. Build a sync job: a GitHub Action that runs daily and on demand, copies the section 7.1 values from Assured AI Programme into PM Control, and reports any mismatches.
3. Record this in the build report.

Do not mix the two approaches.

## 8. Views

Each view lists its layout, which items it shows, how they are grouped and sorted, and the columns to display.

### 8.1 Assured AI Programme (partner-facing)

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| V1 | Master programme | Table | Epics | Group by Workstream; sort by Start date | Title, Programme status, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress |
| V2 | Roadmap | Roadmap | Epics and milestone issues with dates | Group by Workstream; zoom to quarter | Start date, Target date, Programme status |
| V3 | Milestones | Table | Milestone issues, plus items with any `gates:` label | Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, Target date |
| V4 | Research questions | Table | Research question issues, plus items with any `rq:` label | Group by Primary research question. One saved filter per research question on its `rq:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, `rq:` and `route:` labels |
| V5 | Pipeline stages | Board | Epics, plus anything labelled `thin-slice` | Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately rather than as the final sequential stage. Saved filter for `label:thin-slice` | Title, Workstream, Programme status |
| V6 | Integration readiness | Table | Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed | Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate | Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress |
| V7 | Sprint review | Table | Items labelled `sprint-demo` | Group by Workstream | Title, Workstream, Programme status, linked epic |
| V8 | Next 30 days | Table | Open programme epics, milestone issues and selected cross-workstream deliverables with Target date in the next 30 days | Group by Workstream; sort by Target date | Title, Workstream, Programme status, assignee, Target date |

Notes:

- V6 answers "are we ready to integrate it?", while V5 answers "where is the work?". The "Awaiting validation" filter is the Technical Integration Lead's work queue.
- V7 depends on workstream items labelled `sprint-demo` being added to this project automatically (AUTO-01). After each review the label is removed by the workstream lead, not by automation.

### 8.2 Assured AI PM Control (private)

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| P1 | Master programme (PM) | Table | Same as V1 | Same as V1 | V1 columns, plus Risk status, Dependency refs, Review status, Decision ref |
| P2 | Programme dependencies | Table | Dependency issues from `aai-pm` | Group by Workstream of the waiting epic; sort by Target date (used as needed-by date) | Title (starts with D-number), Workstream, Target date, Programme status, Risk status, assignee |
| P3 | WHO review queue | Board | Items with Review type other than Not needed | Columns by Review status; sort by Review due | Title, Workstream, Review type, Reviewer, Review due |
| P4 | Blocked and at risk | Table | Risk status At risk or Blocked, or label `blocked` or `at-risk`, plus open Assumption issues flagged at risk, plus open validation exceptions from AUTO-10 | Group by Risk status; sort by Target date | Title, Workstream, Risk note, Dependency refs, Target date |
| P5 | Open decisions | Table | Open Decision issues | Group by Workstream; sort by Target date | DEC-number, title, Workstream, Target date, linked epics |
| P6 | Overdue | Table | Target date before today and Programme status not Done or Cancelled | Group by Workstream | Title, Target date, Risk status, assignee |

Notes:

- In P3, Science Division items appear only when Review type is Science Division publication clearance.
- P5 makes the open DEC issues in `aai-pm` the live list of open decisions. Closed DEC issues form the decision record from the build onward. Decisions made before the build stay in the PM's existing decision log, and the agent does not import them.

### 8.3 Assured AI Workstream Template

Create this as an organisation project template. It contains:

- the issue fields from section 7.1, shown as columns
- a Sprint iteration field (two weeks)
- three views: Sprint board (current sprint, grouped by built-in Status), Backlog (table of all open items), and Roadmap

Project templates do not copy auto-add workflows. The template README must tell leads how to set up auto-add for their own repository.

## 9. Dependencies

- **DEP-01.** Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves. They are visible to partners.
- **DEP-02.** A dependency becomes a D-number issue in `aai-pm` only if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences.
- **DEP-03.** Each D-number issue links to the waiting epic and the epic it waits on. A pilot test (section 12) must confirm that a mention from `aai-pm` does not appear to people without access to `aai-pm`.
- **DEP-04.** The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-pm`. It does not create native relationships for them.

- **DEP-05.** Do not create extra custom fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses the standard fields `Workstream` (the waiting workstream), `Target date` (the needed-by date), `Risk status` and `Assignee`. Its issue body follows this template:

  - Waiting workstream
  - Waiting epic
  - Depends on workstream
  - Depends on epic
  - Needed by
  - Consequence if late
  - Resolution / next action
  - Owner

## 10. Linking to workstream projects

| ID | Requirement |
|---|---|
| LINK-01 | Create a pinned issue in `aai-programme` titled "Workstream directory". For each workstream it lists the lead, the repository and the project URL. Leave entries blank until leads supply them. |
| LINK-02 | Both programme project READMEs link to the directory issue. The PM Control README also lists each lead. |
| LINK-03 | The template README tells leads to link back to Assured AI Programme. |
| LINK-04 | Workstream features and stories are sub-issues of the relevant epic, so sub-issue progress shows in V1 and P1. The pilot must confirm that sub-issues from another repository roll up correctly. |
| LINK-05 | A workstream item enters Assured AI Programme only if it is labelled `thin-slice` or `sprint-demo`, or is a cross-workstream deliverable. Anything else stays in its workstream project. |
| LINK-06 | Every item in either programme project must have a Workstream value. |

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

## 13. Build sequence

1. **Pre-flight.** Confirm the section 3 decisions are recorded. Inspect existing issue types, issue fields, organisation issue-field headroom, project field counts, projects, teams, repository policies, SSO/EMU constraints and permissions in the organisation. Reuse compatible organisation configuration and do not create anything that duplicates something already there.
2. **Organisation setup.** An organisation owner creates or reuses the section 5.1 issue types and section 7.1 issue fields. If they cannot, use the section 7.4 fallback.
3. **Repositories.** Create `aai-programme`, `aai-pm` and the two workstream repositories the pilot needs, with the access agreed in BD-03 and BD-04, and the labels in section 7.3 in each. Create the remaining `aai-wsN` repositories as each lead is confirmed. Pin fields to issue types as set out in section 5.3.
4. **Projects.** Create both programme projects and the template, with the fields and views in sections 7 and 8, in the order listed.
5. **READMEs and directory.** Write the READMEs and create the directory issue.
6. **Automations.** Set up section 11. Stop if the BD-08 token is not yet in place.
7. **Pilot.** Run section 12. Stop if any test fails.
8. **Bulk import.** Import the epics, milestone issues, research question issues and D-number issues from the inputs in section 14, then run the AUTO-11 backfill.
9. **Validation.** Check the acceptance criteria in section 15.
10. **Build report.** Hand back the report described in section 16.

## 14. Inputs the PM will provide

| Input | Used for |
|---|---|
| Epics import CSV and its `gh` CLI script | Epics |
| Roadmap Markdown with the Mermaid Gantt chart | `aai-programme` README; start and target dates |
| Gates outputs list with output months | Milestone issues and Gates output options |
| Research questions R1 to R7, with sub-questions | Research question issues |
| Dependency register D01 to D29 | D-number issues in `aai-pm` |
| Workstream directory details | Directory issue, filled in as leads create their projects |

The agent must not invent users, teams, repositories, dates or field values. Where a value is missing, leave it empty and list it in the build report.

## 15. Acceptance criteria

| ID | Criterion |
|---|---|
| AC-01 | Both programme projects and the template exist in the agreed organisation, with the agreed access |
| AC-02 | Every view in section 8 exists and shows the intended items |
| AC-03 | The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used) |
| AC-04 | Every epic from the CSV appears once in V1 and once in P1 |
| AC-05 | Every Gates output has exactly one milestone issue and one saved filter in V3 |
| AC-06 | All seven research questions exist, and every epic has a Primary research question, which may be None |
| AC-07 | Every D-number from the register exists once in `aai-pm` and links to two real epics |
| AC-08 | No WHO internal or Restricted information appears anywhere in a partner-visible repository |
| AC-09 | No automation sets readiness, approval, a decision or risk acceptance |
| AC-10 | The READMEs explain each field, how items enter each project, who owns what, and how the projects link |
| AC-11 | All pilot tests PIL-01a, PIL-01b and PIL-02 to PIL-10 passed before the bulk import |
| AC-12 | Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to either programme project |
| AC-13 | WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Workstream = WS5 and Pipeline stage = Cross-cutting / N/A where appropriate |
| AC-14 | Every D-number and DEC-number issue title starts with its number |
| AC-15 | Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report |
| AC-16 | Every item with a Gates output value also carries the matching `gates:` label |
| AC-17 | Every item with a Primary research question other than None also carries the matching `rq:` label |

## 16. Build report

The agent hands back a short report covering:

- what was created, what existing organisation configuration was reused, the organisation issue-field headroom and each project's total field count after the build
- the pass or fail result for each pilot test and acceptance criterion
- any fallback used, and why
- permissions that still need an organisation owner
- every value left empty because it was missing from the inputs

## 17. Open points to be confirmed by the PM

- The start date of the first sprint (S0), used for the Sprint iteration field in the workstream template.
- The final Gates output list and output months.
- Whether Gates Foundation contacts get access to Assured AI Programme.
- For each workstream, which partner source-code repositories stay external, and how WHO issues link to them (BD-02b).
- The final workstream names used as Workstream field options (WS1 to WS5), before the field is created. Renaming options later is possible but disruptive.

## 18. Out of scope

- Workstream backlogs, and any views specific to one workstream.
- A partner contribution or partner commitments view.
- Importing the PM's existing decision log or the project asset inventory.
- Making any project or repository public.
- Changing organisation-wide GitHub security or access policies.
