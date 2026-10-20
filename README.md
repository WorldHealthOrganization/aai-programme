# aai-programme

Coordination for the WHO Assured AI programme: the requirements, the processes that build the programme's GitHub set-up, and the combined work plan. Staged here, in `litlfred/aai-programme`, until the owner syncs it to the WHO organisation. Programme status is held on GitHub issues; see the programme set-up request, [litlfred/folio-assistant#2605](https://github.com/litlfred/folio-assistant/issues/2605).

The site is at <https://litlfred.github.io/aai-programme/>, and a branch's preview at `STAGING/<branch>/` under it. Both are built and published by an agent, never by a workflow (owner, 2026-10-10): `bun run site:build -- --publish` for the root, `bun run site:build -- --staging <branch> --publish` for a preview. Mount the layers first with `bun run cat mount:remote` and the work plan with `bun run cat state:mount`.

Until Platform has a repository of its own, its scope is recorded here.

## What Platform is

Agreed by the PM & Architecture Integration on [folio-assistant#2605](https://github.com/litlfred/folio-assistant/issues/2605#issuecomment-6291128158):

- Platform is a **cross-cutting technical delivery function** that supports WS1 to WS5. It is not a sixth research workstream.
- It follows the same issue, field, label and linking rules as the workstream repositories `aai-ws1` to `aai-ws4`. Its deliverables are features under programme epics in `aai-programme`.
- It has a named lead with Maintain access on this repository. **The lead is not yet confirmed.**
- Technical integration readiness is judged by the Technical Integration Lead, not by Platform.

### Still to agree

- **Lead.** To be confirmed with Ritika and the relevant technical colleagues.
- **Scope.** Which activities belong to Platform and which to WS1 or the other technical workstreams. Candidates from project 110, to be reviewed with Ritika before anything moves: rendering knowledge-graph content to Pages, pipeline Docker images, deploying folio-assistant to OHS, safe self-hosting, and the country data-sovereign pipeline (cross-workstream).
- **Board.** If project 110 becomes the Platform board, Ritika and the Platform lead agree who owns it.

## Issues and beans

The Platform board of record is the **issues** on the programme and Platform projects. Beans are the agents' working notes on how to do that work. They never replace an issue.

**Proposed rule for when a bean becomes an issue** (open for discussion):

- **Open an issue** when the work needs a person to see or act on it: it delivers part of a programme epic, changes a date, creates or clears a dependency on another workstream, or needs a human review or decision. Link the bean to it with `issue:`.
- **Keep it a bean** when it is a step inside work that already has an issue, or agent housekeeping that nobody outside the repository needs to track.
- **Going back.** An issue that turns out to be agent housekeeping is closed as not planned, with a link to the bean that carries on the work.

The board below counts open beans without an issue, so the gaps stay visible.

## This repository is a knowledge graph

It is a cat-harness instance named `aai-programme`, declared in [`aai-programme.json`](aai-programme.json). It holds:

- **`processes/`**: the programme's processes as BPMN, starting with the build sequence. See [`processes/README.md`](processes/README.md).
- **`library/`**: the programme requirements, ingested from [`uploads/`](uploads/): v0.3.6, the original request on [litlfred/smart-ra#76](https://github.com/litlfred/smart-ra/issues/76); v0.4.1 as written by the PM & Architecture Integration; the v0.4.2 draft; and **v0.5, the current draft: everything public, no private layer**. Each section is a JSON-LD node that beans, processes and issues can cite.
- **`beans/`**: the work plan, kept on the branch `cat/aai-platform/beans`.

[`index.config.json`](index.config.json) lists the other knowledge graphs whose work plans the board reviews, each pinned to a commit the owner approved and limited to its `beans` directory. Until that list has been tested, `beans-sources.json` and `scripts/pull-beans.ts` still build the board.

## Programme automations

What runs on its own (AUTO-07). **No tokens** (owner, 2026-10-20): the programme fields are labels on the issues ([`fields.ts`](scripts/programme/fields.ts)), the automations write those labels with the workflow's own token, and [project 110](https://github.com/orgs/WorldHealthOrganization/projects/110), the programme project by the owner's decision of the same day, shows them ([set-up](docs/staging-project.md)). The scripts are in [`scripts/programme/`](scripts/programme/); their decisions are in `rules.ts`, tested in `rules.test.ts`; the workflow is [`programme-automations.yml`](.github/workflows/programme-automations.yml). Every script reruns safely and has `--dry-run` (AUTO-08). None sets Integration readiness, Review status, Risk category, Impact, a decision or a risk acceptance (AUTO-05).

| Automation | Trigger | What it does | Scope | Owner |
|---|---|---|---|---|
| AUTO-01 add to the board | by hand in project 110 | Programme-level items by type, and workstream items labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`. 110's auto-add cannot read a repository outside WHO's organisation | project 110 | PM & Architecture Integration |
| AUTO-03 Programme status | an issue opened, closed or reopened | `status:Not started` on a new programme item with no status; `Done` when closed as completed; `Cancelled` when closed as not planned; `In progress` when reopened | items on the board | PM & Architecture Integration |
| AUTO-04 Delivery health | daily | Raises an open epic's `health:` label to the worst `blocked` or `at-risk` label on its open sub-issues; never lowers it | open epics | the epic's owner lowers it |
| AUTO-10 validation check | daily | An item labelled `readiness:Validated` with no `Validation confirmed:` comment from someone with write access to the repository (or, once named, the Technical Integration Lead) gets `validation-exception` and one comment; the label goes when the comment appears or the value changes | items on the board | Technical Integration Lead |

Whose confirmation counts for AUTO-10 (owner, 2026-10-20): the repository's own permissions, so its owner, members and collaborators, while no Technical Integration Lead is named. Setting `technicalIntegrationLead` in [`scripts/programme/config.json`](scripts/programme/config.json) narrows it to that login. Until then anyone with write access can confirm, so a partner with Write on their own workstream repository could confirm their own work there; the [QA report](https://litlfred.github.io/aai-programme/qa/validation/) (`scripts/programme/qa-validation.ts`, rebuilt on every publish) shows who set and who confirmed each, and flags self-confirmation. AUTO-11 (backfill) is not needed: nothing can add to 110 without a token, so items are added there by hand.

## Programme issues and beans

How a bean becomes a programme issue, and how the two are kept from drifting, is in the knowledge graph as two processes: [triage a bean](https://litlfred.github.io/aai-programme/en/cat-harness/processes/bean-triage.html) ([bpmn](processes/process/bean-triage.bpmn)) and [act on bean drift](https://litlfred.github.io/aai-programme/en/cat-harness/processes/bean-drift.html) ([bpmn](processes/process/bean-drift.bpmn)). Run the check on demand by commenting `/check-drift` on any issue; the report is [`pulled/drift.md`](pulled/drift.md) and the board's [Bean drift](https://litlfred.github.io/aai-programme/programme/drift.html) page.

## Labels

The labels from section 7.3 of the programme requirements. Keep them unchanged.

| Label | Meaning |
|---|---|
| `rq:R1` to `rq:R7` | Every research question the item contributes to |
| `route:control`, `route:0`, `route:a`, `route:b` | Which comparison routes the item covers |
| `thin-slice` | Part of the end-to-end demo slice |
| `sprint-demo` | To be shown at the next fortnightly sprint review |
| `blocked`, `at-risk` | Raised by the team on its own items. Add a "Next action" line to the issue body: what will happen, who will do it, and by when |
| `needs-review` | Ready for WHO review |
| `validation-exception` | Set by automation only |

The `gates:` labels, one per Gates output, are added once the PM supplies the Gates output list.

## Beans board

Beans are the agents' work plan: one Markdown file per work item, read by the [`beans`](https://github.com/hmans/beans) CLI.

- **This repository's beans** live on the branch [`cat/aai-platform/beans`](../../tree/cat/aai-platform/beans). `bun run cat state:mount` puts it at `beans/`.
- **The combined board**, [`pulled/README.md`](pulled/README.md), lists the beans of every repository in [`beans-sources.json`](beans-sources.json). To add or remove a repository, edit that file. Repositories on its `deny` list are refused.
- A bean that tracks programme work carries `issue:` with the URL of its GitHub issue. The issue is the source of truth; the board counts open beans without one.

```sh
bun run scripts/pull-beans.ts            # rebuild pulled/
bun run scripts/pull-beans.ts --dry-run  # print the summary only
bun run scripts/pull-beans.ts --check    # fail if pulled/ is out of date
```

The `Pull beans` workflow rebuilds the board every day and on demand.
