import styles from "./SubmitPage.module.css";

const TEMPLATE = `name: Your Project Name
tagline: A short description (max 120 chars)
description: >
  A longer description of your project,
  what it does, and why it matters. (max 600 chars)
website: https://yourproject.com
repo: https://github.com/you/your-project
categories:
  - llm-apps
tags:
  - nlp
  - chatbot
team:
  - name: Your Name
    role: Founder
    links:
      github: https://github.com/yourusername
origin:
  nigerian: true
  based_in: Lagos
status: active
year_started: 2024
last_updated: "2026-02-09"`;

const SubmitPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Submit a Project</h1>
      <p className={styles.subtitle}>
        Add a Nigerian AI project to the index by opening a Pull Request on
        GitHub.
      </p>

      <section className={styles.section}>
        <h2>How to Add a Project</h2>
        <ol className={styles.stepList}>
          <li>
            <strong>Fork</strong> the{" "}
            <a
              href="https://github.com/naija-ai-index/naija-ai-index"
              target="_blank"
              rel="noopener noreferrer"
            >
              repository
            </a>
          </li>
          <li>
            <strong>Create</strong> a new YAML file at{" "}
            <code>data/projects/your-project-name.yaml</code>
          </li>
          <li>
            <strong>Fill in</strong> the required fields using the template below
          </li>
          <li>
            <strong>Run</strong> <code>pnpm validate:data</code> to check your
            entry
          </li>
          <li>
            <strong>Run</strong> <code>pnpm generate:readme</code> and{" "}
            <code>pnpm generate:data</code>
          </li>
          <li>
            <strong>Submit</strong> a Pull Request
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>Project Template</h2>
        <pre className={styles.code}>{TEMPLATE}</pre>
      </section>

      <section className={styles.section}>
        <h2>Requirements</h2>
        <ul className={styles.ruleList}>
          <li>Project must be built by Nigerians</li>
          <li>Project must be related to AI / ML</li>
          <li>At least one of: website, demo, or repository link</li>
          <li>No spam, ads, or paywalled content</li>
          <li>Entry must pass schema validation</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Allowed Categories</h2>
        <div className={styles.categoryGrid}>
          {[
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
          ].map((cat) => (
            <span key={cat} className={styles.categoryTag}>
              {cat}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export { SubmitPage };
