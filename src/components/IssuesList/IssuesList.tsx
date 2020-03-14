import React, { useState } from "react";
import { Issue } from "../../types/Repository";
import { IssueCard } from "../IssueCard/IssueCard";
import { makeCollapsesState } from "../../utils/issues";

interface Props {
  issues: Issue[];
}

export const IssuesList: React.FC<Props> = ({ issues }) => {
  const [collapses, setCollapses] = useState(makeCollapsesState(issues));

  const handleCollapse = (id: string) => () => {
    setCollapses({
      ...collapses,
      [id]: !collapses[id]
    });
  };

  return (
    <div>
      {issues.map(issue => (
        <IssueCard
          onClick={handleCollapse(issue.id)}
          isOpen={collapses[issue.id]}
          key={issue.id}
          issue={issue}
        />
      ))}
    </div>
  );
};
