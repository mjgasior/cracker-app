import { useMutation } from "@apollo/client";
import { ADD_MARKER } from "./queries";
import { loader } from "graphql.macro";

const markersQuery = loader("./markers.gql");

export const useAddMarker = () => {
  return useMutation(ADD_MARKER, {
    update(cache, { data: { addMarker } }) {
      const { markers } = cache.readQuery({ query: markersQuery });
      cache.writeQuery({
        query: markersQuery,
        data: { markers: markers.concat([addMarker]) },
      });
    },
  });
};
