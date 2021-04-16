import PropTypes from "prop-types";
import styles from "../../styles/Header.module.css";

function Header({ repository }) {
  return (
    <section className={`hero is-small is-primary ${styles.hero}`}>
      <div className="hero-body px-0">
        <div className="container">
          <a
            href={`https://github.com/${repository.owner.login}/${repository.name}`}
            target="_blank"
            className={`is-size-4 has-text-weight-bold ${styles.title}`}
            rel="noreferrer">
            {repository.owner.login}/{repository.name}
          </a>
          <p className="is-size-6">{repository.description}</p>
          <div className={`is-flex is-justify-content-center is-align-items-start ${styles.stats}`}>
            <div className={`px-3 py-1 ml-3 is-flex is-align-items-center ${styles.statbox}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                className={`mr-1 ${styles.staticon}`}>
                <path
                  fillRule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
              </svg>
              {(repository.stargazerCount || 0).toLocaleString()} stars
            </div>
            <div className={`px-3 py-1 ml-3 is-flex is-align-items-center ${styles.statbox}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                className={`mr-1 ${styles.staticon}`}>
                <path
                  fillRule="evenodd"
                  d="M12 21a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zm-3.25-1.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zm-3-12.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM2.5 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0zM18.25 6.5a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM15 4.75a3.25 3.25 0 106.5 0 3.25 3.25 0 00-6.5 0z"></path>
                <path
                  fillRule="evenodd"
                  d="M6.5 7.75v1A2.25 2.25 0 008.75 11h6.5a2.25 2.25 0 002.25-2.25v-1H19v1a3.75 3.75 0 01-3.75 3.75h-6.5A3.75 3.75 0 015 8.75v-1h1.5z"></path>
                <path fillRule="evenodd" d="M11.25 16.25v-5h1.5v5h-1.5z"></path>
              </svg>
              {(repository.forkCount || 0).toLocaleString()} forks
            </div>
            {repository?.primaryLanguage?.name && (
              <div className={`px-3 py-1 ml-3 is-flex is-align-items-center ${styles.language}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  className={`mr-1 ${styles.staticon}`}>
                  <path
                    fillRule="evenodd"
                    d="M1.543 7.25h2.733c.144-2.074.866-3.756 1.58-4.948.12-.197.237-.381.353-.552a6.506 6.506 0 00-4.666 5.5zm2.733 1.5H1.543a6.506 6.506 0 004.666 5.5 11.13 11.13 0 01-.352-.552c-.715-1.192-1.437-2.874-1.581-4.948zm1.504 0h4.44a9.637 9.637 0 01-1.363 4.177c-.306.51-.612.919-.857 1.215a9.978 9.978 0 01-.857-1.215A9.637 9.637 0 015.78 8.75zm4.44-1.5H5.78a9.637 9.637 0 011.363-4.177c.306-.51.612-.919.857-1.215.245.296.55.705.857 1.215A9.638 9.638 0 0110.22 7.25zm1.504 1.5c-.144 2.074-.866 3.756-1.58 4.948-.12.197-.237.381-.353.552a6.506 6.506 0 004.666-5.5h-2.733zm2.733-1.5h-2.733c-.144-2.074-.866-3.756-1.58-4.948a11.738 11.738 0 00-.353-.552 6.506 6.506 0 014.666 5.5zM8 0a8 8 0 100 16A8 8 0 008 0z"></path>
                </svg>
                {repository?.primaryLanguage?.name} Language
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Header.propTypes = {
  repository: PropTypes.object
};

export default Header;
