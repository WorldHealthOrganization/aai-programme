/**
 * AUTO-03 (req:aai-automation#AUTO-03): set Programme status from an issue
 * event, as a `status:` label. Run by the Programme automations workflow on
 * `issues` events (GITHUB_EVENT_PATH); by hand:
 *
 *   bun run scripts/programme/auto-03-status.ts --issue <n> --action closed --reason not_planned [--dry-run]
 */
import { readFileSync } from "node:fs";
import { fieldsFromLabels } from "./fields.ts";
import { config, isProgrammeTracked, rest, setField } from "./lib.ts";
import { qualifies, statusForEvent } from "./rules.ts";

function arg(n: string): string | undefined {
  const i = process.argv.indexOf(n);
  return i > 0 ? process.argv[i + 1] : undefined;
}
let action: string, number: number, repo: string, stateReason: string | null | undefined, labels: string[], state: string;
if (process.env.GITHUB_EVENT_PATH && !arg("--issue")) {
  const ev = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  ({ action } = ev);
  number = ev.issue.number;
  repo = ev.repository.full_name;
  stateReason = ev.issue.state_reason;
  state = ev.issue.state;
  labels = ev.issue.labels.map((l: { name: string }) => l.name);
} else {
  action = arg("--action") ?? "";
  number = Number(arg("--issue"));
  repo = config.repositories[0]!;
  stateReason = arg("--reason");
  const i = rest<{ labels: { name: string }[]; state: string }>(`repos/${repo}/issues/${number}`);
  labels = i.labels.map((l) => l.name);
  state = i.state;
}
const item = { repo, number, state, labels, fields: fieldsFromLabels(labels) };
const next = statusForEvent({ action, stateReason, // A new item is tracked by its type; closing or reopening touches anything on the board (AUTO-01).
  programmeTracked: action === "opened" ? isProgrammeTracked(labels) : qualifies(labels, config.programmeTypes), current: item.fields["Programme status"] });
if (next) setField(item, "Programme status", next);
else console.log(`${repo}#${number}: ${action} sets no Programme status`);
