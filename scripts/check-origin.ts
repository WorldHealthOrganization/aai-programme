/**
 * A site build's first step: refuse to build when `origin` is not this
 * repository. build-instance-site.ts takes the site's base URL from the git
 * remote, and a stale remote (litlfred/aai-platform, the name before the
 * rename) built a whole site under /aai-platform/ whose links all missed,
 * while the link check passed (2026-10-20). Fail loudly instead.
 *
 * Either home is accepted: the WHO repository and the litlfred staging copy
 * (litlfred/aai-programme#57).
 *
 *   bun run scripts/check-origin.ts
 */
import { KNOWN_REPOS } from "./origin-repo.ts";

const r = Bun.spawnSync(["git", "remote", "get-url", "origin"], { stderr: "pipe" });
const url = new TextDecoder().decode(r.stdout).trim();
const m = url.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?\/?$/);
const found = KNOWN_REPOS.find((k) => k.toLowerCase() === m?.[1]?.toLowerCase());
if (!found) {
  console.error(`::error::origin is ${url || "(none)"}, not one of ${KNOWN_REPOS.join(", ")}: the site's base URL comes from it. Run: git remote set-url origin https://github.com/${KNOWN_REPOS[0]}`);
  process.exit(1);
}
console.log(`origin is ${found}`);
