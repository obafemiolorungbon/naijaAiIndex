import { useState, useCallback, useMemo } from "react";
import { projects } from "../data";
import { CATEGORIES } from "../types";
import type { Category } from "../types";
import { ProjectCard } from "../components/ProjectCard";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );

  const handleCategoryChange = useCallback(
    (category: Category | "all") => setSelectedCategory(category),
    [],
  );

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categories.includes(selectedCategory));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [search, selectedCategory]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          The Directory of Nigerians
          <br />
          <span className={styles.titleAccent}>Building in AI</span>
        </h1>
        <p className={styles.subtitle}>
          A curated, community-driven index of AI projects, tools, and research
          built by Nigerians. Open source and PR-friendly.
        </p>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <strong>{projects.length}</strong> projects
          </span>
          <span className={styles.statDivider}>/</span>
          <span className={styles.stat}>
            <strong>
              {new Set(projects.flatMap((p) => p.categories)).size}
            </strong>{" "}
            categories
          </span>
        </div>
      </section>

      <section className={styles.controls}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.categories}>
          <button
            className={`${styles.categoryBtn} ${selectedCategory === "all" ? styles.categoryActive : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = projects.filter((p) =>
              p.categories.includes(cat.value),
            ).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.value}
                className={`${styles.categoryBtn} ${selectedCategory === cat.value ? styles.categoryActive : ""}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.directory}>
        <div className={styles.directoryHeader}>
          <span className={styles.colIndex}>#</span>
          <span className={styles.colName}>PROJECT</span>
          <span className={styles.colCategory}>CATEGORY</span>
          <span className={styles.colStatus}>STATUS</span>
        </div>
        {filteredProjects.length === 0 ? (
          <div className={styles.empty}>
            <p>No projects found matching your criteria.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index + 1}
            />
          ))
        )}
      </section>
    </div>
  );
};

export { HomePage };
