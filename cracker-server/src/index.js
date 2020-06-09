import "./+setup/config";
import "./+setup/db";
import { ApolloServer } from "apollo-server";
import { verifyToken } from "./+setup/auth";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      if (token === "undefined") {
        return resolve({ isLogged: false });
      }

      verifyToken(token, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        console.log(decoded);
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
