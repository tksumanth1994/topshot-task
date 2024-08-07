import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/Toolbar.module.css";

function Toolbar({
  repository,
  tabType,
  handleSetTabState,
  handleSetSearchFilters,
  viewType,
  setViewType,
  loading
}) {
  const [screenType, setScreenType] = useState("desktop");

  function handleInputKeyUp(e) {
    if (e.key === "Enter") {
      handleSetSearchFilters(e.target.value);
    }
  }

  function resize() {
    let screen = "desktop";
    if (window.innerWidth < 768) {
      screen = "mobile";
    } else if (window.innerWidth < 1023) {
      screen = "tablet";
    }
    setScreenType(screen);
  }

  useEffect(() => {
    window.addEventListener("resize", resize.bind(this));
    resize();
    return function cleanup() {
      window.removeEventListener("resize", resize.bind(this));
    };
  });

  return (
    <div className={`container py-5 ${styles.sticky}`}>
      <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
        <div className="is-flex is-justify-content-start is-align-items-center">
          <div className="tabs is-toggle is-right mb-0">
            <ul>
              <li className={tabType === "allIssues" ? `is-active ${styles.active}` : styles.tab}>
                <a onClick={() => handleSetTabState("allIssues")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className={`mr-2 ${styles.icon}`}>
                    <path
                      fillRule="evenodd"
                      d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                  </svg>
                  {screenType === "desktop" ? (
                    <span>
                      All Issues
                      <span className="tag ml-2 is-light is-primary is-rounded">
                        {repository?.totalIssues?.totalCount || 0}
                      </span>
                    </span>
                  ) : (
                    <span>All</span>
                  )}
                </a>
              </li>
              <li className={tabType === "openIssues" ? `is-active ${styles.active}` : styles.tab}>
                <a onClick={() => handleSetTabState("openIssues")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className={`mr-2 ${styles.icon}`}>
                    <path
                      fillRule="evenodd"
                      d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>
                  </svg>
                  {screenType === "desktop" ? (
                    <span>
                      Open Issues
                      <span className="tag ml-2 is-light is-primary is-rounded">
                        {repository?.openIssues?.totalCount || 0}
                      </span>
                    </span>
                  ) : (
                    <span>Open</span>
                  )}
                </a>
              </li>
              <li
                className={tabType === "closedIssues" ? `is-active ${styles.active}` : styles.tab}>
                <a onClick={() => handleSetTabState("closedIssues")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className={`mr-2 ${styles.icon}`}>
                    <path
                      fillRule="evenodd"
                      d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z"></path>
                  </svg>
                  {screenType === "desktop" ? (
                    <span>
                      Closed Issues
                      <span className="tag ml-2 is-light is-primary is-rounded">
                        {repository?.closedIssues?.totalCount || 0}
                      </span>
                    </span>
                  ) : (
                    <span>Closed</span>
                  )}
                </a>
              </li>
              <li
                className={
                  tabType === "openPullRequests" ? `is-active ${styles.active}` : styles.tab
                }>
                <a onClick={() => handleSetTabState("openPullRequests")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    className={`mr-2 ${styles.icon}`}>
                    <path
                      fillRule="evenodd"
                      d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
                  </svg>
                  {screenType === "desktop" ? (
                    <span>
                      Pull Requests
                      <span className="tag ml-2 is-light is-primary is-rounded">
                        {repository?.openPullRequests?.totalCount || 0}
                      </span>
                    </span>
                  ) : (
                    <span>PR</span>
                  )}
                </a>
              </li>
            </ul>
          </div>
          {loading && screenType === "desktop" && (
            <img src="/loader-dark.svg" alt="loading" className={`ml-3 ${styles.loader}`} />
          )}
        </div>
        <div
          className={`is-flex is-justify-content-end is-align-items-center ${styles.controlwrapper}`}>
          <div className={`control has-icons-left mr-4 ${styles.control}`}>
            <input
              onKeyUp={handleInputKeyUp}
              className="input is-hovered"
              placeholder="Filter issues..."
              type="input"
            />
            <span className="icon is-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
          </div>
          <div className="is-hidden-touch tabs is-toggle is-right">
            <ul>
              <li className={viewType === "grid" ? `is-active ${styles.active}` : styles.tab}>
                <a onClick={() => setViewType("grid")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    width="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`${styles.icon}`}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span></span>
                </a>
              </li>
              <li className={viewType === "list" ? `is-active ${styles.active}` : styles.tab}>
                <a onClick={() => setViewType("list")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    width="22"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`${styles.icon}`}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  repository: PropTypes.object,
  tabType: PropTypes.string,
  handleSetTabState: PropTypes.func,
  handleSetSearchFilters: PropTypes.func,
  viewType: PropTypes.string,
  setViewType: PropTypes.func,
  loading: PropTypes.bool
};

export default Toolbar;
