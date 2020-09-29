import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { createUploadLink } from "apollo-upload-client";

export const ApolloWrapper = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      setAccessToken(token);
    };
    getToken();
  }, [isAuthenticated, setAccessToken, getAccessTokenSilently]);

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
