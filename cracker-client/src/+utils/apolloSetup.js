import { ApolloClient, ApolloProvider } from "@apollo/client";
import auth from "./Auth";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  request: (operation) => {
    operation.setContext((context) => ({
      headers: {
        ...context.headers,
        authorization: auth.getIdToken(),
      },
    }));
  },
});

export { client, ApolloProvider };
