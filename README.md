# cat/aai-programme/board

The state branch of the aai-programme instance's `board` directory
(declared in `aai-programme.json`, typology `beans-board`): the combined beans
board and the bean-drift report, under `pulled/`.

- `pulled/beans.json`, `pulled/README.md`: every bean of the repositories in
  `beans-sources.json`, written by `scripts/pull-beans.ts`.
- `pulled/drift.json`, `pulled/drift.md`: the programme issues checked against
  those beans, written by `scripts/programme/bean-drift.ts`.

**Written by the bot, not by hand.** The daily Pull beans workflow and
`/check-drift` (check-drift.yml) mount this branch at `pulled/`
(`bun run cat state:mount --id board`), rebuild it, and splice the change
back with `bun run cat state:push --id board`, never a force push. Main never
takes these commits. The site build mounts it the same way before it builds
the board and drift pages.

`manifest.json` and this README describe the branch; `state:push` never
writes them.
