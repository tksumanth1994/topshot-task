import { useEffect } from "react";
import PropTypes from "prop-types";
import GridView from "./views/GridView";
import ListView from "./views/ListView";

function IssuesView({ list, fetchMore, updateQuery, setIsFirstLoad, viewType }) {
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
      {viewType === "grid" ? <GridView list={list} /> : <ListView list={list} />}
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
  setIsFirstLoad: PropTypes.func,
  viewType: PropTypes.string
};

export default IssuesView;
