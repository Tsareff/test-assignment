import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Spinner, Alert } from "reactstrap";

interface Props {
  name: string;
  owner: string;
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

export const RepoContent: React.FC<Props> = ({ name, owner }) => {
  const { loading, data, error } = useQuery(GET_REPO_QUERY, {
    variables: { name, owner }
  });

  if (loading) {
    return <Spinner color="dark" />;
  }

  if (error || !data) {
    return <Alert color="danger">There is no such a repo</Alert>;
  }

  return <div>Repo content</div>;
};
