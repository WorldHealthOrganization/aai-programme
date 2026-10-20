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
  const lead = "til";
  test("Validated with no confirmation: label and one comment (PIL-07)", () => {
    const a = validationAction({ readiness: "Validated", comments: [], lead, hasLabel: false });
    expect(a.addLabel).toBe(true);
    expect(a.comment).toContain(EXCEPTION_MARKER);
  });
  test("run again: nothing more", () => {
    const a = validationAction({ readiness: "Validated", comments: [{ login: "bot", body: `${EXCEPTION_MARKER}\n…` }], lead, hasLabel: true });
    expect(a).toEqual({ addLabel: false, removeLabel: false, comment: undefined });
  });
  test("the lead's confirmation removes the label", () => {
    const a = validationAction({ readiness: "Validated", comments: [{ login: "TIL", body: "Validation confirmed: evidence at …" }], lead, hasLabel: true });
    expect(a).toEqual({ addLabel: false, removeLabel: true });
  });
  test("someone else's confirmation does not count", () => {
    const a = validationAction({ readiness: "Validated", comments: [{ login: "partner", body: "Validation confirmed: trust me" }], lead, hasLabel: false });
    expect(a.addLabel).toBe(true);
  });
  test("moving off Validated removes the label", () => {
    expect(validationAction({ readiness: "Ready to integrate", comments: [], lead, hasLabel: true })).toEqual({ addLabel: false, removeLabel: true });
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
