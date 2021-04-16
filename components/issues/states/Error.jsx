import PropTypes from "prop-types";
import styles from "../../../styles/States.module.css";

function Error() {
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
            className="has-text-danger"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="is-size-4 has-text-weight-bold">Sorry! Error in fetching repo!</p>
          <p className="is-size-6">
            There seems to be an error in fetching repo.
            <br />
            Please refresh &amp; try again.
          </p>
        </div>
      </div>
    </main>
  );
}

Error.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string
};

export default Error;
