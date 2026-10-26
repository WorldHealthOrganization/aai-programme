# Project 110 as the programme board

How to set up [WorldHealthOrganization project 110](https://github.com/orgs/WorldHealthOrganization/projects/110) to show the Assured AI programme, by hand. Owner decisions of 20 October 2026: **project 110 is the programme project** (overriding "110 stays separate and is not changed"), and **no tokens**.

## How it fits together

- **The issues hold the values.** Each programme field (section 7.1) is a label on the issue: `ws:WS1 Knowledge graph`, `status:In progress`, `health:Blocked`, `stage:KG Knowledge graph`, `readiness:Validated`, `review-type:SME sign-off`, `review:Submitted`, `risk:Dependency`, `impact:Medium`. One label per field. Dates, the Backlog ref and the primary research question are in the issue body's **Programme fields** table. The full list is [`scripts/programme/fields.ts`](https://github.com/litlfred/aai-programme/blob/main/scripts/programme/fields.ts).
- **The automations keep them current** with the workflow's own token (AUTO-03 status, AUTO-04 health, AUTO-10 validation). They write labels, never the project.
- **Project 110 shows the issues** through label filters. A view that needs a board column, a roadmap or a date needs a real project field, which nobody can set automatically without a token, so it is set by hand.
- **Issue types are `type:` labels** (`type:epic`, `type:feature`, …): the items live in `litlfred/aai-programme`, outside the WHO organisation, so WHO's issue types and issue fields do not apply to them (BD-02).

Ritika owns 110; tell her before changing it.

## 1. Add the items

Auto-add only reads repositories in WHO's organisation, so items from `litlfred/aai-programme` are added by hand: in 110, **+ Add item** at the bottom of a table → paste each issue's URL. The pilot items are [#4 to #12](https://github.com/litlfred/aai-programme/issues?q=label%3Apilot). Add any later programme item the same way (AUTO-01's rule: `type:epic`, `type:milestone`, `type:research-question`, `type:dependency`, `type:decision`, `type:assumption`, or a workstream item labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`).

## 2. The views

For each row: **New view** → the layout → the name → the filter → the grouping. Make sure the **Labels** field is shown, since that is where the values are. I could not test the filters or "Slice by Labels" from here; adjust any the filter bar rejects.

| View | Name | Filter | Grouping | Needs a hand-set field |
|---|---|---|---|---|
| V1 | Master programme | `label:type:epic` | Slice by Labels, pick the `ws:` labels (stands in for "Group by Workstream") | none |
| V2 | Roadmap | `label:type:epic,type:milestone` | Roadmap needs Start date and Target date | **Start date, Target date** (project date fields, set by hand from each body table) |
| V3 | Milestones | `label:type:milestone` | Group by Gates output | **Gates output** once the list exists |
| V4 | Research questions | `label:type:research-question` | Slice by Labels, pick the `rq:` labels | none |
| V5 | Pipeline stages | `label:type:epic,thin-slice` | Board columns by Pipeline stage | **Pipeline stage** (single select, set by hand from the `stage:` label) |
| V6 | Integration readiness | `label:thin-slice,type:epic` | Slice by Labels, pick the `readiness:` labels; saved filter "Awaiting validation": `label:"readiness:Ready to integrate"` | none |
| V7 | Sprint review | `label:sprint-demo` | Slice by Labels, pick the `ws:` labels | none |
| V8 | Next 30 days | `is:open` | Needs Target date in the next 30 days | **Target date** |
| V9 | Dependencies | `label:type:dependency` | Slice by Labels, pick the `ws:` labels | none |
| V10 | Blocked and at risk | `label:"health:At risk",health:Blocked,blocked,at-risk,validation-exception` | Slice by Labels, pick the `health:` labels | none |
| V11 | WHO review | `label:"review-type:SME sign-off","review-type:Validation packet adjudication","review-type:Science Division publication clearance"` | Board columns by Review status | **Review status** (single select, set by hand from the `review:` label) |
| V12 | Decisions | `label:type:decision` | Group by open or closed (the built-in Status) | none |
| V13 | Overdue | `is:open` | Needs Target date before today | **Target date** |

Seven of the thirteen work from labels alone. The other six (V2, V3, V5, V8, V11 and V13) need a project field kept by hand in step with the issue, which is exactly the drift the requirements were written to avoid (DP-01). V3 needs its field only once the Gates output list exists. A board built from the labels, with nothing kept by hand, can show all thirteen.

## 3. Charts (M1 to M5)

**Insights** → **New chart**. M1 to M5 group by Delivery health, Workstream, Integration readiness and Pipeline stage, which are labels here; if Insights cannot group by a label prefix, record that rather than building a workaround (section 8.2).
