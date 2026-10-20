/**
 * A site source step: put the requirement nodes (`docs/requirements/`, written
 * by `gen-requirements.ts`) on the site at `docs/requirements/`, with an index
 * of every page and its statements.
 *
 * The platform composes only its own chrome for a downstream instance, so an
 * instance's `docs/` pages reach its site only through a step like this one.
 *
 *   bun run scripts/site-requirements.ts <site source>
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { parse } from "yaml";

const out = process.argv[2];
if (!out) {
  console.error("usage: site-requirements.ts <site source>");
  process.exit(2);
}
const root = resolve(import.meta.dir, "..");
const src = join(root, "docs/requirements");
const dest = join(out, "docs/requirements");
mkdirSync(dest, { recursive: true });
const rows: string[] = [];
for (const n of readdirSync(src).filter((f) => f.endsWith(".md") && f !== "index.md" && f !== "README.md").sort()) {
  copyFileSync(join(src, n), join(dest, n));
  const fm = parse(readFileSync(join(src, n), "utf8").split(/^---$/m)[1] ?? "") as { id: string; title: string; status: string; statements: { key: string }[] };
  const keys = fm.statements.map((s) => s.key);
  rows.push(`| [${fm.title.replace(/^Assured AI programme: /, "")}](${n.replace(/\.md$/, ".html")}) | \`${fm.id}\` | ${fm.status} | ${keys.length} | ${keys[0]} … ${keys[keys.length - 1]} |`);
}
const sets = readdirSync(src).filter((f) => f.endsWith(".requirement-set.json"));
const setLines = sets.map((f) => {
  const s = JSON.parse(readFileSync(join(src, f), "utf8")) as { id: string; title: string; stage: string; members: unknown[]; document: string };
  return `- **${s.title}** (\`${s.id}\`): stage **${s.stage}**, ${s.members.length} requirement(s). [The document](${s.document}).`;
});
writeFileSync(
  join(dest, "index.md"),
  [
    "---",
    "title: Requirement nodes",
    "---",
    "",
    "# Requirement nodes",
    "",
    "One statement per requirement ID, generated from the requirements document by `scripts/gen-requirements.ts`. Cite one as `req:<group>#<ID>`, for example `req:aai-automation#AUTO-04`.",
    "",
    "| Group | Id | Status | Statements | Range |",
    "|---|---|---|--:|---|",
    ...rows,
    "",
    "## Requirement sets",
    "",
    ...setLines,
    "",
  ].join("\n"),
);
// The staging project's set-up, a page of its own beside the requirements.
writeFileSync(join(out, "docs/staging-project.md"), `---\ntitle: Project 110 as the programme board\n---\n\n${readFileSync(join(root, "docs/staging-project.md"), "utf8")}`);
console.log(`wrote ${rows.length} requirement page(s), the index and the staging-project page into ${dest}`);
