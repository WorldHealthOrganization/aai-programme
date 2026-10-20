# Staging the Assured AI Programme project

How to create, by hand, the staging copy of the programme project for [`litlfred/aai-programme`](https://github.com/litlfred/aai-programme), so the board the requirements describe can be seen and tested before the WHO build. Generated from [requirements v0.5](https://github.com/litlfred/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md); the views and fields are its section 8.1 and 7.1.

## Why it differs from the WHO build

`litlfred` is a personal account. Issue fields and issue types exist only on an organisation, so this copy uses the requirements' own fallback (section 7.4) and one stand-in:

- **Fields are project fields** with the same names and options as section 7.1 (req:aai-acceptance#AC-03 allows this when the fallback is used).
- **Issue types are `type:` labels** (`type:epic`, `type:milestone`, `type:research-question`, `type:dependency`, `type:decision`, `type:assumption`, `type:feature`, `type:story`, `type:spike`, `type:task`). Views and the auto-add filter select on them where the WHO build would select on the issue type.
- **One repository.** Workstream items sit in `aai-programme` too, so PIL-02 (sub-issues from two repositories roll up) cannot be tested here.

Projects and their views cannot be created through this session (and views have no API at all), so the steps below are done by a person.

## 1. Create the project

1. github.com/litlfred → **Projects** → **New project** → **Table**. Name: **Assured AI Programme (staging)**. Visibility: **Public** (req:aai-information#SEC-04).
2. Settings → **Manage access**: leave as is.

## 2. Add the 14 fields

In the project: **+** at the end of the header row → **New field**, for each row below. Single select options in the order given. Do not add any other field (section 7.2).

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

## 3. Create the 13 views

For each row: **New view** (the tab bar) → pick the layout → name it exactly → set the filter, group, sort and the visible fields. The filter column is this staging copy's; the WHO build filters on issue types. Field filters are written the way GitHub's project filter bar spells a field (lower case, spaces as hyphens); I could not test them from here, so adjust any the filter bar rejects.

| View | Name | Layout | Filter (staging) | Group and sort | Fields shown |
|---|---|---|---|---|---|
| V1 | Master programme | Table | `label:type:epic` | Group by Workstream; sort by Start date | Title, Programme status, Delivery health, Pipeline stage, Start date, Target date, Gates output, Primary research question, sub-issue progress |
| V2 | Roadmap | Roadmap | `label:type:epic,type:milestone` | Group by Workstream; zoom to quarter | Start date, Target date, Programme status, Delivery health |
| V3 | Milestones | Table | `label:type:milestone` (then one saved filter per `gates:` label) | Group by Gates output; sort by Target date. One saved filter per Gates output on its `gates:` label, which shows both primary and secondary contributions | Title, Workstream, Programme status, Delivery health, Target date |
| V4 | Research questions | Table | `label:type:research-question` (then one saved filter per `rq:` label) | Group by Primary research question. One saved filter per research question on its `rq:` label | Title, Workstream, Programme status, `rq:` and `route:` labels |
| V5 | Pipeline stages | Board | `label:type:epic,thin-slice` | Columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A shown separately. Saved filter for `label:thin-slice` | Title, Workstream, Programme status, Delivery health |
| V6 | Integration readiness | Table | `label:thin-slice,type:epic -integration-readiness:"Not assessed"` | Group by Pipeline stage; sort by Target date. Saved filter "Awaiting validation": Integration readiness is Ready to integrate | Title, Workstream, Integration readiness, assignee, Target date, sub-issue progress |
| V7 | Sprint review | Table | `label:sprint-demo` | Group by Workstream | Title, Workstream, Programme status, linked epic |
| V8 | Next 30 days | Table | `is:open target-date:@today..@today+30d` | Group by Workstream; sort by Target date | Title, Workstream, Programme status, Delivery health, assignee, Target date |
| V9 | Dependencies | Table | `label:type:dependency` | Group by Workstream (the waiting workstream); sort by Target date | Title (starts with D-number), Workstream, Delivery health, Impact, Target date, assignee |
| V10 | Blocked and at risk | Table | `delivery-health:"At risk","Blocked"`, plus a second view filter `label:blocked,at-risk,validation-exception` if one filter cannot hold both | Group by Delivery health, then Workstream; sort by Impact, then Target date | Title, Workstream, Risk category, Impact, Target date, assignee |
| V11 | WHO review | Board | `-review-type:"Not needed"` | Columns by Review status; sort by Target date | Title, Workstream, Review type, Target date |
| V12 | Decisions | Table | `label:type:decision` | Group by open or closed; sort by Target date | Title (starts with DEC-number), Workstream, Programme status, Target date |
| V13 | Overdue | Table | `target-date:<@today -programme-status:Done,Cancelled` | Group by Workstream | Title, Target date, Delivery health, assignee |

Notes from section 8.1 that matter while you set them up:

- V6 gets a saved filter "Awaiting validation": Integration readiness is Ready to integrate. It is the Technical Integration Lead's queue.
- V10's view description: "Every item here carries a Next action line in its issue body; open the item for it."
- V3 and V4 get one saved filter per Gates output and per research question once those lists exist.

## 4. Auto-add (AUTO-01)

Project → **…** → **Workflows** → **Auto-add to project** → repository `litlfred/aai-programme`, filter:

```
is:issue label:type:epic,type:milestone,type:research-question,type:dependency,type:decision,type:assumption,thin-slice,sprint-demo,blocked,at-risk
```

That is AUTO-01 in this copy: programme-level items by type, and workstream items only when labelled (req:aai-linking#LINK-05). A WS5 task with none of these labels stays off the board.

Then add the items that already exist: in the project, **Add item** → paste `litlfred/aai-programme#<n>` for each pilot issue, or run the backfill (AUTO-11) once it exists.

## 5. Charts (M1 to M5)

Project → **Insights** → **New chart**, one per row of [the metrics](https://litlfred.github.io/aai-programme/docs/requirements/aai-metrics.html). Record any that cannot be built natively instead of building a workaround (section 8.2).

## 6. Set the pilot items' fields

Each pilot issue's body has a **Programme fields** table: the value each field takes. Set them in the project table view; the automations will keep Programme status and Delivery health current from then on.

