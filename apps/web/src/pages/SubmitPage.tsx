import { Seo } from "../seo/Seo";
import { getAbsoluteUrl } from "../seo/site";
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

const STEPS = [
  {
    title: "Fork the repository",
    seoText: "Fork the naijaAiIndex repository to your own GitHub account.",
    body: (
      <>
        Fork the{" "}
        <a
          href="https://github.com/obafemiolorungbon/naijaAiIndex"
          target="_blank"
          rel="noopener noreferrer"
        >
          naijaAiIndex repository
        </a>{" "}
        to your own GitHub account.
      </>
    ),
  },
  {
    title: "Create a project file",
    seoText: "Add a new YAML file at data/projects/your-project-name.yaml.",
    body: (
      <>
        Add a new YAML file at <code>data/projects/your-project-name.yaml</code>
        .
      </>
    ),
  },
  {
    title: "Fill out the template",
    seoText: "Copy the template and fill all required fields accurately.",
    body: "Use the template below and complete the required fields accurately.",
  },
  {
    title: "Validate your entry",
    seoText: "Run pnpm validate:data to ensure your file passes schema checks.",
    body: (
      <>
        Run <code>pnpm validate:data</code> to ensure your file passes schema
        checks.
      </>
    ),
  },
  {
    title: "Regenerate generated outputs",
    seoText: "Run pnpm generate:readme and pnpm generate:data.",
    body: (
      <>
        Run <code>pnpm generate:readme</code> and{" "}
        <code>pnpm generate:data</code>.
      </>
    ),
  },
  {
    title: "Open a pull request",
    seoText: "Submit a pull request with a clear title and short description.",
    body: "Submit a PR with a clear title and short description of your project.",
  },
];

const SUBMIT_META_DESCRIPTION =
  "Learn how to submit your Nigerian AI project to Naija AI Index with schema-validated YAML and a clean pull request workflow.";
const SUBMIT_KEYWORDS = [
  "submit Nigerian AI project",
  "Naija AI Index contribution",
  "open source AI directory",
  "AI project listing guide",
];
const SUBMIT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to submit a Nigerian AI project to Naija AI Index",
  description: SUBMIT_META_DESCRIPTION,
  url: getAbsoluteUrl("/submit"),
  step: STEPS.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.seoText,
    url: `${getAbsoluteUrl("/submit")}#step-${index + 1}`,
  })),
};

const REQUIREMENTS = [
  "Project must be built by Nigerians.",
  "Project must be related to AI or ML.",
  "Provide at least one of: website, demo, or repository link.",
  "No spam, ads, or paywalled content.",
  "Entry must pass schema validation.",
];

const PRE_PR_CHECKS = [
  <>
    Keep your project <code>tagline</code> concise and your{" "}
    <code>description</code> clear.
  </>,
  <>
    Make sure links in <code>website</code>, <code>demo</code>, or{" "}
    <code>repo</code> are valid.
  </>,
  "Use category names exactly as listed below.",
  "Ensure your update is focused on one project per PR.",
];

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
];

const SubmitPage = () => {
  return (
    <>
      <Seo
        title="Submit a Nigerian AI Project"
        description={SUBMIT_META_DESCRIPTION}
        path="/submit"
        keywords={SUBMIT_KEYWORDS}
        jsonLd={SUBMIT_STRUCTURED_DATA}
      />

      <div className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Community Contribution Guide</p>
          <h1 className={styles.title}>Submit a Project</h1>
          <p className={styles.subtitle}>
            Add a Nigerian AI project to the index through a pull request. The
            process is fast, schema-validated, and fully open source.
          </p>
          <div className={styles.heroActions}>
            <a
              className={styles.primaryAction}
              href="https://github.com/obafemiolorungbon/naijaAiIndex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Repository
            </a>
            <a
              className={styles.secondaryAction}
              href="https://github.com/obafemiolorungbon/naijaAiIndex/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read CONTRIBUTING.md
            </a>
          </div>
          <ul className={styles.factGrid}>
            <li className={styles.factCard}>
              <span className={styles.factLabel}>Entry Type</span>
              <strong className={styles.factValue}>YAML + PR</strong>
            </li>
            <li className={styles.factCard}>
              <span className={styles.factLabel}>Validation</span>
              <strong className={styles.factValue}>Schema Checked</strong>
            </li>
            <li className={styles.factCard}>
              <span className={styles.factLabel}>Ownership</span>
              <strong className={styles.factValue}>Nigerian-Built AI</strong>
            </li>
          </ul>
        </section>

        <section className={styles.layoutGrid}>
          <article className={styles.panel}>
            <h2 className={styles.sectionTitle}>How to Add a Project</h2>
            <ol className={styles.stepList}>
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  id={`step-${index + 1}`}
                  className={styles.stepItem}
                >
                  <span className={styles.stepIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.stepContent}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <div className={styles.sidePanels}>
            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>Requirements</h2>
              <ul className={styles.checkList}>
                {REQUIREMENTS.map((rule) => (
                  <li key={rule} className={styles.checkItem}>
                    <span className={styles.checkDot} aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className={styles.panel}>
              <h2 className={styles.sectionTitle}>Pre-PR Checklist</h2>
              <ul className={styles.checkList}>
                {PRE_PR_CHECKS.map((item, index) => (
                  <li key={index} className={styles.checkItem}>
                    <span className={styles.checkDot} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={`${styles.panel} ${styles.templatePanel}`}>
          <div className={styles.panelHeader}>
            <h2 className={styles.sectionTitle}>Project Template</h2>
            <span className={styles.panelHint}>Copy and customize</span>
          </div>
          <pre className={styles.code}>{TEMPLATE}</pre>
        </section>

        <section className={`${styles.panel} ${styles.categoryPanel}`}>
          <div className={styles.panelHeader}>
            <h2 className={styles.sectionTitle}>Allowed Categories</h2>
            <span className={styles.panelHint}>Use exact values</span>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <span key={cat} className={styles.categoryTag}>
                {cat}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export { SubmitPage };
