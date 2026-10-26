---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s006-4-structure
section_title: "4. Structure"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 80-107
source_sha256: a0519ae9be127861
granularity: heading
---
## 4. Structure

```
GitHub organisation: [BD-01]
│
├── repo  aai-programme   Partner-visible
│         Epics, milestone issues, research question issues,
│         workstream directory, roadmap docs
│
├── repo  aai-pm          Restricted (PM only)
│         Programme dependencies (D-numbers), decisions (DEC-numbers),
│         material assumptions, scripts and their settings
│
├── repo  aai-ws1 … aai-ws5    Created by the build once each lead is confirmed; the lead holds Maintain
│         Features, stories, spikes, as sub-issues of aai-programme epics;
│         may link to partner source-code repositories outside WHO GitHub
│
├── Project  Assured AI Programme     items from aai-programme, plus selected workstream items
├── Project  Assured AI PM Control    items from aai-programme and aai-pm
└── Project template  Assured AI Workstream Template    copied by each workstream lead
```

Use these repository names unless the PM gives others.

Workstream leads and partners cannot create repositories in the organisation (BD-03a), so the build creates the workstream repositories. It creates each `aai-wsN` only once that workstream's lead and repository name are confirmed, with the labels in section 7.3, and gives the lead Maintain access. For the pilot it creates only the two workstream repositories the pilot needs. Leads then create their projects from the template.

D-number and DEC-number issues in `aai-pm` start their title with the number, for example "D07: Validated HIV graph before route runs".
