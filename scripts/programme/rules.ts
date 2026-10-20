/**
 * The programme automations' decisions, with no I/O, so each rule is tested
 * on its own (`rules.test.ts`). The scripts beside this file read GitHub,
 * ask these functions what to do, and write only what they answer.
 *
 * None of them makes a judgement (req:aai-automation#AUTO-05): they never set
 * Integration readiness, Review status, Risk category, Impact, a decision or
 * a risk acceptance.
 */

export type Health = "On track" | "At risk" | "Blocked";
export type ProgrammeStatus = "Not started" | "In progress" | "In review" | "Done" | "Cancelled";

const RANK: Record<Health, number> = { "On track": 0, "At risk": 1, Blocked: 2 };

/**
 * AUTO-03 (req:aai-automation#AUTO-03): the Programme status an issue event
 * sets, or `undefined` for none. `opened` sets Not started only on a
 * programme-tracked type and only when no value was supplied.
 */
export function statusForEvent(e: {
  action: string;
  stateReason?: string | null;
  programmeTracked: boolean;
  current?: string | null;
}): ProgrammeStatus | undefined {
  if (!e.programmeTracked) return undefined;
  switch (e.action) {
    case "opened":
      return e.current ? undefined : "Not started";
    case "closed":
      return e.stateReason === "not_planned" ? "Cancelled" : "Done";
    case "reopened":
      return "In progress";
    default:
      return undefined;
  }
}

/** The worst signal the sub-issues' labels raise, or `undefined` when none raises one. */
export function signalOf(subIssueLabels: string[][]): Health | undefined {
  const all = subIssueLabels.flat();
  if (all.includes("blocked")) return "Blocked";
  if (all.includes("at-risk")) return "At risk";
  return undefined;
}

/**
 * AUTO-04 (req:aai-automation#AUTO-04): the epic's new Delivery health, or
 * `undefined` to leave it. It only ever RAISES: a signal worse than the
 * current value replaces it; a better one, or none, never lowers or clears
 * it. Lowering is the epic owner's call.
 */
export function rolledUpHealth(current: string | null | undefined, subIssueLabels: string[][]): Health | undefined {
  const signal = signalOf(subIssueLabels);
  if (!signal) return undefined;
  const now = (current ?? "") in RANK ? (current as Health) : undefined;
  if (now !== undefined && RANK[now] >= RANK[signal]) return undefined;
  return signal;
}

/** The marker that makes AUTO-10's comment findable, so it is posted once. */
export const EXCEPTION_MARKER = "<!-- auto-10:validation-exception -->";

/** What GitHub records about a commenter's relationship to the repository. */
export type Association = "OWNER" | "MEMBER" | "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIME_CONTRIBUTOR" | "FIRST_TIMER" | "NONE" | string;

/**
 * Whose `Validation confirmed:` counts. Owner, 2026-10-20: with no named
 * Technical Integration Lead, the repository's own permissions are the
 * authorization: its owner, members and collaborators. Naming a lead narrows
 * it to that login. The cost, said where it is decided: anyone with write
 * access can confirm, so a partner with Write on their own workstream
 * repository (BD-04) could confirm their own work there.
 */
export function confirms(c: { login: string; body: string; association?: Association }, lead: string | null): boolean {
  if (!c.body.trimStart().startsWith("Validation confirmed:")) return false;
  if (lead) return c.login.toLowerCase() === lead.toLowerCase();
  return c.association === "OWNER" || c.association === "MEMBER" || c.association === "COLLABORATOR";
}

/**
 * AUTO-10 (req:aai-automation#AUTO-10): what to do about one item. An item
 * whose Integration readiness is Validated must carry a confirming comment
 * (`confirms`). Without one it gets the `validation-exception` label and ONE
 * explanatory comment; when the confirmation appears, or the value moves off
 * Validated, the label goes. It never changes Integration readiness.
 */
export function validationAction(i: {
  readiness: string | null | undefined;
  comments: { login: string; body: string; association?: Association }[];
  lead: string | null;
  hasLabel: boolean;
}): { addLabel: boolean; removeLabel: boolean; comment?: string } {
  const confirmed = i.comments.some((c) => confirms(c, i.lead));
  const validated = i.readiness === "Validated";
  if (validated && !confirmed) {
    const already = i.comments.some((c) => c.body.includes(EXCEPTION_MARKER));
    const who = i.lead ? `@${i.lead}` : "someone with write access to this repository";
    return {
      addLabel: !i.hasLabel,
      removeLabel: false,
      comment: already
        ? undefined
        : `${EXCEPTION_MARKER}\nIntegration readiness is **Validated**, but there is no comment from ${who} starting \`Validation confirmed:\`. ` +
          "Validation is recorded by that comment, with the evidence (DP-05); the label alone does not count. This flag goes when the comment is added or the value changes.",
    };
  }
  return { addLabel: false, removeLabel: i.hasLabel };
}

/**
 * AUTO-01 / AUTO-11 (req:aai-linking#LINK-05): whether an issue belongs on the
 * programme project. Programme-level types always; any other item only when
 * labelled `thin-slice`, `sprint-demo`, `blocked` or `at-risk`.
 */
export function qualifies(labels: string[], programmeTypeLabels: string[]): boolean {
  return labels.some((l) => programmeTypeLabels.includes(l)) || labels.some((l) => ["thin-slice", "sprint-demo", "blocked", "at-risk"].includes(l));
}

/**
 * The QA report's reading of one item's validation (owner, 2026-10-20: with
 * write access as the authorization, report WHO did it): who last set
 * `readiness:Validated`, who confirmed and with what access, whether a
 * confirmation links evidence, and whether the person who set it is the
 * only one who confirmed it. Reported, never enforced.
 */
export function validationProvenance(i: {
  events: { event: string; label?: string; actor: string; at: string }[];
  comments: { login: string; body: string; association?: Association; at: string }[];
}): {
  setBy?: string;
  setAt?: string;
  confirmations: { by: string; association?: Association; at: string; evidence: boolean }[];
  selfConfirmed: boolean;
} {
  const sets = i.events.filter((e) => e.event === "labeled" && e.label === "readiness:Validated");
  const last = sets[sets.length - 1];
  const confirmations = i.comments
    .filter((c) => c.body.trimStart().startsWith("Validation confirmed:"))
    .map((c) => ({ by: c.login, association: c.association, at: c.at, evidence: /https?:\/\/\S+/.test(c.body) }));
  const selfConfirmed = !!last && confirmations.length > 0 && confirmations.every((c) => c.by.toLowerCase() === last.actor.toLowerCase());
  return { setBy: last?.actor, setAt: last?.at, confirmations, selfConfirmed };
}
