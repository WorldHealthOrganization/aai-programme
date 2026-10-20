<!-- GENERATED from aai-programme/processes/process/dependency-escalation.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: record and escalate a dependency

> **Generated, and not the authority.** This is `aai-programme/processes/process/dependency-escalation.bpmn` (process `Process_AAI_Dependency`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

A dependency starts as a native "blocked by" link in the workstream (req:aai-dependencies#DEP-01).

## Begin — A dependency is found (`Start_AAI_Dependency`)

- Begin here.
- Call `workflow_start` with `process: "Process_AAI_Dependency"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Native` (Link the issues with "blocked by")

### 1. Link the issues with "blocked by" (`A_Native`)

- Who: the `Workstream team` lane (role `workstream-team`).
- What: GitHub's native relationship between the two issues (req:aai-dependencies#DEP-01).
- Record it: `workflow_complete` with `node: "A_Native"`.
- next: → `GW_Significant` (Programme-significant?)

### Decide — Programme-significant? (`GW_Significant`)

- Answered by the lead against DEP-02: does it cross workstreams or partners, and need a deadline, negotiation, escalation or an assessment of consequences?
- Call `workflow_complete` with `node: "GW_Significant"` and `outcome` set to the label that holds:
  - «no» → `End_StopLocal` (Handled in the workstream)
  - «yes» → `A_Raise` (Raise it with the PM)

## Done — Handled in the workstream (`End_StopLocal`)

- The instance completes here: The native link is the whole record. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 2. Raise it with the PM (`A_Raise`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: Name the waiting epic, what it waits on, when it is needed by and the consequence if late.
- Record it: `workflow_complete` with `node: "A_Raise"`.
- next: → `A_DNumber` (Create the D-number issue)

### 3. Create the D-number issue (`A_DNumber`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: In `aai-programme`, its title starting with the D-number (req:aai-acceptance#AC-14), its body following the DEP-05 template, with Workstream (the waiting one), Target date (needed by), Delivery health, Risk category, Impact and assignee (req:aai-dependencies#DEP-05).
- Record it: `workflow_complete` with `node: "A_DNumber"`.
- next: → `A_Next` (Write the Next action)

### 4. Write the Next action (`A_Next`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: When it is At risk or Blocked: what will happen, who will do it, and by when, in the issue body.
- Record it: `workflow_complete` with `node: "A_Next"`.
- next: → `GW_Epic` (A true blocking dependency between epics?)

### Decide — A true blocking dependency between epics? (`GW_Epic`)

- Answered by the PM (req:aai-dependencies#DEP-03): is it a true blocking dependency on another epic, rather than on a review, an external decision or a shared platform item?
- Call `workflow_complete` with `node: "GW_Epic"` and `outcome` set to the label that holds:
  - «no» → `End_StopNoLink` (Tracked in V9 and V10)
  - «yes» → `A_EpicLink` (Link the two epics with "blocked by")

## Done — Tracked in V9 and V10 (`End_StopNoLink`)

- The instance completes here: No native link between epics: the D-number issue is the record. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 5. Link the two epics with "blocked by" (`A_EpicLink`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: Only for a true blocking dependency between epics (req:aai-dependencies#DEP-03).
- Record it: `workflow_complete` with `node: "A_EpicLink"`.
- next: → `End_AAI_Dependency` (Tracked, and the epics linked)

## Done — Tracked, and the epics linked (`End_AAI_Dependency`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
