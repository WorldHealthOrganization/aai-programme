/**
 * The programme fields as LABELS, one label per value: `<prefix>:<option>`,
 * using section 7.1's names exactly. With no tokens (owner, 2026-10-20) the
 * issue is the only thing an automation can write, so the issue holds the
 * values; project 110 and the site's board read them from its labels. An
 * issue carries at most one label per field.
 *
 * Start date, Target date and Backlog ref are not options, so they stay in
 * the issue body's Programme fields table. Primary research question stays
 * there too: the `rq:` labels already list EVERY question an item contributes
 * to (section 7.3), and one prefix cannot mean both.
 */
export const FIELDS: Record<string, { prefix: string; color: string; options: string[] }> = {
  Workstream: { prefix: "ws", color: "0e8a16", options: ["WS1 Knowledge graph", "WS2 Authoring", "WS3 Evaluation", "WS4 Localization", "WS5 Governance and stewardship", "Platform", "Cross-workstream"] },
  "Programme status": { prefix: "status", color: "1d76db", options: ["Not started", "In progress", "In review", "Done", "Cancelled"] },
  "Delivery health": { prefix: "health", color: "d93f0b", options: ["On track", "At risk", "Blocked"] },
  "Risk category": { prefix: "risk", color: "fbca04", options: ["Dependency", "Schedule", "Technical", "Resource", "Review", "External", "Governance"] },
  Impact: { prefix: "impact", color: "e99695", options: ["Low", "Medium", "High"] },
  "Pipeline stage": { prefix: "stage", color: "5319e7", options: ["L1 Corpus", "KG Knowledge graph", "L2 Operational (DAK)", "L3 Computable (FHIR/CQL)", "L5 Health skills + MCP", "EVAL Evaluation", "LOC Localization", "Cross-cutting / N/A"] },
  "Integration readiness": { prefix: "readiness", color: "006b75", options: ["Not assessed", "Not ready", "Partly ready", "Ready to integrate", "Validated"] },
  "Review type": { prefix: "review-type", color: "c5def5", options: ["Not needed", "SME sign-off", "Validation packet adjudication", "Science Division publication clearance"] },
  "Review status": { prefix: "review", color: "bfdadc", options: ["Not submitted", "Submitted", "Under WHO review", "Feedback issued", "Resubmitted", "Approved", "Closed"] },
};

export const labelFor = (field: string, value: string) => `${FIELDS[field]!.prefix}:${value}`;

/** Every field value an issue's labels give it. */
export function fieldsFromLabels(labels: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [field, f] of Object.entries(FIELDS)) {
    const hit = labels.find((l) => l.startsWith(`${f.prefix}:`) && f.options.includes(l.slice(f.prefix.length + 1)));
    if (hit) out[field] = hit.slice(f.prefix.length + 1);
  }
  return out;
}

/** The labels to take off and put on so the issue holds `value` for `field`, and only it. */
export function relabel(labels: string[], field: string, value: string): { remove: string[]; add: string[] } {
  const f = FIELDS[field];
  if (!f) throw new Error(`no programme field ${field}`);
  if (!f.options.includes(value)) throw new Error(`${field} has no option "${value}"`);
  const want = labelFor(field, value);
  return { remove: labels.filter((l) => l.startsWith(`${f.prefix}:`) && l !== want), add: labels.includes(want) ? [] : [want] };
}
