/**
 * Build this repository's site: the README, the board, the processes, the
 * requirements and the library, rendered from their Markdown to HTML.
 *
 * Bun's own Markdown renderer, so no dependencies. Links between pages stay
 * relative, so the same build serves at the gh-pages root (main) and at
 * STAGING/<branch>/ (a pull request's preview). A link to a file the site does
 * not render (JSON, BPMN, scripts) goes to that file on GitHub at the built
 * commit.
 *
 *   bun run scripts/build-site.ts --out _site --repo litlfred/aai-programme --ref <sha> [--preview <branch>]
 *
 * The site never writes `ns/`: the JSON-LD context lives there on gh-pages,
 * published by the publish-context workflow.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dir, "..");

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}
const OUT = resolve(arg("--out") ?? "_site");
const REPO = arg("--repo") ?? "litlfred/aai-programme";
const REF = arg("--ref") ?? "main";
const PREVIEW = arg("--preview");

/** Every Markdown file under `dir`, repository-relative. */
function markdownUnder(dir: string): string[] {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { recursive: true, encoding: "utf8" })
    .filter((f) => f.endsWith(".md"))
    .map((f) => posix.join(dir, f.split("\\").join("/")))
    .sort();
}

/** The pages, as repository-relative Markdown paths. */
const sources = [
  "README.md",
  "pulled/README.md",
  ...markdownUnder("processes"),
  ...markdownUnder("docs"),
  ...markdownUnder("library"),
].filter((p) => existsSync(join(ROOT, p)));

/** `README.md` becomes the folder's `index.html`; any other `x.md` becomes `x.html`. */
function pageFor(md: string): string {
  return /(^|\/)README\.md$/.test(md) ? md.replace(/README\.md$/, "index.html") : md.replace(/\.md$/, ".html");
}
const pages = new Map(sources.map((s) => [s, pageFor(s)]));

/** Images and diagrams a page shows, copied as they are. */
const assets = readdirSync(ROOT, { recursive: true, encoding: "utf8" })
  .map((f) => f.split("\\").join("/"))
  .filter((f) => /\.(svg|png|jpe?g)$/i.test(f) && !f.startsWith("node_modules/") && !f.startsWith(".") && !f.startsWith("_site/"));

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Point a link written in `fromMd` at the right place in the site, or on GitHub. */
function rewrite(href: string, fromMd: string): string {
  if (/^([a-z]+:|#|\/\/)/i.test(href)) return href;
  const [path, hash = ""] = href.split("#", 2);
  const anchor = hash ? `#${hash}` : "";
  const target = posix.normalize(posix.join(posix.dirname(fromMd), decodeURI(path)));
  // Above the repository root, as GitHub's own `../../tree/<branch>` links
  // are: resolve it the way GitHub does, from the file's page there.
  if (target.startsWith("..")) return new URL(href, `https://github.com/${REPO}/blob/${REF}/${fromMd}`).href;
  const fromPage = pages.get(fromMd)!;
  const rel = (to: string) => posix.relative(posix.dirname(fromPage), to) || posix.basename(to);
  if (pages.has(target)) return rel(pages.get(target)!) + anchor;
  const readme = posix.join(target, "README.md");
  if (pages.has(readme)) return rel(pages.get(readme)!) + anchor;
  if (assets.includes(target)) return rel(target) + anchor;
  const kind = existsSync(join(ROOT, target)) && statSync(join(ROOT, target)).isDirectory() ? "tree" : "blob";
  return `https://github.com/${REPO}/${kind}/${REF}/${target}${anchor}`;
}

function linksRewritten(html: string, fromMd: string): string {
  return html.replace(/\b(href|src)="([^"]*)"/g, (_m, attr: string, url: string) => `${attr}="${escapeHtml(rewrite(url.replace(/&amp;/g, "&"), fromMd))}"`);
}

/** The library has no README of its own: list its entries and their sections. */
function libraryIndex(): string {
  const root = join(ROOT, "library");
  if (!existsSync(root)) return "";
  const entries = readdirSync(root).filter((e) => existsSync(join(root, e, "sections"))).sort();
  const lines = ["# Library", "", "The programme requirements, ingested from `uploads/`. Each section is also a JSON-LD node.", ""];
  for (const e of entries) {
    const manifest = JSON.parse(readFileSync(join(root, e, "manifest.jsonld"), "utf8")) as { title?: string };
    lines.push(`## ${manifest.title ?? e}`, "", `\`${e}\``, "");
    for (const s of readdirSync(join(root, e, "sections")).filter((f) => f.endsWith(".md")).sort()) {
      const first = readFileSync(join(root, e, "sections", s), "utf8").split("\n").find((l) => l.startsWith("#"));
      lines.push(`- [${(first ?? s).replace(/^#+\s*/, "")}](${e}/sections/${s})`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const NAV: [string, string][] = [
  ["Home", "index.html"],
  ["Board", "pulled/index.html"],
  ["Processes", "processes/index.html"],
  ["Requirements v0.4.2", "docs/requirements-v0.4.2.html"],
  ["Library", "library/index.html"],
];

function wrap(title: string, body: string, page: string): string {
  const up = posix.relative(posix.dirname(page), ".") || ".";
  const nav = NAV.map(([label, href]) => `<a href="${up}/${href}">${label}</a>`).join("");
  const banner = PREVIEW
    ? `<div class="banner">Preview of branch <code>${escapeHtml(PREVIEW)}</code> at <code>${escapeHtml(REF.slice(0, 7))}</code>. <a href="${up}/../../index.html">Open main</a></div>`
    : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} · Assured AI programme</title>
<style>
:root { --fg:#1f2328; --bg:#fff; --muted:#59636e; --line:#d1d9e0; --link:#0969da; --code:#f6f8fa; --banner:#fff8c5; }
@media (prefers-color-scheme: dark) { :root { --fg:#e6edf3; --bg:#0d1117; --muted:#9198a1; --line:#3d444d; --link:#4493f8; --code:#151b23; --banner:#3b2e00; } }
body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; }
header { border-bottom:1px solid var(--line); padding:12px 16px; display:flex; flex-wrap:wrap; gap:6px 18px; align-items:baseline; }
header strong { margin-right:8px; }
header a { color:var(--link); text-decoration:none; }
main { max-width:980px; margin:0 auto; padding:16px; overflow-wrap:anywhere; }
a { color:var(--link); }
code { background:var(--code); padding:0 4px; border-radius:4px; font-size:.92em; }
pre { background:var(--code); padding:12px; overflow:auto; border-radius:6px; }
pre code { padding:0; }
table { border-collapse:collapse; display:block; overflow:auto; margin:12px 0; }
th, td { border:1px solid var(--line); padding:6px 10px; vertical-align:top; text-align:left; }
img { max-width:100%; background:#fff; }
.banner { background:var(--banner); padding:8px 16px; border-bottom:1px solid var(--line); }
footer { color:var(--muted); font-size:.85em; max-width:980px; margin:24px auto; padding:0 16px; }
</style>
</head>
<body>
${banner}<header><strong>Assured AI programme</strong>${nav}</header>
<main>
${body}
</main>
<footer>Built from <a href="https://github.com/${REPO}/tree/${REF}">${escapeHtml(REPO)}@${escapeHtml(REF.slice(0, 7))}</a>.</footer>
</body>
</html>
`;
}

rmSync(OUT, { recursive: true, force: true });
const libraryMd = "library/README.md";
const generated = new Map<string, string>();
if (!pages.has(libraryMd) && existsSync(join(ROOT, "library"))) {
  pages.set(libraryMd, "library/index.html");
  generated.set(libraryMd, libraryIndex());
}

let count = 0;
for (const [md, page] of pages) {
  const text = generated.get(md) ?? readFileSync(join(ROOT, md), "utf8");
  const title = text.split("\n").find((l) => l.startsWith("# "))?.slice(2).trim() ?? md;
  const html = linksRewritten(Bun.markdown.html(text), md);
  const dest = join(OUT, page);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, wrap(title, html, page));
  count++;
}
for (const a of assets) {
  mkdirSync(dirname(join(OUT, a)), { recursive: true });
  copyFileSync(join(ROOT, a), join(OUT, a));
}
console.log(`built ${count} page(s) and ${assets.length} asset(s) into ${relative(process.cwd(), OUT) || "."}`);
