import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server";
import { getUser } from "./+setup/auth";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
