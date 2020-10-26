import { markerConnector } from "./+connectors/markerConnector";
import { AuthenticationError, GraphQLUpload } from "apollo-server-express";
import withAuth from "graphql-auth";
import { createWriteStream, unlinkSync, existsSync } from "fs";
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
    addMarker: withAuth(["create:markers"], async (_, { marker }) => {
      try {
        return await markerConnector.add(marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    singleUpload: withAuth(["update:markers"], async (_, { id, file }) => {
      try {
        console.log(`Recieved a file for ${id}`);
        const { createReadStream, filename } = await file;
        console.log(`Current file filename: ${JSON.stringify(filename)}`);

        const currentDate = getFormattedCurrentDate();
        const newFilename = `${id}_${currentDate}${path.extname(filename)}`;

        const imageSaveDirectory = process.env.IMAGE_DIRECTORY;
        let savePath = path.join(__dirname, "../../images", newFilename);
        if (imageSaveDirectory) {
          savePath = path.join(imageSaveDirectory, newFilename);
        }

        await new Promise((res) =>
          createReadStream().pipe(createWriteStream(savePath)).on("close", res)
        );

        console.log(
          `File ${newFilename} saved, updating the filename in database.`
        );

        const marker = await markerConnector.get(id);
        marker.imageFilename = newFilename;
        markerConnector.update(id, marker);
        console.log(`Saving and updating of ${newFilename} completed.`);

        return newFilename;
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    removeMarker: withAuth(["delete:markers"], async (_, { id }) => {
      try {
        const { imageFilename } = await markerConnector.get(id);
        if (imageFilename) {
          const imageSaveDirectory = process.env.IMAGE_DIRECTORY;
          let deletePath = path.join(__dirname, "../../images", imageFilename);
          if (imageSaveDirectory) {
            deletePath = path.join(imageSaveDirectory, imageFilename);
          }

          if (existsSync(deletePath)) {
            console.log(`File deletion of: ${deletePath}`);
            unlinkSync(deletePath);
          } else {
            console.log(`Tried to delete but does not exist: ${deletePath}`);
          }
        }

        console.log(`Removing marker ${id}`);
        return await markerConnector.remove(id);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),

    updateMarker: withAuth(["update:markers"], async (_, { id, marker }) => {
      try {
        return await markerConnector.update(id, marker);
      } catch (e) {
        console.error(e);
        throw new AuthenticationError("You must be logged in to do this");
      }
    }),
  },
};

const getFormattedCurrentDate = () => {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const days = currentDateTime.getDate();
  const utcMiliseconds = currentDateTime.getUTCMilliseconds();
  return `${year}${month}${days}_${utcMiliseconds}`;
};
