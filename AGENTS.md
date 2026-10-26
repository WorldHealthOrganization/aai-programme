# AGENTS.md — aai-programme

This is a **harness instance with no content type**. It declares itself in
`aai-programme.json`, keeps its work plan in `beans/` and
`todos/`, and reaches the platform — skills, schemas, MCP tools — through
[folio-assistant](https://github.com/litlfred/folio-assistant.git), checked out at `folio-assistant/`.

This file is the **agent-generic** source of truth. `CLAUDE.md` and
`GEMINI.md` are thin stubs pointing here.

## It holds no folio

There is no `folio/` here and no adapter is configured, on purpose: a
contentless instance scaffolds the instance and nothing an adapter would own.
Adding a folio to an existing instance in place is **not supported yet**:
`init-folio` skips files that exist, so this instance's declaration and
config would go on saying it holds no content.

## Work plan

`beans` is the todo mechanism: `beans prime`, `beans list`,
`beans create "<title>"`.
