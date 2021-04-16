import { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Layout from "../components/layout/Layout";
import Header from "../components/issues/Header";
import Toolbar from "../components/issues/Toolbar";
import IssuesView from "../components/issues/IssuesView";
import Loading from "../components/issues/states/Loading";
import Error from "../components/issues/states/Error";
import Empty from "../components/issues/states/Empty";

export default function Issues() {
  const router = useRouter();
  const { owner = "", repo = "" } = router.query || {};

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [viewType, setViewType] = useState("grid");
  const [searchFilters, setSearchFilters] = useState({});
  const [tabState, setTabState] = useState({
    tabType: "allIssues",
    issueState: undefined
  });

  async function handleSetSearchFilters(searchText) {
    const finalFilters = {};
    const values = (searchText || "")
      .trim()
      .split(" ")
      .map((t) => (t || "").trim().split(":"))
      .filter((t) => t.length === 2);

    values.forEach((value) => {
      if (value[0] === "label") {
        if (finalFilters.labels) {
          finalFilters.labels.push(value[1]);
        } else {
          finalFilters.labels = [value[1]];
        }
      } else {
        finalFilters[value[0]] = value[1];
      }
    });
    await setSearchFilters(finalFilters);
  }

  async function handleSetTabState(tab) {
    if (tab === "openIssues") {
      await setTabState({
        tabType: tab,
        issueState: "OPEN"
      });
    } else if (tab === "closedIssues") {
      await setTabState({
        tabType: tab,
        issueState: "CLOSED"
      });
    } else {
      await setTabState({
        tabType: tab
      });
    }
  }

  const GET_REPO_AND_ISSUES = gql`
    query(
      $owner: String!
      $repo: String!
      $cursor: String
      $issueState: [IssueState!]
      $showPR: Boolean!
      $filterBy: IssueFilters
    ) {
      repository(owner: $owner, name: $repo) {
        name
        description
        owner {
          login
        }
        primaryLanguage {
          name
          color
        }
        stargazerCount
        forkCount
        openIssues: issues(states: OPEN) {
          totalCount
        }
        closedIssues: issues(states: CLOSED) {
          totalCount
        }
        totalIssues: issues {
          totalCount
        }
        openPullRequests: pullRequests(states: OPEN) {
          totalCount
        }
        list: issues(
          first: 50
          after: $cursor
          states: $issueState
          filterBy: $filterBy
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) @skip(if: $showPR) {
          totalCount
          edges {
            node {
              id
              title
              url
              number
              author {
                login
                avatarUrl
              }
              updatedAt
              closedAt
              comments(first: 0) {
                totalCount
              }
              labels(first: 1) {
                totalCount
                edges {
                  node {
                    id
                    name
                    description
                    color
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        prList: pullRequests(
          first: 50
          after: $cursor
          states: OPEN
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) @include(if: $showPR) {
          totalCount
          edges {
            node {
              id
              title
              url
              number
              author {
                login
                avatarUrl
              }
              updatedAt
              closedAt
              comments(first: 0) {
                totalCount
              }
              labels(first: 1) {
                totalCount
                edges {
                  node {
                    id
                    name
                    description
                    color
                  }
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  function updateQuery(previousResult, { fetchMoreResult }) {
    if (!fetchMoreResult) {
      return previousResult;
    }
    const finalQuery = {
      ...previousResult,
      repository: {
        ...previousResult.repository
      }
    };
    if (fetchMoreResult.repository.list) {
      finalQuery.repository.list = {
        ...previousResult.repository.list,
        ...fetchMoreResult.repository.list,
        edges: [...previousResult.repository.list.edges, ...fetchMoreResult.repository.list.edges]
      };
    }
    if (fetchMoreResult.repository.prList) {
      finalQuery.repository.prList = {
        ...previousResult.repository.prList,
        ...fetchMoreResult.repository.prList,
        edges: [
          ...previousResult.repository.prList.edges,
          ...fetchMoreResult.repository.prList.edges
        ]
      };
    }
    return finalQuery;
  }

  return (
    <Layout>
      <main>
        <Query
          query={GET_REPO_AND_ISSUES}
          variables={{
            owner,
            repo,
            issueState: tabState.issueState,
            showPR: tabState.tabType === "openPullRequests",
            filterBy: searchFilters
          }}
          notifyOnNetworkStatusChange={true}>
          {({ data, loading, error, fetchMore }) => {
            if (error) {
              return <Error owner={owner} repo={repo} />;
            }

            const { repository } = data || {};

            if (loading && isFirstLoad) {
              return <Loading owner={owner} repo={repo} />;
            }

            if (!repository) {
              return <Empty owner={owner} repo={repo} isRepoEmpty={true} />;
            }

            if (!repository.totalIssues) {
              return <Empty owner={owner} repo={repo} isIssuesEmpty={true} />;
            }

            return (
              <>
                <Header repository={repository}></Header>
                <Toolbar
                  repository={repository}
                  handleSetTabState={handleSetTabState}
                  tabType={tabState.tabType}
                  handleSetSearchFilters={handleSetSearchFilters}
                  viewType={viewType}
                  setViewType={setViewType}
                  loading={loading}></Toolbar>
                <IssuesView
                  loading={loading}
                  viewType={viewType}
                  list={repository.prList || repository.list}
                  fetchMore={fetchMore}
                  updateQuery={updateQuery}
                  setIsFirstLoad={setIsFirstLoad}></IssuesView>
              </>
            );
          }}
        </Query>
      </main>
    </Layout>
  );
}
