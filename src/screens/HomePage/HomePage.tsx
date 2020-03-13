import React, { useState } from "react";
import { FindRepository } from "../../components/FindRepository/FindRepository";
import { RepoContent } from "../../components/RepoContent/RepoContent";

export const HomePage: React.FC = () => {
  const [repoOwner, setRepoOwner] = useState("");

  const [repoName, setRepoName] = useState("");

  const onRepoSearchSumbit = (owner: string, name: string) => {
    setRepoOwner(owner);
    setRepoName(name);
  };

  return (
    <div>
      <FindRepository onSubmit={onRepoSearchSumbit} />
      {repoName && repoName && (
        <RepoContent owner={repoOwner} name={repoName} />
      )}
    </div>
  );
};
