/**
 * AUTO-04 (req:aai-automation#AUTO-04): raise each epic's Delivery health to
 * the worst `blocked` or `at-risk` label on its sub-issues. Never lowers or
 * clears it; the epic's owner does that.
 *
 *   bun run scripts/programme/auto-04-health.ts [--dry-run]
 */
import { config, isProgrammeTracked, readProject, restAll, setOption } from "./lib.ts";
import { rolledUpHealth } from "./rules.ts";

const project = readProject();
const epicLabel = config.typeSource === "label" ? "type:epic" : undefined;
let changed = 0;
for (const item of project.items) {
  if (item.state !== "OPEN" || !isProgrammeTracked(item.labels) || (epicLabel && !item.labels.includes(epicLabel))) continue;
  const subs = restAll<{ labels: { name: string }[]; state: string }>(`repos/${item.repo}/issues/${item.number}/sub_issues?per_page=100`);
  const next = rolledUpHealth(item.fields["Delivery health"], subs.filter((s) => s.state === "open").map((s) => s.labels.map((l) => l.name)));
  if (next) {
    setOption(project, item, "Delivery health", next);
    changed++;
  }
}
console.log(`${changed} epic(s) raised`);
