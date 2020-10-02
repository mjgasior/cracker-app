import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError, GraphQLUpload } from "apollo-server";
import withAuth from "graphql-auth";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";

export const MarkerResolver = {
  Upload: GraphQLUpload,
  Query: {
    markers: markerConnector.getAll,
    getMarkers: async (_, { language }) => {
      return await markerConnector.get(language);
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

    singleUpload: withAuth(async (_, { id, file }) => {
      try {
        console.log(`Recieved a file for ${id}`);
        const { createReadStream, filename } = await file;
        console.log(`Current file filename: ${filename}`);

        const savePath = path.join(__dirname, "../../images", filename);

        await new Promise((res) =>
          createReadStream().pipe(createWriteStream(savePath)).on("close", res)
        );

        return true;
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
