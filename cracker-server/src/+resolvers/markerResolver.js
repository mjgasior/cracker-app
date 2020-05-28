import { markerConnector } from "./+connectors/markerConnector";

export const MarkerResolver = {
  Query: {
    markers: markerConnector.getAll,
  },
  Mutation: {
    addMarker: async (_, newMarker) => await markerConnector.add(newMarker),
    removeMarker: async (_, markerId) =>
      await markerConnector.remove(markerId.id),
  },
};
