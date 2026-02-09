import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import { glob } from "glob";
import { parse } from "yaml";

async function main() {
  const projectFiles = await glob("data/projects/**/*.yaml", { posix: true });
  const projects: Record<string, unknown>[] = [];

  for (const file of projectFiles.sort()) {
    const content = readFileSync(file, "utf-8");
    const data = parse(content) as Record<string, unknown>;
    const slug = basename(file, ".yaml");
    projects.push({ ...data, slug });
  }

  const outDir = resolve("apps/web/src/generated");
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  const outPath = resolve(outDir, "projects.json");
  writeFileSync(outPath, JSON.stringify(projects, null, 2) + "\n");
  console.log(`Generated ${outPath} with ${projects.length} projects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
