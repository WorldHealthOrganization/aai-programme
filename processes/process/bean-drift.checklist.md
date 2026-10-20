<!-- GENERATED from aai-programme/processes/process/bean-drift.bpmn by cat-harness-tools/scripts/bpmn-checklist.ts. Do not edit: change the diagram and regenerate (bun run cat bpmn:checklist). -->

# Checklist — Assured AI programme: act on bean drift

> **Generated, and not the authority.** This is `aai-programme/processes/process/bean-drift.bpmn` (process `Process_AAI_BeanDrift`) walked as a state machine. The diagram and the workflow engine decide; this list only reads them. Follow the `next:` line of each step rather than the order on the page, and record each step with the call it names, so the engine's committed state — not this list — says which edge was taken.

Keep the programme issues and the beans they carry from drifting apart.

## Begin — Daily, or a /check-drift comment (`Start_AAI_BeanDrift`)

- Begin here: The Pull beans workflow each day; a `/check-drift` comment by someone with write access; or by hand.
- Call `workflow_start` with `process: "Process_AAI_BeanDrift"` and the subject this run is about; keep the instance id it returns.
- next: → `A_Pull` (Refresh the beans snapshot)

### 1. Refresh the beans snapshot (`A_Pull`)

- Who: the `Programme automation` lane (role `programme-automation`).
- What: scripts/pull-beans.ts reads every store in beans-sources.json into pulled/beans.json.
- Record it: `workflow_complete` with `node: "A_Pull"`.
- next: → `A_Check` (Check every linked issue against its beans)

### 2. Check every linked issue against its beans (`A_Check`)

- Who: the `Programme automation` lane (role `programme-automation`).
- What: scripts/programme/bean-drift.ts: bean completed or scrapped while the issue is open; issue closed while the bean is open; a link to a bean not found; a bean changed since the issue was last touched; an open feature under a closed epic or proposal; open beans nobody has triaged.
- Record it: `workflow_complete` with `node: "A_Check"`.
- next: → `GW_Flags` (Any flags?)

### Decide — Any flags? (`GW_Flags`)

- Answered by the report.
- Call `workflow_complete` with `node: "GW_Flags"` and `outcome` set to the label that holds:
  - «no» → `End_StopClean` (No drift)
  - «yes» → `A_Review` (Review each flag)

## Done — No drift (`End_StopClean`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.

### 3. Review each flag (`A_Review`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: On the board's Bean drift page.
- Record it: `workflow_complete` with `node: "A_Review"`.
- next: → `Call_Triage` (Triage the untriaged beans)

### 4. Triage the untriaged beans (`Call_Triage`)

- Who: the `Workstream lead` lane (role `workstream-lead`).
- What: Each untriaged bean goes through the bean-triage process.
- A subprocess (`Process_AAI_BeanTriage`): `workflow_next` reports its own steps; complete those — this call activity itself is not completable.
- next: → `End_AAI_BeanDrift` (Issues and beans agree)

## Done — Issues and beans agree (`End_AAI_BeanDrift`)

- The instance completes here. `workflow_next` then reports nothing enabled — that, not this line, is the record of completion.
