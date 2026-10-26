/**
 * GitHub I/O for the programme automations: issues only, through REST, via
 * `gh api`. No token beyond the workflow's own (owner, 2026-10-20: "NO
 * TOKENS"): the default token can write this repository's issues, and the
 * programme fields live ON the issues as labels (`fields.ts`), so that is
 * all the automations need. Project 110 and the site's board read the
 * labels; nothing here writes a project. Decisions live in `rules.ts`.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fieldsFromLabels, relabel } from "./fields.ts";

export interface Config {
  repositories: string[];
  typeSource: "label" | "issue-type";
  programmeTypes: string[];
  technicalIntegrationLead: string | null;
}
export const config = JSON.parse(readFileSync(join(import.meta.dir, "config.json"), "utf8")) as Config;
export const DRY = process.argv.includes("--dry-run");

function run(args: string[], input?: string): string {
  const r = Bun.spawnSync(["gh", "api", ...args], { stdin: input ? new TextEncoder().encode(input) : undefined, stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`gh api ${args[0]}…: ${new TextDecoder().decode(r.stderr).trim()}`);
  return new TextDecoder().decode(r.stdout).trim();
}
export function rest<T>(path: string, method = "GET", body?: unknown): T {
  const out = run(["-X", method, path, ...(body ? ["--input", "-"] : [])], body ? JSON.stringify(body) : undefined);
  return (out ? JSON.parse(out) : undefined) as T;
}
/** Every element of a paginated REST list, one JSON value per line from `--jq '.[]'`. */
export function restAll<T>(path: string): T[] {
  return run(["--paginate", path, "--jq", ".[] | tojson"]).split("\n").filter(Boolean).map((l) => JSON.parse(l) as T);
}

export function isProgrammeTracked(labels: string[], issueType?: string | null): boolean {
  if (config.typeSource === "issue-type") return !!issueType && config.programmeTypes.includes(issueType);
  return labels.some((l) => config.programmeTypes.includes(l));
}

export interface Item {
  repo: string;
  number: number;
  state: string;
  labels: string[];
  fields: Record<string, string>;
}

/** Every open and closed issue in the configured repositories, with its field values. */
export function readItems(): Item[] {
  const out: Item[] = [];
  for (const repo of config.repositories) {
    for (const i of restAll<{ number: number; state: string; labels: { name: string }[]; pull_request?: unknown }>(`repos/${repo}/issues?state=all&per_page=100`)) {
      if (i.pull_request) continue;
      const labels = i.labels.map((l) => l.name);
      out.push({ repo, number: i.number, state: i.state, labels, fields: fieldsFromLabels(labels) });
    }
  }
  return out;
}

/** Make the issue hold `value` for `field`, and only it; or say what would change. */
export function setField(item: Item, field: string, value: string): void {
  const { remove, add } = relabel(item.labels, field, value);
  if (!remove.length && !add.length) return;
  const what = `${item.repo}#${item.number}: ${field} ${item.fields[field] ?? "(empty)"} → ${value}`;
  if (DRY) return void console.log(`would set ${what}`);
  for (const l of remove) rest(`repos/${item.repo}/issues/${item.number}/labels/${encodeURIComponent(l)}`, "DELETE");
  if (add.length) rest(`repos/${item.repo}/issues/${item.number}/labels`, "POST", { labels: add });
  item.labels = [...item.labels.filter((l) => !remove.includes(l)), ...add];
  item.fields[field] = value;
  console.log(`set ${what}`);
}
