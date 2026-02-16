import { Helmet } from "react-helmet-async";
import { DEFAULT_SOCIAL_IMAGE_PATH, SITE_NAME, getAbsoluteUrl } from "./site";

type OpenGraphType = "website" | "article";

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: OpenGraphType;
  keywords?: string[];
  imagePath?: string;
  imageAlt?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLd | JsonLd[];
}

const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const normalizeDescription = (description: string): string =>
  description.replace(/\s+/g, " ").trim();

const Seo = ({
  title,
  description,
  path,
  type = "website",
  keywords,
  imagePath = DEFAULT_SOCIAL_IMAGE_PATH,
  imageAlt,
  noindex = false,
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoProps) => {
  const canonicalUrl = getAbsoluteUrl(path);
  const normalizedTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const normalizedDescription = normalizeDescription(description);
  const normalizedImagePath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  const imageUrl = getAbsoluteUrl(normalizedImagePath);
  const jsonLdBlocks = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];
  const robotsDirective = noindex ? "noindex,nofollow" : DEFAULT_ROBOTS;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{normalizedTitle}</title>
      <meta name="description" content={normalizedDescription} />
      <meta name="robots" content={robotsDirective} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={normalizedTitle} />
      <meta property="og:description" content={normalizedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || normalizedTitle} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={normalizedTitle} />
      <meta name="twitter:description" content={normalizedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {jsonLdBlocks.map((schemaObject, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObject)}
        </script>
      ))}

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/svg+xml" />
    </Helmet>
  );
};

export { Seo };
