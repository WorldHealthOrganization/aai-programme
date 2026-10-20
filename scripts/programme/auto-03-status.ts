/**
 * AUTO-03 (req:aai-automation#AUTO-03): set Programme status from an issue
 * event. Run by the Programme automations workflow on `issues` events, which
 * passes the event in GITHUB_EVENT_PATH; by hand:
 *
 *   bun run scripts/programme/auto-03-status.ts --issue <n> --action closed --reason not_planned [--dry-run]
 *
 * Built-in project workflows can only set a project's own Status field, so
 * they cannot do this.
 */
import { readFileSync } from "node:fs";
import { config, isProgrammeTracked, readProject, rest, setOption } from "./lib.ts";
import { statusForEvent } from "./rules.ts";

function arg(n: string): string | undefined {
  const i = process.argv.indexOf(n);
  return i > 0 ? process.argv[i + 1] : undefined;
}
let action: string, number: number, repo: string, stateReason: string | null | undefined, labels: string[];
if (process.env.GITHUB_EVENT_PATH && !arg("--issue")) {
  const ev = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  action = ev.action;
  number = ev.issue.number;
  repo = ev.repository.full_name;
  stateReason = ev.issue.state_reason;
  labels = ev.issue.labels.map((l: { name: string }) => l.name);
} else {
  action = arg("--action") ?? "";
  number = Number(arg("--issue"));
  repo = config.repositories[0]!;
  stateReason = arg("--reason");
  labels = (rest<{ labels: { name: string }[] }>(`repos/${repo}/issues/${number}`)).labels.map((l) => l.name);
}
const project = readProject();
const item = project.items.find((i) => i.repo === repo && i.number === number);
if (!item) {
  console.log(`${repo}#${number} is not on the programme project; nothing to set`);
  process.exit(0);
}
const next = statusForEvent({ action, stateReason, programmeTracked: isProgrammeTracked(labels), current: item.fields["Programme status"] });
if (next && next !== item.fields["Programme status"]) setOption(project, item, "Programme status", next);
else console.log(`${repo}#${number}: ${action} sets no Programme status`);
