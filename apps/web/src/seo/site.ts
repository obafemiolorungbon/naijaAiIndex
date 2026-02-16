const DEFAULT_SITE_URL = "https://naija-ai-index.github.io";
const SITE_NAME = "Naija AI Index";
const SITE_DESCRIPTION =
  "Discover Nigerian AI startups, tools, datasets, and research projects in an open, community-maintained directory.";
const DEFAULT_SOCIAL_IMAGE_PATH = "/og-image.svg";

const stripTrailingSlash = (value: string): string =>
  value.endsWith("/") ? value.slice(0, -1) : value;

const normalizeSiteUrl = (rawValue?: string): string => {
  if (!rawValue) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsed = new URL(rawValue);
    return stripTrailingSlash(parsed.toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
};

const normalizePath = (path: string): string => {
  if (!path || path === "/") {
    return "/";
  }

  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
};

const SITE_URL = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

const getAbsoluteUrl = (path: string): string =>
  `${SITE_URL}${normalizePath(path)}`;

export {
  DEFAULT_SOCIAL_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  getAbsoluteUrl,
};
