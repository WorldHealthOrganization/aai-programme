# aai-programme (staged as aai-platform)

Platform for the WHO Assured AI programme: shared hosting and engineering. Programme status is held on GitHub issues; see the programme set-up request, [litlfred/folio-assistant#2605](https://github.com/litlfred/folio-assistant/issues/2605).

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
- **`beans/`**: the work plan, kept on the branch `cat/aai-platform/beans`.

[`index.config.json`](index.config.json) lists the other knowledge graphs whose work plans the board reviews, each pinned to a commit the owner approved and limited to its `beans` directory. Until that list has been tested, `beans-sources.json` and `scripts/pull-beans.ts` still build the board.

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

- **This repository's beans** live on the branch [`cat/aai-platform/beans`](../../tree/cat/aai-platform/beans). Run `scripts/state-mount.sh` to put it at `.state/`, where `.beans.yml` points the CLI.
- **The combined board**, [`pulled/README.md`](pulled/README.md), lists the beans of every repository in [`beans-sources.json`](beans-sources.json). To add or remove a repository, edit that file. Repositories on its `deny` list are refused.
- A bean that tracks programme work carries `issue:` with the URL of its GitHub issue. The issue is the source of truth; the board counts open beans without one.

```sh
bun run scripts/pull-beans.ts            # rebuild pulled/
bun run scripts/pull-beans.ts --dry-run  # print the summary only
bun run scripts/pull-beans.ts --check    # fail if pulled/ is out of date
```

The `Pull beans` workflow rebuilds the board every day and on demand.
