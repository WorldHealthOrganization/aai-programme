/**
 * AUTO-04 (req:aai-automation#AUTO-04): raise each open epic's Delivery
 * health (its `health:` label) to the worst `blocked` or `at-risk` label on
 * its open sub-issues. Never lowers or clears it; the epic's owner does that.
 *
 *   bun run scripts/programme/auto-04-health.ts [--dry-run]
 */
import { config, readItems, restAll, setField } from "./lib.ts";
import { rolledUpHealth } from "./rules.ts";

const epicLabel = config.typeSource === "label" ? "type:epic" : undefined;
let changed = 0;
for (const item of readItems()) {
  if (item.state !== "open" || (epicLabel && !item.labels.includes(epicLabel))) continue;
  const subs = restAll<{ labels: { name: string }[]; state: string }>(`repos/${item.repo}/issues/${item.number}/sub_issues?per_page=100`);
  const next = rolledUpHealth(item.fields["Delivery health"], subs.filter((s) => s.state === "open").map((s) => s.labels.map((l) => l.name)));
  if (next) {
    setField(item, "Delivery health", next);
    changed++;
  }
}
console.log(`${changed} epic(s) raised`);
