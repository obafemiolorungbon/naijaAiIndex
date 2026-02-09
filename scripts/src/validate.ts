import Ajv from "ajv";
import addFormats from "ajv-formats";
import { readFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { glob } from "glob";
import { parse } from "yaml";

const CATEGORIES = [
  "llm-apps",
  "agents",
  "developer-tools",
  "infra",
  "datasets",
  "research",
  "health",
  "fintech",
  "education",
  "agriculture",
  "climate",
  "govtech",
  "security",
  "media",
] as const;

interface ProjectData {
  name: string;
  tagline: string;
  description: string;
  website?: string;
  demo?: string;
  repo?: string;
  docs?: string;
  categories: string[];
  origin: { nigerian: boolean; based_in?: string };
  status: string;
  [key: string]: unknown;
}

async function main() {
  const schemaPath = resolve("schemas/project.schema.json");
  const schema = JSON.parse(readFileSync(schemaPath, "utf-8"));

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const projectFiles = await glob("data/{projects,samples}/**/*.yaml", {
    posix: true,
  });

  if (projectFiles.length === 0) {
    console.log("No project files found.");
    process.exit(0);
  }

  let hasErrors = false;
  const seenNames = new Set<string>();
  const seenRepos = new Set<string>();

  for (const file of projectFiles.sort()) {
    const content = readFileSync(file, "utf-8");
    const data = parse(content) as ProjectData;

    const valid = validate(data);
    if (!valid) {
      console.error(`\u274C ${file}: Schema validation failed:`);
      for (const err of validate.errors!) {
        console.error(`   ${err.instancePath} ${err.message}`);
      }
      hasErrors = true;
      continue;
    }

    const slug = basename(file, ".yaml");
    const expectedSlug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (slug !== expectedSlug) {
      console.error(
        `\u274C ${file}: Filename slug "${slug}" doesn't match name "${data.name}" (expected "${expectedSlug}")`,
      );
      hasErrors = true;
    }

    const nameLower = data.name.toLowerCase();
    if (seenNames.has(nameLower)) {
      console.error(`\u274C ${file}: Duplicate project name "${data.name}"`);
      hasErrors = true;
    }
    seenNames.add(nameLower);

    if (data.repo) {
      if (seenRepos.has(data.repo)) {
        console.error(`\u274C ${file}: Duplicate repo URL "${data.repo}"`);
        hasErrors = true;
      }
      seenRepos.add(data.repo);
    }

    if (data.origin?.nigerian !== true) {
      console.error(`\u274C ${file}: origin.nigerian must be true`);
      hasErrors = true;
    }

    if (!data.website && !data.demo && !data.repo) {
      console.error(
        `\u274C ${file}: At least one of website, demo, or repo is required`,
      );
      hasErrors = true;
    }

    for (const cat of data.categories) {
      if (!(CATEGORIES as readonly string[]).includes(cat)) {
        console.error(
          `\u274C ${file}: Invalid category "${cat}". Allowed: ${CATEGORIES.join(", ")}`,
        );
        hasErrors = true;
      }
    }

    if (data.tagline && data.tagline.length > 120) {
      console.error(
        `\u274C ${file}: Tagline exceeds 120 characters (${data.tagline.length})`,
      );
      hasErrors = true;
    }

    if (data.description && data.description.length > 600) {
      console.error(
        `\u274C ${file}: Description exceeds 600 characters (${data.description.length})`,
      );
      hasErrors = true;
    }

    console.log(`\u2705 ${file}`);
  }

  if (hasErrors) {
    console.error("\n\u274C Validation failed.");
    process.exit(1);
  }

  console.log(
    `\n\u2705 All ${projectFiles.length} project files are valid.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
