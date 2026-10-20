---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s011-6-information-classification
section_title: "6. Information classification"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 144-160
source_sha256: a0519ae9be127861
granularity: heading
---
## 6. Information classification

| Class | Meaning | Where it may appear |
|---|---|---|
| Partner-visible | Fine for any partner on the project to read | Issues, comments, labels and issue fields in `aai-programme` and workstream repositories; Assured AI Programme |
| WHO internal | For WHO staff, not partners | `aai-pm` only, or fields that exist only in Assured AI PM Control |
| Restricted | PM & Architecture Integration and named people only | `aai-pm` only |

Rules:

- **SEC-01.** Treat everything on an issue in a partner-visible repository as partner-visible: title, body, comments, labels, issue fields and relationships. Organisation-only issue fields can be read by anyone with read access to the repository, and partners will have it.
- **SEC-02.** WHO internal and Restricted information must therefore never be stored in an issue field on an issue in a partner-visible repository. It goes in PM Control project fields or in `aai-pm` issues. Issue fields on `aai-pm` issues are fine, because only people with access to `aai-pm` can see them.
- **SEC-03.** Risk reasoning, escalation notes, review comments and decision deliberations are WHO internal at minimum.
- **SEC-04.** A deliverable or epic first recorded in an internal planning document is not internal just because of where it came from. Classify it by its content.
- **SEC-05.** Making any project or repository public is a separate governance decision with its own privacy review. The build must not assume it will happen, and must not prepare for it.
- **SEC-06.** Never weaken repository or project permissions to make linking easier, and never change organisation-wide security settings.
