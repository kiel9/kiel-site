import positioning from "../../content/positioning.md?raw";

// Name and links from content/positioning.md, for pages that need them.
const read = (label: string) =>
  positioning.match(new RegExp(`^- ${label}:\\s*(.+)$`, "m"))?.[1].trim() ?? "";

export const site = {
  shortName: read("Short \\(nav, body copy\\)"),
  fullName: read("Full \\(footer, About\\)"),
  linkedin: read("LinkedIn"),
  email: read("Email"),
};

/** "<page> — <short name>", the title pattern every inner page uses. */
export const pageTitle = (page: string) => `${page} — ${site.shortName}`;
