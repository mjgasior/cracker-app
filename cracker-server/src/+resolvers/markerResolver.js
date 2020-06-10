import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError } from "apollo-server";

export const MarkerResolver = {
  Query: {
    markers: markerConnector.getAll,
  },
  Mutation: {
    addMarker: async (_, newMarker, { user }) => {
      try {
        const { isLogged, roles } = await user;
        if (!isLogged) {
          throw new AuthenticationError("User not logged in!");
        }

        console.log(roles);
        if (!isAdmin(roles)) {
          throw new AuthenticationError(
            "User not allowed to perform this action!"
          );
        }

        return await markerConnector.add(newMarker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    },

    removeMarker: async (_, { id }, { user }) => {
      try {
        const { isLogged, roles } = await user;

        if (!isLogged) {
          throw new AuthenticationError("User not logged in!");
        }

        if (!isAdmin(roles)) {
          throw new AuthenticationError(
            "User not allowed to perform this action!"
          );
        }

        return await markerConnector.remove(id);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
  },
};

const isAdmin = (roles) => roles.includes("admin");
