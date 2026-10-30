/**
 * The `owner/repo` this checkout belongs to: `GITHUB_REPOSITORY` in Actions,
 * otherwise the `origin` remote. The same files live in two places, the
 * litlfred staging copy and WorldHealthOrganization/aai-programme (moved
 * 2026-10-26, litlfred/aai-programme#57), so a script that links to or writes
 * into "this repository" asks rather than naming one.
 */
export const KNOWN_REPOS = ["WorldHealthOrganization/aai-programme", "litlfred/aai-programme"] as const;

export function originRepo(): string | undefined {
  const env = process.env.GITHUB_REPOSITORY;
  if (env) return env;
  const r = Bun.spawnSync(["git", "remote", "get-url", "origin"], { stderr: "pipe" });
  const url = new TextDecoder().decode(r.stdout).trim();
  return url.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?\/?$/)?.[1];
}

/** {@link originRepo}, or the WHO repository (the programme's home) when there is no origin. */
export function thisRepo(): string {
  return originRepo() ?? KNOWN_REPOS[0];
}
