import { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Layout from "../components/layout/Layout";
import Header from "../components/issues/Header";
import Toolbar from "../components/issues/Toolbar";
import IssuesView from "../components/issues/IssuesView";

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
    console.log(
      "🚀 ~ file: issues.jsx ~ line 23 ~ handleSetSearchFilters ~ searchText",
      searchText
    );
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
    console.log(
      "🚀 ~ file: issues.jsx ~ line 51 ~ handleSetSearchFilters ~ finalFilters",
      finalFilters
    );
    await setSearchFilters(finalFilters);
  }

  async function handleSetTabState(tab) {
    console.log("🚀 ~ file: issues.jsx ~ line 20 ~ handleSetTabType ~ tab", tab);
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
    console.log("tabState", tabState);
  }

  const GET_REPO_AND_ISSUES = gql`
    query(
      $owner: String!
      $repo: String!
      $cursor: String
      $issueState: [IssueState!]
      $showPR: Boolean!
      $filterBy: IssueFilters
      $labels: [String!]
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
          labels: $labels
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
  console.log("GET_REPO_AND_ISSUES", GET_REPO_AND_ISSUES);

  const updateQuery = (previousResult, { fetchMoreResult }) => {
    console.log("🚀 ~ file: issues.jsx ~ line 60 ~ updateQuery ~ fetchMoreResult", fetchMoreResult);
    console.log("🚀 ~ file: issues.jsx ~ line 60 ~ updateQuery ~ previousResult", previousResult);
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
    console.log("🚀 ~ file: issues.jsx ~ line 111 ~ updateQuery ~ result", finalQuery);
    return finalQuery;
  };

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
            filterBy: searchFilters,
            labels: searchFilters?.labels || []
          }}
          notifyOnNetworkStatusChange={true}>
          {({ data, loading, error, fetchMore }) => {
            console.log("🚀 ~ file: issues.jsx ~ line 41 ~ Issues ~ loading", loading);
            if (error) {
              return "Error";
            }
            console.log("🚀 ~ file: issues.jsx ~ line 40 ~ Issues ~ error", error);

            const { repository } = data || {};

            if (loading && isFirstLoad) {
              return "Loading";
            }

            console.log("🚀 ~ file: issues.jsx ~ line 48 ~ Issues ~ data", data);

            if (!repository) {
              return `No repo found or enterprise plan https://github.com/${owner}/${repo}`;
            }

            if (!repository.totalIssues) {
              return `No issues found https://github.com/${owner}/${repo}`;
            }

            console.log("🚀 ~ file: issues.jsx ~ line 47 ~ Issues ~ data", data);

            return (
              <>
                <Header repository={repository}></Header>
                <Toolbar
                  repository={repository}
                  handleSetTabState={handleSetTabState}
                  tabType={tabState.tabType}
                  handleSetSearchFilters={handleSetSearchFilters}
                  viewType={viewType}
                  setViewType={setViewType}></Toolbar>
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
