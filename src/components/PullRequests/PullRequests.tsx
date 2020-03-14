import React from "react";
import { PullRequest } from "../../types/Repository";
import { InfoCard } from "../InfoCard/InfoCard";

type Props = {
  pullRequests: PullRequest[];
};

export const PullRequests: React.FC<Props> = ({ pullRequests }) => {
  return (
    <div>
      {pullRequests.map(({ title, id, number, createdAt, author, state }) => (
        <InfoCard
          key={id}
          title={title}
          number={number}
          createdAt={createdAt}
          author={author}
          state={state}
        />
      ))}
    </div>
  );
};
