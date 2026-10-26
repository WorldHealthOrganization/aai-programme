<!-- GENERATED from aai-programme/processes/process/epic-proposal.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: propose a new or changed epic

> **Generated, and not the authority.** This is `aai-programme/processes/process/epic-proposal.bpmn` (process `Process_AAI_Epic`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Epics are programme-level and owned by the PM.

## Begin — A new or changed epic is needed (`Start_AAI_Epic`)

- Begin here.
- Call `workflow_start` with `process: "Process_AAI_Epic"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Propose` (Open a proposal issue in aai-programme)

### 1. Open a proposal issue in aai-programme (`A_Propose`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: Say what the epic delivers, its workstream, its dates, its Gates outputs and research questions, and why the existing epics do not cover it.
- Record it: `workflow_complete` with `node: "A_Propose"`.
- next: → `A_Review` (Review the proposal)

### 2. Review the proposal (`A_Review`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: Against the programme plan, the Gates outputs and the other workstreams' epics.
- Record it: `workflow_complete` with `node: "A_Review"`.
- next: → `GW_Decision` (Accept, amend or decline?)

### Decide — Accept, amend or decline? (`GW_Decision`)

- The PM's decision, recorded on the proposal issue.
- Call `workflow_complete` with `node: "GW_Decision"` and `outcome` set to the label that holds:
  - «amend» → `A_Revise` (Revise the proposal)
  - «accept» → `A_Create` (Create or change the epic)
  - «decline» → `End_StopDeclined` (Declined, with the reason)

### 3. Revise the proposal (`A_Revise`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: Answer the PM's points on the same issue.
- Record it: `workflow_complete` with `node: "A_Revise"`.
- next: → `A_Review` (Review the proposal)

### 4. Create or change the epic (`A_Create`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: The epic issue with its fields (Workstream, dates, Gates output, Primary research question, Backlog ref).
- Record it: `workflow_complete` with `node: "A_Create"`.
- next: → `A_Features` (Add features under the epic)

## Done — Declined, with the reason (`End_StopDeclined`)

- The instance completes here: The PM closes the proposal as not planned, saying why. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 5. Add features under the epic (`A_Features`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: As sub-issues in the workstream repository, so their progress rolls up into V1 (req:aai-linking#LINK-04).
- Record it: `workflow_complete` with `node: "A_Features"`.
- next: → `End_AAI_Epic` (Epic in the programme)

## Done — Epic in the programme (`End_AAI_Epic`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
