import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { AuthService } from "./services/authService";

const githubAPIURL = "https://api.github.com/graphql";

const httpLink = new HttpLink({
  uri: githubAPIURL
});

const apolloLink = setContext(() => {
  const token = AuthService.accessToken;

  if (token) {
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
  }
});

const link = apolloLink.concat(httpLink);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache
});
