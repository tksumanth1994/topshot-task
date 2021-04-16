import PropTypes from "prop-types";
import styles from "../../../styles/States.module.css";

function Loading() {
  return (
    <main>
      <section className={`hero is-small is-primary ${styles.hero}`}>
        <div className="hero-body px-0">
          <div className="container"></div>
        </div>
      </section>
      <div className="container py-5 is-flex is-justify-content-center is-align-items-center">
        <div className="has-text-centered">
          <img src="/loader-dark.svg" alt="loading" className={styles.loader} />
          <p className={`is-size-4 ${styles.text}`}>Loading...</p>
        </div>
      </div>
    </main>
  );
}

Loading.propTypes = {
  owner: PropTypes.string,
  repo: PropTypes.string
};

export default Loading;
