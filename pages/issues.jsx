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
  const [tabState, setTabState] = useState({
    tabType: "allIssues",
    issueState: undefined
  });

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
        list: issues(first: 50, after: $cursor, states: $issueState) @skip(if: $showPR) {
          totalCount
          edges {
            node {
              id
              title
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
        prList: pullRequests(first: 50, after: $cursor, states: OPEN) @include(if: $showPR) {
          totalCount
          edges {
            node {
              id
              title
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
            showPR: tabState.tabType === "openPullRequests"
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
                  tabType={tabState.tabType}></Toolbar>
                <IssuesView
                  loading={loading}
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
