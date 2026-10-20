---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s029-15-acceptance-criteria
section_title: "15. Acceptance criteria"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 429-452
source_sha256: 6be31bf530ba67cf
granularity: heading
---
## 15. Acceptance criteria

| ID | Criterion |
|---|---|
| AC-01 | The programme project and the template exist in the agreed organisation, with the agreed access for partners, Gates Foundation contacts and WHO staff |
| AC-02 | Every view in section 8.1 exists and shows the intended items |
| AC-03 | The section 7.1 fields are organisation issue fields, and no project field duplicates them (unless the section 7.4 fallback was used) |
| AC-04 | Every epic from the CSV appears once in V1 |
| AC-05 | Every Gates output has exactly one milestone issue and one saved filter in V3 |
| AC-06 | All seven research questions exist, and every epic has a Primary research question, which may be None |
| AC-07 | Every D-number from the register exists once in `aai-programme` and links to the waiting epic and what it waits on; native "blocked by" relationships exist only where DEP-03 calls for them |
| AC-08 | Nothing section 6 keeps off GitHub appears in any repository, issue, comment, commit or attachment |
| AC-09 | No automation sets readiness, approval, risk category, impact, a decision or risk acceptance |
| AC-10 | The READMEs explain each field, how items enter the project, who owns what, what is kept off GitHub and why, and how the projects link |
| AC-11 | All pilot tests PIL-01 to PIL-11 passed before the bulk import |
| AC-12 | No `aai-ws5` repository or WS5 project exists. Every workstream repository created so far exists in the WHO organisation with the agreed roles, and none was created before its lead was confirmed; no issue from an external repository has been added to the programme project |
| AC-13 | WS5 Governance and stewardship is not represented as the final sequential pipeline stage; cross-cutting items use Pipeline stage = Cross-cutting / N/A where appropriate |
| AC-14 | Every D-number and DEC-number issue title starts with its number |
| AC-15 | Organisation issue-field headroom and every project's total field count are within GitHub limits, and both are recorded in the build report |
| AC-16 | Every item with a Gates output value also carries the matching `gates:` label |
| AC-17 | Every item with a Primary research question other than None also carries the matching `rq:` label |
| AC-18 | Charts M1 to M5 exist, or the report records which cannot be built natively |
| AC-19 | Every pilot item in V10 carries a "Next action" line in its issue body |
