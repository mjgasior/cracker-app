import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import React from "react";

import { useAuth0 } from "../react-auth0-spa";

export const GraphQLProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext(async () => {
    const token = await getTokenSilently();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
