import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server";
import { verifyToken } from "./+setup/auth";
import { schema } from "./schema";

const server = new ApolloServer({
  cors: {
    credentials: true,
    origin: (origin, callback) => {
      const whitelist = process.env.CORS_WHITELIST;
      console.log(`Request from ${origin} called - checking whitelist.`);

      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
  schema,
  context: async ({ req, ...rest }) => {
    let isAuthenticated = false;
    try {
      const authorizationHeader = req.headers.authorization || "";
      if (authorizationHeader) {
        const token = getTokenWithouthBearer(authorizationHeader);
        const payload = await verifyToken(token);
        isAuthenticated = isPayloadValid(payload) ? true : false;
      }
    } catch (error) {
      console.error(error);
    }
    return { ...rest, req, auth: { isAuthenticated } };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const getTokenWithouthBearer = (authorizationHeader) => {
  return authorizationHeader.split(" ")[1];
};

const isPayloadValid = (payload) => {
  return payload && payload.sub;
};
