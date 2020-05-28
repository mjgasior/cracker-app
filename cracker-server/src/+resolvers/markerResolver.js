import { markerConnector } from "./+connectors/markerConnector";

export const MarkerResolver = {
  Query: {
    markers: markerConnector.getAll,
  },
  Mutation: {
    addMarker: async (_, newMarker, { user }) => {
      try {
        const { isLogged } = await user;

        if (!isLogged) {
          throw new AuthenticationError("User not logged in!");
        }

        return await markerConnector.add(newMarker);
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    },

    removeMarker: async (_, { id }, { user }) => {
      try {
        const { isLogged } = await user;

        if (!isLogged) {
          throw new AuthenticationError("User not logged in!");
        }

        return await markerConnector.remove(id);
      } catch (e) {
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
  },
};
