import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

interface ProjectRecord {
  slug: string;
  last_updated?: string;
}

const DEFAULT_SITE_URL = "https://naija-ai-index.github.io";

const normalizeSiteUrl = (value?: string): string => {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(value);
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
};

const normalizePath = (path: string): string => {
  if (!path || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

const getAbsoluteUrl = (siteUrl: string, path: string): string =>
  `${siteUrl}${normalizePath(path)}`;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const isValidDate = (value?: string): value is string => {
  if (!value) {
    return false;
  }
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf());
};

async function main() {
  const siteUrl = normalizeSiteUrl(
    process.env.SITE_URL || process.env.VITE_SITE_URL,
  );
  const publicDir = resolve("apps/web/public");
  const projectsPath = resolve("apps/web/src/generated/projects.json");

  mkdirSync(publicDir, { recursive: true });

  const projects = JSON.parse(
    readFileSync(projectsPath, "utf-8"),
  ) as ProjectRecord[];

  const validProjectDates = projects
    .map((project) => project.last_updated)
    .filter(isValidDate)
    .sort((left, right) => right.localeCompare(left));

  const lastUpdatedDate = validProjectDates[0];

  const urlEntries = [
    {
      loc: getAbsoluteUrl(siteUrl, "/"),
      changefreq: "daily",
      priority: "1.0",
      lastmod: lastUpdatedDate,
    },
    {
      loc: getAbsoluteUrl(siteUrl, "/submit"),
      changefreq: "weekly",
      priority: "0.7",
      lastmod: undefined,
    },
    ...projects.map((project) => ({
      loc: getAbsoluteUrl(siteUrl, `/projects/${project.slug}`),
      changefreq: "weekly",
      priority: "0.8",
      lastmod: isValidDate(project.last_updated)
        ? project.last_updated
        : undefined,
    })),
  ];

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries.map((entry) => {
      const lines = [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : "",
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ].filter(Boolean);
      return lines.join("\n");
    }),
    "</urlset>",
    "",
  ].join("\n");

  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${getAbsoluteUrl(siteUrl, "/sitemap.xml")}`,
    "",
  ].join("\n");

  writeFileSync(resolve(publicDir, "sitemap.xml"), sitemapXml);
  writeFileSync(resolve(publicDir, "robots.txt"), robotsTxt);

  console.log(
    `Generated sitemap.xml (${urlEntries.length} URLs) and robots.txt for ${siteUrl}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
