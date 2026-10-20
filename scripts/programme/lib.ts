/**
 * GitHub I/O for the programme automations: issues through REST, the
 * project's fields through GraphQL, both via `gh api` so the same code runs
 * in an Action (GH_TOKEN) and on a person's machine. Decisions live in
 * `rules.ts`; nothing here decides anything.
 *
 * Section 7.4 fallback: the fields are PROJECT fields, read and written on
 * the project item. In the WHO build with organisation issue fields the
 * reads and writes move to the issue; `rules.ts` does not change.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface Config {
  project: { owner: string; ownerType: "user" | "organization"; number: number | null };
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
export function graphql<T>(query: string, variables: Record<string, unknown>): T {
  const out = JSON.parse(run(["graphql", "--input", "-"], JSON.stringify({ query, variables }))) as { data: T; errors?: { message: string }[] };
  if (out.errors?.length) throw new Error(out.errors.map((e) => e.message).join("; "));
  return out.data;
}

/** AUTO-09: say exactly what is missing, and stop, rather than work around it. */
export function requireProject(): number {
  if (config.project.number === null) {
    console.error(
      "::error::no programme project is configured: set project.number in scripts/programme/config.json once the project exists (docs/staging-project.md). " +
        "Writing its fields needs a token with read and write access to Projects for the owner, stored as the PROGRAMME_TOKEN secret (AUTO-09).",
    );
    process.exit(2);
  }
  return config.project.number;
}

export function isProgrammeTracked(labels: string[], issueType?: string | null): boolean {
  if (config.typeSource === "issue-type") return !!issueType && config.programmeTypes.includes(issueType);
  return labels.some((l) => config.programmeTypes.includes(l));
}

export interface ProjectItem {
  itemId: string;
  repo: string;
  number: number;
  state: string;
  labels: string[];
  fields: Record<string, string>;
}
export interface Project {
  id: string;
  fields: Map<string, { id: string; options: Map<string, string> }>;
  items: ProjectItem[];
}

const FIELDS = `fields(first: 50) { nodes { ... on ProjectV2FieldCommon { id name } ... on ProjectV2SingleSelectField { id name options { id name } } } }`;
const ITEMS = `items(first: 100, after: $after) { pageInfo { hasNextPage endCursor } nodes { id
  content { ... on Issue { number state repository { nameWithOwner } labels(first: 50) { nodes { name } } } }
  fieldValues(first: 30) { nodes {
    ... on ProjectV2ItemFieldSingleSelectValue { name field { ... on ProjectV2FieldCommon { name } } }
    ... on ProjectV2ItemFieldTextValue { text field { ... on ProjectV2FieldCommon { name } } }
    ... on ProjectV2ItemFieldDateValue { date field { ... on ProjectV2FieldCommon { name } } } } } } }`;

/** The project, its fields and every item, read in pages. */
export function readProject(): Project {
  const number = requireProject();
  const owner = config.project.ownerType === "user" ? "user" : "organization";
  const q = `query($login: String!, $number: Int!, $after: String) { ${owner}(login: $login) { projectV2(number: $number) { id ${FIELDS} ${ITEMS} } } }`;
  let after: string | null = null;
  let project: Project | undefined;
  do {
    type P = { id: string; fields: { nodes: { id: string; name: string; options?: { id: string; name: string }[] }[] }; items: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: any[] } };
    const data = graphql<Record<string, { projectV2: P }>>(q, { login: config.project.owner, number, after });
    const p = data[owner]!.projectV2;
    project ??= {
      id: p.id,
      fields: new Map(p.fields.nodes.filter((f) => f.name).map((f) => [f.name, { id: f.id, options: new Map((f.options ?? []).map((o) => [o.name, o.id])) }])),
      items: [],
    };
    for (const n of p.items.nodes) {
      if (!n.content?.number) continue;
      const fields: Record<string, string> = {};
      for (const v of n.fieldValues.nodes) if (v?.field?.name) fields[v.field.name] = v.name ?? v.text ?? v.date;
      project.items.push({ itemId: n.id, repo: n.content.repository.nameWithOwner, number: n.content.number, state: n.content.state, labels: n.content.labels.nodes.map((l: { name: string }) => l.name), fields });
    }
    after = p.items.pageInfo.hasNextPage ? p.items.pageInfo.endCursor : null;
  } while (after);
  return project!;
}

/** Set a single-select field on an item, or say what it would set. */
export function setOption(project: Project, item: ProjectItem, field: string, option: string): void {
  const f = project.fields.get(field);
  const id = f?.options.get(option);
  if (!f || !id) throw new Error(`the project has no ${field} option "${option}" (docs/staging-project.md, step 2)`);
  const what = `${item.repo}#${item.number}: ${field} ${item.fields[field] ?? "(empty)"} → ${option}`;
  if (DRY) return void console.log(`would set ${what}`);
  graphql(
    `mutation($p: ID!, $i: ID!, $f: ID!, $o: String!) { updateProjectV2ItemFieldValue(input: { projectId: $p, itemId: $i, fieldId: $f, value: { singleSelectOptionId: $o } }) { projectV2Item { id } } }`,
    { p: project.id, i: item.itemId, f: f.id, o: id },
  );
  console.log(`set ${what}`);
}
