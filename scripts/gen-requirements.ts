/**
 * Generate the programme's requirement nodes from one version of the
 * requirements document: one `Requirement` page per group of IDs, one
 * statement per ID, and the `RequirementSet` for that version.
 *
 *   bun run scripts/gen-requirements.ts --source uploads/<file>.md --entry <library entry> --version 0.5
 *
 * Every requirement ID in the document (DP-01, BD-01a, SEC-03, V7, M2, AUTO-03,
 * PIL-05, AC-12, …) becomes a statement addressable as `req:<slug>#<ID>`, so a
 * bean, an issue or a test can cite exactly one. Each page points back to the
 * ingested section it came from (`derivedFrom`, the library section's `@id`).
 * The shapes are bootstrap's `Requirement` and `RequirementSet`, checked by
 * `bun run cat check:requirements`.
 *
 * The document stays the authority: change it, ingest it, and rerun this.
 * Pages are regenerated whole, so do not edit them by hand.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { stringify } from "yaml";

const ROOT = resolve(import.meta.dir, "..");
function arg(name: string): string {
  const i = process.argv.indexOf(name);
  const v = i > 0 ? process.argv[i + 1] : undefined;
  if (!v) {
    console.error("usage: gen-requirements.ts --source <md> --entry <library entry> --version <x.y>");
    process.exit(2);
  }
  return v;
}
const SOURCE = arg("--source");
const ENTRY = arg("--entry");
const VERSION = arg("--version");
const OUT = join(ROOT, "docs/requirements");
const ISSUE = "https://github.com/litlfred/folio-assistant/issues/2605";

type Conformance = "SHALL" | "SHOULD" | "MAY" | "SHALL NOT";
interface Statement {
  key: string;
  label: string;
  conformance: Conformance;
  requirement: string;
  successCriteria?: { key: string; criterion: string; verification: "test" | "inspection" | "review" | "analysis" }[];
}
interface Group {
  slug: string;
  title: string;
  /** The section number the IDs sit in, as the ingested section's id spells it (`8-1` for 8.1). */
  section: string;
  /** The ID's own pattern. */
  id: RegExp;
  description: string;
  actors: string[];
  /** How a row's cells (after the ID) become a statement. */
  read: (cells: string[]) => { label: string; requirement: string };
  verification?: "test" | "inspection";
}

const PM = "pm-architecture-integration";
const AGENT = "build-agent";
const OWNER = "who-github-owner";
const TIL = "technical-integration-lead";

const plain = (s: string) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
const firstWords = (s: string, n = 8) => {
  const w = plain(s).replace(/[.:;]$/, "").split(" ");
  return w.length <= n ? w.join(" ") : `${w.slice(0, n).join(" ")}…`;
};
/** A bold lead-in (`**Create once.** Rest`) is the label; otherwise the first words. */
function boldLed(cells: string[]): { label: string; requirement: string } {
  const text = cells[0] ?? "";
  const m = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  return m ? { label: plain(m[1]!).replace(/\.$/, ""), requirement: plain(text) } : { label: firstWords(text), requirement: plain(text) };
}

const GROUPS: Group[] = [
  { slug: "aai-design-principles", title: "Design principles", section: "2", id: /^DP-\d+$/, actors: [AGENT, PM],
    description: "The principles every part of the build follows (section 2).", read: boldLed },
  { slug: "aai-decisions", title: "Decisions needed before the build", section: "3", id: /^BD-\d+[a-z]?$/, actors: [OWNER, PM],
    description: "What must be decided, and by whom, before the build goes past pre-flight (section 3). Each statement is the decision and its recommended default.",
    read: (c) => ({ label: firstWords(c[0] ?? "", 10), requirement: `${plain(c[0] ?? "")}. Default: ${plain(c[1] ?? "")}` }) },
  { slug: "aai-information", title: "Information classification", section: "6", id: /^SEC-\d+$/, actors: [AGENT, PM],
    description: "What may be on GitHub, which is public, and what never is (section 6).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
  { slug: "aai-views", title: "Programme project views", section: "8-1", id: /^V\d+$/, actors: [AGENT], verification: "inspection",
    description: "The views of the Assured AI Programme project (section 8.1).",
    read: (c) => ({ label: plain(c[0] ?? ""), requirement: `The view "${plain(c[0] ?? "")}": layout ${plain(c[1] ?? "")}; items: ${plain(c[2] ?? "")}; ${plain(c[3] ?? "")}; columns: ${plain(c[4] ?? "")}.` }) },
  { slug: "aai-metrics", title: "Metrics", section: "8-2", id: /^M\d+$/, actors: [AGENT, PM],
    description: "The programme's simple metrics, from the project's built-in charts (section 8.2).",
    read: (c) => ({ label: plain(c[0] ?? ""), requirement: `${plain(c[0] ?? "")}, built from ${plain(c[1] ?? "")}.` }) },
  { slug: "aai-dependencies", title: "Dependencies", section: "9", id: /^DEP-\d+$/, actors: [AGENT, PM],
    description: "How dependencies are recorded (section 9).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
  { slug: "aai-linking", title: "Linking to workstream projects", section: "10", id: /^LINK-\d+$/, actors: [AGENT, PM],
    description: "How the programme project and the workstream projects link (section 10).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
  { slug: "aai-automation", title: "Automation", section: "11", id: /^AUTO-\d+$/, actors: [AGENT, OWNER, TIL],
    description: "What the automations do, and what they never do (section 11).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
  { slug: "aai-pilot", title: "Pilot tests", section: "12", id: /^PIL-\d+$/, actors: [AGENT, TIL], verification: "test",
    description: "What the pilot build must prove before any bulk import (section 12).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
  { slug: "aai-acceptance", title: "Acceptance criteria", section: "15", id: /^AC-\d+$/, actors: [AGENT, PM], verification: "inspection",
    description: "What the finished build is checked against (section 15).", read: (c) => ({ label: firstWords(c[0] ?? ""), requirement: plain(c[0] ?? "") }) },
];

/** Never / No … / Do not → SHALL NOT; a leading "Optional" → MAY; otherwise SHALL. */
function conformanceOf(text: string): Conformance {
  if (/^(Never|No |Do not|Nothing )/.test(text)) return "SHALL NOT";
  if (/^Optional\b/.test(text)) return "MAY";
  return "SHALL";
}

/** Every `| ID | … |` row and `- **ID.** …` bullet, keyed by ID. */
function rowsOf(md: string): Map<string, string[]> {
  const rows = new Map<string, string[]>();
  for (const line of md.split("\n")) {
    const t = line.match(/^\|\s*([A-Z]+-?\d+[a-z]?)\s*\|(.*)\|\s*$/);
    if (t) {
      rows.set(t[1]!, t[2]!.split("|").map((c) => c.trim()));
      continue;
    }
    const b = line.match(/^- \*\*([A-Z]+-\d+)\.\*\*\s*(.*)$/);
    if (b) rows.set(b[1]!, [b[2]!]);
  }
  return rows;
}

/** The `@id` of the ingested section numbered `section`, from the library entry. */
function sectionIri(section: string): string {
  const dir = join(ROOT, "library", ENTRY, "sections");
  const f = readdirSync(dir).find((n) => n.endsWith(".jsonld") && new RegExp(`^s\\d+-${section}-`).test(n));
  if (!f) throw new Error(`no ingested section ${section} in library/${ENTRY}/sections`);
  return (JSON.parse(readFileSync(join(dir, f), "utf8")) as { "@id": string })["@id"];
}

const rows = rowsOf(readFileSync(join(ROOT, SOURCE), "utf8"));
mkdirSync(OUT, { recursive: true });
const members: { ref: string }[] = [];
let total = 0;
for (const g of GROUPS) {
  const statements: Statement[] = [];
  const removed: string[] = [];
  for (let [id, cells] of rows) {
    if (!g.id.test(id)) continue;
    const first = plain(cells[0] ?? "");
    // A row the version removed ("Removed in v0.5: …") is not a statement; a
    // removed row that names its replacement ("Instead: …") is the replacement.
    if (/^Removed in v[\d.]+/.test(first)) {
      const instead = first.match(/Instead:\s*(.*)$/);
      if (!instead) {
        removed.push(id);
        continue;
      }
      cells = [instead[1]!, ...cells.slice(1)];
    }
    const { label, requirement } = g.read(cells);
    const s: Statement = { key: id, label, conformance: conformanceOf(requirement), requirement };
    if (g.verification) s.successCriteria = [{ key: "SC-1", criterion: requirement, verification: g.verification }];
    statements.push(s);
  }
  if (statements.length === 0) throw new Error(`no statements for ${g.slug}: the document's ${g.title} rows did not parse`);
  const req = {
    id: `req:${g.slug}`,
    title: `Assured AI programme: ${g.title.toLowerCase()}`,
    description: `${g.description} From requirements v${VERSION}.${removed.length ? ` Removed in v${VERSION}: ${removed.join(", ")}.` : ""}`,
    status: "proposed",
    derivedFrom: [sectionIri(g.section)],
    actors: g.actors,
    tags: ["aai-programme", `v${VERSION}`],
    statements,
  };
  const body = [
    `# ${g.title}`,
    "",
    `${g.description} Generated from [requirements v${VERSION}](https://github.com/litlfred/aai-programme/blob/main/${SOURCE}) by \`scripts/gen-requirements.ts\`; do not edit by hand. Cite one as \`req:${g.slug}#<ID>\`.`,
    "",
    "| ID | Level | Requirement |",
    "|---|---|---|",
    ...statements.map((s) => `| \`${s.key}\` | ${s.conformance} | ${s.requirement.replace(/\|/g, "\\|")} |`),
    "",
  ].join("\n");
  writeFileSync(join(OUT, `${g.slug}.md`), `---\n${stringify(req, { lineWidth: 0 })}---\n\n${body}`);
  members.push({ ref: req.id });
  total += statements.length;
  console.log(`${g.slug}: ${statements.length} statement(s)${removed.length ? `, ${removed.length} removed (${removed.join(", ")})` : ""}`);
}

const slug = `aai-programme-v${VERSION.replace(/\./g, "-")}`;
const set = {
  id: `reqset:${slug}`,
  title: `Assured AI programme: requirements v${VERSION}`,
  methodology: "crdm",
  issue: ISSUE,
  document: `https://github.com/litlfred/aai-programme/blob/main/${SOURCE}`,
  stage: "proposed",
  members,
};
writeFileSync(join(OUT, `${slug}.requirement-set.json`), `${JSON.stringify(set, null, 2)}\n`);
const index = join(OUT, "index.md");
if (!existsSync(index)) {
  writeFileSync(
    index,
    "---\ntitle: Requirements\n---\n\n# Requirements\n\nThe programme requirements, one page per group, one statement per requirement ID. Generated from the requirements document by `scripts/gen-requirements.ts`.\n",
  );
}
console.log(`${total} statement(s) in ${GROUPS.length} requirement(s); set ${set.id} at stage ${set.stage}`);
