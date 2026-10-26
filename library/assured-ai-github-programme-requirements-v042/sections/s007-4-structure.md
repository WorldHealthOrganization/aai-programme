---
doc_id: assured-ai-github-programme-requirements-v042
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s007-4-structure
section_title: "4. Structure"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.2.md"
lines: 101-134
source_sha256: 74634ec34e62b978
granularity: heading
---
## 4. Structure

```
GitHub organisation: WorldHealthOrganization
│
├── repo  aai-programme   Shared
│         Epics, milestones, research questions, dependencies (D-numbers),
│         decisions (DEC-numbers), assumptions, workstream directory,
│         automation scripts
│
├── repo  aai-pm          Restricted (named WHO staff only); no project
│         Sensitive notes only (section 6), each linked from the shared issue it relates to
│
├── repo  aai-ws1 … aai-ws4, aai-platform
│         Created by the build once each lead is confirmed; the lead holds Maintain
│         Features, stories, spikes, as sub-issues of aai-programme epics;
│         may link to partner source-code repositories outside WHO GitHub
│         (no aai-ws5: WS5 work lives in aai-programme)
│
├── Project  Assured AI Programme     programme-level aai-programme issues, plus selected workstream items;
│                                      also the project management environment for WS5
└── Project template  Assured AI Workstream Template    copied by each workstream lead
```

Use these repository names unless the PM gives others.

In this document, "workstream repositories" means `aai-ws1` to `aai-ws4` and `aai-platform`. WS5 features, stories and tasks live in `aai-programme`.

Workstream leads and partners cannot create repositories in the organisation (BD-03a), so the build creates the workstream repositories. It creates each `aai-wsN` and `aai-platform` only once that workstream's lead and repository name are confirmed, with the labels in section 7.3, and gives the lead Maintain access. For the pilot it creates only the two workstream repositories the pilot needs. Leads then create their projects from the template.

Issues in `aai-pm` are never added to the programme project. The PM works with them through the repository's own issue list.

D-number and DEC-number issues start their title with the number, for example "D07: Validated HIV graph before route runs".
