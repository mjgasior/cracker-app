import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";

export const GraphQLProvider = ({ children }) => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    request: async (operation) => {
      // Get token or get refreshed token
      const token = isAuthenticated ? await getTokenSilently() : null;

      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : undefined,
        },
      });
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
