import { IssueStates, Issue } from "../types/Repository";

export const ISSUES_MOCKS: Issue[] = [
  {
    id: "1",
    number: 1,
    title: "title",
    createdAt: "2020-03-12T14:55:47.959Z",
    state: IssueStates.OPEN,
    body: "some body of an issue",
    comments: { nodes: [] },
    author: {
      login: "author",
      url: "url/to/autor",
      avatarUrl: "url/to/author/avatar"
    }
  },
  {
    id: "2",
    number: 2,
    title: "title",
    createdAt: "2020-03-12T14:55:47.959Z",
    state: IssueStates.CLOSED,
    body: "some body of an issue",
    comments: { nodes: [] },
    author: {
      login: "author",
      url: "url/to/autor",
      avatarUrl: "url/to/author/avatar"
    }
  }
];
