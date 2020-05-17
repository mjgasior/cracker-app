import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
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
