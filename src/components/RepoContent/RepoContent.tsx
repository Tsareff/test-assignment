import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  TabContent,
  TabPane,
  Spinner,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Alert
} from "reactstrap";
import { PullRequests } from "../PullRequests/PullRequests";
import { IssuesList } from "../IssuesList/IssuesList";
import { getOpenedIssues, getClosedIssues } from "../../utils/issues";
import Styles from "./RepoContent.module.css";
import {
  RepositoryQuery,
  RepositoryQueryVariables
} from "../../types/Repository";

interface Props {
  name: string;
  owner: string;
}

enum RepoTabs {
  PULL_REQUESTS = "PULL_REQUESTS",
  OPENED_ISSUES = "OPENED_ISSUES",
  CLOSED_ISSUES = "CLOSED_ISSUES"
}

const GET_REPO_QUERY = gql`
  query GET_REPO_QUERY($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      pullRequests(
        states: [OPEN, CLOSED]
        first: 10
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          id
          title
          state
          number
          createdAt
          author {
            login
            url
          }
        }
      }
      issues(
        states: [OPEN, CLOSED]
        first: 30
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          id
          title
          number
          createdAt
          state
          body
          author {
            login
            url
          }
          comments(first: 20) {
            nodes {
              id
              body
              createdAt
              author {
                login
                avatarUrl
              }
            }
          }
        }
      }
    }
  }
`;

const TABS = [
  {
    type: RepoTabs.PULL_REQUESTS,
    label: "Pull Requests"
  },
  { type: RepoTabs.OPENED_ISSUES, label: "Open issues" },
  { type: RepoTabs.CLOSED_ISSUES, label: "Closed issues" }
];

export const RepoContent: React.FC<Props> = ({ name, owner }) => {
  const [activeTab, setActiveTab] = useState(RepoTabs.PULL_REQUESTS);

  const { loading, data, error } = useQuery<
    RepositoryQuery,
    RepositoryQueryVariables
  >(GET_REPO_QUERY, {
    variables: { name, owner }
  });

  if (loading) {
    return <Spinner color="dark" />;
  }

  if (error || !data) {
    return <Alert color="danger">There is no such a repo</Alert>;
  }

  const repository = data.repository;

  const pullRequests = repository.pullRequests;

  const issues = repository.issues;

  const openedIssues = getOpenedIssues(issues.nodes);

  const closedIssues = getClosedIssues(issues.nodes);

  const tabsWithCount = [
    pullRequests.totalCount,
    openedIssues.length,
    closedIssues.length
  ].map((count, i) => ({
    ...TABS[i],
    count
  }));

  return (
    <div>
      <Nav tabs>
        {tabsWithCount.map(({ type, label, count }) => (
          <NavItem key={type}>
            <NavLink
              active={activeTab === type}
              onClick={() => setActiveTab(type)}
              className={Styles.tab}
            >
              {label} <Badge color="secondary">{count}</Badge>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={RepoTabs.PULL_REQUESTS}>
          <PullRequests pullRequests={pullRequests.nodes} />
        </TabPane>
        <TabPane tabId={RepoTabs.OPENED_ISSUES}>
          <IssuesList issues={openedIssues} />
        </TabPane>
        <TabPane tabId={RepoTabs.CLOSED_ISSUES}>
          <IssuesList issues={closedIssues} />
        </TabPane>
      </TabContent>
    </div>
  );
};
