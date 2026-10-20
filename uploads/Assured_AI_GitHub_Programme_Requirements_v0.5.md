# Assured AI: requirements for the programme GitHub project

**Build specification for an AI agent**

| Document control | Detail |
|---|---|
| Purpose | Requirements for an AI agent to set up one shared, organisation-level GitHub Project for the WHO Assured AI project (Gates Foundation grant INV-108130), linked to the workstream projects |
| Version | 0.5 draft, 20 October 2026. Replaces v0.4.2 and v0.4.1. Changes in section 0 |
| Status | Approved for a pilot build. The build must not go beyond pre-flight (section 13, step 1) until the decisions in section 3 are confirmed |
| Owner | PM & Architecture Integration, Assured AI project, WHO |
| Audience | AI build agent, WHO GitHub organisation owners, workstream leads |

## 0. What changed from v0.4.1

From the PM & Architecture Integration's decisions of 20 October 2026 on [litlfred/folio-assistant#2605](https://github.com/litlfred/folio-assistant/issues/2605#issuecomment-6291128158):

| # | Change | Sections |
|---|---|---|
| 1 | **WS5 has no repository or project of its own.** WS5 Governance and stewardship is led by the PM & Architecture Integration and managed in the programme project. WS5 features and tasks live in `aai-programme` | 1, 1.1, 4, 5.1 |
| 2 | **New `aai-platform` repository** for Platform: a cross-cutting technical delivery function supporting WS1 to WS5, not a sixth research workstream. Same rules as the workstream repositories. Lead to be confirmed | 1.1, 4, 17 |
| 3 | **AUTO-01 adds `aai-programme` issues by issue type only** (Epic, Milestone, Research question, Dependency, Decision, Assumption), so routine WS5 tasks stay off the shared board but still roll up into their epics | 11, LINK-05 |
| 4 | **The pilot uses representative Assured AI items**, marked as pilot, with no artificial dependencies. Project 110 items are not moved for the pilot; they are reviewed with Ritika after it passes | 12 |
| 5 | **Project 110 stays separate.** Its views and iteration setup may be reused for the workstream template, without changing 110 | 8.3, 17 |
| 6 | The Technical Integration Lead role is held by the WHO WS1 lead; the authority comes from the role | 1.1 |
| 7 | **Everything is public; there is no private layer** (v0.5, below) | 6 |

### And from v0.4.2 to v0.5

The owner, 20 October 2026, on the original request (litlfred/smart-ra#76, moved to litlfred/folio-assistant#2605): **all of it is now public, with no private layer.** This finishes the direction of v0.4 (one shared project, at-risk work visible to everyone) and removes what v0.4.1 kept back.

| # | Change | Sections |
|---|---|---|
| 8 | **No `aai-pm`.** The restricted repository, its access rules and its pilot tests (PIL-03, PIL-04, AUTO-02) are gone | 1, 4, 5.1, 11, 12, 13 |
| 9 | **Every repository and project is public.** SEC-04 now says so instead of forbidding it | 6 |
| 10 | **Sensitive material is never put on GitHub.** The six kinds v0.4.1 restricted stay in WHO's own systems with the PM. An issue may say only that a note exists, in neutral words. *This is the agent's reading of "no private"; the PM & Architecture Integration to confirm* | 6, 7.1 |

**Staging.** Until the owner syncs to the WHO organisation, `litlfred/aai-programme` (renamed from `litlfred/aai-platform` on 20 October 2026) stands in for `aai-programme`. A Platform repository named `aai-platform` is still needed (section 4).

## 1. What the build must achieve

Workstream leads run their own delivery in their own projects. Everyone involved in the programme, including partners and Gates Foundation contacts, sees one shared programme picture: what is planned, when, how healthy delivery is, what depends on what, and what is waiting for WHO review. All of it is public. Genuinely sensitive material is never put on GitHub (section 6). The same issue is never copied to make any of this work.

The two principles the agent must follow:

- **Share operational status and delivery impact, publicly; keep sensitive reasoning and internal deliberation off GitHub altogether.**
- **Issue fields hold the shared values; the projects are different views of them.**

| Layer | GitHub object | Purpose | Main users |
|---|---|---|---|
| Programme (shared) | Project: **Assured AI Programme** | Plan, dates, delivery health, dependencies, integration readiness, WHO review status, decisions and research questions | Partners, Gates Foundation contacts, workstream leads, WHO team |
| Workstream delivery | Projects built by each workstream lead (WS1 to WS4, Platform) from the template | Sprint work: features, stories, spikes | Each workstream's lead and team |
| WS5 delivery | The programme project itself | Governance and stewardship deliverables, as programme epics | PM & Architecture Integration |

### 1.1 Terms used in this document

| Term | Meaning |
|---|---|
| PM & Architecture Integration | The programme manager role for the project. Referred to as "the PM" |
| Technical Integration Lead | The person who confirms that technical components are ready to integrate and validates them (DP-05) |
| Workstream (WS1 to WS5) | The five delivery streams of the project, each with its own lead. WS5 Governance and stewardship is led by the PM & Architecture Integration and has no repository or project of its own |
| Platform | A cross-cutting technical delivery function for shared hosting and engineering, supporting WS1 to WS5. It is not a sixth research workstream, but it has its own repository (`aai-platform`) and project and follows the same rules as the workstream repositories |
| Epic code | The reference for each programme epic, for example WS1-E2 (workstream 1, epic 2) |
| Gates output | A contractual output of the Gates Foundation grant, due in a given month |
| Research questions (R1 to R7) | The seven questions the project is designed to answer |
| Routes | The four ways of producing the same product that the project compares: Control (today's human process), Route 0 (an AI model alone), Route A (model plus authoring skills), Route B (model plus skills plus the knowledge graph) |
| Pipeline stages | The steps from WHO guidance to finished products: L1 source guidance, KG knowledge graph, L2 operational content (DAK, the digital adaptation kit), L3 computable content (FHIR and CQL), L5 health skills for AI agents (served through MCP), EVAL evaluation, LOC localization for a country |
| Thin slice | A small piece of content taken through every pipeline stage to prove the end-to-end flow |
| D-number | A programme dependency record, D01 onward |
| DEC-number | A programme decision record, DEC-001 onward |
| Delivery health | Whether an item is On track, At risk or Blocked |
| SME sign-off | Review by a WHO subject-matter expert, for example from the HIV or immunization programme |
| Validation packet | The evidence pack submitted for review of a produced artefact |
| Science Division publication clearance | WHO's internal clearance before anything is published |

## 2. Design principles

| ID | Principle |
|---|---|
| DP-01 | **Create once, show many times.** One issue can appear in several projects. Never clone an issue to report its status somewhere else. |
| DP-02 | **Workstream leads own their delivery.** The agent creates programme epics and the workstream template. It does not create features or stories in workstream repositories. |
| DP-03 | **Programme work is not sprint work.** Sprints are managed inside the workstream projects. The programme project tracks dates, milestones, delivery health and readiness, not sprints. |
| DP-04 | **Open by default, and public.** Everything on GitHub is public. What must not be public (section 6) is not put on GitHub. |
| DP-05 | **Technical integration judgements sit with the Technical Integration Lead.** The Technical Integration Lead owns technical integration readiness and validation, working with the relevant workstream leads and subject-matter experts. The role is currently held by the WHO WS1 lead, but the authority comes from the role, not from WS1. The PM manages sequencing, dates, dependencies, evidence and escalation, and does not make technical readiness judgements. |
| DP-06 | **Automation must not make judgements.** Automation may make deterministic administrative updates, such as adding items, lifecycle status changes and flags raised from labels. It never makes readiness, approval, risk-acceptance or decision judgements. |
| DP-07 | **Keep it simple.** Delivery health, risk category, impact and dates only. No probability or impact scoring model. |
| DP-08 | **Prove it small before building it big.** A pilot build (section 12) must pass before any bulk import. |
| DP-09 | **Plain language.** All titles, field options, view names and READMEs use plain, simple English. Use the role name "PM & Architecture Integration" exactly as written. |

## 3. Decisions needed before the build

The agent may carry out step 1 of section 13 (pre-flight) at any time. It must not configure or create anything from step 2 onward until every decision relevant to that step is confirmed. Each decision has a recommended default.

| ID | Decision | Recommended default | Why it matters |
|---|---|---|---|
| BD-01 | GitHub organisation | **Decided: the existing World Health Organization organisation, shared with other WHO teams.** Login: `WorldHealthOrganization` (https://github.com/WorldHealthOrganization) | Everything sits in it. Because the organisation is shared, the safeguards in BD-01a apply |
| BD-01a | Shared organisation safeguards: (1) the current base permission for members. If it is anything other than "No permission", partners invited as members could read other WHO teams' repositories, and the build must not change it (SEC-05); (2) how many of the 25 organisation issue fields are already used by other teams; (3) which issue types already exist; (4) whether the owners will allow project-specific issue types, and pinning fields to them; (5) that the agent works through a named account with delegated rights, never a shared login | WHO GitHub owner to confirm before step 2. If (1) cannot be met, partners join as outside collaborators instead (see BD-03) | Organisation-wide settings, issue fields and issue types affect every WHO team using the organisation, not just this project |
| BD-02 | All Assured AI coordination repositories (programme and workstream repositories holding issues, features, stories and spikes) sit in that organisation | **Decided: yes** | Issue fields only work on issues in repositories owned by the same organisation |
| BD-02a | Partner source-code repositories, models and other technical assets may stay in partners' own GitHub organisations | **Decided: yes, where partners need it** | Their work is still tracked through issues in the WHO workstream repositories, which link to the external repository. Issues held in external repositories are never added to the programme project |
| BD-02b | How each workstream will link external technical assets, if any, to its WHO-hosted coordination issues | Workstream lead to confirm before bulk import | Each workstream needs a consistent way to point from a WHO issue to the partner's code, for example a link in the issue body or a pull request reference |
| BD-03 | Partners join as organisation members | **Decided: members, subject to BD-01a(1) and the checks in BD-03a.** If the base permission cannot be "No permission", fall back to outside collaborators with access granted per repository. Whichever model is used for partners and for Gates Foundation contacts is recorded in the build report and the programme README | Only organisation members can belong to GitHub teams. Recording the model matters when new partners or contacts are added later |
| BD-03a | Checks before partners are invited: (1) whether the organisation uses SAML single sign-on or Enterprise Managed Users, and if so how partners get WHO identities; (2) seat cost per partner member; (3) base permission for members set to "No permission"; (4) members cannot create repositories or change visibility | WHO GitHub owner and WHO IT to confirm | With single sign-on, members must sign in through WHO's identity provider. With Enterprise Managed Users, WHO's identity system must create the accounts. Either could block or delay partner access |
| BD-03b | A test account with partner-level access for the pilot | WHO GitHub owner to provide one test account, removed after the build | Pilot test PIL-07 needs a real user with partner access. The agent cannot create GitHub accounts |
| BD-04 | Repository roles | Partners: Read on `aai-programme`; Maintain for the workstream lead and Write for the team on their own workstream repository; Triage on other workstream repositories where they contribute. Gates Foundation contacts: Read on `aai-programme` and the workstream repositories, and read access to the programme project | Triage lets people manage issues without changing code |
| BD-05 | Organisation owners willing to create issue fields and issue types | One named WHO owner to run step 2 of section 13 | Only organisation owners can create issue fields and issue types |
| BD-05a | Inspect the organisation's existing issue fields before creating any new ones | Reuse compatible existing fields; do not duplicate them | The organisation-level field limit is shared across the whole organisation |
| BD-06 | Issue fields available on WHO's GitHub plan and permitted by WHO enterprise policy | Check and confirm | If they are unavailable or restricted, the fallback in section 7.4 applies |
| BD-07 | Gates Foundation contacts have access to the programme project | **Decided: yes.** They see everything that is shared, including delivery health and review status | Shared information must be written on the assumption that the funder will read it (SEC-03) |
| BD-08 | Credentials for the GitHub Actions in section 11 | Prefer a GitHub App with least-privilege permissions where WHO policy supports it; otherwise an approved fine-grained token. A WHO GitHub owner creates it and stores it as an organisation secret available only to the repository that holds the scripts | AUTO-03, AUTO-04 and AUTO-10 write to issue fields across repositories, which the default Actions token cannot do. The agent must not design, create or embed credentials itself |

## 4. Structure

```
GitHub organisation: WorldHealthOrganization
│
├── repo  aai-programme   Shared
│         Epics, milestones, research questions, dependencies (D-numbers),
│         decisions (DEC-numbers), assumptions, workstream directory,
│         automation scripts
│
│
├── repo  aai-ws1 … aai-ws4, aai-platform
│         Created by the build once each lead is confirmed; the lead holds Maintain
│         Features, stories, spikes, as sub-issues of aai-programme epics;
│         may link to partner source-code repositories outside WHO GitHub
│         (no aai-ws5: WS5 work lives in aai-programme)
│
├── Project  Assured AI Programme     programme-level aai-programme issues, plus selected workstream items;
│                                      also the project management environment for WS5
└── Project template  Assured AI Workstream Template    copied by each workstream lead
```

Use these repository names unless the PM gives others.

In this document, "workstream repositories" means `aai-ws1` to `aai-ws4` and `aai-platform`. WS5 features, stories and tasks live in `aai-programme`.

Workstream leads and partners cannot create repositories in the organisation (BD-03a), so the build creates the workstream repositories. It creates each `aai-wsN` and `aai-platform` only once that workstream's lead and repository name are confirmed, with the labels in section 7.3, and gives the lead Maintain access. For the pilot it creates only the two workstream repositories the pilot needs. Leads then create their projects from the template.


D-number and DEC-number issues start their title with the number, for example "D07: Validated HIV graph before route runs".

## 5. Work item taxonomy

### 5.1 Issue types

**Shared organisation rule.** The World Health Organization organisation is shared with other WHO teams. Every organisation issue field and every new issue type created for this project is prefixed `AAI`, for example `AAI Workstream` or `AAI Decision`, so it cannot be confused with or collide with another team's. Existing generic issue types (such as Epic, Feature or Task) may be reused if the owners agree. Fields are pinned only to `AAI` issue types, never to shared generic ones, because pinning shows the field on every team's issues of that type. If the owners do not allow `AAI` issue types, do not pin; set the fields through the project views instead and record this in the build report. The rest of this document uses the short names without the prefix.

These are created at organisation level (BD-05). If the organisation already has issue types with the same meaning, reuse them.

| Issue type | Lives in | Used for |
|---|---|---|
| Epic | `aai-programme` | Programme-level work. One per row in the epics import CSV (section 14) |
| Milestone | `aai-programme` | Gates outputs and internal gates |
| Research question | `aai-programme` | R1 to R7 |
| Dependency | `aai-programme` | Programme-significant dependencies (section 9) |
| Decision | `aai-programme` | Programme decisions, open and closed. The decision and its outcome are shared; deliberation stays off GitHub (section 6) |
| Assumption | `aai-programme` | Material programme assumptions |
| Feature, Story, Spike | Workstream repositories; `aai-programme` for WS5 | Created by workstream teams, as sub-issues of epics |


### 5.2 Hierarchy

- Sub-issues represent work breakdown only: Epic, then Feature, then Story or Spike.
- Research questions are **not** parents of epics. An item links to research questions through the `rq:` labels, which list every question it contributes to, including its primary one. The Primary research question field records the main question only, for grouping. The research question issue holds the question, its sub-questions, the rationale and any narrative summary. View V4 is the authoritative list of contributing items; nobody keeps a second list by hand.
- Milestone issues are not parents of epics either. Items link to Gates outputs through the `gates:` labels (the complete record) and the Gates output field (the primary output).

### 5.3 Fields shown on each issue type

Organisation issue fields must be pinned to issue types to appear on the issue form. GitHub allows up to 10 pinned fields per issue type. Pin only these. Fields not pinned to a type can still be set from the project views.

| Issue type | Pinned fields |
|---|---|
| Epic | Workstream, Programme status, Delivery health, Pipeline stage, Integration readiness, Gates output, Primary research question, Start date, Target date, Backlog ref |
| Milestone | Programme status, Delivery health, Gates output, Start date, Target date |
| Research question | Programme status, Primary research question |
| Dependency | Workstream, Programme status, Delivery health, Risk category, Impact, Target date |
| Decision | Workstream, Programme status, Target date |
| Assumption | Workstream, Delivery health, Impact, Target date |
| Feature, Story, Spike | Workstream, Pipeline stage, Integration readiness, Delivery health, Risk category, Impact, Review type, Review status, Primary research question, Target date |

## 6. Information classification

Everything on GitHub is **public**: every repository, every project and every issue, comment, label and field on them (owner, 20 October 2026). There is no restricted layer.

These six kinds of material must not be public, so they are **never put on GitHub**, in any repository, issue, comment, commit or attachment. The PM & Architecture Integration keeps them in WHO's own systems:

- internal deliberations and draft WHO positions not yet agreed
- escalation notes
- contractual, funding or personnel matters
- sensitive security, legal or privacy issues
- internal review commentary, reviewer details and adjudication reasoning
- anything a partner or the funder has shared in confidence

Rules:

- **SEC-01.** Treat everything on GitHub as public: title, body, comments, labels, issue fields, relationships, commit messages and attachments.
- **SEC-02.** When an item has a note that is kept off GitHub, the issue may say so in neutral words, for example "A note is held by the PM", and nothing more: no title, summary or link that hints at its content.
- **SEC-03.** Write on the assumption that every partner, the funder and the public will read it. State facts and the next action, not blame. For example, "Blocked: waiting for the HIV graph schema from WS1, due 20 Nov" rather than an opinion on why.
- **SEC-04.** Every repository and project the build creates is public. Before anything is imported, the PM removes from it what section 6 keeps off GitHub.
- **SEC-05.** Never weaken repository or project permissions beyond what BD-04 sets, and never change organisation-wide security settings.

## 7. Fields

### 7.1 Organisation issue fields

Shared values. Each one is set once on the issue and shows the same value in every project.

| Field | Type | Options or format |
|---|---|---|
| Workstream | Single select | WS1 Knowledge graph, WS2 Authoring, WS3 Evaluation, WS4 Localization, WS5 Governance and stewardship, Platform, Cross-workstream |
| Programme status | Single select | Not started, In progress, In review, Done, Cancelled |
| Delivery health | Single select | On track, At risk, Blocked |
| Risk category | Single select | Dependency, Schedule, Technical, Resource, Review, External, Governance |
| Impact | Single select | Low, Medium, High |
| Pipeline stage | Single select | L1 Corpus, KG Knowledge graph, L2 Operational (DAK), L3 Computable (FHIR/CQL), L5 Health skills + MCP, EVAL Evaluation, LOC Localization, Cross-cutting / N/A |
| Integration readiness | Single select | Not assessed, Not ready, Partly ready, Ready to integrate, Validated |
| Review type | Single select | Not needed, SME sign-off, Validation packet adjudication, Science Division publication clearance |
| Review status | Single select | Not submitted, Submitted, Under WHO review, Feedback issued, Resubmitted, Approved, Closed |
| Gates output | Single select | One option per Gates output from the input list, plus None |
| Primary research question | Single select | R1 to R7, plus None |
| Start date | Date | |
| Target date | Date | For a review item, the date the review is due. For a dependency, the date it is needed by |
| Backlog ref | Text | Epic code, for example WS1-E2 |

That uses up to 14 organisation issue fields. Before creating any of them, the agent must inspect the organisation's existing issue fields, reuse any compatible fields, and confirm that creating the remainder will not exceed the organisation limit or consume unreasonable shared capacity. If headroom is short, the PM decides which fields to drop; the agent does not choose.

Each project has a limit of 50 fields in total, including system fields and issue fields. Workstream leads can add fields to their own projects, so pre-flight and validation must check both limits.

Notes on meaning:

- **Delivery health** describes where the work stands. It is not a WHO judgement of a partner. Risk category and Impact are set only when Delivery health is At risk or Blocked.
- **Next action.** When Delivery health is At risk or Blocked, the issue body carries a short "Next action" line: what will happen, who will do it, and by when. It is kept in the body rather than as a field, to save field capacity.
- **Integration readiness** is a shared technical delivery status, not an internal WHO assurance judgement.
- **Review status** is public, so partners can see where a review stands. Reviewer details, comments and adjudication reasoning are kept off GitHub (section 6).
- **Pipeline stage** describes the end-to-end technical flow. Governance and stewardship are cross-cutting; WS5 work uses `Cross-cutting / N/A` where no pipeline stage applies.
- **Programme status.** Programme views use Programme status, not the built-in Status field. The built-in Status is stored separately in each project, so it will differ between projects. Workstream projects keep the built-in Status for their own boards. Do not automatically mirror a workstream project's built-in Status into Programme status.

### 7.2 Project fields

The programme project needs no project-only fields. Do not add project fields that duplicate the section 7.1 fields.

### 7.3 Labels

Create these in every repository listed in section 4. Workstream leads should keep them unchanged.

| Label | Meaning |
|---|---|
| `rq:R1` to `rq:R7` | Every research question the item contributes to, including the primary one also recorded in the Primary research question field. The labels are the complete record; the field is the main question only |
| `route:control`, `route:0`, `route:a`, `route:b` | Which comparison routes the item covers |
| `gates:` plus the output number, one per Gates output | Every Gates output the item contributes to, including the primary one also recorded in the Gates output field. The labels are the complete record; the field is the primary output only |
| `thin-slice` | Part of the end-to-end demo slice |
| `sprint-demo` | To be shown at the next fortnightly sprint review |
| `blocked`, `at-risk` | Raised by the workstream team on its own items (AUTO-04) |
| `needs-review` | Ready for WHO review |
| `validation-exception` | Set by AUTO-10 only |

### 7.4 Fallback if issue fields are unavailable

If BD-05 or BD-06 cannot be met:

1. Create the section 7.1 fields as project fields in the programme project, with identical names and options.
2. Set values for workstream items in the programme project, not in the workstream projects. Workstream projects keep only their own fields.
3. Record this in the build report.

Do not mix the two approaches.

## 8. Views and metrics

### 8.1 Assured AI Programme views

Each view lists its layout, which items it shows, how they are grouped and sorted, and the columns to display.

| ID | View | Layout | Items | Group and sort | Columns |
|---|---|---|---|---|---|
| V1 | Master programme | Table | Epics | Group by Workstream; sort by Start date | Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress |
| V2 | Roadmap | Roadmap | Epics and milestone issues with dates | Group by Workstream; zoom to quarter | Start date, Target date, Programme status, Delivery health |
| V3 | Milestones | Table | Milestone issues, plus items with any `gates:` label | Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, Delivery health, Target date |
| V4 | Research questions | Table | Research question issues, plus items with any `rq:` label | Group by Primary research question. One saved filter per research question on its `rq:` label | Title, Workstream, Programme status, `rq:` and `route:` labels |
| V5 | Pipeline stages | Board | Epics, plus anything labelled `thin-slice` | Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice` | Title, Workstream, Programme status, Delivery health |
| V6 | Integration readiness | Table | Items labelled `thin-slice`, and epics with Integration readiness other than Not assessed | Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate | Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress |
| V7 | Sprint review | Table | Items labelled `sprint-demo` | Group by Workstream | Title, Workstream, Programme status, linked epic |
| V8 | Next 30 days | Table | Open epics, milestones, dependencies and cross-workstream deliverables with Target date in the next 30 days | Group by Workstream; sort by Target date | Title, Workstream, Programme status, Delivery health, assignee, Target date |
| V9 | Dependencies | Table | Dependency issues | Group by Workstream (the waiting workstream); sort by Target date | Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee |
| V10 | Blocked and at risk | Table | Delivery health At risk or Blocked, or label `blocked`, `at-risk` or `validation-exception` | Group by Delivery health, then Workstream; sort by Impact, then Target date | Title, Workstream, Risk category, Impact, Target date, assignee |
| V11 | WHO review | Board | Items with Review type other than Not needed | Columns by Review status; sort by Target date | Title, Workstream, Review type, Target date |
| V12 | Decisions | Table | Decision issues | Group by open or closed; sort by Target date | Title (starts with DEC-number), Workstream, Programme status, Target date |
| V13 | Overdue | Table | Target date before today and Programme status not Done or Cancelled | Group by Workstream | Title, Target date, Delivery health, assignee |

Notes:

- V6 answers "are we ready to integrate it?", while V5 answers "where is the work?". The "Awaiting validation" filter is the Technical Integration Lead's work queue.
- V7 depends on workstream items labelled `sprint-demo` being added to the project automatically (AUTO-01). After each review the workstream lead removes the label.
- V10 exists so workstreams can act, not just see. Every item in it must carry a "Next action" line in its issue body (section 7.1). The view description tells readers to open the item for it.
- In V11, Science Division items appear only when Review type is Science Division publication clearance.
- V12 makes the DEC issues the decision record from the build onward. Decisions made before the build stay in the PM's existing decision log, and the agent does not import them.

### 8.2 Metrics

Use the project's built-in Insights charts for these. Where a chart cannot be built natively, record that in the build report rather than building a workaround, except for M6.

| ID | Measure | Built from |
|---|---|---|
| M1 | Share of epics On track, At risk and Blocked | Delivery health, epics only |
| M2 | Blocked items by workstream | Delivery health = Blocked, grouped by Workstream |
| M3 | At-risk or blocked dependencies | Dependency issues with Delivery health At risk or Blocked |
| M4 | Overdue deliverables | Same filter as V13 |
| M5 | Integration readiness by pipeline stage | Integration readiness, grouped by Pipeline stage |
| M6 | Average age of blocked items (optional) | A script (AUTO-12) reads the issue timeline to find when Delivery health became Blocked |

### 8.3 Assured AI Workstream Template

Create this as an organisation project template. It contains:

- the issue fields from section 7.1, shown as columns
- a Sprint iteration field (two weeks)
- three views: Sprint board (current sprint, grouped by built-in Status), Backlog (table of all open items), and Roadmap

The template may reuse the views and iteration setup of project 110 (Backlog, Board, Current iteration, Roadmap) by copying it without its draft items. Project 110 itself is not changed. Its six workflows are GitHub defaults.

Project templates do not copy auto-add workflows. The template README must tell leads how to set up auto-add for their own repository.

## 9. Dependencies

- **DEP-01.** Ordinary technical dependencies use GitHub's native "blocked by" and "blocking" relationships between the issues concerned. Workstream teams create these themselves.
- **DEP-02.** A dependency becomes a D-number issue in `aai-programme` if it is programme-significant: it crosses workstreams or partners and needs a deadline, negotiation, escalation or an assessment of consequences.
- **DEP-03.** Each D-number issue links to the waiting epic and to what it waits on. Where that is another epic and the relationship is a true blocking dependency, the agent also creates a native "blocked by" relationship between the two epics. Where the dependency is on a review, an external decision or a shared platform item, no native relationship is created.
- **DEP-04.** The agent imports the existing dependency register (D01 to D29) as D-number issues in `aai-programme`.
- **DEP-05.** Do not create extra fields for waiting epic, epic waited on or needed-by date. Each D-number issue uses Workstream (the waiting workstream), Target date (the needed-by date), Delivery health, Risk category, Impact and Assignee. Its issue body follows this template:

  - Waiting workstream
  - Waiting epic
  - Depends on workstream
  - Depends on epic
  - Needed by
  - Consequence if late
  - Next action
  - Owner

## 10. Linking to workstream projects

| ID | Requirement |
|---|---|
| LINK-01 | Create a pinned issue in `aai-programme` titled "Workstream directory". For each workstream it lists the lead, the repository and the project URL. Leave entries blank until leads supply them. |
| LINK-02 | The programme project README links to the directory issue and to the Roadmap view (V2). Do not add a separate static roadmap or Gantt chart to the README; V2 is the roadmap, kept current from the epic dates. |
| LINK-03 | The template README tells leads to link back to Assured AI Programme. |
| LINK-04 | Workstream features and stories are sub-issues of the relevant epic, so sub-issue progress shows in V1. The pilot must confirm that sub-issues from another repository roll up correctly. |
| LINK-05 | A workstream item, including a WS5 feature or task in `aai-programme`, enters the programme project only if it is labelled `thin-slice` or `sprint-demo`, has Delivery health At risk or Blocked, or is a cross-workstream deliverable. Anything else stays in its workstream project. |
| LINK-06 | Every item in the programme project must have a Workstream value. |
| LINK-07 | Epics are programme-level and owned by the PM. A workstream lead who needs a new or changed epic opens an issue in `aai-programme` proposing it; the PM accepts or declines it. Leads create features, stories and spikes under epics freely. The programme README explains this. |

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

## 13. Build sequence

1. **Pre-flight.** Confirm the section 3 decisions are recorded. Inspect existing issue types, issue fields, organisation issue-field headroom, project field counts, projects, teams, repository policies, SSO/EMU constraints and permissions in the organisation. Reuse compatible organisation configuration and do not create anything that duplicates something already there.
2. **Organisation setup.** An organisation owner creates or reuses the section 5.1 issue types and section 7.1 issue fields. If they cannot, use the section 7.4 fallback.
3. **Repositories.** Create `aai-programme` and the two workstream repositories the pilot needs, public, with the access agreed in BD-03 and BD-04, and the labels in section 7.3. Create the remaining `aai-wsN` repositories as each lead is confirmed. Pin fields to issue types as set out in section 5.3.
4. **Projects.** Create the programme project and the template, with the views in section 8, in the order listed.
5. **READMEs and directory.** Write the READMEs and create the directory issue.
6. **Automations.** Set up AUTO-01 to AUTO-11. Stop if the BD-08 credentials are not yet in place.
7. **Pilot.** Run section 12. Stop if any test fails.
8. **Bulk import.** Import the epics, milestones, research questions, dependencies and the decision template from the inputs in section 14, then run the AUTO-11 backfill.
9. **Charts and validation.** Build charts M1 to M5 and check the acceptance criteria in section 15.
10. **Build report.** Hand back the report described in section 16.

## 14. Inputs the PM will provide

| Input | Used for |
|---|---|
| Epics import CSV, with columns for title, epic code, workstream, start date, target date, Gates outputs, research questions and routes. Each workstream lead reviews their workstream's epics before the bulk import | Epics, and the dates that drive the Roadmap view (V2) |
| Gates outputs list with output months | Milestone issues and Gates output options |
| Research questions R1 to R7, with sub-questions | Research question issues |
| Dependency register D01 to D29 | D-number issues in `aai-programme` |
| Workstream directory details | Directory issue, filled in as leads create their projects |
| GitHub usernames of the Gates Foundation contacts and the Technical Integration Lead | Access (BD-04) and the AUTO-10 setting |

The agent must not invent users, teams, repositories, dates or field values. Where a value is missing, leave it empty and list it in the build report. Before importing the dependency register, the PM removes from it anything section 6 keeps off GitHub.

## 15. Acceptance criteria

| ID | Criterion |
|---|---|
| AC-01 | The programme project and the template exist in the agreed organisation, with the agreed access for partners, Gates Foundation contacts and WHO staff |
| AC-02 | Every view in section 8.1 exists and shows the intended items |
| AC-03 | The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used) |
| AC-04 | Every epic from the CSV appears once in V1 |
| AC-05 | Every Gates output has exactly one milestone issue and one saved filter in V3 |
| AC-06 | All seven research questions exist, and every epic has a Primary research question, which may be None |
| AC-07 | Every D-number from the register exists once in `aai-programme` and links to the waiting epic and what it waits on; native "blocked by" relationships exist only where DEP-03 calls for them |
| AC-08 | Nothing section 6 keeps off GitHub appears in any repository, issue, comment, commit or attachment |
| AC-09 | No automation sets readiness, approval, risk category, impact, a decision or risk acceptance |
| AC-10 | The READMEs explain each field, how items enter the project, who owns what, what is kept off GitHub and why, and how the projects link |
| AC-11 | All pilot tests PIL-01 to PIL-11 passed before the bulk import |
| AC-12 | No `aai-ws5` repository or WS5 project exists. Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to the programme project |
| AC-13 | WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Pipeline stage = Cross-cutting / N/A where appropriate |
| AC-14 | Every D-number and DEC-number issue title starts with its number |
| AC-15 | Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report |
| AC-16 | Every item with a Gates output value also carries the matching `gates:` label |
| AC-17 | Every item with a Primary research question other than None also carries the matching `rq:` label |
| AC-18 | Charts M1 to M5 exist, or the report records which cannot be built natively |
| AC-19 | Every pilot item in V10 carries a "Next action" line in its issue body |

## 16. Build report

The agent hands back a short report covering:

- the access model used for partners and for Gates Foundation contacts (members or outside collaborators)
- what was created, what existing organisation configuration was reused, the organisation issue-field headroom and each project's total field count after the build
- the pass or fail result for each pilot test and acceptance criterion
- any fallback used, and why
- permissions that still need an organisation owner
- every value left empty because it was missing from the inputs

## 17. Open points to be confirmed by the PM

- The start date of the first sprint (S0), used for the Sprint iteration field in the workstream template. Project 110's iteration dates may inform it once checked against the Assured AI programme calendar.
- The accountable Platform lead, confirmed with Ritika and the relevant technical colleagues, before `aai-platform` access is assigned.
- Which activities belong to Platform and which to WS1 or the other technical workstreams.
- If project 110 becomes the Platform board, who owns it (Ritika and the Platform lead to agree).
- The final Gates output list and output months.
- The final workstream names used as Workstream field options (WS1 to WS5), before the field is created. Renaming options later is possible but disruptive.
- For each workstream, which partner source-code repositories stay external, and how WHO issues link to them (BD-02b).
- Which Gates Foundation contacts need accounts, and whether they join as members or outside collaborators (BD-03 and BD-03a apply).

## 18. Out of scope

- Workstream backlogs, and any views specific to one workstream.
- Any private repository or project, including a separate PM project or a restricted `aai-pm` repository.
- A separate WS5 repository or project.
- A partner contribution or partner commitments view.
- Probability and impact scoring.
- Importing the PM's existing decision log or the project asset inventory.
- Making any project or repository public.
- Changing organisation-wide GitHub security or access policies.
