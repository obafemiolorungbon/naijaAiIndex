import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { glob } from "glob";
import { parse } from "yaml";

interface Project {
  name: string;
  tagline: string;
  categories: string[];
  status: string;
  website?: string;
  demo?: string;
  repo?: string;
  docs?: string;
}

function formatCategory(cat: string): string {
  return cat
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function statusBadge(status: string): string {
  const badges: Record<string, string> = {
    active: "Active",
    paused: "Paused",
    archived: "Archived",
  };
  return badges[status] || status;
}

async function main() {
  const readmePath = resolve("README.md");
  const readme = readFileSync(readmePath, "utf-8");

  const projectFiles = await glob("data/projects/**/*.yaml", { posix: true });
  const projects: Project[] = [];

  for (const file of projectFiles.sort()) {
    const content = readFileSync(file, "utf-8");
    const data = parse(content) as Project;
    projects.push(data);
  }

  const byCategory = new Map<string, Project[]>();
  for (const project of projects) {
    const cat = project.categories[0];
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(project);
  }

  let section = "";
  for (const [category, projs] of [...byCategory.entries()].sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    section += `\n### ${formatCategory(category)}\n\n`;
    section += "| Project | Tagline | Status | Links |\n";
    section += "|---------|---------|--------|-------|\n";
    for (const p of projs) {
      const links = [
        p.website ? `[Website](${p.website})` : "",
        p.demo ? `[Demo](${p.demo})` : "",
        p.repo ? `[Repo](${p.repo})` : "",
        p.docs ? `[Docs](${p.docs})` : "",
      ]
        .filter(Boolean)
        .join(" · ");
      section += `| **${p.name}** | ${p.tagline} | ${statusBadge(p.status)} | ${links} |\n`;
    }
  }

  const BEGIN = "<!-- BEGIN PROJECTS -->";
  const END = "<!-- END PROJECTS -->";

  const startIdx = readme.indexOf(BEGIN);
  const endIdx = readme.indexOf(END);

  if (startIdx === -1 || endIdx === -1) {
    console.error(
      "README.md is missing project markers (<!-- BEGIN PROJECTS --> / <!-- END PROJECTS -->)",
    );
    process.exit(1);
  }

  const newReadme =
    readme.substring(0, startIdx + BEGIN.length) +
    "\n" +
    section +
    "\n" +
    readme.substring(endIdx);

  writeFileSync(readmePath, newReadme);
  console.log(`README updated with ${projects.length} projects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
