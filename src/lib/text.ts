// Shared markdown helpers. Copy lives in content/; these only read it.

/** Remove HTML comments and trim. */
export const strip = (s: string) => s.replace(/<!--[\s\S]*?-->/g, "").trim();

/** Map of "## Heading" -> body text (comments removed). */
export function sections(raw: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of raw.split(/^## /m).slice(1)) {
    const nl = part.indexOf("\n");
    const heading = (nl === -1 ? part : part.slice(0, nl)).trim();
    out[heading] = nl === -1 ? "" : strip(part.slice(nl + 1));
  }
  return out;
}

/** Text before the first "## " heading, comments removed. */
export const preamble = (raw: string) => strip(raw.split(/^## /m)[0] ?? "");

/** First section whose heading starts with `prefix`. */
export const pick = (map: Record<string, string>, prefix: string) =>
  map[Object.keys(map).find((k) => k.startsWith(prefix)) ?? ""] ?? "";

/** Text after the "# Title" line, comments removed. */
export const body = (raw: string) => strip(raw.replace(/^# .*\n/, ""));

/** "# Title" line without the hash. */
export const h1Of = (raw: string) => raw.match(/^# (.+)$/m)?.[1].trim() ?? "";

export const paragraphs = (s: string) =>
  s
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const META_MAX = 155;

/**
 * Build checks for content/work/, content/work-index.md and content/studio.md
 * (see specs/work-page-spec.md, "Build checks"). Throws so `npm run build` fails.
 */
export function validateSections(
  file: string,
  map: Record<string, string>,
  required: readonly string[] = [],
): void {
  for (const name of required) {
    if (!map[name]) throw new Error(`${file}: missing required section "## ${name}".`);
  }
  for (const [name, text] of Object.entries(map)) {
    for (const line of text.split("\n")) {
      if (/^\s*([-*] |\d+\. )/.test(line)) {
        throw new Error(
          `${file}, "## ${name}": write plain paragraphs, not list items ("${line.trim()}").`,
        );
      }
    }
    if (text.includes("](")) {
      throw new Error(`${file}, "## ${name}": links are not allowed inside sections.`);
    }
  }
  const meta = map["Meta description"];
  if (meta !== undefined && meta.length > META_MAX) {
    throw new Error(
      `${file}: "## Meta description" is ${meta.length} characters; the limit is ${META_MAX}.`,
    );
  }
}
