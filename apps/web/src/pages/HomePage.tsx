import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data";
import { CATEGORIES } from "../types";
import type { Category } from "../types";
import { ProjectCard } from "../components/ProjectCard";
import styles from "./HomePage.module.css";

const POPULAR_SEARCHES = ["agents", "fintech", "health", "education"];

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

  const handlePopularSearch = useCallback((term: string) => {
    setSearch(term);
    setSelectedCategory("all");
  }, []);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory("all");
  }, []);

  const categoryCounts = useMemo(
    () =>
      CATEGORIES.reduce(
        (acc, cat) => {
          acc[cat.value] = projects.filter((p) =>
            p.categories.includes(cat.value),
          ).length;
          return acc;
        },
        {} as Record<Category, number>,
      ),
    [],
  );

  const activeProjectsCount = useMemo(
    () => projects.filter((project) => project.status === "active").length,
    [],
  );

  const uniqueCategoriesCount = useMemo(
    () => new Set(projects.flatMap((p) => p.categories)).size,
    [],
  );

  const latestUpdatedLabel = useMemo(() => {
    const latest = projects.reduce<Date | null>((mostRecent, project) => {
      const updatedAt = project.last_updated
        ? new Date(`${project.last_updated}T00:00:00Z`)
        : null;

      if (!updatedAt || Number.isNaN(updatedAt.valueOf())) {
        return mostRecent;
      }

      if (!mostRecent || updatedAt > mostRecent) {
        return updatedAt;
      }

      return mostRecent;
    }, null);

    if (!latest) {
      return "N/A";
    }

    return latest.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

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
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Open Directory • Nigerian AI</p>
          <h1 className={styles.title}>
            Discover Nigerians
            <br />
            <span className={styles.titleAccent}>Building in AI</span>
          </h1>
          <p className={styles.subtitle}>
            Explore a curated, community-maintained index of products, tools,
            and research. Search by name, category, or tag and submit new
            projects with a pull request.
          </p>
          <div className={styles.heroActions}>
            <Link to="/submit" className={styles.primaryAction}>
              Submit a Project
            </Link>
            <a
              href="https://github.com/obafemiolorungbon/naijaAiIndex/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryAction}
            >
              Contribution Guide
            </a>
          </div>
        </div>

        <dl className={styles.statsGrid}>
          <div className={styles.statCard}>
            <dt>Total Projects</dt>
            <dd>{projects.length}</dd>
          </div>
          <div className={styles.statCard}>
            <dt>Active Projects</dt>
            <dd>{activeProjectsCount}</dd>
          </div>
          <div className={styles.statCard}>
            <dt>Live Categories</dt>
            <dd>{uniqueCategoriesCount}</dd>
          </div>
          <div className={styles.statCard}>
            <dt>Latest Update</dt>
            <dd>{latestUpdatedLabel}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.controls}>
        <div className={styles.searchWrapper}>
          <label htmlFor="project-search" className={styles.searchLabel}>
            Search Directory
          </label>
          <input
            id="project-search"
            type="text"
            placeholder="Search by project name, tagline, or tag..."
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <p className={styles.searchHint}>
            Popular searches:
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                className={styles.suggestionBtn}
                onClick={() => handlePopularSearch(term)}
              >
                {term}
              </button>
            ))}
          </p>
        </div>
        <div className={styles.categories} aria-label="Category filters">
          <button
            type="button"
            className={`${styles.categoryBtn} ${selectedCategory === "all" ? styles.categoryActive : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            All ({projects.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.value];
            if (count === 0) return null;
            return (
              <button
                type="button"
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

      <section className={styles.trustGrid}>
        <article className={styles.trustCard}>
          <h2>Community-Driven</h2>
          <p>
            Entries are contributed by builders and reviewed through public pull
            requests.
          </p>
        </article>
        <article className={styles.trustCard}>
          <h2>Open Standards</h2>
          <p>
            Every project follows a shared schema, so data remains consistent
            and searchable.
          </p>
        </article>
        <article className={styles.trustCard}>
          <h2>Discoverable by Design</h2>
          <p>
            Filter by category, search with tags, and inspect individual
            projects in detail.
          </p>
        </article>
      </section>

      <section className={styles.directory}>
        <div className={styles.directoryTop}>
          <h2>Directory Results</h2>
          <span>{filteredProjects.length} shown</span>
        </div>
        <div className={styles.directoryHeader}>
          <span className={styles.colIndex}>#</span>
          <span className={styles.colName}>PROJECT</span>
          <span className={styles.colCategory}>CATEGORY</span>
          <span className={styles.colStatus}>STATUS</span>
        </div>
        {filteredProjects.length === 0 ? (
          <div className={styles.empty}>
            <p>
              No matching projects found. Try a broader search or reset all
              filters.
            </p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={clearFilters}
            >
              Reset Filters
            </button>
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
