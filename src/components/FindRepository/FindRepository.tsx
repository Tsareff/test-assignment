import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import Styles from "./FindRepository.module.css";

interface Props {
  onSubmit: (owner: string, name: string) => void;
}

export const FindRepository: React.FC<Props> = ({ onSubmit }) => {
  const [repoCredits, setRepoCredits] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const handleSumbit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const [repoOwner, repoName] = repoCredits.split("/");

    if (!repoOwner || !repoName) {
      setError('Please enter a repository name via "name/repo"');
      return;
    }

    setError(null);

    onSubmit(repoOwner, repoName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setRepoCredits(value);
  };

  return (
    <div className={Styles.FindRepository}>
      <h3>Enter repository</h3>
      <Form onSubmit={handleSumbit} inline>
        <FormGroup>
          <Input
            type="text"
            value={repoCredits}
            onChange={handleChange}
            name="repoCredits"
            placeholder="owner/name"
            required
            invalid={!!error}
          />
        </FormGroup>

        <Button color="primary">Search</Button>
      </Form>
      {error && <Alert color="danger">{error}</Alert>}
    </div>
  );
};
