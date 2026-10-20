/**
 * Bean drift: where a programme issue and the bean it tracks no longer agree.
 * No I/O; tested in rules.test.ts. The issue is the record (owner,
 * 2026-10-20): its `<!-- bean: <owner>/<repo>/<id> -->` lines say which beans
 * it carries, and nothing else has to be kept in step with it.
 *
 * A bean moved to another parent is caught as "bean changed": the move edits
 * the bean. A separate "moved" rule would need where the bean sat when it was
 * linked, and without that it flagged deliberate splits (2026-10-20).
 *
 * Every finding is a FLAG for a person: closing an issue because its bean
 * finished, or moving a feature, is a judgement (DP-06).
 */

export interface DriftBean { id: string; repo: string; status: string; parent?: string; updated_at?: string; title: string }
export interface DriftIssue { number: number; title: string; state: "open" | "closed"; stateReason?: string | null; updatedAt: string; beans: string[]; parentState?: "open" | "closed"; parentNumber?: number; labels: string[] }
export interface Finding { kind: string; issue?: number; bean?: string; detail: string }

const OPEN = new Set(["todo", "in-progress", "draft"]);

/** `<!-- bean: owner/repo/id -->` lines in an issue body, as bean ids. */
export function beanLinks(body: string | null | undefined): string[] {
  return [...(body ?? "").matchAll(/<!--\s*bean:\s*[^/\s]+\/[^/\s]+\/([A-Za-z0-9-]+)\s*-->/g)].map((m) => m[1]!);
}

export function drift(issues: DriftIssue[], beans: Map<string, DriftBean>, reviewed: Set<string>): Finding[] {
  const out: Finding[] = [];
  const linkedBy = new Map<string, number>();
  for (const i of issues) for (const b of i.beans) linkedBy.set(b, i.number);

  for (const i of issues) {
    // An open feature whose epic or proposal is closed: declined, done, or moved.
    if (i.state === "open" && i.parentState === "closed") out.push({ kind: "orphaned", issue: i.number, detail: `open, but its epic #${i.parentNumber} is closed` });
    for (const id of i.beans) {
      const b = beans.get(id);
      if (!b) {
        out.push({ kind: "broken-link", issue: i.number, bean: id, detail: "the bean is not in any store read (renamed, moved or deleted)" });
        continue;
      }
      const beanOpen = OPEN.has(b.status);
      if (i.state === "open" && b.status === "completed") out.push({ kind: "bean-done", issue: i.number, bean: id, detail: "the bean is completed; close the issue as completed?" });
      else if (i.state === "open" && b.status === "scrapped") out.push({ kind: "bean-scrapped", issue: i.number, bean: id, detail: "the bean is scrapped; close the issue as not planned?" });
      else if (i.state === "closed" && beanOpen) out.push({ kind: "issue-closed", issue: i.number, bean: id, detail: `the issue is closed but the bean is ${b.status}` });
      if (b.updated_at && b.updated_at > i.updatedAt) out.push({ kind: "bean-changed", issue: i.number, bean: id, detail: `the bean changed (${b.updated_at.slice(0, 10)}) after the issue was last touched (${i.updatedAt.slice(0, 10)})` });
    }
  }

  // Open beans nobody has triaged: not carried by an issue, not under one that is, not reviewed.
  const covered = (id: string): boolean => {
    for (let p: string | undefined = id, hop = 0; p && hop < 20; hop++) {
      if (linkedBy.has(p)) return true;
      p = beans.get(p)?.parent;
    }
    return false;
  };
  for (const b of beans.values()) {
    if (OPEN.has(b.status) && !reviewed.has(b.id) && !covered(b.id)) out.push({ kind: "untriaged", bean: b.id, detail: `${b.repo}: ${b.title}` });
  }
  return out;
}
