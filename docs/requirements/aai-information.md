---
id: req:aai-information
title: "Assured AI programme: information classification"
description: What may be on GitHub, which is public, and what never is (section 6). From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s013-6-information-classification
actors:
  - build-agent
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: SEC-01
    label: "Treat everything on GitHub as public: title, body,…"
    conformance: SHALL
    requirement: "Treat everything on GitHub as public: title, body, comments, labels, issue fields, relationships, commit messages and attachments."
  - key: SEC-02
    label: When an item has a note that is…
    conformance: SHALL
    requirement: 'When an item has a note that is kept off GitHub, the issue may say so in neutral words, for example "A note is held by the PM", and nothing more: no title, summary or link that hints at its content.'
  - key: SEC-03
    label: Write on the assumption that every partner, the…
    conformance: SHALL
    requirement: 'Write on the assumption that every partner, the funder and the public will read it. State facts and the next action, not blame. For example, "Blocked: waiting for the HIV graph schema from WS1, due 20 Nov" rather than an opinion on why.'
  - key: SEC-04
    label: Every repository and project the build creates is…
    conformance: SHALL
    requirement: Every repository and project the build creates is public. Before anything is imported, the PM removes from it what section 6 keeps off GitHub.
  - key: SEC-05
    label: Never weaken repository or project permissions beyond what…
    conformance: SHALL NOT
    requirement: Never weaken repository or project permissions beyond what BD-04 sets, and never change organisation-wide security settings.
---

# Information classification

What may be on GitHub, which is public, and what never is (section 6). Generated from [requirements v0.5](https://github.com/WorldHealthOrganization/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-information#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `SEC-01` | SHALL | Treat everything on GitHub as public: title, body, comments, labels, issue fields, relationships, commit messages and attachments. |
| `SEC-02` | SHALL | When an item has a note that is kept off GitHub, the issue may say so in neutral words, for example "A note is held by the PM", and nothing more: no title, summary or link that hints at its content. |
| `SEC-03` | SHALL | Write on the assumption that every partner, the funder and the public will read it. State facts and the next action, not blame. For example, "Blocked: waiting for the HIV graph schema from WS1, due 20 Nov" rather than an opinion on why. |
| `SEC-04` | SHALL | Every repository and project the build creates is public. Before anything is imported, the PM removes from it what section 6 keeps off GitHub. |
| `SEC-05` | SHALL NOT | Never weaken repository or project permissions beyond what BD-04 sets, and never change organisation-wide security settings. |
