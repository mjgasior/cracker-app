import { useMutation } from "@apollo/client";
import { ADD_MARKER, MARKERS } from "./queries";

export const useAddMarker = () => {
  return useMutation(ADD_MARKER, {
    update(cache, { data: { addMarker } }) {
      const { markers } = cache.readQuery({ query: MARKERS });
      cache.writeQuery({
        query: MARKERS,
        data: { markers: markers.concat([addMarker]) },
      });
    },
  });
};
