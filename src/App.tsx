import React, { useState } from "react";
import { ApolloProvider } from "react-apollo";
import { Container } from "reactstrap";
import { AuthService } from "./services/authService";
import { HomePage } from "./screens/HomePage/HomePage";
import { AuthPage } from "./screens/AuthPage/AuthPage";
import { apolloClient } from "./apolloSetup";

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!AuthService.accessToken
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Container className="main-container">
        {isAuthenticated ? (
          <HomePage />
        ) : (
          <AuthPage setIsAuthenticated={setIsAuthenticated} />
        )}
      </Container>
    </ApolloProvider>
  );
};
