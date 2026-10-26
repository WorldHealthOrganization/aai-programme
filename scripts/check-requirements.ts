/**
 * Check this instance's requirement nodes with the platform's own checks.
 *
 * `bun run cat check:requirements` judges cat-harness's directories and needs
 * a `proposals` graph beside `requirements`, which this instance does not
 * keep. This runs the same exported checks (`checkRequirementPage`,
 * `checkRequirementSet`) on the `requirements` directory aai-programme
 * declares, so nothing is re-implemented here.
 *
 *   bun run scripts/check-requirements.ts
 */
import { readFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import {
  checkRequirementPage,
  checkRequirementSet,
  declaredDirFor,
  frontMatter,
  requirementPart,
  setsIn,
  statementsWithoutCriteria,
} from "../cat-harness-tools/scripts/check-requirements.ts";

const ROOT = resolve(import.meta.dir, "..");
const dir = declaredDirFor(ROOT, "requirements");
const pages = (await Array.fromAsync(new Bun.Glob("*.md").scan(dir))).filter((n) => n !== "index.md" && n !== "README.md").sort();
const status = new Map<string, string>();
let problems = 0;
let debt = 0;
for (const n of pages) {
  const file = join(dir, n);
  const text = readFileSync(file, "utf8");
  for (const p of checkRequirementPage(file, text)) {
    console.error(`  ✗ ${basename(p.file)}: ${p.message}`);
    problems++;
  }
  const req = requirementPart(frontMatter(text) ?? {}) as { id?: string; status?: string };
  if (req.id) status.set(req.id, req.status ?? "proposed");
  debt += statementsWithoutCriteria(req).length;
}
for (const s of setsIn(dir)) {
  for (const p of checkRequirementSet(s.file, s.raw, [], (ref: string) => status.get(ref.split("#")[0]!))) {
    console.error(`  ✗ ${basename(p.file)}: ${p.message}`);
    problems++;
  }
}
console.log(`${pages.length} requirement page(s), ${setsIn(dir).length} set(s); ${problems} problem(s); ${debt} statement(s) with no success criterion (a warning, not a failure)`);
process.exit(problems ? 1 : 0);
