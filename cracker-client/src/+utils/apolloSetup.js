import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
  credentials: "include",
});

const AuthorizedProvider = ({ children }) => {
  const { getTokenSilently } = useAuth0();

  const authLink = setContext(async (_, { headers }) => {
    const token = await getTokenSilently();
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization: "56",
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export { AuthorizedProvider };
