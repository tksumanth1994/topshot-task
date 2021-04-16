import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import styles from "../../../styles/ListView.module.css";

TimeAgo.addLocale(en);

function ListView({ list }) {
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="columns is-gapless is-mobile is-multiline">
      {list.edges.map(({ node }) => {
        return (
          <div className="column is-12" key={node.id}>
            <div className={`columns is-gapless card px-5 py-4 ${styles.card}`}>
              <div className="column is-5 is-flex is-justify-content-start is-align-items-center">
                <div
                  className={`mr-3 is-size-7 px-1 py-2 has-text-primary has-background-white-ter ${styles.number}`}>
                  #{node.number}
                </div>
                <a
                  href={node.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`title is-size-6 has-text-weight-normal ${styles.title}`}>
                  {node.title}
                </a>
              </div>
              <div className="column is-2 is-flex is-justify-content-start is-align-items-center">
                {node?.labels?.totalCount ? (
                  <div className="is-flex is-justify-content-start is-align-items-end">
                    {node?.labels?.edges[0].node?.name && (
                      <span className="tag mr-2 is-light is-primary is-rounded">
                        {node?.labels?.edges[0].node?.name || ""}
                      </span>
                    )}
                    {node?.labels?.totalCount > 1 && (
                      <span className="tag is-light is-primary is-rounded">
                        + {(node?.labels?.totalCount || 1) - 1}{" "}
                        {node?.labels?.totalCount === 2 ? "label" : "labels"}
                      </span>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="column is-1 is-flex is-justify-content-start is-align-items-center">
                <p className="is-flex is-justify-content-start is-align-items-center has-text-grey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    className="mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  {node?.comments?.totalCount || 0}{" "}
                </p>
              </div>
              <div className="column is-2 is-flex is-justify-content-start is-align-items-center">
                <img
                  className={`is-flex is-justify-content-start is-align-items-end ${styles.avatar}`}
                  src={node.author.avatarUrl}
                  alt="Author"
                />
                <p className="ml-2">@{node?.author?.login || ""}</p>
              </div>
              <div className="column is-2 is-flex is-justify-content-flex-end is-align-items-center">
                <p className="is-flex is-justify-content-end is-align-items-center has-text-grey">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="12"
                    width="12"
                    className="mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {timeAgo.format(new Date(node.closedAt || node.updatedAt) - 24 * 60 * 60 * 1000)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

ListView.propTypes = {
  list: PropTypes.object
};

export default ListView;
