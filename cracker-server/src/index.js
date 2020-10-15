import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { verifyToken } from "./+setup/auth";
import { schema } from "./schema";
import { resizeImage } from "./+services/imageService";

const server = new ApolloServer({
  schema,
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

const getTokenWithouthBearer = (authorizationHeader) => {
  return authorizationHeader.split(" ")[1];
};

const isPayloadValid = (payload) => {
  return payload && payload.sub;
};

const app = express();
server.applyMiddleware({ app });

app.use("/images", (req, res, next) => {
  console.log(JSON.stringify(req.query));
  console.log(JSON.stringify(req.query.w));
  console.log(JSON.stringify(req.query.h));
  if (req.query.w && req.query.h) {
    console.log(JSON.stringify(req.originalUrl));
    console.log(JSON.stringify(req.path));
    resizeImage(req, res, next);
  } else {
    express.static("images")(req, res, next);
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
