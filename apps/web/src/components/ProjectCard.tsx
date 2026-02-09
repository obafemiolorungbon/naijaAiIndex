import { Link } from "react-router-dom";
import type { Project } from "../types";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const statusClass =
    project.status === "active"
      ? styles.statusActive
      : project.status === "paused"
        ? styles.statusPaused
        : styles.statusArchived;

  return (
    <Link to={`/projects/${project.slug}`} className={styles.card}>
      <span className={styles.index}>{index}</span>
      <div className={styles.info}>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.tagline}>{project.tagline}</span>
      </div>
      <div className={styles.categories}>
        {project.categories.slice(0, 2).map((cat) => (
          <span key={cat} className={styles.badge}>
            {cat}
          </span>
        ))}
      </div>
      <span className={`${styles.status} ${statusClass}`}>
        {project.status}
      </span>
    </Link>
  );
};

export { ProjectCard };
