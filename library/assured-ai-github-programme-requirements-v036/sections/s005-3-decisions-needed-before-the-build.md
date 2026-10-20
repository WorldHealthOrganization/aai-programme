---
doc_id: assured-ai-github-programme-requirements-v036
doc_title: "Assured AI: requirements for the programme GitHub projects"
section_id: s005-3-decisions-needed-before-the-build
section_title: "3. Decisions needed before the build"
file: "Assured_AI_GitHub_Programme_Requirements_v0.3.6.md"
lines: 59-79
source_sha256: a0519ae9be127861
granularity: heading
---
## 3. Decisions needed before the build

The agent may carry out step 1 of section 13 (pre-flight) at any time. It must not configure or create anything from step 2 onward until every decision relevant to that step is confirmed. Each decision has a recommended default.

| ID | Decision | Recommended default | Why it matters |
|---|---|---|---|
| BD-01 | GitHub organisation | **Decided: the existing World Health Organization organisation, shared with other WHO teams.** Login: `WorldHealthOrganization` (https://github.com/WorldHealthOrganization) | Everything sits in it. Because the organisation is shared, the safeguards in BD-01a apply |
| BD-01a | Shared organisation safeguards: (1) the current base permission for members. If it is anything other than "No permission", partners invited as members could read other WHO teams' repositories, and the build must not change it (SEC-06); (2) how many of the 25 organisation issue fields are already used by other teams; (3) which issue types already exist; (4) whether the owners will allow project-specific issue types, and pinning fields to them; (5) that the agent works through a named account with delegated rights, never a shared login | WHO GitHub owner to confirm before step 2. If (1) cannot be met, partners join as outside collaborators instead (see BD-03) | Organisation-wide settings, issue fields and issue types affect every WHO team using the organisation, not just this project |
| BD-02 | All Assured AI coordination repositories (programme, PM and workstream repositories holding issues, features, stories and spikes) sit in that organisation | **Decided: yes** | Issue fields only work on issues in repositories owned by the same organisation |
| BD-02a | Partner source-code repositories, models and other technical assets may stay in partners' own GitHub organisations | **Decided: yes, where partners need it** | Partners may have their own policies or existing repositories. Their work is still tracked through issues in the WHO workstream repositories, which link to the external repository. Issues held in external repositories are never added to the programme projects |
| BD-02b | Confirm how each workstream will link external technical assets, if any, to its WHO-hosted coordination issues | Workstream lead to confirm before bulk import | Each workstream needs a consistent way to point from a WHO issue to the partner's code, for example a link in the issue body or a pull request reference |
| BD-03 | Partners join as organisation members | **Decided: members, subject to BD-01a(1) and the checks in BD-03a.** If the base permission cannot be "No permission", fall back to outside collaborators with access granted per repository | Only organisation members can belong to GitHub teams |
| BD-03a | Checks before partners are invited: (1) whether the organisation uses SAML single sign-on or Enterprise Managed Users, and if so how partners get WHO identities; (2) seat cost per partner member; (3) base permission for members set to "No permission"; (4) members cannot create repositories or change visibility | WHO GitHub owner and WHO IT to confirm | With single sign-on, members must sign in through WHO's identity provider. With Enterprise Managed Users, WHO's identity system must create the accounts. Either could block or delay partner access |
| BD-03b | A test account with partner-level access for the pilot | WHO GitHub owner to provide one test member account, removed after the build | Pilot tests PIL-03, PIL-04 and PIL-07 need a real user with partner access. The agent cannot create GitHub accounts, and a test member may use a paid seat |
| BD-04 | Repository roles for partners | Read on `aai-programme`; Maintain for the workstream lead and Write for the team on their own workstream repository; Triage on other workstream repositories where they contribute | Triage lets people manage issues without changing code. Read alone may be too little for people expected to update status |
| BD-05 | Organisation owners willing to create issue fields and issue types | One named WHO owner to run step 2 of section 13 | Only organisation owners can create issue fields and issue types |
| BD-05a | Inspect the organisation's existing issue fields before creating any new ones | Reuse compatible existing fields; do not duplicate them | The organisation-level field limit is shared across the whole organisation. The build must preserve headroom and avoid duplicate fields such as separate versions of Target date or Workstream |
| BD-06 | Issue fields available on WHO's GitHub plan and permitted by WHO enterprise policy | Check and confirm | If they are unavailable or restricted, the fallback in section 7.4 applies |
| BD-07 | Who can see review status | PM Control only | Partners would learn the outcome through the review itself, not through a field |
| BD-08 | Credentials for the GitHub Actions in section 11 | Prefer a GitHub App with least-privilege permissions where WHO policy supports it; otherwise an approved fine-grained token. A WHO GitHub owner creates it and stores it as an organisation secret available only to `aai-pm` | AUTO-03, AUTO-04 and AUTO-10 write to issue fields and project fields across repositories, which the default Actions token cannot do. The agent must not design, create or embed credentials itself |
