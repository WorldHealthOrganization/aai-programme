---
# aai-platform-oqd4
$schema: bean/1.0.0
title: "Make this repository a cat-harness instance"
status: todo
type: task
priority: normal
parent: aai-platform-7aw2
tags:
    - programme
created_at: 2026-10-20T17:00:00Z
updated_at: 2026-10-20T17:00:00Z
issue: https://github.com/litlfred/folio-assistant/issues/2605
---

Today it is hand-rolled: no `aai-platform.json` declaration and no `index.config.json`. `bun run cat init-folio --instance` would add both, plus `beans/beans.json` and the standard files. Then the repositories in `beans-sources.json` could be mounted in `index.config.json`, and cat-harness's `beans` visualiser would give the combined board, replacing `scripts/pull-beans.ts` and `pulled/`.

## Done when

- [ ] The owner chooses instance, harness or neither
- [ ] If instance: it is scaffolded and passes its checks
- [ ] It is tested whether mounted repositories show live beans or the pinned copy, before the custom script is retired
