---
id: req:aai-decisions
title: "Assured AI programme: decisions needed before the build"
description: What must be decided, and by whom, before the build goes past pre-flight (section 3). Each statement is the decision and its recommended default. From requirements v0.5.
status: proposed
derivedFrom:
  - library/assured-ai-github-programme-requirements-v05/sections/s007-3-decisions-needed-before-the-build
actors:
  - who-github-owner
  - pm-architecture-integration
tags:
  - aai-programme
  - v0.5
statements:
  - key: BD-01
    label: GitHub organisation
    conformance: SHALL
    requirement: "GitHub organisation. Default: Decided: the existing World Health Organization organisation, shared with other WHO teams. Login: `WorldHealthOrganization` (https://github.com/WorldHealthOrganization)"
  - key: BD-01a
    label: "Shared organisation safeguards: (1) the current base permission for members.…"
    conformance: SHALL
    requirement: "Shared organisation safeguards: (1) the current base permission for members. If it is anything other than \"No permission\", partners invited as members could read other WHO teams' repositories, and the build must not change it (SEC-05); (2) how many of the 25 organisation issue fields are already used by other teams; (3) which issue types already exist; (4) whether the owners will allow project-specific issue types, and pinning fields to them; (5) that the agent works through a named account with delegated rights, never a shared login. Default: WHO GitHub owner to confirm before step 2. If (1) cannot be met, partners join as outside collaborators instead (see BD-03)"
  - key: BD-02
    label: All Assured AI coordination repositories (programme and workstream repositories holding…
    conformance: SHALL
    requirement: "All Assured AI coordination repositories (programme and workstream repositories holding issues, features, stories and spikes) sit in that organisation. Default: Decided: yes"
  - key: BD-02a
    label: Partner source-code repositories, models and other technical assets may stay…
    conformance: SHALL
    requirement: "Partner source-code repositories, models and other technical assets may stay in partners' own GitHub organisations. Default: Decided: yes, where partners need it"
  - key: BD-02b
    label: How each workstream will link external technical assets, if any,…
    conformance: SHALL
    requirement: "How each workstream will link external technical assets, if any, to its WHO-hosted coordination issues. Default: Workstream lead to confirm before bulk import"
  - key: BD-03
    label: Partners join as organisation members
    conformance: SHALL
    requirement: 'Partners join as organisation members. Default: Decided: members, subject to BD-01a(1) and the checks in BD-03a. If the base permission cannot be "No permission", fall back to outside collaborators with access granted per repository. Whichever model is used for partners and for Gates Foundation contacts is recorded in the build report and the programme README'
  - key: BD-03a
    label: "Checks before partners are invited: (1) whether the organisation uses…"
    conformance: SHALL
    requirement: 'Checks before partners are invited: (1) whether the organisation uses SAML single sign-on or Enterprise Managed Users, and if so how partners get WHO identities; (2) seat cost per partner member; (3) base permission for members set to "No permission"; (4) members cannot create repositories or change visibility. Default: WHO GitHub owner and WHO IT to confirm'
  - key: BD-03b
    label: A test account with partner-level access for the pilot
    conformance: SHALL
    requirement: "A test account with partner-level access for the pilot. Default: WHO GitHub owner to provide one test account, removed after the build"
  - key: BD-04
    label: Repository roles
    conformance: SHALL
    requirement: "Repository roles. Default: Partners: Read on `aai-programme`; Maintain for the workstream lead and Write for the team on their own workstream repository; Triage on other workstream repositories where they contribute. Gates Foundation contacts: Read on `aai-programme` and the workstream repositories, and read access to the programme project"
  - key: BD-05
    label: Organisation owners willing to create issue fields and issue types
    conformance: SHALL
    requirement: "Organisation owners willing to create issue fields and issue types. Default: One named WHO owner to run step 2 of section 13"
  - key: BD-05a
    label: Inspect the organisation's existing issue fields before creating any new…
    conformance: SHALL
    requirement: "Inspect the organisation's existing issue fields before creating any new ones. Default: Reuse compatible existing fields; do not duplicate them"
  - key: BD-06
    label: Issue fields available on WHO's GitHub plan and permitted by…
    conformance: SHALL
    requirement: "Issue fields available on WHO's GitHub plan and permitted by WHO enterprise policy. Default: Check and confirm"
  - key: BD-07
    label: Gates Foundation contacts have access to the programme project
    conformance: SHALL
    requirement: "Gates Foundation contacts have access to the programme project. Default: Decided: yes. They see everything that is shared, including delivery health and review status"
  - key: BD-08
    label: Credentials for the GitHub Actions in section 11
    conformance: SHALL
    requirement: "Credentials for the GitHub Actions in section 11. Default: Prefer a GitHub App with least-privilege permissions where WHO policy supports it; otherwise an approved fine-grained token. A WHO GitHub owner creates it and stores it as an organisation secret available only to the repository that holds the scripts"
---

# Decisions needed before the build

What must be decided, and by whom, before the build goes past pre-flight (section 3). Each statement is the decision and its recommended default. Generated from [requirements v0.5](https://github.com/litlfred/aai-programme/blob/main/uploads/Assured_AI_GitHub_Programme_Requirements_v0.5.md) by `scripts/gen-requirements.ts`; do not edit by hand. Cite one as `req:aai-decisions#<ID>`.

| ID | Level | Requirement |
|---|---|---|
| `BD-01` | SHALL | GitHub organisation. Default: Decided: the existing World Health Organization organisation, shared with other WHO teams. Login: `WorldHealthOrganization` (https://github.com/WorldHealthOrganization) |
| `BD-01a` | SHALL | Shared organisation safeguards: (1) the current base permission for members. If it is anything other than "No permission", partners invited as members could read other WHO teams' repositories, and the build must not change it (SEC-05); (2) how many of the 25 organisation issue fields are already used by other teams; (3) which issue types already exist; (4) whether the owners will allow project-specific issue types, and pinning fields to them; (5) that the agent works through a named account with delegated rights, never a shared login. Default: WHO GitHub owner to confirm before step 2. If (1) cannot be met, partners join as outside collaborators instead (see BD-03) |
| `BD-02` | SHALL | All Assured AI coordination repositories (programme and workstream repositories holding issues, features, stories and spikes) sit in that organisation. Default: Decided: yes |
| `BD-02a` | SHALL | Partner source-code repositories, models and other technical assets may stay in partners' own GitHub organisations. Default: Decided: yes, where partners need it |
| `BD-02b` | SHALL | How each workstream will link external technical assets, if any, to its WHO-hosted coordination issues. Default: Workstream lead to confirm before bulk import |
| `BD-03` | SHALL | Partners join as organisation members. Default: Decided: members, subject to BD-01a(1) and the checks in BD-03a. If the base permission cannot be "No permission", fall back to outside collaborators with access granted per repository. Whichever model is used for partners and for Gates Foundation contacts is recorded in the build report and the programme README |
| `BD-03a` | SHALL | Checks before partners are invited: (1) whether the organisation uses SAML single sign-on or Enterprise Managed Users, and if so how partners get WHO identities; (2) seat cost per partner member; (3) base permission for members set to "No permission"; (4) members cannot create repositories or change visibility. Default: WHO GitHub owner and WHO IT to confirm |
| `BD-03b` | SHALL | A test account with partner-level access for the pilot. Default: WHO GitHub owner to provide one test account, removed after the build |
| `BD-04` | SHALL | Repository roles. Default: Partners: Read on `aai-programme`; Maintain for the workstream lead and Write for the team on their own workstream repository; Triage on other workstream repositories where they contribute. Gates Foundation contacts: Read on `aai-programme` and the workstream repositories, and read access to the programme project |
| `BD-05` | SHALL | Organisation owners willing to create issue fields and issue types. Default: One named WHO owner to run step 2 of section 13 |
| `BD-05a` | SHALL | Inspect the organisation's existing issue fields before creating any new ones. Default: Reuse compatible existing fields; do not duplicate them |
| `BD-06` | SHALL | Issue fields available on WHO's GitHub plan and permitted by WHO enterprise policy. Default: Check and confirm |
| `BD-07` | SHALL | Gates Foundation contacts have access to the programme project. Default: Decided: yes. They see everything that is shared, including delivery health and review status |
| `BD-08` | SHALL | Credentials for the GitHub Actions in section 11. Default: Prefer a GitHub App with least-privilege permissions where WHO policy supports it; otherwise an approved fine-grained token. A WHO GitHub owner creates it and stores it as an organisation secret available only to the repository that holds the scripts |
