---
doc_id: assured-ai-github-programme-requirements-v042
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s012-6-information-classification
section_title: "6. Information classification"
file: "Assured_AI_GitHub_Programme_Requirements_v0.4.2.md"
lines: 175-198
source_sha256: 74634ec34e62b978
granularity: heading
---
## 6. Information classification

| Class | Meaning | Where it may appear |
|---|---|---|
| Shared | Fine for every partner and Gates Foundation contact to read | Everything in `aai-programme`, the workstream repositories and the programme project |
| Restricted | Named WHO staff only | `aai-pm` only |

Restricted material is limited to:

- internal deliberations and draft WHO positions not yet agreed
- escalation notes
- contractual, funding or personnel matters
- sensitive security, legal or privacy issues
- internal review commentary, reviewer details and adjudication reasoning

Rules:

- **SEC-01.** Treat everything on an issue in a shared repository as shared: title, body, comments, labels, issue fields and relationships. Anyone with read access to the repository can read its issue fields.
- **SEC-02.** Restricted material is never written in a shared repository, including in comments. Put it in an `aai-pm` issue and link to that issue from the shared one. People without access to `aai-pm` cannot open the link (pilot test PIL-03 confirms this), but the link text is visible, so it must be neutral, for example "Restricted note". Restricted issue titles must also be neutral, because a title can show in previews.
- **SEC-03.** Write shared information on the assumption that every partner and the funder will read it. State facts and the next action, not blame. For example, "Blocked: waiting for the HIV graph schema from WS1, due 20 Nov" rather than an opinion on why.
- **SEC-04.** Making any project or repository public is a separate governance decision with its own privacy review. The build must not assume it will happen, and must not prepare for it.
  - **Exception: `aai-programme` is public** (owner, 20 October 2026; to be accepted by the PM & Architecture Integration). It therefore holds only material fit for anyone to read, a stricter bar than "shared" in this section. Restricted material stays in `aai-pm`, linked with neutral text as SEC-02 says.
- **SEC-05.** Never weaken repository or project permissions to make linking easier, and never change organisation-wide security settings.
