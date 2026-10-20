<!-- GENERATED from aai-programme/processes/process/integration-validation.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: confirm a component is ready to integrate

> **Generated, and not the authority.** This is `aai-programme/processes/process/integration-validation.bpmn` (process `Process_AAI_Validation`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Integration readiness is proposed by the workstream lead and confirmed by the Technical Integration Lead with evidence (req:aai-design-principles#DP-05).

## Begin — Work believed ready (`Start_AAI_Validation`)

- Begin here.
- Call `workflow_start` with `process: "Process_AAI_Validation"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Ready` (Set Integration readiness to Ready to integrate)

### 1. Set Integration readiness to Ready to integrate (`A_Ready`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: With the evidence linked in the issue.
- Record it: `workflow_complete` with `node: "A_Ready"`.
- next: → `A_Check` (Check the evidence)

### 2. Check the evidence (`A_Check`)

- Who: the `Technical Integration Lead` lane (role `technical-integration-lead`).
- What: With the relevant workstream leads and subject-matter experts.
- Record it: `workflow_complete` with `node: "A_Check"`.
- next: → `GW_Valid` (Validated?)

### Decide — Validated? (`GW_Valid`)

- The Technical Integration Lead's judgement, never inferred from closed sub-issues.
- Call `workflow_complete` with `node: "GW_Valid"` and `outcome` set to the label that holds:
  - «no» → `End_StopNotYet` (Not yet: back with the workstream)
  - «yes» → `A_Confirm` (Post Validation confirmed: and set Validated)

## Done — Not yet: back with the workstream (`End_StopNotYet`)

- The instance completes here: Comment what is missing, and readiness goes back to Partly ready or Not ready. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 3. Post Validation confirmed: and set Validated (`A_Confirm`)

- Who: the `Technical Integration Lead` lane (role `technical-integration-lead`).
- What: A comment starting `Validation confirmed:` with a short note or evidence link, then Integration readiness = Validated (req:aai-automation#AUTO-10).
- Record it: `workflow_complete` with `node: "A_Confirm"`.
- next: → `End_AAI_Validation` (Validated)

## Done — Validated (`End_AAI_Validation`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
