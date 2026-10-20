---
# aai-platform-oqd4
$schema: bean/1.0.0
title: "Make this repository a cat-harness instance"
status: in-progress
type: task
priority: normal
parent: aai-platform-7aw2
tags:
    - programme
created_at: 2026-10-20T17:00:00Z
updated_at: 2026-10-20T18:00:00Z
issue: https://github.com/litlfred/folio-assistant/issues/2605
---

Today it is hand-rolled: no `aai-platform.json` declaration and no `index.config.json`. `bun run cat init-folio --instance` would add both, plus `beans/beans.json` and the standard files. Then the repositories in `beans-sources.json` could be mounted in `index.config.json`, and cat-harness's `beans` visualiser would give the combined board, replacing `scripts/pull-beans.ts` and `pulled/`.

## Done when

- [x] The owner chooses instance, harness or neither: a harness (owner, 2026-10-20), so `processes/` holds the programme's processes
- [ ] It is scaffolded (done: `init-folio --instance`, schemas valid) and passes the repo-wide checks (not yet run: they need folio-assistant checked out)
- [ ] It is tested whether mounted repositories show live beans or the pinned copy, before the custom script is retired
