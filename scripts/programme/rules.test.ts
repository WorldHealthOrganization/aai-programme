import { describe, expect, test } from "bun:test";
import { EXCEPTION_MARKER, qualifies, rolledUpHealth, statusForEvent, validationAction } from "./rules.ts";

describe("AUTO-03 Programme status", () => {
  test("opened sets Not started only when tracked and empty", () => {
    expect(statusForEvent({ action: "opened", programmeTracked: true })).toBe("Not started");
    expect(statusForEvent({ action: "opened", programmeTracked: true, current: "In progress" })).toBeUndefined();
    expect(statusForEvent({ action: "opened", programmeTracked: false })).toBeUndefined();
  });
  test("closed as completed is Done, as not planned is Cancelled (PIL-08, PIL-09)", () => {
    expect(statusForEvent({ action: "closed", stateReason: "completed", programmeTracked: true })).toBe("Done");
    expect(statusForEvent({ action: "closed", stateReason: "not_planned", programmeTracked: true })).toBe("Cancelled");
  });
  test("reopened is In progress", () => {
    expect(statusForEvent({ action: "reopened", programmeTracked: true })).toBe("In progress");
  });
});

describe("AUTO-04 Delivery health roll-up", () => {
  test("a blocked sub-issue makes the epic Blocked (PIL-05)", () => {
    expect(rolledUpHealth("On track", [["type:feature"], ["blocked"]])).toBe("Blocked");
  });
  test("at-risk raises On track or empty to At risk", () => {
    expect(rolledUpHealth("On track", [["at-risk"]])).toBe("At risk");
    expect(rolledUpHealth(undefined, [["at-risk"]])).toBe("At risk");
  });
  test("never lowers or clears", () => {
    expect(rolledUpHealth("Blocked", [["at-risk"]])).toBeUndefined();
    expect(rolledUpHealth("Blocked", [[]])).toBeUndefined();
    expect(rolledUpHealth("At risk", [])).toBeUndefined();
  });
});

describe("AUTO-10 validation check", () => {
  test("Validated with no confirmation: label and one comment (PIL-07)", () => {
    const a = validationAction({ readiness: "Validated", comments: [], lead: null, hasLabel: false });
    expect(a.addLabel).toBe(true);
    expect(a.comment).toContain(EXCEPTION_MARKER);
  });
  test("run again: nothing more", () => {
    const a = validationAction({ readiness: "Validated", comments: [{ login: "bot", body: `${EXCEPTION_MARKER}\n…`, association: "NONE" }], lead: null, hasLabel: true });
    expect(a).toEqual({ addLabel: false, removeLabel: false, comment: undefined });
  });
  test("no lead named: a collaborator's confirmation counts, an outsider's does not", () => {
    expect(validationAction({ readiness: "Validated", comments: [{ login: "x", body: "Validation confirmed: evidence", association: "COLLABORATOR" }], lead: null, hasLabel: true })).toEqual({ addLabel: false, removeLabel: true });
    expect(validationAction({ readiness: "Validated", comments: [{ login: "y", body: "Validation confirmed: trust me", association: "CONTRIBUTOR" }], lead: null, hasLabel: false }).addLabel).toBe(true);
  });
  test("a lead named: only theirs counts", () => {
    expect(validationAction({ readiness: "Validated", comments: [{ login: "TIL", body: "Validation confirmed: evidence", association: "NONE" }], lead: "til", hasLabel: true })).toEqual({ addLabel: false, removeLabel: true });
    expect(validationAction({ readiness: "Validated", comments: [{ login: "owner", body: "Validation confirmed: ok", association: "OWNER" }], lead: "til", hasLabel: false }).addLabel).toBe(true);
  });
  test("moving off Validated removes the label", () => {
    expect(validationAction({ readiness: "Ready to integrate", comments: [], lead: null, hasLabel: true })).toEqual({ addLabel: false, removeLabel: true });
  });
});

describe("AUTO-01 / AUTO-11 who belongs on the board", () => {
  const types = ["type:epic", "type:milestone", "type:research-question", "type:dependency", "type:decision", "type:assumption"];
  test("programme types always; others only when labelled", () => {
    expect(qualifies(["type:epic"], types)).toBe(true);
    expect(qualifies(["type:feature"], types)).toBe(false);
    expect(qualifies(["type:feature", "sprint-demo"], types)).toBe(true);
    expect(qualifies(["type:task"], types)).toBe(false);
  });
});

import { fieldsFromLabels, relabel } from "./fields.ts";
describe("fields as labels", () => {
  test("reads one value per field", () => {
    expect(fieldsFromLabels(["ws:WS1 Knowledge graph", "health:Blocked", "type:feature"])).toEqual({ Workstream: "WS1 Knowledge graph", "Delivery health": "Blocked" });
  });
  test("relabel swaps the old value for the new one (PIL-01: one value, held once)", () => {
    expect(relabel(["health:On track", "x"], "Delivery health", "Blocked")).toEqual({ remove: ["health:On track"], add: ["health:Blocked"] });
    expect(relabel(["health:Blocked"], "Delivery health", "Blocked")).toEqual({ remove: [], add: [] });
  });
  test("refuses a value the field does not have", () => {
    expect(() => relabel([], "Delivery health", "Fine")).toThrow();
  });
});

import { validationProvenance } from "./rules.ts";
describe("QA report: validation provenance", () => {
  const set = { event: "labeled", label: "readiness:Validated", actor: "lead", at: "2026-10-20T10:00:00Z" };
  test("someone else confirmed, with evidence", () => {
    const p = validationProvenance({ events: [set], comments: [{ login: "til", body: "Validation confirmed: https://example.org/run/1", association: "COLLABORATOR", at: "2026-10-21T09:00:00Z" }] });
    expect(p.setBy).toBe("lead");
    expect(p.selfConfirmed).toBe(false);
    expect(p.confirmations[0]!.evidence).toBe(true);
  });
  test("the setter is the only confirmer: self-confirmed", () => {
    expect(validationProvenance({ events: [set], comments: [{ login: "Lead", body: "Validation confirmed: done", association: "OWNER", at: "x" }] }).selfConfirmed).toBe(true);
  });
  test("the last time it was set is the one that counts", () => {
    const again = { ...set, actor: "other", at: "2026-10-22T00:00:00Z" };
    expect(validationProvenance({ events: [set, again], comments: [] }).setBy).toBe("other");
  });
});

import { bodyFields, boardItem, nextAction } from "./board-model.ts";
describe("board model", () => {
  const body = "Text.\n\nNext action: WS1 merges it; the WS1 lead, by Friday\n\n**Programme fields** (set these):\n\n| Field | Value |\n|---|---|\n| Workstream | WS3 Evaluation |\n| Target date | 2026-11-20 |\n";
  test("reads the Programme fields table", () => {
    expect(bodyFields(body)).toEqual({ Workstream: "WS3 Evaluation", "Target date": "2026-11-20" });
  });
  test("reads the Next action line", () => {
    expect(nextAction(body)).toBe("WS1 merges it; the WS1 lead, by Friday");
    expect(nextAction("- Next action: do it")).toBe("do it");
  });
  test("labels win over the body for the same field", () => {
    const b = boardItem({ repo: "o/r", number: 1, title: "t", html_url: "u", state: "open", body, labels: ["ws:WS1 Knowledge graph", "type:feature"], assignees: [] });
    expect(b.fields.Workstream).toBe("WS1 Knowledge graph");
    expect(b.fields["Target date"]).toBe("2026-11-20");
    expect(b.type).toBe("feature");
  });
});

import { beanLinks, drift } from "./drift-rules.ts";
describe("bean drift", () => {
  const bean = (id: string, status: string, extra: Partial<{ parent: string; updated_at: string }> = {}) => [id, { id, repo: "o/r", status, title: id, ...extra }] as const;
  const issue = (n: number, beans: string[], extra: Partial<{ state: "open" | "closed"; updatedAt: string; parentState: "open" | "closed"; parentNumber: number }> = {}) =>
    ({ number: n, title: `#${n}`, state: "open" as const, updatedAt: "2026-10-20T00:00:00Z", beans, labels: [], ...extra });
  test("reads the hidden link lines", () => {
    expect(beanLinks("x\n<!-- bean: litlfred/folio-assistant/folio-assistant-ioa4 -->\n<!-- bean: a/b/c-1 -->")).toEqual(["folio-assistant-ioa4", "c-1"]);
  });
  test("lifecycle: bean done or scrapped while the issue is open; issue closed while the bean is open", () => {
    const f = drift([issue(1, ["a"]), issue(2, ["b"]), issue(3, ["c"], { state: "closed" })], new Map([bean("a", "completed"), bean("b", "scrapped"), bean("c", "in-progress")]), new Set());
    expect(f.map((x) => x.kind).sort()).toEqual(["bean-done", "bean-scrapped", "issue-closed"]);
  });
  test("broken link, bean changed after the issue, orphaned feature", () => {
    const f = drift([issue(1, ["gone"]), issue(2, ["b"]), issue(3, [], { parentState: "closed", parentNumber: 9 })], new Map([bean("b", "todo", { updated_at: "2026-10-21T00:00:00Z" })]), new Set());
    expect(f.map((x) => x.kind).sort()).toEqual(["bean-changed", "broken-link", "orphaned"]);
  });
  test("untriaged: open, not carried, not under a carried bean, not reviewed", () => {
    const beans = new Map([bean("carried", "todo"), bean("step", "todo", { parent: "carried" }), bean("seen", "todo"), bean("new", "todo"), bean("old", "completed")]);
    expect(drift([issue(1, ["carried"])], beans, new Set(["seen"])).map((x) => x.bean)).toEqual(["new"]);
  });
});
