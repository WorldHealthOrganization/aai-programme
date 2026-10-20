#!/usr/bin/env bun
/**
 * Pull beans from every repository listed in beans-sources.json into one board.
 *
 *   bun run scripts/pull-beans.ts            write pulled/beans.json and pulled/README.md
 *   bun run scripts/pull-beans.ts --dry-run  print the summary, write nothing
 *   bun run scripts/pull-beans.ts --check    fail if the files on disk are out of date
 *
 * Read-only towards every source: it fetches with plain git over HTTPS, so public
 * repositories need no token. Output carries the source commit of each store
 * instead of a timestamp, so running it twice on unchanged sources changes nothing.
 *
 * GitHub issues are the source of truth for programme status. A bean links to
 * its issue through `issue:`; the board shows the link and counts open beans
 * that have none. Nothing here writes to an issue.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = resolve(import.meta.dir, "..");
const CONFIG = join(ROOT, "beans-sources.json");
const OUT_DIR = join(ROOT, "pulled");
const CACHE = join(ROOT, ".cache", "beans");

const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const CHECK = args.has("--check");

const OPEN = ["in-progress", "todo"];
const STATUS_ORDER = ["in-progress", "todo", "draft", "completed", "scrapped"];
const PRIORITY_ORDER = ["critical", "high", "normal", "low", "deferred"];

type Store = { branch: string; path?: string };
type Source = { repo: string; store?: Partial<Store> };
type Config = { sources: Source[]; deny?: { repo: string; why: string }[] };

type Bean = {
  repo: string;
  id: string;
  title: string;
  status: string;
  type: string;
  priority: string;
  parent?: string;
  blocking: string[];
  blocked_by: string[];
  tags: string[];
  issue?: string;
  archived: boolean;
  updated_at?: string;
  url: string;
};

type StoreResult = {
  repo: string;
  state: "ok" | "no-store" | "unreadable";
  branch?: string;
  path?: string;
  commit?: string;
  note?: string;
  beans: Bean[];
};

function git(argv: string[], cwd?: string): { ok: boolean; out: string; err: string } {
  const r = spawnSync("git", argv, { cwd, encoding: "utf8", maxBuffer: 512 * 1024 * 1024 });
  return { ok: r.status === 0, out: r.stdout ?? "", err: (r.stderr ?? "").trim() };
}

const url = (repo: string) => `https://github.com/${repo}.git`;

/** Find where a repo keeps its beans, unless the config says. */
function locate(src: Source): { store?: Store; note?: string; unreadable?: string } {
  const given = src.store ?? {};
  if (given.branch) return { store: { branch: given.branch, path: given.path } };

  const heads = git(["ls-remote", url(src.repo), "refs/heads/cat/*/beans", "HEAD"]);
  if (!heads.ok) return { unreadable: `ls-remote failed: ${heads.err}` };
  const lines = heads.out.trim().split("\n").filter(Boolean);
  const stateBranches = lines
    .map((l) => l.split("\t")[1])
    .filter((r) => r.startsWith("refs/heads/cat/"))
    .map((r) => r.replace("refs/heads/", ""));
  if (stateBranches.length > 1)
    return { unreadable: `several beans branches (${stateBranches.join(", ")}); name one under store.branch` };
  if (stateBranches.length === 1) return { store: { branch: stateBranches[0], path: given.path } };

  const def = git(["ls-remote", "--symref", url(src.repo), "HEAD"]);
  const m = def.out.match(/ref: refs\/heads\/(\S+)\s+HEAD/);
  if (!m) return { unreadable: "cannot find the default branch" };
  return { store: { branch: m[1], path: given.path }, note: "default-branch" };
}

function fetchStore(repo: string, store: Store): { dir?: string; commit?: string; err?: string } {
  const dir = join(CACHE, repo.replace("/", "__") + ".git");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    const init = git(["init", "--bare", "-q", dir]);
    if (!init.ok) return { err: init.err };
  }
  const f = git(["fetch", "-q", "--depth", "1", url(repo), `refs/heads/${store.branch}`], dir);
  if (!f.ok) return { err: `fetch ${store.branch} failed: ${f.err}` };
  const c = git(["rev-parse", "FETCH_HEAD"], dir);
  return { dir, commit: c.out.trim() };
}

/** On a default branch the folder comes from the repo's own .beans.yml. */
function beansPathFromConfig(dir: string): string | undefined {
  const y = git(["show", "FETCH_HEAD:.beans.yml"], dir);
  if (!y.ok) return undefined;
  try {
    const parsed = Bun.YAML.parse(y.out) as { beans?: { path?: string } };
    return parsed?.beans?.path;
  } catch {
    return undefined;
  }
}

const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : typeof v === "string" && v ? [v] : [];

function parseBean(repo: string, branch: string, file: string, text: string): Bean | undefined {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return undefined;
  let fm: Record<string, unknown>;
  try {
    fm = (Bun.YAML.parse(m[1]) ?? {}) as Record<string, unknown>;
  } catch {
    return undefined;
  }
  const idFromComment = m[1].match(/^#\s*(\S+)/m)?.[1];
  const base = file.split("/").pop()!.replace(/\.md$/, "");
  const id = String(fm.id ?? idFromComment ?? base.split("--")[0]);
  const issue = fm.issue === undefined || fm.issue === null ? undefined : String(fm.issue);
  return {
    repo,
    id,
    title: String(fm.title ?? base),
    status: String(fm.status ?? "todo"),
    type: String(fm.type ?? "task"),
    priority: String(fm.priority ?? "normal"),
    parent: fm.parent ? String(fm.parent) : undefined,
    blocking: list(fm.blocking),
    blocked_by: list(fm.blocked_by),
    tags: list(fm.tags),
    issue,
    archived: /\/archive\//.test(file),
    updated_at: fm.updated_at ? String(fm.updated_at) : undefined,
    url: `https://github.com/${repo}/blob/${branch}/${file}`,
  };
}

function readStore(src: Source): StoreResult {
  const where = locate(src);
  if (where.unreadable) return { repo: src.repo, state: "unreadable", note: where.unreadable, beans: [] };
  const store = where.store!;
  const got = fetchStore(src.repo, store);
  if (got.err) return { repo: src.repo, state: "unreadable", note: got.err, beans: [] };
  const dir = got.dir!;

  // Where the bean files are: the configured folder, else the repo's .beans.yml,
  // else the two layouts in use (`beans/defs/` and plain `beans/`).
  const candidates = store.path
    ? [store.path]
    : [beansPathFromConfig(dir), "beans/defs", "beans"].filter((p): p is string => !!p);
  let path = "";
  let files: string[] = [];
  for (const p of candidates) {
    const ls = git(["ls-tree", "-r", "--name-only", "FETCH_HEAD", "--", p], dir);
    files = ls.out.split("\n").filter((f) => f.endsWith(".md") && !/(^|\/)README\.md$/.test(f));
    if (ls.ok && files.length) {
      path = p;
      break;
    }
  }
  if (!files.length)
    return { repo: src.repo, state: "no-store", branch: store.branch, commit: got.commit, note: `no bean files (looked in ${candidates.join(", ")})`, beans: [] };

  const beans: Bean[] = [];
  const skipped: string[] = [];
  for (const f of files) {
    const t = git(["show", `FETCH_HEAD:${f}`], dir);
    const b = t.ok ? parseBean(src.repo, store.branch, f, t.out) : undefined;
    if (b) beans.push(b);
    else skipped.push(f.split("/").pop()!);
  }
  // A bean that cannot be read is reported, not silently dropped.
  for (const f of skipped) console.error(`skipped: ${src.repo} ${f} (cannot read its front matter)`);
  const note = skipped.length ? `${skipped.length} file(s) skipped: front matter does not parse` : undefined;
  return { repo: src.repo, state: "ok", branch: store.branch, path, commit: got.commit, note, beans };
}

const rank = (order: string[], v: string) => {
  const i = order.indexOf(v);
  return i < 0 ? order.length : i;
};
const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const short = (repo: string) => repo.split("/")[1];

function issueLink(b: Bean): string {
  if (!b.issue) return "";
  const v = b.issue.trim();
  if (/^https?:\/\//.test(v)) {
    const m = v.match(/github\.com\/([^/]+\/[^/]+)\/issues\/(\d+)/);
    return m ? `[${short(m[1])}#${m[2]}](${v})` : `[link](${v})`;
  }
  const n = v.replace(/^#/, "");
  return /^\d+$/.test(n) ? `[#${n}](https://github.com/${b.repo}/issues/${n})` : esc(v);
}

function board(results: StoreResult[]): string {
  const all = results.flatMap((r) => r.beans);
  const byId = new Map(all.map((b) => [`${b.repo}:${b.id}`, b]));
  const out: string[] = [];
  out.push("# Platform beans board", "");
  out.push(
    "Generated by `bun run scripts/pull-beans.ts` from the repositories in [`beans-sources.json`](../beans-sources.json). Do not edit by hand.",
    "",
    "GitHub issues hold programme status. A bean links to its issue with `issue:`; open beans without one are counted below.",
    "",
  );

  out.push("## Stores", "");
  out.push("| Repository | Store | In progress | To do | Draft | Completed | Scrapped | Open without issue |");
  out.push("|---|---|--:|--:|--:|--:|--:|--:|");
  for (const r of results) {
    const where =
      r.state === "ok"
        ? `\`${r.branch}\` @ \`${r.commit!.slice(0, 7)}\`${r.note ? ` (${esc(r.note)})` : ""}`
        : r.state === "no-store"
          ? "no beans yet"
          : `**unreadable**: ${esc(r.note ?? "")}`;
    const c = (s: string) => (r.state === "ok" ? String(r.beans.filter((b) => b.status === s).length) : "–");
    const noIssue =
      r.state === "ok" ? String(r.beans.filter((b) => OPEN.includes(b.status) && !b.issue).length) : "–";
    out.push(
      `| [${short(r.repo)}](https://github.com/${r.repo}) | ${where} | ${c("in-progress")} | ${c("todo")} | ${c("draft")} | ${c("completed")} | ${c("scrapped")} | ${noIssue} |`,
    );
  }
  out.push("");

  const open = all.filter((b) => OPEN.includes(b.status));
  const blocked = open.filter((b) =>
    b.blocked_by.some((id) => {
      const other = byId.get(`${b.repo}:${id}`);
      return !other || OPEN.includes(other.status) || other.status === "draft";
    }),
  );
  if (blocked.length) {
    out.push("## Blocked", "");
    out.push("| Bean | Repository | Title | Blocked by | Issue |", "|---|---|---|---|---|");
    for (const b of blocked.sort((x, y) => rank(PRIORITY_ORDER, x.priority) - rank(PRIORITY_ORDER, y.priority) || x.id.localeCompare(y.id)))
      out.push(`| [${b.id}](${b.url}) | ${short(b.repo)} | ${esc(b.title)} | ${b.blocked_by.join(", ")} | ${issueLink(b)} |`);
    out.push("");
  }

  out.push("## Open beans", "");
  for (const r of results.filter((r) => r.state === "ok")) {
    const rows = r.beans
      .filter((b) => OPEN.includes(b.status))
      .sort(
        (x, y) =>
          rank(STATUS_ORDER, x.status) - rank(STATUS_ORDER, y.status) ||
          rank(PRIORITY_ORDER, x.priority) - rank(PRIORITY_ORDER, y.priority) ||
          x.id.localeCompare(y.id),
      );
    out.push(`### ${short(r.repo)} (${rows.length} open)`, "");
    if (!rows.length) {
      out.push("Nothing open.", "");
      continue;
    }
    out.push("| Bean | Status | Priority | Type | Title | Issue |", "|---|---|---|---|---|---|");
    for (const b of rows)
      out.push(`| [${b.id}](${b.url}) | ${b.status} | ${b.priority} | ${b.type} | ${esc(b.title)} | ${issueLink(b)} |`);
    out.push("");
  }
  return out.join("\n");
}

/**
 * One bean, one row. The same bean id in two stores (a store kept on two
 * branches) keeps the copy updated most recently; the store that lost it
 * records how many it shares, so the duplication stays visible.
 */
function dedupe(results: StoreResult[]) {
  const best = new Map<string, Bean>();
  for (const b of results.flatMap((r) => r.beans)) {
    const cur = best.get(b.id);
    if (!cur || (b.updated_at ?? "") > (cur.updated_at ?? "")) best.set(b.id, b);
  }
  for (const r of results) {
    const before = r.beans.length;
    r.beans = r.beans.filter((b) => best.get(b.id) === b);
    const dropped = before - r.beans.length;
    if (dropped) r.note = [r.note, `${dropped} bean(s) also kept, more recently, in another store`].filter(Boolean).join("; ");
  }
}

function main() {
  const config = JSON.parse(readFileSync(CONFIG, "utf8")) as Config;
  const denied = new Map((config.deny ?? []).map((d) => [d.repo.toLowerCase(), d.why]));
  const bad = config.sources.filter((s) => denied.has(s.repo.toLowerCase()));
  if (bad.length) {
    for (const s of bad) console.error(`refused: ${s.repo} is on the deny list (${denied.get(s.repo.toLowerCase())})`);
    process.exit(2);
  }

  const results = config.sources.map(readStore);
  dedupe(results);
  for (const r of results) {
    const n = r.beans.length;
    const open = r.beans.filter((b) => OPEN.includes(b.status)).length;
    console.log(`${r.state.padEnd(10)} ${r.repo.padEnd(40)} ${r.state === "ok" ? `${n} beans, ${open} open` : r.note ?? ""}`);
  }

  const json =
    JSON.stringify(
      {
        $schema: "aai-pulled-beans/v1",
        stores: results.map(({ beans, ...s }) => ({ ...s, count: beans.length })),
        beans: results.flatMap((r) => r.beans),
      },
      null,
      2,
    ) + "\n";
  const md = board(results) + "\n";
  const files: [string, string][] = [
    [join(OUT_DIR, "beans.json"), json],
    [join(OUT_DIR, "README.md"), md],
  ];

  const unreadable = results.filter((r) => r.state === "unreadable");
  if (CHECK) {
    const stale = files.filter(([p, c]) => !existsSync(p) || readFileSync(p, "utf8") !== c);
    if (stale.length) {
      console.error(`out of date: ${stale.map(([p]) => p.replace(ROOT + "/", "")).join(", ")}`);
      process.exit(1);
    }
    console.log("up to date");
  } else if (DRY) {
    console.log("dry run: nothing written");
  } else {
    mkdirSync(OUT_DIR, { recursive: true });
    for (const [p, c] of files) writeFileSync(p, c);
    console.log(`wrote ${files.map(([p]) => p.replace(ROOT + "/", "")).join(", ")}`);
  }
  // An unreadable store is unknown, not zero: say so in the exit code.
  if (unreadable.length) process.exit(3);
}

main();
