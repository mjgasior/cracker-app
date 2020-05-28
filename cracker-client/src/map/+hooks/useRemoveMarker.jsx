import { useMutation } from "@apollo/react-hooks";
import { REMOVE_MARKER, MARKERS } from "./queries";

export const useRemoveMarker = () => {
  return useMutation(REMOVE_MARKER, {
    update(cache, { data: { removeMarker } }) {
      const markerId = removeMarker._id;
      const { markers } = cache.readQuery({ query: MARKERS });
      cache.writeQuery({
        query: MARKERS,
        data: { markers: markers.filter((x) => x._id !== markerId) },
      });
    },
  });
};
