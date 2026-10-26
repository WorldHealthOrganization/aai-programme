<!-- GENERATED from aai-programme/processes/process/bean-triage.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: triage a bean

> **Generated, and not the authority.** This is `aai-programme/processes/process/bean-triage.bpmn` (process `Process_AAI_BeanTriage`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Decide what an open bean is to the programme.

## Begin — An open bean nobody has triaged (`Start_AAI_BeanTriage`)

- Begin here: Found by the bean drift check, or by anyone reading a work plan.
- Call `workflow_start` with `process: "Process_AAI_BeanTriage"` and the subject this run is about; keep the instance id it returns.
- next: → `GW_Matters` (Does the programme need to see it?)

### Decide — Does the programme need to see it? (`GW_Matters`)

- Answered by the rule: does it deliver part of an epic, change a date, create or clear a cross-workstream dependency, or need a human review or decision?
- Call `workflow_complete` with `node: "GW_Matters"` and `outcome` set to the label that holds:
  - «no» → `End_StopBean` (Stays a bean: decision recorded)
  - «yes» → `GW_Epic` (Is there an epic or proposal for it?)

## Done — Stays a bean: decision recorded (`End_StopBean`)

- The instance completes here: Record the decision in docs/beans-triage.json: { id, decision: "not-applicable" or "step", by, at }. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### Decide — Is there an epic or proposal for it? (`GW_Epic`)

- Answered from the board's Workstreams page: does an open epic or epic proposal of its workstream cover it?
- Call `workflow_complete` with `node: "GW_Epic"` and `outcome` set to the label that holds:
  - «yes» → `A_Issue` (Open the issue with its bean line)
  - «no» → `Call_Propose` (Propose an epic)

### 1. Open the issue with its bean line (`A_Issue`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: Under the epic or proposal, as a sub-issue: its `type:`, `ws:` and `stage:` labels, a Programme fields table, and one `<!-- bean: owner/repo/id -->` line per bean it carries.
- Record it: `workflow_complete` with `node: "A_Issue"`.
- next: → `End_AAI_BeanTriage` (Carried by an issue)

### 2. Propose an epic (`Call_Propose`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: There is none: propose one (the epic-proposal process); the issue goes under it.
- A subprocess (`Process_AAI_Epic`): `workflow_next` reports its own steps; complete those — this call activity itself is not completable.
- next: → `A_Issue` (Open the issue with its bean line)

## Done — Carried by an issue (`End_AAI_BeanTriage`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
