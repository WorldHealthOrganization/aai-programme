/**
 * AUTO-10 (req:aai-automation#AUTO-10): every item whose Integration readiness
 * is Validated needs a `Validation confirmed:` comment from the Technical
 * Integration Lead. Without one: the `validation-exception` label and one
 * comment. With one, or off Validated: the label goes. Never changes
 * Integration readiness, which it reads from the `readiness:` label.
 *
 *   bun run scripts/programme/auto-10-validation.ts [--dry-run]
 */
import { config, DRY, readItems, rest, restAll } from "./lib.ts";
import { validationAction } from "./rules.ts";

const lead = config.technicalIntegrationLead;
if (!lead) {
  console.error("::error::technicalIntegrationLead is not set in scripts/programme/config.json: AUTO-10 cannot tell whose confirmation counts (section 14 input)");
  process.exit(2);
}
const LABEL = "validation-exception";
for (const item of readItems()) {
  const hasLabel = item.labels.includes(LABEL);
  if (item.fields["Integration readiness"] !== "Validated" && !hasLabel) continue;
  const comments = restAll<{ user: { login: string }; body: string }>(`repos/${item.repo}/issues/${item.number}/comments?per_page=100`).map((c) => ({ login: c.user.login, body: c.body }));
  const a = validationAction({ readiness: item.fields["Integration readiness"], comments, lead, hasLabel });
  const at = `${item.repo}#${item.number}`;
  if (a.addLabel) DRY ? console.log(`would label ${at} ${LABEL}`) : rest(`repos/${item.repo}/issues/${item.number}/labels`, "POST", { labels: [LABEL] });
  if (a.comment) DRY ? console.log(`would comment on ${at}`) : rest(`repos/${item.repo}/issues/${item.number}/comments`, "POST", { body: a.comment });
  if (a.removeLabel) DRY ? console.log(`would remove ${LABEL} from ${at}`) : rest(`repos/${item.repo}/issues/${item.number}/labels/${LABEL}`, "DELETE");
  if (!DRY && (a.addLabel || a.comment || a.removeLabel)) console.log(`${at}: ${[a.addLabel && "labelled", a.comment && "commented", a.removeLabel && "label removed"].filter(Boolean).join(", ")}`);
}
