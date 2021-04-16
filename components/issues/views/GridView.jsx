import PropTypes from "prop-types";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import styles from "../../../styles/GridView.module.css";

TimeAgo.addLocale(en);

function GridView({ list }) {
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="columns is-mobile is-multiline">
      {list.edges.map(({ node }) => {
        return (
          <div className="column is-3" key={node.id}>
            <div className={`card ${styles.card}`}>
              <div
                className={`card-content is-flex is-flex-direction-column is-justify-content-space-between ${styles.content}`}>
                <div>
                  <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <p className="has-text-grey-light is-italic is-size-7">#{node.number}</p>
                    <p className="is-flex is-justify-content-end is-align-items-center has-text-grey-light is-size-7">
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
                      {timeAgo.format(
                        new Date(node.closedAt || node.updatedAt) - 24 * 60 * 60 * 1000
                      )}
                    </p>
                  </div>
                  <a
                    href={node.url}
                    target="_blank"
                    className={`title is-size-6 has-text-weight-bold ${styles.title}`}
                    rel="noreferrer">
                    {node.title}
                  </a>
                  <div className="is-flex is-justify-content-start is-align-items-center pt-1 pb-3">
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
                      {node?.comments?.totalCount === 1 ? "comment" : "comments"}
                    </p>
                  </div>
                </div>
                <div className="is-flex is-justify-content-space-between is-align-items-end pt-2">
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
                  <div>
                    <img
                      className={`is-flex is-justify-content-start is-align-items-end ${styles.avatar}`}
                      src={node.author.avatarUrl}
                      alt="Author"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

GridView.propTypes = {
  list: PropTypes.object
};

export default GridView;
