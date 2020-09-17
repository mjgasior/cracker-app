import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

export const ApolloWrapper = ({ children }) => {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getIdTokenClaims();
        setIdToken(token.__raw);
      }
    };
    getToken();
  }, [isAuthenticated, setIdToken, getIdTokenClaims]);

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!idToken) {
      return { headers, ...rest };
    }
    return {
      ...rest,
      headers: {
        ...headers,
        authorization: idToken,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
