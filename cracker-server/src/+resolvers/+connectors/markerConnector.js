import { Marker } from "./+models/marker";

export const markerConnector = {
  add: async (newMarker) => {
    try {
      const response = await Marker.create(newMarker);
      return response;
    } catch (e) {
      return e.message;
    }
  },
  remove: async (markerId) => {
    try {
      return await Marker.findByIdAndDelete(markerId);
    } catch (e) {
      return e.message;
    }
  },
  update: async (markerId, marker) => {
    try {
      return await Marker.findByIdAndUpdate(markerId, marker);
    } catch (e) {
      return e.message;
    }
  },
  get: async (markerId) => {
    return await Marker.findById(markerId);
  },
  getAll: async () => {
    const markers = await Marker.find({}).exec();
    return markers;
  },
  getAllByLanguage: async (language) => {
    const sortObject = {};
    sortObject[`${language}.name`] = 1;

    const markers = await Marker.find({})
      .collation({ locale: "en" })
      .sort(sortObject)
      .exec();

    return markers;
  },
  getPageByLanguage: async (language, offset, limit) => {
    const sortObject = {};
    sortObject[`${language}.name`] = 1;

    // total count the new way:
    // https://stackoverflow.com/questions/21803290/get-a-count-of-total-documents-with-mongodb-when-using-limit

    const markers = await Marker.find({})
      .collation({ locale: "en" })
      .sort(sortObject)
      .skip(offset)
      .limit(limit)
      .exec();

    return markers;
  },
};
