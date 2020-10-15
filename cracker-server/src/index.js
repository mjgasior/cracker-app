import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./schema";
import { resizeImage } from "./+services/imageService";
import {
  getIsAuthenticated,
  hasAuthCookie,
} from "./+services/authorizationService";

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
    const isAuthenticated = await getIsAuthenticated(req);
    return { ...rest, req, auth: { isAuthenticated } };
  },
});

const app = express();
server.applyMiddleware({ app });

app.use("/images", async (req, res, next) => {
  const isAuthenticated = hasAuthCookie(req);

  if (!isAuthenticated) {
    res.status(403).end();
    return;
  }

  if (req.query.w && req.query.h) {
    await resizeImage(req, res, next);
  } else {
    express.static("images")(req, res, next);
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
