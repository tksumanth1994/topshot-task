import Head from "next/head";
import PropTypes from "prop-types";
import styles from "../../styles/Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Issues Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar has-background-black-ter has-text-white">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="/">
              <img className={`mb-1 ${styles.logo}`} src="/logo.svg" alt="search" />
              <span className={`ml-3 has-text-white is-size-5 is-uppercase ${styles.title}`}>
                Issues Explorer
              </span>
            </a>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="navbar-end">
            <div className="is-flex is-align-items-center mr-3">
              <div className="control has-icons-left has-icons-right">
                <input className="input is-rounded is-small is-info is-hovered" type="input" />
                <span className="icon is-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="has-text-grey-light">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <span className="icon is-right is-clickable" role="button" tabIndex="0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="has-text-grey">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
            <a
              href="https://github.com/axiomzen/cc_Krishna_IssuesExplorerFE"
              target="_blank"
              className="is-flex is-align-items-center"
              rel="noreferrer">
              <svg
                fill="#ffffff"
                height="28"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
