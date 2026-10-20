---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s025-13-build-sequence
section_title: "13. Build sequence"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 356-368
source_sha256: a0519ae9be127861
granularity: heading
---
## 13. Build sequence

1. **Pre-flight.** Confirm the section 3 decisions are recorded. Inspect existing issue types, issue fields, organisation issue-field headroom, project field counts, projects, teams, repository policies, SSO/EMU constraints and permissions in the organisation. Reuse compatible organisation configuration and do not create anything that duplicates something already there.
2. **Organisation setup.** An organisation owner creates or reuses the section 5.1 issue types and section 7.1 issue fields. If they cannot, use the section 7.4 fallback.
3. **Repositories.** Create `aai-programme`, `aai-pm` and the two workstream repositories the pilot needs, with the access agreed in BD-03 and BD-04, and the labels in section 7.3 in each. Create the remaining `aai-wsN` repositories as each lead is confirmed. Pin fields to issue types as set out in section 5.3.
4. **Projects.** Create both programme projects and the template, with the fields and views in sections 7 and 8, in the order listed.
5. **READMEs and directory.** Write the READMEs and create the directory issue.
6. **Automations.** Set up section 11. Stop if the BD-08 token is not yet in place.
7. **Pilot.** Run section 12. Stop if any test fails.
8. **Bulk import.** Import the epics, milestone issues, research question issues and D-number issues from the inputs in section 14, then run the AUTO-11 backfill.
9. **Validation.** Check the acceptance criteria in section 15.
10. **Build report.** Hand back the report described in section 16.
