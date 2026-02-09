import { useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "../data";
import styles from "./ProjectPage.module.css";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <p>The project you are looking for does not exist.</p>
        <button onClick={handleBack} className={styles.backBtn}>
          Back to Directory
        </button>
      </div>
    );
  }

  const statusClass =
    project.status === "active"
      ? styles.statusActive
      : project.status === "paused"
        ? styles.statusPaused
        : styles.statusArchived;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        Back to Directory
      </Link>

      <header className={styles.header}>
        <h1 className={styles.name}>{project.name}</h1>
        <p className={styles.tagline}>{project.tagline}</p>
        <div className={styles.meta}>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {project.status}
          </span>
          {project.origin.based_in && (
            <span className={styles.location}>{project.origin.based_in}</span>
          )}
          {project.year_started && (
            <span className={styles.year}>Since {project.year_started}</span>
          )}
        </div>
      </header>

      <section className={styles.description}>
        <p>{project.description}</p>
      </section>

      <section className={styles.links}>
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            Website
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            Demo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            Repository
          </a>
        )}
        {project.docs && (
          <a
            href={project.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            Documentation
          </a>
        )}
      </section>

      <section className={styles.tags}>
        <h3>Categories</h3>
        <div className={styles.tagList}>
          {project.categories.map((cat) => (
            <span key={cat} className={styles.tag}>
              {cat}
            </span>
          ))}
        </div>
        {project.tags && project.tags.length > 0 && (
          <>
            <h3>Tags</h3>
            <div className={styles.tagList}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      {project.team && project.team.length > 0 && (
        <section className={styles.team}>
          <h3>Team</h3>
          <div className={styles.teamList}>
            {project.team.map((member) => (
              <div key={member.name} className={styles.teamMember}>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  {member.role && (
                    <span className={styles.memberRole}>{member.role}</span>
                  )}
                </div>
                {member.links && (
                  <div className={styles.memberLinks}>
                    {member.links.github && (
                      <a
                        href={member.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {member.links.twitter && (
                      <a
                        href={member.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a
                        href={member.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {member.links.website && (
                      <a
                        href={member.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export { ProjectPage };
