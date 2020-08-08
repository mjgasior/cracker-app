import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError } from "apollo-server";

export const MarkerResolver = {
  Query: {
    markers: markerConnector.getAll,
    getMarkers: async (_, { language }) => {
      return await markerConnector.get(language);
    },
    uploads: () => {
      return null;
    },
  },
  Mutation: {
    addMarker: async (_, { marker }, { user }) => {
      try {
        const { isLogged, roles } = await user;
        verifyAdminAccess(isLogged, roles);

        return await markerConnector.add(marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
    async singleUpload(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )
      console.log(filename);

      return { filename, mimetype, encoding };
    },
    removeMarker: async (_, { id }, { user }) => {
      try {
        const { isLogged, roles } = await user;
        verifyAdminAccess(isLogged, roles);

        return await markerConnector.remove(id);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    },

    updateMarker: async (_, { id, marker }, { user }) => {
      try {
        const { isLogged, roles } = await user;
        verifyAdminAccess(isLogged, roles);

        return await markerConnector.update(id, marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    },
  },
};

const verifyAdminAccess = (isLogged, roles) => {
  if (!isLogged) {
    throw new AuthenticationError("User not logged in!");
  }

  if (!isAdmin(roles)) {
    throw new AuthenticationError("User not allowed to perform this action!");
  }
};

const isAdmin = (roles) => roles && roles.includes("admin");
