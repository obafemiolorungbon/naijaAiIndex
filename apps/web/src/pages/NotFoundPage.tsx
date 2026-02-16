import { Link, useLocation } from "react-router-dom";
import { Seo } from "../seo/Seo";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className={styles.page}>
      <Seo
        title="Page Not Found"
        description="The requested page does not exist in the Naija AI Index."
        path={location.pathname || "/"}
        noindex
      />

      <section className={styles.panel}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The link may be broken, outdated, or removed. Use the directory to
          find active Nigerian AI projects.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryAction}>
            Go to Directory
          </Link>
          <Link to="/submit" className={styles.secondaryAction}>
            Submit a Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export { NotFoundPage };
