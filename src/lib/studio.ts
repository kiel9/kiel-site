import { h1Of, sections, validateSections } from "./text";

// Reads content/studio.md if it exists (specs/studio-page-spec.md, "Launch gating").
// import.meta.glob returns an empty object when the file is absent, so the
// build passes and the Studio page, nav item and home tile are left out.
const files = import.meta.glob("../../content/studio.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const raw: string | undefined = Object.values(files)[0];

export interface Studio {
  h1: string;
  description: string;
  tile: string;
  whatWeDo: string;
  whoFor: string;
  engagement: string;
  agentsIntro: string;
}

let cache: Studio | null | undefined;

/** The Studio copy, or null when content/studio.md does not exist. Throws on a missing required part. */
export function getStudio(): Studio | null {
  if (cache !== undefined) return cache;
  if (raw === undefined) return (cache = null);

  const file = "content/studio.md";
  const h1 = h1Of(raw);
  if (!h1) throw new Error(`${file}: missing the "# " heading line.`);
  const map = sections(raw);
  validateSections(file, map, ["Meta description", "Tile"]);

  return (cache = {
    h1,
    description: map["Meta description"],
    tile: map["Tile"],
    whatWeDo: map["What we do"] ?? "",
    whoFor: map["Who it's for"] ?? "",
    engagement: map["How an engagement works"] ?? "",
    agentsIntro: map["Agents"] ?? "",
  });
}
