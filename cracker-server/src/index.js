import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./schema";
import { resizeImage, forcedResizeImage } from "./+services/imageService";
import { getTokenPayload } from "./+services/authorizationService";

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
    const tokenPayload = await getTokenPayload(req);
    return { ...rest, req, auth: tokenPayload };
  },
});

const app = express();
server.applyMiddleware({ app });

app.use("/images", async (req, res, next) => {
  try {
    const tokenPayload = await getTokenPayload(req);
    if (tokenPayload.isAuthenticated) {
      if (req.query.w && req.query.h) {
        await resizeImage(req, res, next);
      } else {
        express.static("images")(req, res, next);
      }
    } else {
      await forcedResizeImage(req, res, next);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return;
  }
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
