---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s016-7-4-fallback-if-issue-fields-are-unavailable
section_title: "7.4 Fallback if issue fields are unavailable"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 218-227
source_sha256: a0519ae9be127861
granularity: heading
---
### 7.4 Fallback if issue fields are unavailable

If BD-05 or BD-06 cannot be met:

1. Create the section 7.1 fields as project fields, with identical names and options, in both programme projects and in the template.
2. Build a sync job: a GitHub Action that runs daily and on demand, copies the section 7.1 values from Assured AI Programme into PM Control, and reports any mismatches.
3. Record this in the build report.

Do not mix the two approaches.
