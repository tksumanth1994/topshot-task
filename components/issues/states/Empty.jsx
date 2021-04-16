import PropTypes from "prop-types";
import styles from "../../../styles/States.module.css";

function Empty({ owner, repo, isRepoEmpty, isIssuesEmpty }) {
  return (
    <main>
      <section className={`hero is-small is-primary ${styles.hero}`}>
        <div className="hero-body px-0">
          <div className="container"></div>
        </div>
      </section>
      <div className="container py-5 is-flex is-justify-content-center is-align-items-center">
        <div className="has-text-centered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="92"
            width="92"
            className="has-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="has-text-centered">
            {(isRepoEmpty && (
              <>
                <p className="is-size-4 has-text-weight-bold">Sorry! Not able to fetch repo!</p>
                <p className="is-size-6">
                  <a
                    href={`https://github.com/${owner}/${repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}>
                    https://github.com/{owner}/{repo}
                  </a>
                  <br />
                  is either empty or belongs to an enterprise organization.
                </p>
              </>
            )) ||
              (isIssuesEmpty && (
                <>
                  <p className="is-size-4 has-text-weight-bold">Oops! No issues found!</p>
                  <p className="is-size-6">
                    <a
                      href={`https://github.com/${owner}/${repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.link}>
                      https://github.com/{owner}/{repo}
                    </a>
                    <br />
                    doesn&apos;t contain any issues. yet.
                  </p>
                </>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

Empty.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string,
  isRepoEmpty: PropTypes.bool,
  isIssuesEmpty: PropTypes.bool
};

export default Empty;
