/**
 * The programme board's data: each issue on the board with every field
 * value, from its labels (`fields.ts`) and its body's Programme fields table
 * (dates, Backlog ref, primary research question, Gates output). No I/O, so
 * it is tested on its own (`rules.test.ts`).
 */
import { fieldsFromLabels } from "./fields.ts";

/** The `| Field | Value |` rows of an issue body's Programme fields table. */
export function bodyFields(body: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  const at = (body ?? "").indexOf("**Programme fields**");
  if (at < 0) return out;
  for (const line of (body ?? "").slice(at).split("\n")) {
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*$/);
    if (m && m[1] !== "Field" && !/^-+$/.test(m[1]!)) out[m[1]!] = m[2]!;
  }
  return out;
}

/** The body's "Next action:" line, which V10 asks every blocked or at-risk item to carry. */
export function nextAction(body: string | null | undefined): string | undefined {
  const m = (body ?? "").match(/(?:^|\n)\s*(?:-\s*)?Next action:\s*(.+)/);
  return m ? m[1]!.trim() : undefined;
}

export interface BoardItem {
  repo: string;
  number: number;
  title: string;
  url: string;
  open: boolean;
  type?: string;
  labels: string[];
  fields: Record<string, string>;
  assignees: string[];
  progress?: { done: number; total: number };
  parent?: number;
  nextAction?: string;
}

/** Labels win over the body table for the same field: the labels are what the automations keep current. */
export function boardItem(i: {
  repo: string;
  number: number;
  title: string;
  html_url: string;
  state: string;
  body?: string | null;
  labels: string[];
  assignees: string[];
  sub_issues_summary?: { total: number; completed: number };
  parent?: number;
}): BoardItem {
  const type = i.labels.find((l) => l.startsWith("type:"))?.slice(5);
  const s = i.sub_issues_summary;
  return {
    repo: i.repo,
    number: i.number,
    title: i.title,
    url: i.html_url,
    open: i.state === "open",
    type,
    labels: i.labels,
    fields: { ...bodyFields(i.body), ...fieldsFromLabels(i.labels) },
    assignees: i.assignees,
    progress: s && s.total ? { done: s.completed, total: s.total } : undefined,
    parent: i.parent,
    nextAction: nextAction(i.body),
  };
}
