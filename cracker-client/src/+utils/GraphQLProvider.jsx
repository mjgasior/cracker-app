import React from "react";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import { useAuth0 } from "@auth0/auth0-react";
import LogRocket from "logrocket";

import { setContext } from "apollo-link-context";

// IF you want to enable/disable dev tools in different enviroments
const devTools = localStorage.getItem("apolloDevTools") || false;

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const authMiddleware = setContext(async (_, { headers, ...context }) => {
    const token = await getAccessTokenSilently();
    //Optional if the ti
    if (typeof Storage !== "undefined") {
      localStorage.setItem("token", token);
    }

    console.log("Network ID:", activeNetworkID);
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...context,
    };
  });

  /**
   * Adding fix to improve logRocket recording
   * https://docs.logrocket.com/docs/troubleshooting-sessions#apollo-client
   */

  const fetcher = (...args) => {
    return window.fetch(...args);
  };

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          LogRocket.captureException(graphQLErrors);
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
        if (networkError) {
          // localStorage.removeItem('token');
          LogRocket.captureException(networkError);
          console.error(`[Network error]:`, networkError);
        }
      }),
      authMiddleware,
      new RetryLink(),
      new BatchHttpLink({
        uri: `${getConfig().apiUrl}`,
        fetch: fetcher,
      }),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: devTools,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
