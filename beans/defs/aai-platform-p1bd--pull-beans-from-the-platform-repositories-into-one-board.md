---
# aai-platform-p1bd
$schema: bean/1.0.0
title: Pull beans from the platform repositories into one board
status: in-progress
type: task
priority: normal
tags:
    - beans
created_at: 2026-10-20T14:00:00Z
updated_at: 2026-10-20T14:00:00Z
issue: https://github.com/litlfred/folio-assistant/issues/2605
---

`scripts/pull-beans.ts` reads every repository in `beans-sources.json` and writes one board to `pulled/`. A scheduled workflow keeps it current.

## Done when

- [x] The script reads both store layouts (`beans/defs/` and `beans/`) and the repo's own `.beans.yml`
- [x] A bean kept in several stores appears once
- [x] Repositories on the deny list are refused
- [ ] The workflow runs on `main` and commits the board
