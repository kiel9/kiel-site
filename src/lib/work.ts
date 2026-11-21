import { getCollection } from "astro:content";
import workIndexRaw from "../../content/work-index.md?raw";
import { h1Of, sections, preamble, validateSections } from "./text";

// Every page reads work items through this file (specs/work-page-spec.md).

/** Copy for /work from content/work-index.md. Throws on a missing part. */
export function getWorkIndex() {
  const file = "content/work-index.md";
  const h1 = h1Of(workIndexRaw);
  if (!h1) throw new Error(`${file}: missing the "# " heading line.`);
  const map = sections(workIndexRaw);
  validateSections(file, map, ["Meta description"]);
  return { h1, description: map["Meta description"], intro: map["Intro"] ?? "" };
}

export type Kind = "case-study" | "agent";

/** Tag text shown on tiles and item pages. */
export const KIND_LABEL: Record<Kind, string> = { "case-study": "case study", agent: "agent" };

export const REQUIRED_SECTIONS: Record<Kind, readonly string[]> = {
  "case-study": ["Problem", "What I did", "Outcome"],
  agent: ["What it does", "Input", "Output", "Before and after"],
};

export interface WorkItem {
  slug: string;
  title: string;
  kind: Kind;
  problem: string;
  summary: string;
  featured: boolean;
  order: number;
  /** "## Heading" -> plain-paragraph text, in file order. */
  sections: Record<string, string>;
}

let cache: Promise<WorkItem[]> | undefined;

/** All work items, ordered by `order`, ties broken by `title`. Throws on any broken rule. */
export function getWork(): Promise<WorkItem[]> {
  cache ??= load();
  return cache;
}

/** The one featured item (always a case study). */
export async function getFeatured(): Promise<WorkItem> {
  const items = await getWork();
  return items.find((item) => item.featured)!;
}

async function load(): Promise<WorkItem[]> {
  const entries = await getCollection("work");

  const items: WorkItem[] = entries.map((entry) => {
    const file = `content/work/${entry.id}.md`;
    const raw = entry.body ?? "";
    if (/^# /m.test(raw)) {
      throw new Error(`${file}: remove the "# " title line; the title comes from frontmatter.`);
    }
    if (preamble(raw)) {
      throw new Error(`${file}: text before the first "## " section would not be shown; move it into a section.`);
    }
    const map = sections(raw);
    validateSections(file, map, REQUIRED_SECTIONS[entry.data.kind]);
    return { slug: entry.id, ...entry.data, sections: map };
  });

  items.sort((a, b) => a.order - b.order || (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

  const featured = items.filter((item) => item.featured);
  if (featured.length !== 1) {
    throw new Error(
      `content/work/: exactly one item needs "featured: true" (found ${featured.length}).`,
    );
  }
  if (featured[0].kind !== "case-study") {
    throw new Error(
      `content/work/${featured[0].slug}.md: the featured item must be a case study, because the home tile shows Problem / What I did / Outcome.`,
    );
  }
  return items;
}
