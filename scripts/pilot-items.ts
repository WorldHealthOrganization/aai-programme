/**
 * Create the section 12 pilot set as issues in this repository, each marked
 * as a pilot, with the relationships the pilot tests need.
 *
 *   bun run scripts/pilot-items.ts --dry-run   # say what it would create, change nothing
 *   bun run scripts/pilot-items.ts             # create what is missing
 *
 * Safe to rerun (req:aai-automation#AUTO-08): an item is matched by its title,
 * so a second run creates nothing and only adds a missing link. It talks to
 * GitHub through `gh api`, so it runs wherever `gh` is signed in.
 *
 * The items are representative Assured AI work, not real commitments, and
 * none moves or changes existing operational work (section 12). Each body
 * carries a **Programme fields** table: what the staging project's fields
 * (section 7.4 fallback) are set to, because this repository's owner is a
 * personal account and has no issue fields. Each field the table sets is also
 * a label (`programme/fields.ts`), since with no tokens the issue holds the
 * values. The type of each item is a `type:` label for the same reason.
 */
import { FIELDS, labelFor } from "./programme/fields.ts";

const REPO = "litlfred/aai-programme";
const DRY = process.argv.includes("--dry-run");

interface Item {
  key: string;
  title: string;
  labels: string[];
  fields: Record<string, string>;
  body: string;
  parent?: string;
  blockedBy?: string[];
}

const ITEMS: Item[] = [
  {
    key: "epic",
    title: "[Pilot] Epic: one WHO recommendation from source guidance to a health skill",
    labels: ["pilot", "type:epic", "thin-slice", "rq:R1", "route:b"],
    fields: { Workstream: "Cross-workstream", "Programme status": "In progress", "Delivery health": "On track", "Pipeline stage": "Cross-cutting / N/A", "Integration readiness": "Not assessed", "Primary research question": "R1", "Gates output": "None" , "Start date": "2026-10-20", "Target date": "2026-12-04"},
    body: "The thin slice: one recommendation taken through every pipeline stage, to prove the end-to-end flow. Its features are this issue's sub-issues, so their progress rolls up into V1.\n\nNext action: WS1 merges the table extraction (#5) so WS3 can start its check (#6); the WS1 lead, by 6 November 2026.",
  },
  {
    key: "ws1",
    title: "[Pilot] Feature (WS1): extract the recommendation's tables into the knowledge graph",
    labels: ["pilot", "type:feature", "sprint-demo", "rq:R1"],
    fields: { Workstream: "WS1 Knowledge graph", "Pipeline stage": "KG Knowledge graph", "Delivery health": "On track", "Integration readiness": "Ready to integrate", "Review type": "Not needed" , "Start date": "2026-10-20", "Target date": "2026-11-06"},
    body: "Tables in the source guidance become knowledge graph nodes. The extraction code lives outside WHO's GitHub, in [litlfred/folio-assistant](https://github.com/litlfred/folio-assistant); this issue is its coordination record (BD-02a, BD-02b).",
    parent: "epic",
  },
  {
    key: "ws3",
    title: "[Pilot] Feature (WS3): check the extracted graph against the source",
    labels: ["pilot", "type:feature", "blocked", "rq:R1"],
    fields: { Workstream: "WS3 Evaluation", "Pipeline stage": "EVAL Evaluation", "Delivery health": "Blocked", "Risk category": "Dependency", Impact: "Medium", "Review type": "SME sign-off", "Review status": "Not submitted" , "Start date": "2026-11-09", "Target date": "2026-11-20"},
    body: "Compares the graph nodes with the source tables, and goes to a WHO subject-matter expert for sign-off.\n\nNext action: WS3 starts the comparison when the WS1 extraction is merged; the WS3 lead, by the pilot's end.",
    parent: "epic",
    blockedBy: ["ws1"],
  },
  {
    key: "platform",
    title: "[Pilot] Feature (Platform): serve the thin slice's health skill",
    labels: ["pilot", "type:feature"],
    fields: { Workstream: "Platform", "Pipeline stage": "L5 Health skills + MCP", "Delivery health": "On track", "Integration readiness": "Not ready" , "Start date": "2026-11-09", "Target date": "2026-11-27"},
    body: "Hosts the skill the thin slice produces, so it can be called through MCP.",
    parent: "epic",
  },
  {
    key: "dep",
    title: "D-P1: [Pilot] WS3's check waits on WS1's extracted graph",
    labels: ["pilot", "type:dependency", "at-risk"],
    fields: { Workstream: "WS3 Evaluation", "Delivery health": "At risk", "Risk category": "Dependency", Impact: "Medium" , "Target date": "2026-11-09"},
    body: "- Waiting workstream: WS3 Evaluation\n- Waiting epic: the pilot epic\n- Depends on workstream: WS1 Knowledge graph\n- Depends on epic: the pilot epic (the WS1 feature)\n- Needed by: the pilot's end\n- Consequence if late: the thin slice has no evaluation result\n- Next action: WS1 merges the extraction; the WS1 lead, by the pilot's end\n- Owner: the PM & Architecture Integration\n\nThe D-number is a pilot placeholder, not one of D01 to D29.",
  },
  {
    key: "dec",
    title: "DEC-P1: [Pilot] Which recommendation the thin slice uses",
    labels: ["pilot", "type:decision"],
    fields: { Workstream: "Cross-workstream", "Programme status": "Not started" , "Target date": "2026-10-30"},
    body: "The decision and its outcome are recorded here; any deliberation stays off GitHub (section 6). The DEC-number is a pilot placeholder.",
  },
  {
    key: "rq",
    title: "[Pilot] Research question R1",
    labels: ["pilot", "type:research-question", "rq:R1"],
    fields: { "Programme status": "In progress", "Primary research question": "R1" },
    body: "Holds R1, its sub-questions and rationale once the PM supplies them (section 14). Contributing items carry the `rq:R1` label; V4 lists them.",
  },
  {
    key: "milestone",
    title: "[Pilot] Milestone: thin slice demonstrated",
    labels: ["pilot", "type:milestone"],
    fields: { "Programme status": "Not started", "Delivery health": "On track", "Gates output": "None" , "Start date": "2026-11-30", "Target date": "2026-12-04"},
    body: "An internal gate for the pilot, not a Gates output.",
  },
  {
    key: "ws5",
    title: "[Pilot] WS5 task: prepare the sprint review",
    labels: ["pilot", "type:task"],
    fields: { Workstream: "WS5 Governance and stewardship" , "Target date": "2026-11-20"},
    body: "A routine WS5 task. It has none of the labels auto-add looks for, so it stays off the programme board (AUTO-01, LINK-05): the pilot checks that.",
    parent: "epic",
  },
];

function gh(args: string[], input?: string): unknown {
  const r = Bun.spawnSync(["gh", "api", ...args], { stdin: input ? new TextEncoder().encode(input) : undefined, stderr: "pipe" });
  if (r.exitCode !== 0) throw new Error(`gh api ${args.join(" ")}: ${new TextDecoder().decode(r.stderr).trim()}`);
  const out = new TextDecoder().decode(r.stdout).trim();
  return out ? JSON.parse(out) : undefined;
}

function bodyOf(item: Item): string {
  const rows = Object.entries(item.fields).map(([k, v]) => `| ${k} | ${v} |`);
  return `${item.body}\n\n**Programme fields** (the labels hold the values the automations keep; the dates and the rest are read from here):\n\n| Field | Value |\n|---|---|\n${rows.join("\n")}\n\n_A pilot item (section 12), closed after the bulk import. Its dates are pilot placeholders, not programme commitments._\n`;
}

type Issue = { number: number; id: number; title: string; body?: string | null; labels?: { name: string }[] };

/** The item's labels plus one label per programme field it sets (no tokens: the issue holds the values). */
function labelsOf(item: Item): string[] {
  return [...item.labels, ...Object.entries(item.fields).filter(([f]) => f in FIELDS).map(([f, v]) => labelFor(f, v))];
}
const existing = new Map<string, Issue>();
{
  try {
    for (const i of gh(["--paginate", `repos/${REPO}/issues?state=all&labels=pilot&per_page=100`]) as Issue[]) existing.set(i.title, i);
  } catch (e) {
    if (!DRY) throw e;
    console.log(`(could not list issues: ${(e as Error).message.split("\n")[0]})`);
  }
}

const byKey = new Map<string, Issue>();
for (const item of ITEMS) {
  const found = existing.get(item.title);
  if (found) {
    byKey.set(item.key, found);
    // A body written through an agent session can carry an attribution footer
    // the session appends; it is not part of the item, so it is not a difference.
    const stored = (found.body ?? "").replace(/\n+---\n_Generated by \[Claude Code\]\([^)]*\)_\s*$/, "");
    if (stored.trim() !== bodyOf(item).trim()) {
      if (DRY) console.log(`body    #${found.number} would be updated`);
      else {
        gh(["-X", "PATCH", `repos/${REPO}/issues/${found.number}`, "--input", "-"], JSON.stringify({ body: bodyOf(item) }));
        console.log(`updated #${found.number} body`);
      }
    }
    const have = new Set((found.labels ?? []).map((l) => l.name));
    const missing = labelsOf(item).filter((l) => !have.has(l));
    if (!missing.length) console.log(`exists  #${found.number} ${item.title}`);
    else if (DRY) console.log(`label   #${found.number} + ${missing.join(", ")}`);
    else {
      gh(["-X", "POST", `repos/${REPO}/issues/${found.number}/labels`, "--input", "-"], JSON.stringify({ labels: missing }));
      console.log(`labelled #${found.number} + ${missing.join(", ")}`);
    }
    continue;
  }
  if (DRY) {
    console.log(`create  ${item.title}  [${item.labels.join(", ")}]`);
    continue;
  }
  const made = gh(["-X", "POST", `repos/${REPO}/issues`, "--input", "-"], JSON.stringify({ title: item.title, body: bodyOf(item), labels: labelsOf(item) })) as Issue;
  byKey.set(item.key, made);
  console.log(`created #${made.number} ${item.title}`);
}

for (const item of ITEMS) {
  const me = byKey.get(item.key);
  if (item.parent) {
    const parent = byKey.get(item.parent);
    if (!me || !parent) console.log(`link    sub-issue: ${item.key} under ${item.parent}`);
    else if (!DRY) {
      const subs = gh([`repos/${REPO}/issues/${parent.number}/sub_issues`]) as Issue[];
      if (!subs.some((s) => s.id === me.id)) {
        gh(["-X", "POST", `repos/${REPO}/issues/${parent.number}/sub_issues`, "-F", `sub_issue_id=${me.id}`]);
        console.log(`linked  #${me.number} as a sub-issue of #${parent.number}`);
      }
    }
  }
  for (const b of item.blockedBy ?? []) {
    const blocker = byKey.get(b);
    if (!me || !blocker) console.log(`link    ${item.key} blocked by ${b}`);
    else if (!DRY) {
      const deps = gh([`repos/${REPO}/issues/${me.number}/dependencies/blocked_by`]) as Issue[];
      if (!deps.some((d) => d.id === blocker.id)) {
        gh(["-X", "POST", `repos/${REPO}/issues/${me.number}/dependencies/blocked_by`, "-F", `issue_id=${blocker.id}`]);
        console.log(`linked  #${me.number} blocked by #${blocker.number}`);
      }
    }
  }
}
if (DRY) console.log("dry run: nothing changed");
