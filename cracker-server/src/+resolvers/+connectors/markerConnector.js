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
  getAll: async () => await Marker.find({}).exec(),
};
