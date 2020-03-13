import React, { useState } from "react";
import { Form, FormGroup, Input, Button, FormFeedback } from "reactstrap";
import { AuthService } from "../../services/authService";
import Styles from "./AuthPage.module.css";

interface Props {
  setIsAuthenticated: (flag: boolean) => void;
}

export const AuthPage: React.FC<Props> = ({ setIsAuthenticated }) => {
  const [token, setToken] = useState<string>("");

  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!token) {
      setError(true);
      return;
    }

    setIsAuthenticated(true);

    AuthService.accessToken = token;
  };

  return (
    <div className={Styles.AuthPage}>
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit} className={Styles.form}>
        <FormGroup>
          <Input
            invalid={error}
            type="text"
            placeholder="Enter your token"
            id="token"
            value={token}
            onChange={handleChange}
          />
          <FormFeedback>Field is required</FormFeedback>
        </FormGroup>
        <Button color="primary">Sign in</Button>
      </Form>
    </div>
  );
};
