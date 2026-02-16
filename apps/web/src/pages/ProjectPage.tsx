import { useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data";
import { Seo } from "../seo/Seo";
import { SITE_NAME, getAbsoluteUrl } from "../seo/site";
import styles from "./ProjectPage.module.css";

const MEMBER_LINKS = [
  { key: "github", label: "GitHub" },
  { key: "twitter", label: "Twitter" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "website", label: "Website" },
] as const;

const PROJECT_KEYWORDS_BASE = [
  "Nigerian AI project",
  "Naija AI startup",
  "AI builders in Nigeria",
];

const normalizeText = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const buildProjectMetaDescription = (
  name: string,
  tagline: string,
  categories: string[],
): string => {
  const base = `${name}: ${normalizeText(tagline)}. Categories: ${categories.join(", ")}.`;
  return base.length <= 160 ? base : `${base.slice(0, 157).trim()}...`;
};

const toIsoDateString = (value: string): string | undefined => {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.valueOf())) {
    return undefined;
  }
  return date.toISOString();
};

const getProjectSchemaType = (
  categories: string[],
): "SoftwareApplication" | "Dataset" | "CreativeWork" => {
  if (categories.includes("datasets")) {
    return "Dataset";
  }

  if (categories.includes("research")) {
    return "CreativeWork";
  }

  return "SoftwareApplication";
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const projectPath = slug ? `/projects/${slug}` : "/projects";

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!project) {
    return (
      <>
        <Seo
          title="Project Not Found"
          description="This project page does not exist in the Naija AI Index."
          path={projectPath}
          noindex
        />
        <div className={styles.notFound}>
          <h1>Project Not Found</h1>
          <p>The project you are looking for does not exist.</p>
          <button onClick={handleBack} className={styles.backBtn}>
            Back to Directory
          </button>
        </div>
      </>
    );
  }

  const statusClass =
    project.status === "active"
      ? styles.statusActive
      : project.status === "paused"
        ? styles.statusPaused
        : styles.statusArchived;

  const projectLinks = [
    project.website ? { label: "Website", url: project.website } : null,
    project.demo ? { label: "Live Demo", url: project.demo } : null,
    project.repo ? { label: "Repository", url: project.repo } : null,
    project.docs ? { label: "Documentation", url: project.docs } : null,
  ].filter((link): link is { label: string; url: string } => Boolean(link));

  const lastUpdatedDate = new Date(`${project.last_updated}T00:00:00Z`);
  const lastUpdated = Number.isNaN(lastUpdatedDate.valueOf())
    ? project.last_updated
    : lastUpdatedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
  const modifiedTime = toIsoDateString(project.last_updated);
  const projectDescription = buildProjectMetaDescription(
    project.name,
    project.tagline,
    project.categories,
  );
  const projectKeywords = [
    ...PROJECT_KEYWORDS_BASE,
    ...project.categories,
    ...(project.tags || []),
  ];
  const projectStructuredData = useMemo(() => {
    const profileUrl = getAbsoluteUrl(`/projects/${project.slug}`);
    const schemaType = getProjectSchemaType(project.categories);
    const sameAs = [
      project.website,
      project.demo,
      project.repo,
      project.docs,
    ].filter((link): link is string => Boolean(link));
    const primarySchema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: project.name,
      description: normalizeText(project.description),
      url: profileUrl,
      inLanguage: "en",
      keywords: project.tags?.join(", "),
      dateModified: modifiedTime,
      creator:
        project.team?.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
        })) || undefined,
      sameAs: sameAs.length > 0 ? sameAs : undefined,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: getAbsoluteUrl("/"),
      },
    };

    if (schemaType === "SoftwareApplication") {
      primarySchema.applicationCategory = project.categories.join(", ");
      primarySchema.operatingSystem = "Web";
    }

    return [
      primarySchema,
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Directory",
            item: getAbsoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.name,
            item: profileUrl,
          },
        ],
      },
    ];
  }, [modifiedTime, project]);

  return (
    <>
      <Seo
        title={`${project.name} | Nigerian AI Project`}
        description={projectDescription}
        path={`/projects/${project.slug}`}
        type="article"
        keywords={projectKeywords}
        modifiedTime={modifiedTime}
        jsonLd={projectStructuredData}
      />

      <div className={styles.page}>
        <div className={styles.navRow}>
          <Link to="/" className={styles.backLink}>
            Back to Directory
          </Link>
          <Link to="/submit" className={styles.submitLink}>
            Submit a Project
          </Link>
        </div>

        <header className={styles.hero}>
          <div className={styles.heroTop}>
            <p className={styles.eyebrow}>Project Profile</p>
            <span className={`${styles.statusBadge} ${statusClass}`}>
              {project.status}
            </span>
          </div>

          <h1 className={styles.name}>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.meta}>
            <span>{project.origin.based_in || "Nigeria"}</span>
            {project.year_started && <span>Since {project.year_started}</span>}
            <span>Updated {lastUpdated}</span>
          </div>

          <div className={styles.primaryLinks}>
            {projectLinks.length === 0 ? (
              <span className={styles.noLinks}>
                No external links provided.
              </span>
            ) : (
              projectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                >
                  {link.label}
                </a>
              ))
            )}
          </div>
        </header>

        <section className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>About This Project</h2>
              <p className={styles.description}>{project.description}</p>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>Classification</h2>

              <h3 className={styles.subTitle}>Categories</h3>
              <div className={styles.tagList}>
                {project.categories.map((cat) => (
                  <span key={cat} className={styles.tag}>
                    {cat}
                  </span>
                ))}
              </div>

              {project.tags && project.tags.length > 0 && (
                <>
                  <h3 className={styles.subTitle}>Tags</h3>
                  <div className={styles.tagList}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </article>

            {project.team && project.team.length > 0 && (
              <article className={styles.panel}>
                <h2 className={styles.sectionTitle}>Team</h2>
                <div className={styles.teamList}>
                  {project.team.map((member) => (
                    <div key={member.name} className={styles.teamMember}>
                      <div className={styles.memberInfo}>
                        <span className={styles.memberName}>{member.name}</span>
                        {member.role && (
                          <span className={styles.memberRole}>
                            {member.role}
                          </span>
                        )}
                      </div>
                      {member.links && (
                        <div className={styles.memberLinks}>
                          {MEMBER_LINKS.map(({ key, label }) => {
                            const href = member.links?.[key];
                            if (!href) return null;

                            return (
                              <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          <aside className={styles.sideColumn}>
            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>Snapshot</h2>
              <dl className={styles.snapshotList}>
                <div className={styles.snapshotRow}>
                  <dt>Status</dt>
                  <dd className={`${styles.snapshotStatus} ${statusClass}`}>
                    {project.status}
                  </dd>
                </div>
                <div className={styles.snapshotRow}>
                  <dt>Nigerian Built</dt>
                  <dd>{project.origin.nigerian ? "Yes" : "No"}</dd>
                </div>
                <div className={styles.snapshotRow}>
                  <dt>Based In</dt>
                  <dd>{project.origin.based_in || "Nigeria"}</dd>
                </div>
                <div className={styles.snapshotRow}>
                  <dt>Year Started</dt>
                  <dd>{project.year_started || "N/A"}</dd>
                </div>
                <div className={styles.snapshotRow}>
                  <dt>Last Updated</dt>
                  <dd>{lastUpdated}</dd>
                </div>
              </dl>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>Contribute</h2>
              <p className={styles.note}>
                Found outdated links or missing details? Open a pull request to
                improve this entry.
              </p>
              <div className={styles.sideActions}>
                <Link to="/submit" className={styles.sideAction}>
                  Add Another Project
                </Link>
                <a
                  href="https://github.com/obafemiolorungbon/naijaAiIndex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sideActionSecondary}
                >
                  Open Repository
                </a>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </>
  );
};

export { ProjectPage };
