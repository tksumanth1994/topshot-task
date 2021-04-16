import { useEffect } from "react";
import PropTypes from "prop-types";

function IssuesView({ list, fetchMore, updateQuery, setIsFirstLoad }) {
  const loadMore = () => {
    fetchMore({
      variables: {
        cursor: list.pageInfo.endCursor
      },
      updateQuery
    });
  };

  useEffect(() => {
    setIsFirstLoad(false);
  });

  return (
    <div className="container">
      {list?.totalCount || 0}
      <div>
        {list.edges.map(({ node }) => {
          return (
            <p className="is-size-6" key={node.id}>
              {node.title}
            </p>
          );
        })}
      </div>
      {list.pageInfo.hasNextPage && (
        <div>
          <button onClick={loadMore} className="button is-primary">
            Load More...
          </button>
        </div>
      )}
    </div>
  );
}

IssuesView.propTypes = {
  list: PropTypes.object,
  fetchMore: PropTypes.func,
  updateQuery: PropTypes.func,
  setIsFirstLoad: PropTypes.func
};

export default IssuesView;
