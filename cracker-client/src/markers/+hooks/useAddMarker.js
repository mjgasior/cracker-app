import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const markersQuery = loader("./markers.gql");
const addMarkerQuery = loader("./addMarker.gql");

export const useAddMarker = () => {
  return useMutation(addMarkerQuery, {
    update(cache, { data: { addMarker } }) {
      const { markers } = cache.readQuery({ query: markersQuery });
      cache.writeQuery({
        query: markersQuery,
        data: { markers: markers.concat([addMarker]) },
      });
    },
  });
};
