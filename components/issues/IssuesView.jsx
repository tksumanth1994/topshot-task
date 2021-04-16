import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GridView from "./views/GridView";
import ListView from "./views/ListView";
import ListEmpty from "../issues/states/ListEmpty";
import styles from "../../styles/IssuesView.module.css";

function IssuesView({ list, fetchMore, updateQuery, setIsFirstLoad, viewType, loading }) {
  const [screenType, setScreenType] = useState("desktop");

  function loadMore() {
    fetchMore({
      variables: {
        cursor: list.pageInfo.endCursor
      },
      updateQuery
    });
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
    setIsFirstLoad(false);
  });

  useEffect(() => {
    window.addEventListener("resize", resize.bind(this));
    resize();
    return function cleanup() {
      window.removeEventListener("resize", resize.bind(this));
    };
  });

  return (
    <div className="container pb-6">
      {(!list?.edges?.length && <ListEmpty />) ||
        ((viewType === "grid" || screenType !== "desktop") && <GridView list={list} />) || (
          <ListView list={list} />
        )}
      {list.pageInfo.hasNextPage && (
        <div className="is-flex is-justify-content-center is-align-items-center py-4">
          <button
            onClick={loadMore}
            className={`button is-medium is-rounded is-primary px-6 ${styles.loading} ${
              loading && "is-loading"
            }`}>
            {loading ? "Loading..." : "Load 50 More Results"}
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
  viewType: PropTypes.string,
  loading: PropTypes.bool
};

export default IssuesView;
