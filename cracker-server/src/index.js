import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import dotenv from "dotenv";
dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, cb) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      if (token === "undefined") {
        return resolve({ isLogged: false });
      }

      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve({ email: decoded.email, isLogged: true });
      });
    }).catch(() => {
      return { isLogged: false };
    });

    return {
      user,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
