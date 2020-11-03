import { AuthenticationError } from "apollo-server-express";
import withAuth from "graphql-auth";

export const VersionResolver = {
  Query: {
    getVersion: withAuth(async () => {
      try {
        return "0.0.1";
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),
  },
};
