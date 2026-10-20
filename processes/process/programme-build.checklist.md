<!-- GENERATED from aai-programme/processes/process/programme-build.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: build the GitHub set-up

> **Generated, and not the authority.** This is `aai-programme/processes/process/programme-build.bpmn` (process `Process_AAI_Build`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Build the shared programme project, its repositories and automations in the order section 13 of the programme requirements sets, stopping wherever a decision, a credential or a pilot test is missing.

## Begin — Build requested (`Start_AAI_Build`)

- Begin here.
- Call `workflow_start` with `process: "Process_AAI_Build"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Preflight` (Step 1: pre-flight)

### 1. Step 1: pre-flight (`A_Preflight`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Inspect the organisation read-only: issue types, issue fields and headroom, project field counts, projects, teams, repository policies, SSO or EMU, and permissions.
- Record it: `workflow_complete` with `node: "A_Preflight"`.
- next: → `GW_Decided` (Decisions for the next step confirmed?)

### Decide — Decisions for the next step confirmed? (`GW_Decided`)

- Answered from the section 3 decision record: is every decision that step 2 onward depends on confirmed?
- Call `workflow_complete` with `node: "GW_Decided"` and `outcome` set to the label that holds:
  - «no» → `A_Decide` (Answer the open BD decisions)
  - «yes» → `A_OrgSetup` (Step 2: create or reuse issue types and fields)

### 2. Answer the open BD decisions (`A_Decide`)

- Who: the `WHO GitHub owner` lane (role `who-github-owner`).
- What: BD-01a, BD-03a, BD-03b, BD-05, BD-06 and BD-08, each with its recommended default unless the owner says otherwise.
- Record it: `workflow_complete` with `node: "A_Decide"`.
- next: → `A_Preflight` (Step 1: pre-flight)

### 3. Step 2: create or reuse issue types and fields (`A_OrgSetup`)

- Who: the `WHO GitHub owner` lane (role `who-github-owner`).
- What: Create or reuse the section 5.1 issue types (`AAI` prefix where new) and the section 7.1 issue fields, and pin them as section 5.3 says.
- Record it: `workflow_complete` with `node: "A_OrgSetup"`.
- next: → `A_Repos` (Step 3: repositories, roles and labels)

### 4. Step 3: repositories, roles and labels (`A_Repos`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Create `aai-programme`, `aai-pm` and the two workstream repositories the pilot needs, with the BD-04 roles and the section 7.3 labels.
- Record it: `workflow_complete` with `node: "A_Repos"`.
- next: → `A_Projects` (Step 4: programme project and template)

### 5. Step 4: programme project and template (`A_Projects`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Create the programme project with views V1 to V13 in the listed order, and the workstream template from section 8.3.
- Record it: `workflow_complete` with `node: "A_Projects"`.
- next: → `A_Readmes` (Step 5: READMEs and directory)

### 6. Step 5: READMEs and directory (`A_Readmes`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Write the READMEs (AC-10, AUTO-07, LINK-02, LINK-03, LINK-07) and create the pinned Workstream directory issue (LINK-01).
- Record it: `workflow_complete` with `node: "A_Readmes"`.
- next: → `GW_Creds` (Automation credentials in place?)

### Decide — Automation credentials in place? (`GW_Creds`)

- Answered by whether the BD-08 credentials exist as an organisation secret.
- Call `workflow_complete` with `node: "GW_Creds"` and `outcome` set to the label that holds:
  - «no» → `End_StopCreds` (Stopped: credentials needed)
  - «yes» → `A_Automations` (Step 6: automations AUTO-01 to AUTO-11)

## Done — Stopped: credentials needed (`End_StopCreds`)

- The instance completes here: The build stops before step 6 and reports the permission it needs. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 7. Step 6: automations AUTO-01 to AUTO-11 (`A_Automations`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Set up the automations.
- Record it: `workflow_complete` with `node: "A_Automations"`.
- next: → `A_Pilot` (Step 7: pilot build)

### 8. Step 7: pilot build (`A_Pilot`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Build the section 12 pilot set from representative Assured AI items, each marked as a pilot, and run PIL-01 to PIL-11.
- Record it: `workflow_complete` with `node: "A_Pilot"`.
- next: → `A_Validate` (Confirm validation on the pilot item)

### 9. Confirm validation on the pilot item (`A_Validate`)

- Who: the `Technical Integration Lead` lane (role `technical-integration-lead`).
- What: For PIL-07: post `Validation confirmed:` with the evidence on the pilot item, so AUTO-10 removes the `validation-exception` label.
- Record it: `workflow_complete` with `node: "A_Validate"`.
- next: → `GW_Pilot` (Every pilot test passed?)

### Decide — Every pilot test passed? (`GW_Pilot`)

- Answered by the PIL-01 to PIL-11 results.
- Call `workflow_complete` with `node: "GW_Pilot"` and `outcome` set to the label that holds:
  - «no» → `End_StopPilot` (Stopped: a pilot test failed)
  - «yes» → `A_Inputs` (Provide the section 14 inputs)

## Done — Stopped: a pilot test failed (`End_StopPilot`)

- The instance completes here: The build stops and reports which pilot test failed. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 10. Provide the section 14 inputs (`A_Inputs`)

- Who: the `PM & Architecture Integration` lane (role `pm-architecture-integration`).
- What: The epics CSV reviewed by each lead, the Gates output list, R1 to R7, the dependency register with restricted content removed, the directory details, and the needed GitHub usernames.
- Record it: `workflow_complete` with `node: "A_Inputs"`.
- next: → `A_Import` (Step 8: bulk import and backfill)

### 11. Step 8: bulk import and backfill (`A_Import`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Import the inputs, leaving missing values empty and listing them, then run the AUTO-11 backfill.
- Record it: `workflow_complete` with `node: "A_Import"`.
- next: → `A_Charts` (Step 9: charts and acceptance checks)

### 12. Step 9: charts and acceptance checks (`A_Charts`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Build charts M1 to M5, or record which cannot be built natively, and check AC-01 to AC-19.
- Record it: `workflow_complete` with `node: "A_Charts"`.
- next: → `A_Report` (Step 10: build report)

### 13. Step 10: build report (`A_Report`)

- Who: the `Build agent` lane (role `build-agent`).
- What: Hand back the section 16 report.
- Record it: `workflow_complete` with `node: "A_Report"`.
- next: → `End_AAI_Build` (Build report handed back)

## Done — Build report handed back (`End_AAI_Build`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
