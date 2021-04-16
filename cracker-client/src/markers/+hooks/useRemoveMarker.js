import { useMutation } from "@apollo/client";
import { REMOVE_MARKER } from "./queries";
import { loader } from "graphql.macro";

const markersQuery = loader("./markers.gql");

export const useRemoveMarker = () => {
  return useMutation(REMOVE_MARKER, {
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
