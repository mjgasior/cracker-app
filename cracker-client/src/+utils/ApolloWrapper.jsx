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
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        setBearerToken(token);
      }
    };
    getToken();
  }, [isAuthenticated, setBearerToken, getAccessTokenSilently]);

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) {
      return { headers, ...rest };
    }

    return {
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer: ${bearerToken}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
