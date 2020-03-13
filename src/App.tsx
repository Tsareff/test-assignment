import React, { useState } from "react";
import { Container } from "reactstrap";
import { AuthService } from "./services/authService";
import { HomePage } from "./screens/HomePage/HomePage";
import { AuthPage } from "./screens/AuthPage/AuthPage";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!AuthService.accessToken
  );

  return (
    <Container className="main-container">
      {isAuthenticated ? (
        <HomePage />
      ) : (
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      )}
    </Container>
  );
};
