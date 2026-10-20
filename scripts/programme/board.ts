/**
 * The programme board on the site, built from the issues' labels: views V1 to
 * V13 and metrics M1 to M5 of section 8 (req:aai-views, req:aai-metrics),
 * with nothing kept by hand. Owner, 2026-10-20: no tokens, so the issues hold
 * the values (`fields.ts`) and this reads them; project 110 shows the same
 * issues.
 *
 * The board holds what the programme project would (AUTO-01, LINK-05):
 * programme-level types, and workstream items labelled `thin-slice`,
 * `sprint-demo`, `blocked` or `at-risk`.
 *
 *   bun run scripts/programme/board.ts --site <dir>   # write <dir>/programme/
 *
 * Rebuilt on every publish, so it is as current as the last publish.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type BoardItem, boardItem } from "./board-model.ts";
import { FIELDS } from "./fields.ts";
import { config, rest, restAll } from "./lib.ts";
import { qualifies } from "./rules.ts";

const at = process.argv.indexOf("--site");
const site = at > 0 ? process.argv[at + 1] : undefined;
if (!site) {
  console.error("usage: board.ts --site <dir>");
  process.exit(2);
}
const OUT = join(site, "programme");
const TODAY = new Date().toISOString().slice(0, 10);

// ── read ──────────────────────────────────────────────────────────
type Raw = { number: number; title: string; html_url: string; state: string; body: string | null; labels: { name: string }[]; assignees: { login: string }[]; sub_issues_summary?: { total: number; completed: number }; pull_request?: unknown };
const items: BoardItem[] = [];
for (const repo of config.repositories) {
  for (const r of restAll<Raw>(`repos/${repo}/issues?state=all&per_page=100`)) {
    if (r.pull_request) continue;
    const labels = r.labels.map((l) => l.name);
    if (!qualifies(labels, config.programmeTypes)) continue;
    let parent: number | undefined;
    if (!labels.some((l) => config.programmeTypes.includes(l))) {
      try {
        parent = rest<{ number: number }>(`repos/${repo}/issues/${r.number}/parent`)?.number;
      } catch {
        parent = undefined;
      }
    }
    items.push(boardItem({ ...r, repo, labels, assignees: r.assignees.map((a) => a.login), parent }));
  }
}
const byNumber = new Map(items.map((i) => [i.number, i]));

// ── render helpers ────────────────────────────────────────────────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\|/g, "&#124;");
const f = (i: BoardItem, k: string) => i.fields[k] ?? "–";
const link = (i: BoardItem) => `[${esc(i.title)}](${i.url})${i.open ? "" : " _(closed)_"}`;
const progress = (i: BoardItem) => (i.progress ? `${i.progress.done}/${i.progress.total}` : "–");
const who = (i: BoardItem) => (i.assignees.length ? i.assignees.join(", ") : "–");
const table = (cols: string[], rows: string[][]) => [`| ${cols.join(" | ")} |`, `|${cols.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
const byDate = (k: string) => (a: BoardItem, b: BoardItem) => (a.fields[k] ?? "9999").localeCompare(b.fields[k] ?? "9999");
function grouped(list: BoardItem[], key: (i: BoardItem) => string, order: string[], cols: string[], row: (i: BoardItem) => string[], sort?: (a: BoardItem, b: BoardItem) => number): string {
  const groups = new Map<string, BoardItem[]>();
  for (const i of list) groups.set(key(i), [...(groups.get(key(i)) ?? []), i]);
  const names = [...groups.keys()].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99) || a.localeCompare(b));
  if (!names.length) return "_Nothing here yet._";
  return names.map((g) => `### ${esc(g)} (${groups.get(g)!.length})\n\n${table(cols, [...groups.get(g)!].sort(sort ?? (() => 0)).map(row))}`).join("\n\n");
}
/** A board: one column per option, a card per item. */
function board(list: BoardItem[], field: string, order: string[], card: (i: BoardItem) => string): string {
  const cols = [...order, "–"].map((o) => ({ o, its: list.filter((i) => (i.fields[field] ?? "–") === o) })).filter((c) => c.o !== "–" || c.its.length);
  return `<div class="pb-board">${cols
    .map((c) => `<div class="pb-col"><div class="pb-colhead">${esc(c.o === "–" ? `No ${field}` : c.o)} <span>${c.its.length}</span></div>${c.its.map((i) => `<div class="pb-card"><a href="${i.url}">${esc(i.title)}</a>${card(i)}</div>`).join("")}</div>`)
    .join("")}</div>`;
}
const WS = FIELDS.Workstream!.options;
const STAGES = FIELDS["Pipeline stage"]!.options;

const STYLE = `<style>
.pb-board{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px;align-items:flex-start}
.pb-col{flex:0 0 200px;border:1px solid rgba(127,127,127,.35);border-radius:6px;padding:8px}
.pb-colhead{font-weight:600;font-size:.85em;margin-bottom:6px}.pb-colhead span{opacity:.6;font-weight:400}
.pb-card{border:1px solid rgba(127,127,127,.3);border-radius:4px;padding:6px;margin-bottom:6px;font-size:.85em}
.pb-card small{display:block;opacity:.75;margin-top:2px}
.pb-road{display:grid;grid-template-columns:minmax(140px,30%) 1fr;gap:4px 10px;align-items:center;font-size:.85em}
.pb-track{position:relative;height:14px;background:rgba(127,127,127,.12);border-radius:3px}
.pb-bar{position:absolute;top:0;height:14px;border-radius:3px;background:#2f6fd0}
.pb-bar.h-at-risk{background:#c98a00}.pb-bar.h-blocked{background:#c0392b}
.pb-meter{display:inline-block;height:10px;background:#2f6fd0;border-radius:2px;vertical-align:middle}
</style>`;

// ── views ─────────────────────────────────────────────────────────
const is = (t: string) => (i: BoardItem) => i.type === t;
const epics = items.filter(is("epic"));
const views: { id: string; name: string; what: string; body: () => string }[] = [
  { id: "v1", name: "Master programme", what: "Epics, grouped by Workstream, sorted by Start date.",
    body: () => grouped(epics, (i) => f(i, "Workstream"), WS, ["Title", "Programme status", "Delivery health", "Pipeline stage", "Start", "Target", "Gates output", "Primary RQ", "Sub-issues"],
      (i) => [link(i), f(i, "Programme status"), f(i, "Delivery health"), f(i, "Pipeline stage"), f(i, "Start date"), f(i, "Target date"), f(i, "Gates output"), f(i, "Primary research question"), progress(i)], byDate("Start date")) },
  { id: "v2", name: "Roadmap", what: "Epics and milestones with dates, by Workstream.",
    body: () => {
      const dated = items.filter((i) => (is("epic")(i) || is("milestone")(i)) && i.fields["Start date"] && i.fields["Target date"]);
      const undated = items.filter((i) => (is("epic")(i) || is("milestone")(i)) && !dated.includes(i));
      if (!dated.length) return `_No epic or milestone has both a Start date and a Target date yet._ They are set in each issue's Programme fields table.\n\n${undated.length ? `Without dates: ${undated.map(link).join(", ")}` : ""}`;
      const t = (d: string) => new Date(d).getTime();
      const lo = Math.min(...dated.map((i) => t(i.fields["Start date"]!))), hi = Math.max(...dated.map((i) => t(i.fields["Target date"]!)));
      const span = Math.max(hi - lo, 864e5);
      const rows = dated.sort(byDate("Start date")).map((i) => {
        const l = ((t(i.fields["Start date"]!) - lo) / span) * 100, w = Math.max(((t(i.fields["Target date"]!) - t(i.fields["Start date"]!)) / span) * 100, 1);
        return `<div><a href="${i.url}">${esc(i.title)}</a><br><small>${esc(f(i, "Workstream"))}</small></div><div class="pb-track"><div class="pb-bar h-${(i.fields["Delivery health"] ?? "").toLowerCase().replace(/ /g, "-")}" style="left:${l}%;width:${w}%" title="${i.fields["Start date"]} to ${i.fields["Target date"]}"></div></div>`;
      });
      return `<p>${new Date(lo).toISOString().slice(0, 10)} to ${new Date(hi).toISOString().slice(0, 10)}</p><div class="pb-road">${rows.join("")}</div>${undated.length ? `\n\nWithout dates: ${undated.map(link).join(", ")}` : ""}`;
    } },
  { id: "v3", name: "Milestones", what: "Milestone issues, and items with any `gates:` label, by Gates output.",
    body: () => grouped(items.filter((i) => is("milestone")(i) || i.labels.some((l) => l.startsWith("gates:"))), (i) => f(i, "Gates output"), [], ["Title", "Workstream", "Programme status", "Delivery health", "Target"],
      (i) => [link(i), f(i, "Workstream"), f(i, "Programme status"), f(i, "Delivery health"), f(i, "Target date")], byDate("Target date")) },
  { id: "v4", name: "Research questions", what: "Research question issues, and every item contributing to one (its `rq:` labels).",
    body: () => {
      const rqs = [...new Set(items.flatMap((i) => i.labels.filter((l) => l.startsWith("rq:"))))].sort();
      if (!rqs.length) return "_No item carries an `rq:` label yet._";
      return rqs.map((q) => `### ${q.slice(3)}\n\n${table(["Title", "Workstream", "Programme status", "Routes"], items.filter((i) => i.labels.includes(q)).map((i) => [link(i) + (is("research-question")(i) ? " **(the question)**" : ""), f(i, "Workstream"), f(i, "Programme status"), i.labels.filter((l) => l.startsWith("route:")).map((l) => `\`${l}\``).join(" ") || "–"]))}`).join("\n\n");
    } },
  { id: "v5", name: "Pipeline stages", what: "Epics and `thin-slice` items, in columns by Pipeline stage, L1 through LOC, with Cross-cutting / N/A separate.",
    body: () => board(items.filter((i) => is("epic")(i) || i.labels.includes("thin-slice")), "Pipeline stage", STAGES, (i) => `<small>${esc(f(i, "Workstream"))} · ${esc(f(i, "Programme status"))} · ${esc(f(i, "Delivery health"))}</small>`) },
  { id: "v6", name: "Integration readiness", what: "`thin-slice` items, and epics assessed for readiness, by Pipeline stage. **Awaiting validation** is the Technical Integration Lead's queue.",
    body: () => {
      const list = items.filter((i) => i.labels.includes("thin-slice") || (is("epic")(i) && i.fields["Integration readiness"] && i.fields["Integration readiness"] !== "Not assessed"));
      const waiting = items.filter((i) => i.fields["Integration readiness"] === "Ready to integrate");
      const cols = ["Title", "Workstream", "Integration readiness", "Assignee", "Target", "Sub-issues"];
      const row = (i: BoardItem) => [link(i), f(i, "Workstream"), f(i, "Integration readiness"), who(i), f(i, "Target date"), progress(i)];
      return `### Awaiting validation (${waiting.length})\n\n${waiting.length ? table(cols, waiting.map(row)) : "_None._"}\n\n${grouped(list, (i) => f(i, "Pipeline stage"), STAGES, cols, row, byDate("Target date"))}`;
    } },
  { id: "v7", name: "Sprint review", what: "Items labelled `sprint-demo`, by Workstream.",
    body: () => grouped(items.filter((i) => i.labels.includes("sprint-demo")), (i) => f(i, "Workstream"), WS, ["Title", "Workstream", "Programme status", "Epic"],
      (i) => [link(i), f(i, "Workstream"), f(i, "Programme status"), i.parent && byNumber.get(i.parent) ? link(byNumber.get(i.parent)!) : i.parent ? `#${i.parent}` : "–"]) },
  { id: "v8", name: "Next 30 days", what: "Open epics, milestones, dependencies and cross-workstream deliverables due in the next 30 days.",
    body: () => {
      const end = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
      const due = items.filter((i) => i.open && (["epic", "milestone", "dependency"].includes(i.type ?? "") || i.fields.Workstream === "Cross-workstream") && i.fields["Target date"] && i.fields["Target date"]! >= TODAY && i.fields["Target date"]! <= end);
      return grouped(due, (i) => f(i, "Workstream"), WS, ["Title", "Workstream", "Programme status", "Delivery health", "Assignee", "Target"],
        (i) => [link(i), f(i, "Workstream"), f(i, "Programme status"), f(i, "Delivery health"), who(i), f(i, "Target date")], byDate("Target date"));
    } },
  { id: "v9", name: "Dependencies", what: "Dependency issues, by the waiting Workstream.",
    body: () => grouped(items.filter(is("dependency")), (i) => f(i, "Workstream"), WS, ["Title", "Workstream", "Delivery health", "Impact", "Target", "Assignee"],
      (i) => [link(i), f(i, "Workstream"), f(i, "Delivery health"), f(i, "Impact"), f(i, "Target date"), who(i)], byDate("Target date")) },
  { id: "v10", name: "Blocked and at risk", what: "Delivery health At risk or Blocked, or labelled `blocked`, `at-risk` or `validation-exception`. Every item here should carry a **Next action** line.",
    body: () => {
      const list = items.filter((i) => i.open && (["At risk", "Blocked"].includes(i.fields["Delivery health"] ?? "") || i.labels.some((l) => ["blocked", "at-risk", "validation-exception"].includes(l))));
      const imp = (i: BoardItem) => ["High", "Medium", "Low"].indexOf(i.fields.Impact ?? "") + 1 || 9;
      return grouped(list, (i) => `${i.fields["Delivery health"] ?? "No health set"} · ${f(i, "Workstream")}`, [], ["Title", "Workstream", "Risk category", "Impact", "Target", "Assignee", "Next action"],
        (i) => [link(i), f(i, "Workstream"), f(i, "Risk category"), f(i, "Impact"), f(i, "Target date"), who(i), i.nextAction ? esc(i.nextAction) : "**missing**"], (a, b) => imp(a) - imp(b) || byDate("Target date")(a, b));
    } },
  { id: "v11", name: "WHO review", what: "Items with a Review type other than Not needed, in columns by Review status.",
    body: () => board(items.filter((i) => i.fields["Review type"] && i.fields["Review type"] !== "Not needed"), "Review status", FIELDS["Review status"]!.options, (i) => `<small>${esc(f(i, "Workstream"))} · ${esc(f(i, "Review type"))} · due ${esc(f(i, "Target date"))}</small>`) },
  { id: "v12", name: "Decisions", what: "Decision issues, open and closed.",
    body: () => grouped(items.filter(is("decision")), (i) => (i.open ? "Open" : "Closed"), ["Open", "Closed"], ["Title", "Workstream", "Programme status", "Target"],
      (i) => [link(i), f(i, "Workstream"), f(i, "Programme status"), f(i, "Target date")], byDate("Target date")) },
  { id: "v13", name: "Overdue", what: "Target date before today, and Programme status not Done or Cancelled.",
    body: () => grouped(items.filter((i) => i.fields["Target date"] && i.fields["Target date"]! < TODAY && !["Done", "Cancelled"].includes(i.fields["Programme status"] ?? "")), (i) => f(i, "Workstream"), WS,
      ["Title", "Target", "Delivery health", "Assignee"], (i) => [link(i), f(i, "Target date"), f(i, "Delivery health"), who(i)], byDate("Target date")) },
];

// ── metrics ───────────────────────────────────────────────────────
function bars(counts: [string, number][]): string {
  const max = Math.max(1, ...counts.map(([, n]) => n));
  return table(["", "Count", ""], counts.map(([k, n]) => [esc(k), String(n), `<span class="pb-meter" style="width:${Math.round((n / max) * 160)}px"></span>`]));
}
const count = (list: BoardItem[], k: string, order: string[]): [string, number][] => [...order, "–"].map((o) => [o === "–" ? "not set" : o, list.filter((i) => (i.fields[k] ?? "–") === o).length] as [string, number]).filter(([o, n]) => n || o !== "not set");
const openEpics = epics.filter((i) => i.open);
const metrics = [
  ["M1", "Epics by Delivery health", bars(count(openEpics, "Delivery health", FIELDS["Delivery health"]!.options))],
  ["M2", "Blocked items by Workstream", bars(count(items.filter((i) => i.open && i.fields["Delivery health"] === "Blocked"), "Workstream", WS).filter(([, n]) => n))],
  ["M3", "At-risk or blocked dependencies", bars([["At risk or Blocked", items.filter((i) => is("dependency")(i) && i.open && ["At risk", "Blocked"].includes(i.fields["Delivery health"] ?? "")).length]])],
  ["M4", "Overdue deliverables", bars([["Overdue", items.filter((i) => i.fields["Target date"] && i.fields["Target date"]! < TODAY && !["Done", "Cancelled"].includes(i.fields["Programme status"] ?? "")).length]])],
  ["M5", "Integration readiness by Pipeline stage", table(["Pipeline stage", ...FIELDS["Integration readiness"]!.options], STAGES.map((s) => [s, ...FIELDS["Integration readiness"]!.options.map((r) => String(items.filter((i) => i.fields["Pipeline stage"] === s && i.fields["Integration readiness"] === r).length))]).filter((r) => r.slice(1).some((n) => n !== "0")))],
];
const noWs = items.filter((i) => !i.fields.Workstream);

// ── write ─────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });
const nav = `[Board](index.html) · ${views.map((v) => `[${v.id.toUpperCase()}](${v.id}.html)`).join(" · ")}`;
const stamp = `Built ${TODAY} from the labels of ${items.length} issue(s) in ${config.repositories.join(", ")} by \`scripts/programme/board.ts\`; as current as the last publish. Change a value by changing the issue's label.`;
for (const v of views) {
  writeFileSync(join(OUT, `${v.id}.md`), `---\ntitle: "${v.id.toUpperCase()} ${v.name}"\n---\n\n${STYLE}\n\n${nav}\n\n# ${v.id.toUpperCase()} ${v.name}\n\n${v.what} (req:aai-views#${v.id.toUpperCase()})\n\n${v.body()}\n\n_${stamp}_\n`);
}
writeFileSync(
  join(OUT, "index.md"),
  `---\ntitle: Programme board\n---\n\n${STYLE}\n\n# Programme board\n\nThe Assured AI programme's views and metrics (section 8), built from the issues' labels, with nothing kept by hand. The same issues show in [project 110](https://github.com/orgs/WorldHealthOrganization/projects/110).\n\n` +
    `## Views\n\n${table(["View", "Shows"], views.map((v) => [`[${v.id.toUpperCase()} ${v.name}](${v.id}.html)`, v.what]))}\n\n` +
    `## Metrics\n\n${metrics.map(([id, name, body]) => `### ${id} ${name}\n\n${body}`).join("\n\n")}\n\n` +
    `## Checks\n\n- **Every item has a Workstream** (req:aai-linking#LINK-06): ${noWs.length ? `**no** — ${noWs.map(link).join(", ")}` : "yes"}.\n- Items on the board: ${items.length} (AUTO-01's rule; a WS5 task with none of its labels stays off).\n\n_${stamp}_\n`,
);
console.log(`wrote ${OUT}: ${views.length} views, ${metrics.length} metrics, ${items.length} item(s)`);
