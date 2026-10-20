/**
 * AUTO-11 (req:aai-automation#AUTO-11): add the existing issues that qualify
 * for the programme project (AUTO-01's rule, req:aai-linking#LINK-05) but are
 * not on it yet. Auto-add only catches items created or updated after it is
 * switched on; this catches the rest. Safe to rerun.
 *
 *   bun run scripts/programme/auto-11-backfill.ts [--dry-run]
 */
import { config, DRY, graphql, readProject, restAll } from "./lib.ts";
import { qualifies } from "./rules.ts";

const project = readProject();
const on = new Set(project.items.map((i) => `${i.repo}#${i.number}`));
let added = 0;
for (const repo of config.repositories) {
  for (const issue of restAll<{ number: number; node_id: string; labels: { name: string }[]; pull_request?: unknown }>(`repos/${repo}/issues?state=all&per_page=100`)) {
    if (issue.pull_request || on.has(`${repo}#${issue.number}`) || !qualifies(issue.labels.map((l) => l.name), config.programmeTypes)) continue;
    if (DRY) console.log(`would add ${repo}#${issue.number}`);
    else {
      graphql(`mutation($p: ID!, $c: ID!) { addProjectV2ItemById(input: { projectId: $p, contentId: $c }) { item { id } } }`, { p: project.id, c: issue.node_id });
      console.log(`added ${repo}#${issue.number}`);
    }
    added++;
  }
}
console.log(`${added} item(s) ${DRY ? "to add" : "added"}`);
