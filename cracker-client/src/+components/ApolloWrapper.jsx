import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { useAccessToken } from "../+hooks/useAccessToken";

export const ApolloWrapper = ({ children }) => {
  const accessToken = useAccessToken();

  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!accessToken) {
      return { headers, ...rest };
    }
    return {
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
