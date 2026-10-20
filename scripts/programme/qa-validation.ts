/**
 * A QA report of integration readiness: for every item that has reached a
 * readiness stage, who set each `readiness:` label and when, who confirmed
 * validation and with what access, whether the confirmation links evidence,
 * and whether the person who set Validated is the only one who confirmed it.
 *
 * Owner, 2026-10-20: write access is the authorization for AUTO-10, so this
 * reports who did it rather than refusing it. Reads the issues' public event
 * history and comments; needs no token beyond reading.
 *
 *   bun run scripts/programme/qa-validation.ts              # print the report
 *   bun run scripts/programme/qa-validation.ts --site <dir> # write <dir>/qa/validation/index.md
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { readItems, restAll } from "./lib.ts";
import { validationProvenance } from "./rules.ts";

const at = process.argv.indexOf("--site");
const site = at > 0 ? process.argv[at + 1] : undefined;
const items = readItems().filter((i) => i.labels.some((l) => l.startsWith("readiness:")) || i.labels.includes("validation-exception"));
const day = (s?: string) => (s ? s.slice(0, 10) : "–");
const rows: string[] = [];
const history: string[] = [];
let flagged = 0;
for (const item of items) {
  const ref = `[${item.repo.split("/")[1]}#${item.number}](https://github.com/${item.repo}/issues/${item.number})`;
  const ev = restAll<{ event: string; label?: { name: string }; actor?: { login: string }; created_at: string }>(`repos/${item.repo}/issues/${item.number}/events?per_page=100`)
    .filter((e) => (e.event === "labeled" || e.event === "unlabeled") && e.label?.name.startsWith("readiness:"))
    .map((e) => ({ event: e.event, label: e.label!.name, actor: e.actor?.login ?? "?", at: e.created_at }));
  const comments = restAll<{ user: { login: string }; body: string; author_association: string; created_at: string }>(`repos/${item.repo}/issues/${item.number}/comments?per_page=100`)
    .map((c) => ({ login: c.user.login, body: c.body, association: c.author_association, at: c.created_at }));
  const p = validationProvenance({ events: ev, comments });
  const readiness = item.fields["Integration readiness"] ?? "–";
  const conf = p.confirmations.length
    ? p.confirmations.map((c) => `${c.by} (${(c.association ?? "?").toLowerCase()}, ${day(c.at)}${c.evidence ? ", evidence linked" : ", **no evidence link**"})`).join("; ")
    : "–";
  const flags = [
    readiness === "Validated" && !p.confirmations.length && "**Validated, not confirmed**",
    p.selfConfirmed && "**confirmed only by the person who set it**",
    p.confirmations.some((c) => !c.evidence) && "a confirmation without evidence",
  ].filter(Boolean);
  if (flags.length) flagged++;
  rows.push(`| ${ref} | ${item.fields["Workstream"] ?? "–"} | ${readiness} | ${p.setBy ? `${p.setBy}, ${day(p.setAt)}` : "–"} | ${conf} | ${flags.join("; ") || "ok"} |`);
  for (const e of ev) history.push(`| ${ref} | ${e.event === "labeled" ? "set" : "removed"} \`${e.label}\` | ${e.actor} | ${e.at.replace("T", " ").slice(0, 16)} |`);
}
const md = [
  "# Integration readiness: who did what",
  "",
  "Generated from the issues' own history by `scripts/programme/qa-validation.ts` each time the site is published. With no named Technical Integration Lead, anyone with write access can confirm validation (AUTO-10, owner 2026-10-20); this report shows who did, so a confirmation by the same person who set Validated, or one without evidence, is visible. It flags; it never changes an item.",
  "",
  `${items.length} item(s) with a readiness label; ${flagged} flagged.`,
  "",
  "| Item | Workstream | Readiness | Validated set by | Confirmed by | Flags |",
  "|---|---|---|---|---|---|",
  ...rows,
  "",
  "## Every readiness change",
  "",
  "| Item | Change | By | When (UTC) |",
  "|---|---|---|---|",
  ...history,
  "",
].join("\n");
if (site) {
  mkdirSync(join(site, "qa/validation"), { recursive: true });
  writeFileSync(join(site, "qa/validation/index.md"), `---\ntitle: "Integration readiness: who did what"\n---\n\n${md}`);
  console.log(`wrote ${join(site, "qa/validation/index.md")}: ${items.length} item(s), ${flagged} flagged`);
} else console.log(md);
