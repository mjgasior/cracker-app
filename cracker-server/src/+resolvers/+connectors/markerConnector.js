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
  getAll: async () => {
    const markers = await Marker.find({}).exec();
    return markers;
  },
};
