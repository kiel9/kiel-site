import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One markdown file per work item in content/work/. Rules: specs/work-page-spec.md.
// Cross-entry and body checks live in src/lib/work.ts.
const work = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/work" }),
  schema: z.object({
    title: z.string().min(1),
    kind: z.enum(["case-study", "agent"]),
    problem: z.string().min(1),
    summary: z.string().min(1),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { work };
