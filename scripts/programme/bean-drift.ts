/**
 * Bean drift: check every programme issue that carries a bean against that
 * bean, and list the open beans nobody has triaged. Reports; changes nothing
 * but its own report (DP-06). Rules: drift-rules.ts.
 *
 *   bun run scripts/programme/bean-drift.ts                    # print the report
 *   bun run scripts/programme/bean-drift.ts --out pulled       # write pulled/drift.md and drift.json
 *   bun run scripts/programme/bean-drift.ts --site <dir>       # write the board's drift and workstream pages
 *   bun run scripts/programme/bean-drift.ts --comment <issue>  # reply on that issue with the summary
 *
 * Reads: pulled/beans.json (the beans snapshot pull-beans.ts refreshes), the
 * triage record (docs/beans-analysis.json, the beans reviewed on 2026-10-20,
 * and docs/beans-triage.json, every later decision), and this repository's
 * issues, whose `<!-- bean: owner/repo/id -->` lines are the links. Needs
 * only read access to the issues, and write access to comment.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { beanLinks, drift, type DriftBean, type DriftIssue, type Finding } from "./drift-rules.ts";
import { fieldsFromLabels } from "./fields.ts";
import { config, rest, restAll } from "./lib.ts";

const ROOT = resolve(import.meta.dir, "../..");
const arg = (n: string) => {
  const i = process.argv.indexOf(n);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const REPO = config.repositories[0]!;

// ── read ──────────────────────────────────────────────────────────
const snap = JSON.parse(readFileSync(join(ROOT, "pulled/beans.json"), "utf8")) as { beans: (DriftBean & { url: string })[]; stores: { repo: string; commit?: string }[] };
const beans = new Map(snap.beans.map((b) => [b.id, b]));
const reviewed = new Set<string>();
for (const f of ["docs/beans-analysis.json", "docs/beans-triage.json"]) {
  if (existsSync(join(ROOT, f))) for (const r of JSON.parse(readFileSync(join(ROOT, f), "utf8")) as { id: string }[]) reviewed.add(r.id);
}
type Raw = { number: number; title: string; state: "open" | "closed"; state_reason?: string | null; updated_at: string; body: string | null; html_url: string; labels: { name: string }[]; pull_request?: unknown };
const raw = restAll<Raw>(`repos/${REPO}/issues?state=all&per_page=100`).filter((i) => !i.pull_request);
const byNum = new Map(raw.map((i) => [i.number, i]));
const parentOf = new Map<number, number>();
for (const i of raw) {
  if (!beanLinks(i.body).length) continue;
  try {
    const p = rest<{ number: number }>(`repos/${REPO}/issues/${i.number}/parent`);
    if (p?.number) parentOf.set(i.number, p.number);
  } catch {
    /* no parent */
  }
}
const issues: DriftIssue[] = raw
  .filter((i) => beanLinks(i.body).length || parentOf.has(i.number))
  .map((i) => ({
    number: i.number, title: i.title, state: i.state, stateReason: i.state_reason, updatedAt: i.updated_at, beans: beanLinks(i.body), labels: i.labels.map((l) => l.name),
    parentNumber: parentOf.get(i.number), parentState: parentOf.has(i.number) ? byNum.get(parentOf.get(i.number)!)?.state : undefined,
  }));
const findings = drift(issues, beans, reviewed);

// ── report ────────────────────────────────────────────────────────
const KINDS: [string, string][] = [
  ["bean-done", "Bean completed, issue still open"],
  ["bean-scrapped", "Bean scrapped, issue still open"],
  ["issue-closed", "Issue closed, bean still open"],
  ["broken-link", "Link to a bean that is not found"],
  ["orphaned", "Open feature under a closed epic or proposal"],
  ["bean-changed", "Bean changed since the issue was last touched"],
  ["untriaged", "Open beans nobody has triaged"],
];
const iss = (n?: number) => (n ? `[#${n}](https://github.com/${REPO}/issues/${n})` : "–");
const bn = (id?: string) => (id ? (beans.get(id) ? `[${id}](${beans.get(id)!.url})` : id) : "–");
const today = new Date().toISOString().slice(0, 10);
const counts = KINDS.map(([k, label]) => [label, findings.filter((f) => f.kind === k).length] as const);
const summary = counts.filter(([, n]) => n).map(([l, n]) => `${l}: ${n}`).join("; ") || "no drift";
const sections = KINDS.map(([k, label]) => {
  const fs = findings.filter((f) => f.kind === k);
  if (!fs.length) return "";
  const rows = k === "untriaged" ? fs.slice(0, 60).map((f) => `| ${bn(f.bean)} | ${f.detail.replace(/\|/g, "\\|")} |`) : fs.map((f) => `| ${iss(f.issue)} | ${bn(f.bean)} | ${f.detail.replace(/\|/g, "\\|")} |`);
  const head = k === "untriaged" ? "| Bean | Repository and title |\n|---|---|" : "| Issue | Bean | What |\n|---|---|---|";
  return `## ${label} (${fs.length})\n\n${head}\n${rows.join("\n")}${fs.length > 60 ? `\n\n…and ${fs.length - 60} more in drift.json.` : ""}`;
}).filter(Boolean);
const report = [
  "# Bean drift",
  "",
  `Checked ${today}: ${issues.length} programme issue(s) carrying ${issues.reduce((n, i) => n + i.beans.length, 0)} bean link(s), against ${beans.size} beans from ${snap.stores.length} stores. **${summary}.**`,
  "",
  "Each finding is for a person to act on: change the issue, or record a triage decision in `docs/beans-triage.json`. Nothing here is changed automatically. Run it again by commenting `/check-drift` on any issue.",
  "",
  ...sections.flatMap((s) => [s, ""]),
].join("\n");

const outDir = arg("--out");
if (outDir) {
  writeFileSync(join(ROOT, outDir, "drift.md"), `${report}\n`);
  writeFileSync(join(ROOT, outDir, "drift.json"), `${JSON.stringify({ checked: today, summary: Object.fromEntries(KINDS.map(([k]) => [k, findings.filter((f) => f.kind === k).length])), findings }, null, 2)}\n`);
  console.log(`wrote ${outDir}/drift.md and drift.json: ${summary}`);
}

// ── the board's pages: drift, and workstreams → epics → features → beans ──
const site = arg("--site");
if (site) {
  const out = join(site, "programme");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, "drift.md"), `---\ntitle: Bean drift\n---\n\n[Board](index.html)\n\n${report}\n`);
  const epics = raw.filter((i) => i.state === "open" && i.labels.some((l) => l.name === "proposal" || l.name === "type:epic"));
  const ws = (i: Raw) => fieldsFromLabels(i.labels.map((l) => l.name)).Workstream ?? "No workstream";
  const order = ["WS1 Knowledge graph", "WS2 Authoring", "WS3 Evaluation", "WS4 Localization", "WS5 Governance and stewardship", "Platform", "Cross-workstream"];
  const groups = [...new Set(epics.map(ws))].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  const flagged = new Map<number, Finding[]>();
  for (const f of findings) if (f.issue) flagged.set(f.issue, [...(flagged.get(f.issue) ?? []), f]);
  const lines: string[] = ["---", "title: Workstreams, epics and beans", "---", "", "[Board](index.html) · [Bean drift](drift.html)", "", "# Workstreams, epics and beans", "",
    "Each workstream's epics and epic proposals, their features, and the beans each feature carries, with the bean's live status from the snapshot. A ⚑ marks a feature the drift check flagged.", ""];
  for (const g of groups) {
    lines.push(`## ${g}`, "");
    for (const e of epics.filter((i) => ws(i) === g)) {
      const kind = e.labels.some((l) => l.name === "proposal") ? "proposal" : "epic";
      lines.push(`### [${e.title.replace(/\|/g, "\\|")}](${e.html_url}) _(${kind})_`, "");
      const subs = raw.filter((i) => parentOf.get(i.number) === e.number);
      if (!subs.length) {
        lines.push("_No features yet._", "");
        continue;
      }
      lines.push("| Feature | State | Beans |", "|---|---|---|");
      for (const s of subs) {
        const bs = beanLinks(s.body).map((id) => `${bn(id)} ${beans.get(id)?.status ?? "not found"}`).join("<br>") || "–";
        lines.push(`| ${flagged.has(s.number) ? "⚑ " : ""}[${s.title.replace(/^Feature \([^)]*\): /, "").replace(/\|/g, "\\|")}](${s.html_url}) | ${s.state} | ${bs} |`);
      }
      lines.push("");
    }
  }
  writeFileSync(join(out, "workstreams.md"), `${lines.join("\n")}\n`);
  console.log(`wrote ${out}/drift.md and workstreams.md`);
}

const commentOn = arg("--comment");
if (commentOn) {
  rest(`repos/${REPO}/issues/${commentOn}/comments`, "POST", {
    body: `**Bean drift, ${today}:** ${summary}.\n\n${counts.filter(([, n]) => n).map(([l, n]) => `- ${l}: ${n}`).join("\n") || "- nothing found"}\n\nThe full report: [pulled/drift.md](https://github.com/${REPO}/blob/main/pulled/drift.md), and on the board after the next publish.`,
  });
  console.log(`replied on #${commentOn}`);
}
if (!outDir && !site && !commentOn) console.log(report);
