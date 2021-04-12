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
    getMarkersPage: async (_, { language, limit, offset }) => {
      /*
      Testing:
      http://192.168.99.100:4000/graphql
      {
        getVersion
        getMarkersPage(language: "en") {
          latitude
        }
      }
      */
      const result = await markerConnector.getPageByLanguage(
        language,
        offset,
        limit
      );
      console.log(result);
      return result;
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
        const { createReadStream, filename } = await file;
        console.log(`${id}: recieved file: ${JSON.stringify(filename)}`);

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

        console.log(`${id}: file saved, updating database: ${newFilename}`);

        const marker = await markerConnector.get(id);

        const currentImageFilename = marker.imageFilename;
        if (currentImageFilename) {
          console.log(`${id}: deleted old photo: ${currentImageFilename}`);
          deleteImage(currentImageFilename);
        }

        marker.imageFilename = newFilename;
        markerConnector.update(id, marker);
        console.log(`${id}: completed saving: ${newFilename}`);

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
          deleteImage(imageFilename);
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

const deleteImage = (imageFilename) => {
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
};

const getFormattedCurrentDate = () => {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = currentDateTime.getMonth() + 1;
  const days = currentDateTime.getDate();
  const utcMiliseconds = currentDateTime.getUTCMilliseconds();
  return `${year}${month}${days}_${utcMiliseconds}`;
};
