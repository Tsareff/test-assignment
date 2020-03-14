import { Issue, IssueStates } from "./../types/Repository";

export const getOpenedIssues = (issues: Issue[]) =>
  issues.filter(issue => issue.state === IssueStates.OPEN);

export const getClosedIssues = (issues: Issue[]) =>
  issues.filter(issue => issue.state === IssueStates.CLOSED);

export const makeCollapsesState = (issues: Issue[]) =>
  issues.reduce<{ [key: string]: boolean }>(
    (acc, item) => ({
      ...acc,
      [item.id]: false
    }),
    {}
  );
