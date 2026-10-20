---
# aai-platform-ci17
$schema: bean/1.0.0
title: "Step 6: automation scripts AUTO-01 to AUTO-11"
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

Section 11. The scripts can be written and dry-run now in this repository's `scripts/`; they cannot write to the WHO organisation until the BD-08 credentials exist.

## Done when

- [ ] AUTO-01 auto-add by issue type, or an Action if the filter cannot select by type
- [ ] AUTO-03 Programme status on create, close and reopen
- [ ] AUTO-04 Delivery health roll-up, never lowering it
- [ ] AUTO-10 validation check, idempotent
- [ ] AUTO-11 backfill
- [ ] Every script reruns safely and has `--dry-run` (AUTO-08)
- [ ] No script sets readiness, review status, risk category, impact, a decision or risk acceptance (AUTO-05)
