import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError, GraphQLUpload } from "apollo-server-express";
import withAuth from "graphql-auth";
import { createWriteStream } from "fs";
import path from "path";

export const MarkerResolver = {
  Upload: GraphQLUpload,
  Query: {
    markers: markerConnector.getAll,
    getMarkers: async (_, { language }) => {
      return await markerConnector.getAllByLanguage(language);
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
        console.log(`Current file filename: ${JSON.stringify(filename)}`);

        const newFilename = `${id}${path.extname(filename)}`;

        const imageSaveDirectory = process.env.IMAGE_DIRECTORY;
        let savePath = path.join(__dirname, "../../images", newFilename);
        if (imageSaveDirectory) {
          savePath = path.join(imageSaveDirectory, newFilename);
        }

        await new Promise((res) =>
          createReadStream()
            .pipe(createWriteStream(savePath))
            .on("close", res)
        );

        console.log(`File ${newFilename} saved, updating the filename in database.`);
        const marker = await markerConnector.get(id);
        console.log(JSON.stringify(marker));
        marker.imageFilename = newFilename;
        markerConnector.update(id, marker);
        console.log(`Saving and updating of ${newFilename} completed.`);

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
