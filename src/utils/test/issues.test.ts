import { ISSUES_MOCKS } from "./../../mocks/issues";
import {
  getOpenedIssues,
  getClosedIssues,
  makeCollapsesState
} from "./../issues";

test("getOpenedIssues correctly filters issues array", () => {
  const filtered = getOpenedIssues(ISSUES_MOCKS);

  expect(filtered).toEqual([ISSUES_MOCKS[0]]);
});

test("getClosedIssues correctly filters issues array", () => {
  const filtered = getClosedIssues(ISSUES_MOCKS);

  expect(filtered).toEqual([ISSUES_MOCKS[1]]);
});

test("makeCollapsesState creates correct hash", () => {
  const hash = makeCollapsesState(ISSUES_MOCKS);

  expect(hash).toEqual({
    "1": false,
    "2": false
  });
});
