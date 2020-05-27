import { markerConnector } from "./+connectors/markerConnector";

export const MarkerResolver = {
  Query: {
    markers: markerConnector.getAll,
  },
  Mutation: {
    addMarker: async (_, newMarker) => await markerConnector.add(newMarker),
  },
};
