<!-- GENERATED from aai-programme/processes/process/programme-pilot.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: the pilot

> **Generated, and not the authority.** This is `aai-programme/processes/process/programme-pilot.bpmn` (process `Process_AAI_Pilot`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Prove the set-up small before building it big (req:aai-design-principles#DP-08): build the section 12 pilot set from representative Assured AI items, each marked as a pilot, run every pilot test, and stop on the first failure.

## Begin — Steps 2 to 6 done (`Start_AAI_Pilot`)

- Begin here.
- Call `workflow_start` with `process: "Process_AAI_Pilot"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Account` (Provide the test partner account)

### 1. Provide the test partner account (`A_Account`)

- Who: the `WHO GitHub owner` lane (role `who-github-owner`).
- What: One account with partner-level access, removed after the build (req:aai-decisions#BD-03b).
- Record it: `workflow_complete` with `node: "A_Account"`.
- next: → `A_Set` (Create the pilot set, each item marked pilot)

### 2. Create the pilot set, each item marked pilot (`A_Set`)

- Who: the `Build agent` lane (role `build-agent`).
- What: One epic; two features in two workstream repositories as its sub-issues, one blocked by the other; a D-number, a decision, a research question and a milestone; one item with Review type set; one `thin-slice` and one `sprint-demo` item; one issue linking to an external partner repository.
- Record it: `workflow_complete` with `node: "A_Set"`.
- next: → `A_Tests` (Run the pilot tests)

### 3. Run the pilot tests (`A_Tests`)

- Who: the `Build agent` lane (role `build-agent`).
- What: PIL-01, PIL-02, PIL-03, PIL-05, PIL-06 and PIL-08 to PIL-11 (req:aai-pilot), each recorded with its result.
- Record it: `workflow_complete` with `node: "A_Tests"`.
- next: → `A_Partner` (Run PIL-07 as the test partner)

### 4. Run PIL-07 as the test partner (`A_Partner`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Set Integration readiness to Validated on a pilot item with no confirmation comment; AUTO-10 must add `validation-exception` and one comment, and nothing more when run again (req:aai-pilot#PIL-07).
- Record it: `workflow_complete` with `node: "A_Partner"`.
- next: → `A_Confirm` (Confirm validation on the pilot item)

### 5. Confirm validation on the pilot item (`A_Confirm`)

- Who: the `Technical Integration Lead` lane (role `technical-integration-lead`).
- What: Post `Validation confirmed:` with the evidence, so AUTO-10 removes the label (req:aai-automation#AUTO-10).
- Record it: `workflow_complete` with `node: "A_Confirm"`.
- next: → `GW_Passed` (Every test passed?)

### Decide — Every test passed? (`GW_Passed`)

- Answered by the recorded results: does every pilot test pass?
- Call `workflow_complete` with `node: "GW_Passed"` and `outcome` set to the label that holds:
  - «no» → `End_StopPilot` (Stopped: report the failure)
  - «yes» → `A_Report` (Report the results on the programme issue)

## Done — Stopped: report the failure (`End_StopPilot`)

- The instance completes here: Stop and report which test failed and why. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 6. Report the results on the programme issue (`A_Report`)

- Who: the `Build agent` lane (role `build-agent`).
- What: One line per pilot test with its result and evidence.
- Record it: `workflow_complete` with `node: "A_Report"`.
- next: → `A_Agree` (Agree to the bulk import)

### 7. Agree to the bulk import (`A_Agree`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: The PM accepts the results before step 8 starts.
- Record it: `workflow_complete` with `node: "A_Agree"`.
- next: → `End_AAI_Pilot` (Ready for the bulk import)

## Done — Ready for the bulk import (`End_AAI_Pilot`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
