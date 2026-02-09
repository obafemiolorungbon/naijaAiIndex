import { useCallback, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>N</span>
            <span className={styles.logoText}>Naija AI Index</span>
          </Link>
          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}
            >
              Directory
            </Link>
            <Link
              to="/submit"
              className={`${styles.navLink} ${isActive("/submit") ? styles.active : ""}`}
            >
              Submit
            </Link>
            <a
              href="https://github.com/naija-ai-index/naija-ai-index"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>
            Built by the community. Open source under{" "}
            <a href="https://github.com/naija-ai-index/naija-ai-index/blob/main/LICENSE">
              MIT License
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

export { Layout };
