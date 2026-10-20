---
# aai-platform-s7wq
$schema: bean/1.0.0
title: Sync the fork to the WHO repository
status: todo
type: task
priority: normal
tags:
    - sync
created_at: 2026-10-20T16:00:00Z
updated_at: 2026-10-20T16:00:00Z
issue: https://github.com/litlfred/folio-assistant/issues/2605
---

Work runs off `litlfred/aai-platform` for now (owner, 2026-10-20). When the owner says to sync:

## Done when

- [ ] `main` is pushed or merged to `WorldHealthOrganization/aai-platform`
- [ ] The branch `cat/aai-platform/beans` is pushed there
- [ ] The first entry in `beans-sources.json` points at the WHO repo
- [ ] The section 7.3 labels exist on the WHO repo
- [ ] `bun run scripts/pull-beans.ts` reads the WHO store
