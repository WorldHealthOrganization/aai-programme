---
doc_id: assured-ai-github-programme-requirements-v05
doc_title: "Assured AI: requirements for the programme GitHub project"
section_id: s013-6-information-classification
section_title: "6. Information classification"
file: "Assured_AI_GitHub_Programme_Requirements_v0.5.md"
lines: 180-200
source_sha256: 6be31bf530ba67cf
granularity: heading
---
## 6. Information classification

Everything on GitHub is **public**: every repository, every project and every issue, comment, label and field on them (owner, 20 October 2026). There is no restricted layer.

These six kinds of material must not be public, so they are **never put on GitHub**, in any repository, issue, comment, commit or attachment. The PM & Architecture Integration keeps them in WHO's own systems:

- internal deliberations and draft WHO positions not yet agreed
- escalation notes
- contractual, funding or personnel matters
- sensitive security, legal or privacy issues
- internal review commentary, reviewer details and adjudication reasoning
- anything a partner or the funder has shared in confidence

Rules:

- **SEC-01.** Treat everything on GitHub as public: title, body, comments, labels, issue fields, relationships, commit messages and attachments.
- **SEC-02.** When an item has a note that is kept off GitHub, the issue may say so in neutral words, for example "A note is held by the PM", and nothing more: no title, summary or link that hints at its content.
- **SEC-03.** Write on the assumption that every partner, the funder and the public will read it. State facts and the next action, not blame. For example, "Blocked: waiting for the HIV graph schema from WS1, due 20 Nov" rather than an opinion on why.
- **SEC-04.** Every repository and project the build creates is public. Before anything is imported, the PM removes from it what section 6 keeps off GitHub.
- **SEC-05.** Never weaken repository or project permissions beyond what BD-04 sets, and never change organisation-wide security settings.
