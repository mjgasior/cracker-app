import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const markersQuery = loader("./markers.gql");
const removeMarkerQuery = loader("./queries/removeMarker.gql");

export const useRemoveMarker = () => {
  return useMutation(removeMarkerQuery, {
    update(cache, { data: { removeMarker } }) {
      const markerId = removeMarker._id;
      const { markers } = cache.readQuery({ query: markersQuery });
      cache.writeQuery({
        query: markersQuery,
        data: { markers: markers.filter((x) => x._id !== markerId) },
      });
    },
  });
};
