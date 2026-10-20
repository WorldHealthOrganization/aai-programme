---
doc_id: assured-ai-github-programme-requirements-v041
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s025-13-build-sequence
section_title: "13. Build sequence"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.1.md"
lines: 376-388
source_sha256: bba5ea9ca2d3cff7
granularity: heading
---
## 13. Build sequence

1. **Pre-flight.** Confirm the section 3 decisions are recorded. Inspect existing issue types, issue fields, organisation issue-field headroom, project field counts, projects, teams, repository policies, SSO/EMU constraints and permissions in the organisation. Reuse compatible organisation configuration and do not create anything that duplicates something already there.
2. **Organisation setup.** An organisation owner creates or reuses the section 5.1 issue types and section 7.1 issue fields. If they cannot, use the section 7.4 fallback.
3. **Repositories.** Create `aai-programme`, `aai-pm` and the two workstream repositories the pilot needs, with the access agreed in BD-03 and BD-04, and the labels in section 7.3. Create the remaining `aai-wsN` repositories as each lead is confirmed. Pin fields to issue types as set out in section 5.3.
4. **Projects.** Create the programme project and the template, with the views in section 8, in the order listed.
5. **READMEs and directory.** Write the READMEs and create the directory issue.
6. **Automations.** Set up AUTO-01 to AUTO-11. Stop if the BD-08 credentials are not yet in place.
7. **Pilot.** Run section 12. Stop if any test fails.
8. **Bulk import.** Import the epics, milestones, research questions, dependencies and the decision template from the inputs in section 14, then run the AUTO-11 backfill.
9. **Charts and validation.** Build charts M1 to M5 and check the acceptance criteria in section 15.
10. **Build report.** Hand back the report described in section 16.
