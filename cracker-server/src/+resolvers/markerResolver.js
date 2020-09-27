import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError } from "apollo-server";
import withAuth from "graphql-auth";

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
    addMarker: withAuth(async (_, { marker }) => {
      try {
        return await markerConnector.add(marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    singleUpload: withAuth(async (_, { file }) => {
      try {
        console.log(JSON.stringify(file));
        const { stream, filename, mimetype, encoding } = await file;

        // 1. Validate file metadata.

        // 2. Stream file contents into cloud storage:
        // https://nodejs.org/api/stream.html

        // 3. Record the file upload in your DB.
        // const id = await recordFile( … )
        console.log(filename);

        return { filename, mimetype, encoding };
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    removeMarker: withAuth(async (_, { id }) => {
      try {
        return await markerConnector.remove(id);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    updateMarker: withAuth(async (_, { id, marker }) => {
      try {
        return await markerConnector.update(id, marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),
  },
};
