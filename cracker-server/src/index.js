import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server";
import { getUser } from "./+setup/auth";
import { schema } from "./schema";

const server = new ApolloServer({
  cors: {
    credentials: true,
    origin: (origin, callback) => {
      const whitelist = ["http://192.168.99.100"];

      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
  schema,
  context: async ({ req, ...rest }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { req, ...rest, user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
