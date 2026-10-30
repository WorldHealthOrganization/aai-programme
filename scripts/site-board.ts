/**
 * A site source step: put the combined beans board (`pulled/README.md`, built
 * by `pull-beans.ts`) on the site at `board/`.
 *
 * The platform's `beans` visualiser publishes a downstream's work plan only on
 * cat-harness's own site, so without this the board this repository builds
 * would not be on its own site.
 *
 *   bun run scripts/site-board.ts <site source>
 */
import { thisRepo } from "./origin-repo.ts";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const out = process.argv[2];
if (!out) {
  console.error("usage: site-board.ts <site source>");
  process.exit(2);
}
const root = resolve(import.meta.dir, "..");
const repo = `https://github.com/${thisRepo()}/blob/main`;
const board = readFileSync(join(root, "pulled/README.md"), "utf8")
  // Links up out of pulled/ name files in this repository: point them at GitHub.
  .replace(/\]\(\.\.\/([^)]+)\)/g, (_m, p: string) => `](${repo}/${p})`);
mkdirSync(join(out, "board"), { recursive: true });
writeFileSync(join(out, "board/index.md"), `---\ntitle: Work plan board\n---\n\n${board}`);
console.log(`wrote ${join(out, "board/index.md")}`);
