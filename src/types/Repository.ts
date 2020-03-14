export type PullRequest = {
  id: string;
  title: string;
  number: number;
  state: PullRequestState;
  author: Author;
  createdAt: string;
};

enum PullRequestState {
  CLOSED = "CLOSED",
  MERGED = "MERGED",
  OPEN = "OPEN"
}

export type Issue = {
  id: string;
  number: number;
  title: string;
  createdAt: string;
  state: IssueStates;
  body: string;
  comments: { nodes: Comment[] };
  author: Author;
};

export type Author = {
  avatarUrl: string;
  login: string;
  url: string;
};

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: Author;
};

export enum IssueStates {
  CLOSED = "CLOSED",
  OPEN = "OPEN"
}

export type RepositoryQuery = {
  repository: {
    pullRequests: {
      totalCount: number;
      nodes: PullRequest[];
    };
    issues: {
      totalCount: number;
      nodes: Issue[];
    };
  };
};

export type RepositoryQueryVariables = {
  name: string;
  owner: string;
};
