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

/**
 * AUTO-10 (req:aai-automation#AUTO-10): what to do about one item. An item
 * whose Integration readiness is Validated must carry a comment from the
 * Technical Integration Lead starting `Validation confirmed:`. Without one it
 * gets the `validation-exception` label and ONE explanatory comment; when the
 * confirmation appears, or the value moves off Validated, the label goes. It
 * never changes Integration readiness.
 */
export function validationAction(i: {
  readiness: string | null | undefined;
  comments: { login: string; body: string }[];
  lead: string;
  hasLabel: boolean;
}): { addLabel: boolean; removeLabel: boolean; comment?: string } {
  const confirmed = i.comments.some((c) => c.login.toLowerCase() === i.lead.toLowerCase() && c.body.trimStart().startsWith("Validation confirmed:"));
  const validated = i.readiness === "Validated";
  if (validated && !confirmed) {
    const already = i.comments.some((c) => c.body.includes(EXCEPTION_MARKER));
    return {
      addLabel: !i.hasLabel,
      removeLabel: false,
      comment: already
        ? undefined
        : `${EXCEPTION_MARKER}\nIntegration readiness is **Validated**, but there is no comment from @${i.lead} starting \`Validation confirmed:\`. ` +
          "Validation is recorded by that comment, with the evidence (DP-05); the field alone does not count. This label goes when the comment is added or the value changes.",
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
