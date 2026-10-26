/**
 * A site source step: forwarding pages at the addresses the first site served
 * (2026-10-20, before this site was built with the platform chrome), so links
 * already posted, on litlfred/folio-assistant#2605 among others, still land.
 *
 *   bun run scripts/site-redirects.ts <site source>
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const out = process.argv[2];
if (!out) {
  console.error("usage: site-redirects.ts <site source>");
  process.exit(2);
}
const v042 = "/en/cat-harness/library/aai-programme/assured-ai-github-programme-requirements-v042/";
const process_ = "/en/cat-harness/processes/programme-build.html";
// old address (as served) -> where it is now
const moved: [string, string][] = [
  ["docs/requirements-v0.4.2.html", v042],
  ["docs/index.html", v042],
  ["processes/index.html", process_],
  ["processes/process/programme-build.checklist.html", process_],
  ["pulled/index.html", "/board/"],
  ["library/index.html", "/en/cat-harness/library/aai-programme/"],
];
for (const [from, to] of moved) {
  const dest = join(out, from);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(
    dest,
    `---\nlayout: null\nsitemap: false\n---\n<!doctype html>\n<meta charset="utf-8">\n<title>Moved</title>\n` +
      `<meta http-equiv="refresh" content="0; url={{ '${to}' | relative_url }}">\n` +
      `<link rel="canonical" href="{{ '${to}' | relative_url }}">\n<p>This page moved to <a href="{{ '${to}' | relative_url }}">{{ '${to}' | relative_url }}</a>.</p>\n`,
  );
}
console.log(`wrote ${moved.length} forwarding page(s)`);
